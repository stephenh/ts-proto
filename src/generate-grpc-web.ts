import {
  ClassSpec,
  CodeBlock,
  FileSpec,
  FunctionSpec,
  InterfaceSpec,
  Modifier,
  PropertySpec,
  TypeNames,
} from 'ts-poet';
import { google } from '../build/pbjs';
import { Options } from './main';
import { requestType, responsePromise, responseType, TypeMap } from './types';
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;

const grpc = TypeNames.anyType('grpc@@improbable-eng/grpc-web');
const BrowserHeaders = TypeNames.anyType('BrowserHeaders@browser-headers');

/** Generates a client that uses the `@improbable-web/grpc-web` library. */
export function generateGrpcClientImpl(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): ClassSpec {
  // Define the FooServiceImpl class
  let client = ClassSpec.create(`${serviceDesc.name}ClientImpl`)
    .addModifiers(Modifier.EXPORT)
    .addInterface(serviceDesc.name);

  // Create the constructor(rpc: Rpc)
  client = client.addFunction(
    FunctionSpec.createConstructor().addParameter('rpc', 'Rpc').addStatement('this.rpc = rpc')
  );
  client = client.addProperty('rpc', 'Rpc', { modifiers: [Modifier.PRIVATE, Modifier.READONLY] });

  // Create a method for each FooService method
  for (const methodDesc of serviceDesc.method) {
    client = client.addFunction(generateRpcMethod(options, typeMap, serviceDesc, methodDesc));
  }

  return client;
}

/** Creates the RPC methods that client code actually calls. */
function generateRpcMethod(
  options: Options,
  typeMap: TypeMap,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
) {
  const requestFn = FunctionSpec.create(methodDesc.name);
  const inputType = requestType(typeMap, methodDesc, options);
  const partialInputType = TypeNames.parameterizedType(TypeNames.anyType('DeepPartial'), inputType);
  return requestFn
    .addParameter('request', partialInputType)
    .addParameter('metadata?', TypeNames.anyType('grpc.Metadata'))
    .addStatement(
      'return this.rpc.unary(%L, %T.fromPartial(request), metadata)',
      methodDescName(serviceDesc, methodDesc),
      inputType
    )
    .returns(responsePromise(typeMap, methodDesc, options));
}

/** Creates the service descriptor that grpc-web needs at runtime. */
export function generateGrpcServiceDesc(fileDesc: FileDescriptorProto, serviceDesc: ServiceDescriptorProto): CodeBlock {
  return CodeBlock.empty()
    .add('const %LDesc = ', serviceDesc.name)
    .beginHash()
    .addHashEntry('serviceName', CodeBlock.empty().add('%S', `${fileDesc.package}.${serviceDesc.name}`))
    .endHash();
}

/**
 * Creates the method descriptor that grpc-web needs at runtime to make `unary` calls.
 *
 * Note that we take a few liberties in the implementation give we don't 100% match
 * what grpc-web's existing output is, but it works out; see comments in the method
 * implementation.
 */
export function generateGrpcMethodDesc(
  options: Options,
  typeMap: TypeMap,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): CodeBlock {
  let inputType = requestType(typeMap, methodDesc, options);
  let outputType = responseType(typeMap, methodDesc, options);
  return (
    CodeBlock.empty()
      .add('const %L: UnaryMethodDefinitionish = ', methodDescName(serviceDesc, methodDesc))
      .beginHash()
      .addHashEntry('methodName', CodeBlock.empty().add('%S', methodDesc.name))
      .addHashEntry('service', `${serviceDesc.name}Desc`)
      .addHashEntry('requestStream', 'false')
      .addHashEntry('responseStream', 'false')
      // grpc-web expects this to be a class, but the ts-proto messages are just interfaces.
      //
      // That said, grpc-web's runtime doesn't really use this (at least so far for what ts-proto
      // does), so we could potentially set it to `null!`.
      //
      // However, grpc-web does want messages to have a `.serializeBinary()` method, which again
      // due to the class-less nature of ts-proto's messages, we don't have. So we appropriate
      // this `requestType` as a placeholder for our GrpcWebImpl to Object.assign-in this request
      // message's `serializeBinary` method into the data before handing it off to grpc-web.
      //
      // This makes our data look enough like an object/class that grpc-web works just fine.
      .addHashEntry(
        'requestType',
        CodeBlock.empty()
          .beginHash()
          .addHashEntry(
            'serializeBinary',
            FunctionSpec.create('serializeBinary').addStatement('return %T.encode(this).finish()', inputType)
          )
          .endHash()
          .add(' as any')
      )
      // grpc-web also expects this to be a class, but with a static `deserializeBinary` method to
      // create new instances of messages. We again don't have an actual class constructor/symbol
      // to pass to it, but we can make up a lambda that has a `deserializeBinary` that does what
      // we want/what grpc-web's runtime needs.
      .addHashEntry(
        'responseType',
        CodeBlock.empty()
          .beginHash()
          .addHashEntry(
            'deserializeBinary',
            FunctionSpec.create('deserializeBinary')
              .addParameter('data', 'Uint8Array')
              .addStatement('return { ...%T.decode(data), toObject() { return this; } }', outputType)
          )
          .endHash()
          .add(' as any')
      )
      .endHash()
  );
}

function methodDescName(serviceDesc: ServiceDescriptorProto, methodDesc: MethodDescriptorProto): string {
  return `${serviceDesc.name}${methodDesc.name}Desc`;
}

/** Adds misc top-level definitions for grpc-web functionality. */
export function addGrpcWebMisc(options: Options, _file: FileSpec): FileSpec {
  let file = _file;
  file = file.addCode(
    CodeBlock.empty().addStatement('type UnaryMethodDefinitionish = grpc.UnaryMethodDefinition<any, any>')
  );
  file = file.addInterface(generateGrpcWebRpcType());
  file = file.addClass(generateGrpcWebImpl());
  return file;
}

/** Makes an `Rpc` interface to decouple from the low-level grpc-web `grpc.unary`/etc. methods. */
function generateGrpcWebRpcType(): InterfaceSpec {
  let rpc = InterfaceSpec.create('Rpc');
  let fn = FunctionSpec.create('unary');
  const t = TypeNames.typeVariable('T', TypeNames.bound('UnaryMethodDefinitionish'));
  fn = fn
    .addTypeVariable(t)
    .addParameter('methodDesc', t)
    .addParameter('request', TypeNames.ANY)
    .addParameter('metadata', TypeNames.unionType(TypeNames.anyType('grpc.Metadata'), TypeNames.UNDEFINED))
    .returns(TypeNames.PROMISE.param(TypeNames.ANY));
  rpc = rpc.addFunction(fn);
  return rpc;
}

/** Implements the `Rpc` interface by making calls using the `grpc.unary` method. */
function generateGrpcWebImpl(): ClassSpec {
  const maybeMetadata = TypeNames.unionType(TypeNames.anyType('grpc.Metadata'), TypeNames.UNDEFINED);
  const optionsParam = TypeNames.anonymousType(
    ['transport?', TypeNames.anyType('grpc.TransportFactory')],
    ['debug?', TypeNames.BOOLEAN],
    ['metadata?', maybeMetadata]
  );
  const t = TypeNames.typeVariable('T', TypeNames.bound('UnaryMethodDefinitionish'));
  return ClassSpec.create('GrpcWebImpl')
    .addModifiers(Modifier.EXPORT)
    .addProperty(PropertySpec.create('host', TypeNames.STRING).addModifiers(Modifier.PRIVATE))
    .addProperty(PropertySpec.create('options', optionsParam).addModifiers(Modifier.PRIVATE))
    .addInterface('Rpc')
    .addFunction(
      FunctionSpec.createConstructor()
        .addParameter('host', 'string')
        .addParameter('options', optionsParam)
        .addStatement('this.host = host')
        .addStatement('this.options = options')
    )
    .addFunction(
      FunctionSpec.create('unary')
        .addTypeVariable(t)
        .addParameter('methodDesc', t)
        .addParameter('_request', TypeNames.ANY)
        .addParameter('metadata', maybeMetadata)
        .returns(TypeNames.PROMISE.param(TypeNames.ANY))
        .addCodeBlock(
          CodeBlock.empty().add(
            `const request = { ..._request, ...methodDesc.requestType };
return new Promise((resolve, reject) => {
  const maybeCombinedMetadata =
    metadata && this.options.metadata
      ? new %T({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
  %T.unary(methodDesc, {
    request,
    host: this.host,
    metadata: maybeCombinedMetadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (response.status === grpc.Code.OK) {
        resolve(response.message);
      } else {
        const err = new Error(response.statusMessage) as any;
        err.code = response.status;
        err.metadata = response.trailers;
        reject(err);
      }
    },
  });
});
`,
            BrowserHeaders,
            grpc
          )
        )
    );
}
