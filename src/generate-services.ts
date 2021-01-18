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
import { Code, code, imp, joinCode } from 'ts-poet';
import { maybeAddComment, singular } from './utils';
import SourceInfo, { Fields } from './sourceInfo';
import { camelCase } from './case';
import { contextTypeVar, Options } from './main';
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;

const hash = imp('hash*object-hash');
const dataloader = imp('DataLoader*dataloader');
const Reader = imp('Reader@protobufjs/minimal');

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
): Code {
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, chunks, serviceDesc.options?.deprecated);
  const maybeTypeVar = options.useContext ? `<${contextTypeVar}>` : '';
  chunks.push(code`export interface ${serviceDesc.name}${maybeTypeVar} {`);

  serviceDesc.method.forEach((methodDesc, index) => {
    const name = options.lowerCaseServiceMethods ? camelCase(methodDesc.name) : methodDesc.name;

    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    const params: Code[] = [];
    if (options.useContext) {
      params.push(code`ctx: Context`);
    }

    let inputType = requestType(typeMap, methodDesc, options);
    // the grpc-web clients auto-`fromPartial` the input before handing off to grpc-web's
    // serde runtime, so it's okay to accept partial results from the client
    if (options.outputClientImpl === 'grpc-web') {
      inputType = code`DeepPartial<${inputType}>`;
    }
    params.push(code`request: ${inputType}`);

    // Use metadata as last argument for interface only configuration
    if (options.outputClientImpl === 'grpc-web') {
      params.push(code`metadata?: grpc.Metadata`);
    } else if (options.addGrpcMetadata) {
      const q = options.addNestjsRestParameter ? '' : '?';
      params.push(code`metadata${q}: Metadata@grpc`);
    }
    if (options.addNestjsRestParameter) {
      params.push(code`...rest: any`);
    }

    // Return observable for interface only configuration, passing returnObservable=true and methodDesc.serverStreaming=true
    let returnType: Code;
    if (options.returnObservable || methodDesc.serverStreaming) {
      returnType = responseObservable(typeMap, methodDesc, options);
    } else {
      returnType = responsePromise(typeMap, methodDesc, options);
    }

    chunks.push(code`${name}(${joinCode(params, { on: ',' })}): ${returnType};`);

    // If this is a batch method, auto-generate the singular version of it
    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        chunks.push(code`${name}(
          ctx: Context,
          ${singular(batchMethod.inputFieldName)}: ${batchMethod.inputType},
        ): Promise<${batchMethod.outputType}>;`);
      }
    }
  });

  chunks.push(code`}`);

  return joinCode(chunks, { on: '\n' });
}

function generateRegularRpcMethod(
  options: Options,
  typeMap: TypeMap,
  fileDesc: google.protobuf.FileDescriptorProto,
  serviceDesc: google.protobuf.ServiceDescriptorProto,
  methodDesc: google.protobuf.MethodDescriptorProto
): Code {
  const Reader = imp('Reader@protobufjs/minimal');
  const inputType = requestType(typeMap, methodDesc, options);
  const outputType = responseType(typeMap, methodDesc, options);

  const params = [...(options.useContext ? [code`ctx: Context`] : []), code`request: ${inputType}`];
  const maybeCtx = options.useContext ? 'ctx,' : '';

  return code`
    ${methodDesc.name}(
      ${joinCode(params, { on: ',' })}
    ): ${responsePromise(typeMap, methodDesc, options)} {
      const data = ${inputType}.encode(request).finish(); 
      const promise = this.rpc.request(
        ${maybeCtx}
        "${fileDesc.package}.${serviceDesc.name}",
        "methodDesc.name",
        data
      );
      return promise.then(data => ${outputType}.decode(new ${Reader}(data)));
    }
  `;
}

export function generateServiceClientImpl(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): Code {
  const chunks: Code[] = [];

  // Define the FooServiceImpl class
  const { name } = serviceDesc;
  const i = options.useContext ? `${name}<Context>` : name;
  const t = options.useContext ? `<${contextTypeVar}>` : '';
  chunks.push(code`export class ${name}ClientImpl${t} implements ${i} {`);

  // Create the constructor(rpc: Rpc)
  const rpcType = options.useContext ? 'Rpc<Context>' : 'Rpc';
  chunks.push(code`private readonly rpc: ${rpcType};`);
  chunks.push(code`constructor(rpc: ${rpcType}) { this.rpc = rpc; }`);

  // Create a method for each FooService method
  for (const methodDesc of serviceDesc.method) {
    // See if this this fuzzy matches to a batchable method
    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        chunks.push(generateBatchingRpcMethod(typeMap, batchMethod));
      }
    }

    if (options.useContext && methodDesc.name.match(/^Get[A-Z]/)) {
      chunks.push(generateCachingRpcMethod(options, typeMap, fileDesc, serviceDesc, methodDesc));
    } else {
      chunks.push(generateRegularRpcMethod(options, typeMap, fileDesc, serviceDesc, methodDesc));
    }
  }

  chunks.push(code`}`);
  return code`${chunks}`;
}

/** We've found a BatchXxx method, create a synthetic GetXxx method that calls it. */
function generateBatchingRpcMethod(typeMap: TypeMap, batchMethod: BatchMethod): Code {
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
  const lambda: Code[] = [];
  lambda.push(code`
    (${inputFieldName}) => {
      const request = { ${inputFieldName} };
  `);
  if (mapType) {
    // If the return type is a map, lookup each key in the result
    lambda.push(code`
      return this.${methodDesc.name}(ctx, request).then(res => {
        return ${inputFieldName}.map(key => res.${outputFieldName}[key])
      });
    `);
  } else {
    // Otherwise assume they come back in order
    lambda.push(code`
      return this.${methodDesc.name}(ctx, request).then(res => res.${outputFieldName})
    `);
  }
  lambda.push(code`}`);

  return code`
    ${singleMethodName}(
      ctx: Context,
      ${singular(inputFieldName)}: ${inputType}
    ): Promise<${outputType}> {
      const dl = ctx.getDataLoader("${uniqueIdentifier}", () => {
        return new ${dataloader}<${inputType}, ${outputType}>(
          ${joinCode(lambda)},
          { cacheKeyFn: ${hash}, ...ctx.rpcDataLoaderOptions }
        );
      });
      return dl.load(${singular(inputFieldName)});
    }
  `;
}

/** We're not going to batch, but use DataLoader for per-request caching. */
function generateCachingRpcMethod(
  options: Options,
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): Code {
  const inputType = requestType(typeMap, methodDesc, options);
  const outputType = responseType(typeMap, methodDesc, options);
  const uniqueIdentifier = `${fileDesc.package}.${serviceDesc.name}.${methodDesc.name}`;
  const lambda = code`
    (requests) => {
      const responses = requests.map(async request => {
        const data = ${inputType}.encode(request).finish()
        const response = await this.rpc.request(ctx, "${fileDesc.package}.${serviceDesc.name}", "${methodDesc.name}", data);
        return ${outputType}.decode(new ${Reader}(response));
      });
      return Promise.all(responses);
    }
  `;

  return code`
    ${methodDesc.name}(
      ctx: Context,
      request: ${inputType},
    ): Promise<${outputType}> {
      const dl = ctx.getDataLoader("${uniqueIdentifier}", () => {
        return new ${dataloader}<${inputType}, ${outputType}>(
          ${lambda},
          { cacheKeyFn: ${hash}, ...ctx.rpcDataLoaderOptions },
        );
      });
      return dl.load(request);
    }
  `;
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
export function generateRpcType(options: Options): Code {
  const maybeContext = options.useContext ? '<Context>' : '';
  const maybeContextParam = options.useContext ? 'ctx: Context,' : '';
  return code`
    interface Rpc${maybeContext} {
      request(
        ${maybeContextParam}
        service: string,
        method: string,
        data: Uint8Array
      ): Promise<Uint8Array>;
    }
  `;
}

export function generateDataLoadersType(): Code {
  // TODO Maybe should be a generic `Context.get<T>(id, () => T): T` method
  return code`
    export interface DataLoaders {
      rpcDataLoaderOptions?: DataLoaderOptions;
      getDataLoader<T>(identifier: string, constructorFn: () => T): T;
    }
  `;
}

export function generateDataLoaderOptionsType(): Code {
  return code`
    export interface DataLoaderOptions {
      cache?: boolean;
    }
  `;
}
