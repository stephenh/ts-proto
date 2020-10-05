import { google } from '../build/pbjs';
import {
  BatchMethod,
  detectBatchMethod,
  requestType,
  responseObservable,
  responsePromise,
  responseType,
  TypeMap,
} from './types';
import { ClassSpec, CodeBlock, FunctionSpec, InterfaceSpec, Modifier, TypeNames } from 'ts-poet';
import { maybeAddComment, singular } from './utils';
import SourceInfo, { Fields } from './sourceInfo';
import { camelCase } from './case';
import { contextTypeVar, Options } from './main';
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;

const dataloader = TypeNames.anyType('DataLoader*dataloader');

/**
 * Generates an interface for `serviceDesc`.
 *
 * Some RPC frameworks (i.e. Twirp) can use the same interface, i.e.
 * `getFoo(req): Promise<res>` for the client-side and server-side,
 * which is the intent for this interface.
 *
 * Other RPC frameworks (i.e. NestJS) that need different client-side
 * vs. server-side code/interfaces are handled separately.
 */
export function generateService(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): InterfaceSpec {
  let service = InterfaceSpec.create(serviceDesc.name).addModifiers(Modifier.EXPORT);
  if (options.useContext) {
    service = service.addTypeVariable(contextTypeVar);
  }
  maybeAddComment(sourceInfo, (text) => (service = service.addJavadoc(text)));

  serviceDesc.method.forEach((methodDesc, index) => {
    if (options.lowerCaseServiceMethods) {
      methodDesc.name = camelCase(methodDesc.name);
    }

    let requestFn = FunctionSpec.create(methodDesc.name);
    if (options.useContext) {
      requestFn = requestFn.addParameter('ctx', TypeNames.typeVariable('Context'));
    }
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, (text) => (requestFn = requestFn.addJavadoc(text)));

    let inputType = requestType(typeMap, methodDesc, options);
    // the grpc-web clients `fromPartial` the input before handing off to grpc-web's
    // serde runtime, so it's okay to accept partial results from the client
    if (options.outputClientImpl === 'grpc-web') {
      inputType = TypeNames.parameterizedType(TypeNames.anyType('DeepPartial'), inputType);
    }
    requestFn = requestFn.addParameter('request', inputType);

    // Use metadata as last argument for interface only configuration
    if (options.outputClientImpl === 'grpc-web') {
      requestFn = requestFn.addParameter('metadata?', 'grpc.Metadata');
    } else if (options.addGrpcMetadata) {
      requestFn = requestFn.addParameter(options.addNestjsRestParameter ? 'metadata' : 'metadata?', 'Metadata@grpc');
    }
    if (options.addNestjsRestParameter) {
      requestFn = requestFn.addParameter('...rest', 'any');
    }

    // Return observable for interface only configuration, passing returnObservable=true and methodDesc.serverStreaming=true
    if (options.returnObservable || methodDesc.serverStreaming) {
      requestFn = requestFn.returns(responseObservable(typeMap, methodDesc, options));
    } else {
      requestFn = requestFn.returns(responsePromise(typeMap, methodDesc, options));
    }

    service = service.addFunction(requestFn);

    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        let batchFn = FunctionSpec.create(name);
        if (options.useContext) {
          batchFn = batchFn.addParameter('ctx', TypeNames.typeVariable('Context'));
        }
        batchFn = batchFn.addParameter(singular(batchMethod.inputFieldName), batchMethod.inputType);
        batchFn = batchFn.returns(TypeNames.PROMISE.param(batchMethod.outputType));
        service = service.addFunction(batchFn);
      }
    }
  });
  return service;
}

function generateRegularRpcMethod(
  options: Options,
  typeMap: TypeMap,
  fileDesc: google.protobuf.FileDescriptorProto,
  serviceDesc: google.protobuf.ServiceDescriptorProto,
  methodDesc: google.protobuf.MethodDescriptorProto
) {
  let requestFn = FunctionSpec.create(methodDesc.name);
  if (options.useContext) {
    requestFn = requestFn.addParameter('ctx', TypeNames.typeVariable('Context'));
  }
  let inputType = requestType(typeMap, methodDesc, options);
  return requestFn
    .addParameter('request', inputType)
    .addStatement('const data = %L.encode(request).finish()', inputType)
    .addStatement(
      'const promise = this.rpc.request(%L"%L.%L", %S, %L)',
      options.useContext ? 'ctx, ' : '', // sneak ctx in as the 1st parameter to our rpc call
      fileDesc.package,
      serviceDesc.name,
      methodDesc.name,
      'data'
    )
    .addStatement(
      'return promise.then(data => %L.decode(new %T(data)))',
      responseType(typeMap, methodDesc, options),
      'Reader@protobufjs/minimal'
    )
    .returns(responsePromise(typeMap, methodDesc, options));
}

export function generateServiceClientImpl(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): ClassSpec {
  // Define the FooServiceImpl class
  let client = ClassSpec.create(`${serviceDesc.name}ClientImpl`).addModifiers(Modifier.EXPORT);
  if (options.useContext) {
    client = client.addTypeVariable(contextTypeVar);
    client = client.addInterface(`${serviceDesc.name}<Context>`);
  } else {
    client = client.addInterface(serviceDesc.name);
  }

  // Create the constructor(rpc: Rpc)
  const rpcType = options.useContext ? 'Rpc<Context>' : 'Rpc';
  client = client.addFunction(
    FunctionSpec.createConstructor().addParameter('rpc', rpcType).addStatement('this.rpc = rpc')
  );
  client = client.addProperty('rpc', rpcType, { modifiers: [Modifier.PRIVATE, Modifier.READONLY] });

  // Create a method for each FooService method
  for (const methodDesc of serviceDesc.method) {
    // See if this this fuzzy matches to a batchable method
    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        client = client.addFunction(generateBatchingRpcMethod(typeMap, batchMethod));
      }
    }

    if (options.useContext && methodDesc.name.match(/^Get[A-Z]/)) {
      client = client.addFunction(generateCachingRpcMethod(options, typeMap, fileDesc, serviceDesc, methodDesc));
    } else {
      client = client.addFunction(generateRegularRpcMethod(options, typeMap, fileDesc, serviceDesc, methodDesc));
    }
  }
  return client;
}

/** We've found a BatchXxx method, create a synthetic GetXxx method that calls it. */
function generateBatchingRpcMethod(typeMap: TypeMap, batchMethod: BatchMethod): FunctionSpec {
  const {
    methodDesc,
    singleMethodName,
    inputFieldName,
    inputType,
    outputFieldName,
    outputType,
    mapType,
    uniqueIdentifier,
  } = batchMethod;
  // Create the `(keys) => ...` lambda we'll pass to the DataLoader constructor
  let lambda = CodeBlock.lambda(inputFieldName) // e.g. keys
    .addStatement('const request = { %L }', inputFieldName);
  if (mapType) {
    // If the return type is a map, lookup each key in the result
    lambda = lambda
      .beginLambda('return this.%L(ctx, request).then(res =>', methodDesc.name)
      .addStatement('return %L.map(key => res.%L[key])', inputFieldName, outputFieldName)
      .endLambda(')');
  } else {
    // Otherwise assume they come back in order
    lambda = lambda.addStatement('return this.%L(ctx, request).then(res => res.%L)', methodDesc.name, outputFieldName);
  }
  return FunctionSpec.create(singleMethodName)
    .addParameter('ctx', 'Context')
    .addParameter(singular(inputFieldName), inputType)
    .addCode('const dl = ctx.getDataLoader(%S, () => {%>\n', uniqueIdentifier)
    .addCode(
      'return new %T<%T, %T>(%L, { cacheKeyFn: %T, ...ctx.rpcDataLoaderOptions });\n',
      dataloader,
      inputType,
      outputType,
      lambda,
      TypeNames.anyType('hash*object-hash')
    )
    .addCode('%<});\n')
    .addStatement('return dl.load(%L)', singular(inputFieldName))
    .returns(TypeNames.PROMISE.param(outputType));
}

/** We're not going to batch, but use DataLoader for per-request caching. */
function generateCachingRpcMethod(
  options: Options,
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): FunctionSpec {
  const inputType = requestType(typeMap, methodDesc, options);
  const outputType = responseType(typeMap, methodDesc, options);
  let lambda = CodeBlock.lambda('requests')
    .beginLambda('const responses = requests.map(async request =>')
    .addStatement('const data = %L.encode(request).finish()', inputType)
    .addStatement(
      'const response = await this.rpc.request(ctx, "%L.%L", %S, %L)',
      fileDesc.package,
      serviceDesc.name,
      methodDesc.name,
      'data'
    )
    .addStatement('return %L.decode(new %T(response))', outputType, 'Reader@protobufjs/minimal')
    .endLambda(')')
    .addStatement('return Promise.all(responses)');
  const uniqueIdentifier = `${fileDesc.package}.${serviceDesc.name}.${methodDesc.name}`;
  return FunctionSpec.create(methodDesc.name)
    .addParameter('ctx', 'Context')
    .addParameter('request', inputType)
    .addCode('const dl = ctx.getDataLoader(%S, () => {%>\n', uniqueIdentifier)
    .addCode(
      'return new %T<%T, %T>(%L, { cacheKeyFn: %T, ...ctx.rpcDataLoaderOptions  });\n',
      dataloader,
      inputType,
      outputType,
      lambda,
      TypeNames.anyType('hash*object-hash')
    )
    .addCode('%<});\n')
    .addStatement('return dl.load(request)')
    .returns(TypeNames.PROMISE.param(outputType));
}

/**
 * Creates an `Rpc.request(service, method, data)` abstraction.
 *
 * This lets clients pass in their own request-promise-ish client.
 *
 * We don't export this because if a project uses multiple `*.proto` files,
 * we don't want our the barrel imports in `index.ts` to have multiple `Rpc`
 * types.
 */
export function generateRpcType(options: Options): InterfaceSpec {
  const data = TypeNames.anyType('Uint8Array');
  let fn = FunctionSpec.create('request');
  if (options.useContext) {
    fn = fn.addParameter('ctx', 'Context');
  }
  fn = fn
    .addParameter('service', TypeNames.STRING)
    .addParameter('method', TypeNames.STRING)
    .addParameter('data', data)
    .returns(TypeNames.PROMISE.param(data));
  let rpc = InterfaceSpec.create('Rpc');
  if (options.useContext) {
    rpc = rpc.addTypeVariable(TypeNames.typeVariable('Context'));
  }
  rpc = rpc.addFunction(fn);
  return rpc;
}

export function generateDataLoadersType(): InterfaceSpec {
  // TODO Maybe should be a generic `Context.get<T>(id, () => T): T` method
  let fn = FunctionSpec.create('getDataLoader')
    .addTypeVariable(TypeNames.typeVariable('T'))
    .addParameter('identifier', TypeNames.STRING)
    .addParameter('constructorFn', TypeNames.lambda2([], TypeNames.typeVariable('T')))
    .returns(TypeNames.typeVariable('T'));
  return InterfaceSpec.create('DataLoaders')
    .addModifiers(Modifier.EXPORT)
    .addFunction(fn)
    .addProperty('rpcDataLoaderOptions', 'DataLoaderOptions', { optional: true });
}

export function generateDataLoaderOptionsType(): InterfaceSpec {
  return InterfaceSpec.create('DataLoaderOptions')
    .addModifiers(Modifier.EXPORT)
    .addProperty('cache', 'boolean', { optional: true });
}
