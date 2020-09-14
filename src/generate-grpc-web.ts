import { google } from '../build/pbjs';
import { requestType, responseObservable, responsePromise, responseType, TypeMap } from './types';
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
import { Options } from './main';
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;

const grpc = TypeNames.anyType('grpc@@improbable-eng/grpc-web');
const share = TypeNames.anyType('share@rxjs/operators');
const take = TypeNames.anyType('take@rxjs/operators');
const BrowserHeaders = TypeNames.anyType('BrowserHeaders@browser-headers');
const Code = TypeNames.anyType('Code@@improbable-eng/grpc-web/dist/typings/Code');

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
      methodDesc.serverStreaming
        ? 'return this.rpc.invoke(%L, %T.fromPartial(request), metadata)'
        : 'return this.rpc.unary(%L, %T.fromPartial(request), metadata)',
      methodDescName(serviceDesc, methodDesc),
      inputType
    )
    .returns(
      options.returnObservable || methodDesc.serverStreaming
        ? responseObservable(typeMap, methodDesc, options)
        : responsePromise(typeMap, methodDesc, options)
    );
}

/** Creates the service descriptor that grpc-web needs at runtime. */
export function generateGrpcServiceDesc(fileDesc: FileDescriptorProto, serviceDesc: ServiceDescriptorProto): CodeBlock {
  return CodeBlock.empty()
    .add('export const %LDesc = ', serviceDesc.name)
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
      .add('export const %L: UnaryMethodDefinitionish = ', methodDescName(serviceDesc, methodDesc))
      .beginHash()
      .addHashEntry('methodName', CodeBlock.empty().add('%S', methodDesc.name))
      .addHashEntry('service', `${serviceDesc.name}Desc`)
      .addHashEntry('requestStream', 'false')
      .addHashEntry('responseStream', methodDesc.serverStreaming ? 'true' : 'false')
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
    CodeBlock.empty()
      .addStatement('import UnaryMethodDefinition = grpc.UnaryMethodDefinition')
      .addStatement('type UnaryMethodDefinitionish = UnaryMethodDefinition<any, any>')
  );
  file = file.addInterface(generateGrpcWebRpcType(options.returnObservable));
  file = file.addClass(options.returnObservable ? generateGrpcWebImplObservable() : generateGrpcWebImplPromise());
  return file;
}

/** Makes an `Rpc` interface to decouple from the low-level grpc-web `grpc.invoke and grpc.unary`/etc. methods. */
function generateGrpcWebRpcType(returnObservable: boolean): InterfaceSpec {
  let rpc = InterfaceSpec.create('Rpc');
  let fnU = FunctionSpec.create('unary');
  let fnI = FunctionSpec.create('invoke');
  const t = TypeNames.typeVariable('T', TypeNames.bound('UnaryMethodDefinitionish'));
  fnU = fnU
    .addTypeVariable(t)
    .addParameter('methodDesc', t)
    .addParameter('request', TypeNames.ANY)
    .addParameter('metadata', TypeNames.unionType(TypeNames.anyType('grpc.Metadata'), TypeNames.UNDEFINED))
    .returns(
      returnObservable
        ? TypeNames.anyType('Observable@rxjs').param(TypeNames.ANY)
        : TypeNames.PROMISE.param(TypeNames.ANY)
    );
  fnI = fnI
    .addTypeVariable(t)
    .addParameter('methodDesc', t)
    .addParameter('request', TypeNames.ANY)
    .addParameter('metadata', TypeNames.unionType(TypeNames.anyType('grpc.Metadata'), TypeNames.UNDEFINED))
    .returns(TypeNames.anyType('Observable@rxjs').param(TypeNames.ANY));
  rpc = rpc.addFunction(fnU).addFunction(fnI);
  return rpc;
}

/** Implements the `Rpc` interface by making calls using the `grpc.unary` method. */
function generateGrpcWebImplPromise(): ClassSpec {
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
            const maybeCombinedMetadata =
    metadata && this.options.metadata
      ? new %T({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
return new Promise((resolve, reject) => {
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
    )
    .addFunction(
      FunctionSpec.create('invoke')
        .addTypeVariable(t)
        .addParameter('methodDesc', t)
        .addParameter('_request', TypeNames.ANY)
        .addParameter('metadata', maybeMetadata)
        .returns(TypeNames.anyType('Observable@rxjs').param(TypeNames.ANY))
        .addCodeBlock(
          CodeBlock.empty().add(
            `const DEFAULT_TIMEOUT_TIME: number = 3 /* seconds */ * 1000 /* ms */;
            const request = { ..._request, ...methodDesc.requestType };
            const maybeCombinedMetadata =
    metadata && this.options.metadata
      ? new %T({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
return new Observable(observer => {
      const upStream = (() => {
        %T.invoke(methodDesc, {
          host: this.host,
          request,
          metadata: maybeCombinedMetadata,
          transport: grpc.WebsocketTransport(),
          debug: this.options.debug,
          onMessage: (next) => {
            observer.next(next as any);
          },
           onEnd: (code: %T) => {
            if (code !== 0) {
              setTimeout(() => {
                upStream();
              }, DEFAULT_TIMEOUT_TIME);
            }
          },
        });
      });

      upStream();
    }).pipe(%T());
`,
            BrowserHeaders,
            grpc,
            Code,
            share
          )
        )
    );
}

function generateGrpcWebImplObservable(): ClassSpec {
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
        .returns(TypeNames.anyType('Observable@rxjs').param(TypeNames.ANY))
        .addCodeBlock(
          CodeBlock.empty().add(
            `const request = { ..._request, ...methodDesc.requestType };
            const maybeCombinedMetadata =
    metadata && this.options.metadata
      ? new %T({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
return new Observable(observer => {
  %T.unary(methodDesc, {
      request,
      host: this.host,
      metadata: maybeCombinedMetadata,
      transport: this.options.transport,
      debug: this.options.debug,
      onEnd: (next) => {
        if (next.status !== 0) {
          observer.error({
            code: next.status,
            message: next.statusMessage,
          });
        } else {
          observer.next(next.message as any);
          observer.complete();
        }
      },
    });
  }).pipe(%T(1));
`,
            BrowserHeaders,
            grpc,
            take
          )
        )
    )
    .addFunction(
      FunctionSpec.create('invoke')
        .addTypeVariable(t)
        .addParameter('methodDesc', t)
        .addParameter('_request', TypeNames.ANY)
        .addParameter('metadata', maybeMetadata)
        .returns(TypeNames.anyType('Observable@rxjs').param(TypeNames.ANY))
        .addCodeBlock(
          CodeBlock.empty().add(
            `const DEFAULT_TIMEOUT_TIME: number = 3 /* seconds */ * 1000 /* ms */;
            const request = { ..._request, ...methodDesc.requestType };
            const maybeCombinedMetadata =
    metadata && this.options.metadata
      ? new %T({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
return new Observable(observer => {
      const upStream = (() => {
        %T.invoke(methodDesc, {
          host: this.host,
          request,
          metadata: maybeCombinedMetadata,
          transport: grpc.WebsocketTransport(),
          debug: this.options.debug,
          onMessage: (next) => {
            observer.next(next as any);
          },
          onEnd: (code: %T) => {
            if (code !== 0) {
              setTimeout(() => {
                upStream();
              }, DEFAULT_TIMEOUT_TIME);
            }
          },
        });
      });

      upStream();
    }).pipe(%T());
`,
            BrowserHeaders,
            grpc,
            Code,
            share
          )
        )
    );
}
