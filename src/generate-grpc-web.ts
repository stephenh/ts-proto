import { google } from '../build/pbjs';
import { requestType, responsePromise, responseType, TypeMap } from './types';
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

/** Generates a client that uses the improbable-web grpc-web library. */
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
  const rpcType = options.useContext ? 'Rpc<Context>' : 'Rpc';
  client = client.addFunction(
    FunctionSpec.createConstructor().addParameter('rpc', rpcType).addStatement('this.rpc = rpc')
  );
  client = client.addProperty('rpc', rpcType, { modifiers: [Modifier.PRIVATE, Modifier.READONLY] });

  // Create a method for each FooService method
  for (const methodDesc of serviceDesc.method) {
    client = client.addFunction(generateRegularRpcMethod(options, typeMap, fileDesc, serviceDesc, methodDesc));
  }
  return client;
}

function generateRegularRpcMethod(
  options: Options,
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
) {
  let requestFn = FunctionSpec.create(methodDesc.name);
  let inputType = requestType(typeMap, methodDesc, options);
  return requestFn
    .addParameter('request', inputType)
    .addStatement('return this.rpc.unary(%L, request)', methodDescName(serviceDesc, methodDesc))
    .returns(responsePromise(typeMap, methodDesc, options));
}

export function generateGrpcServiceDesc(fileDesc: FileDescriptorProto, serviceDesc: ServiceDescriptorProto): CodeBlock {
  return CodeBlock.empty()
    .add('const %LDesc = ', serviceDesc.name)
    .beginHash()
    .addHashEntry('serviceName', CodeBlock.empty().add('%S', `${fileDesc.package}.${serviceDesc.name}`))
    .endHash();
}

export function generateGrpcMethodDesc(
  options: Options,
  typeMap: TypeMap,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): CodeBlock {
  let inputType = requestType(typeMap, methodDesc, options);
  let outputType = responseType(typeMap, methodDesc, options);
  return CodeBlock.empty()
    .add('const %L: UnaryMethodDefinitionish = ', methodDescName(serviceDesc, methodDesc))
    .beginHash()
    .addHashEntry('methodName', CodeBlock.empty().add('%S', methodDesc.name))
    .addHashEntry('service', `${serviceDesc.name}Desc`)
    .addHashEntry('requestStream', 'false')
    .addHashEntry('responseStream', 'false')
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
    .endHash();
}

function methodDescName(serviceDesc: ServiceDescriptorProto, methodDesc: MethodDescriptorProto): string {
  return `${serviceDesc.name}${methodDesc.name}Desc`;
}

export function addGrpcWebMisc(options: Options, _file: FileSpec): FileSpec {
  let file = _file;
  file = file.addCode(
    CodeBlock.empty()
      .addStatement('import UnaryMethodDefinition = grpc.UnaryMethodDefinition')
      .addStatement('type UnaryMethodDefinitionish = UnaryMethodDefinition<any, any>')
  );
  file = file.addInterface(generateGrpcWebRpcType());
  file = file.addClass(generateGrpcWebImpl());
  return file;
}

/** Makes an `Rpc` adapter to the grpc-web `grpc.unary`/etc. method. */
function generateGrpcWebRpcType(): InterfaceSpec {
  let rpc = InterfaceSpec.create('Rpc');
  let fn = FunctionSpec.create('unary');
  const t = TypeNames.typeVariable('T', TypeNames.bound('UnaryMethodDefinitionish'));
  fn = fn
    .addTypeVariable(t)
    .addParameter('metadata', t)
    .addParameter('request', TypeNames.ANY)
    .returns(TypeNames.PROMISE.param(TypeNames.ANY));
  rpc = rpc.addFunction(fn);
  return rpc;
}

function generateGrpcWebImpl(): ClassSpec {
  const optionsParam = TypeNames.anonymousType(
    ['transport?', TypeNames.anyType('grpc.TransportFactory')],
    ['debug?', TypeNames.BOOLEAN]
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
        .returns(TypeNames.PROMISE.param(TypeNames.ANY))
        .addCodeBlock(
          CodeBlock.empty().add(
            `const request = { ..._request, ...methodDesc.requestType };
return new Promise((resolve, reject) => {
  %T.unary(methodDesc, {
    request,
    host: this.host,
    metadata: null,
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
            grpc
          )
        )
    );
}
