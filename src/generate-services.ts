import { MethodDescriptorProto, FileDescriptorProto, ServiceDescriptorProto } from 'ts-proto-descriptors';
import { Code, code, imp, joinCode } from 'ts-poet';
import {
  BatchMethod,
  detectBatchMethod,
  requestType,
  responseObservable,
  responsePromise,
  responseType,
} from './types';
import { assertInstanceOf, FormattedMethodDescriptor, maybeAddComment, maybePrefixPackage, singular } from './utils';
import SourceInfo, { Fields } from './sourceInfo';
import { camelCase } from './case';
import { contextTypeVar } from './main';
import { Context } from './context';

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
  ctx: Context,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto
): Code {
  const { options, utils } = ctx;
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, chunks, serviceDesc.options?.deprecated);
  const maybeTypeVar = options.context ? `<${contextTypeVar}>` : '';
  chunks.push(code`export interface ${serviceDesc.name}${maybeTypeVar} {`);

  serviceDesc.method.forEach((methodDesc, index) => {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    const params: Code[] = [];
    if (options.context) {
      params.push(code`ctx: Context`);
    }

    let inputType = requestType(ctx, methodDesc);
    // the grpc-web clients auto-`fromPartial` the input before handing off to grpc-web's
    // serde runtime, so it's okay to accept partial results from the client
    if (options.outputClientImpl === 'grpc-web') {
      inputType = code`${utils.DeepPartial}<${inputType}>`;
    }
    params.push(code`request: ${inputType}`);

    // Use metadata as last argument for interface only configuration
    if (options.outputClientImpl === 'grpc-web') {
      // We have to use grpc.Metadata where grpc will come from @improbable-eng
      params.push(code`metadata?: grpc.Metadata`);
    } else if (options.addGrpcMetadata) {
      const Metadata = imp('Metadata@grpc');
      const q = options.addNestjsRestParameter ? '' : '?';
      params.push(code`metadata${q}: ${Metadata}`);
    }
    if (options.addNestjsRestParameter) {
      params.push(code`...rest: any`);
    }

    // Return observable for interface only configuration, passing returnObservable=true and methodDesc.serverStreaming=true
    let returnType: Code;
    if (options.returnObservable || methodDesc.serverStreaming) {
      returnType = responseObservable(ctx, methodDesc);
    } else {
      returnType = responsePromise(ctx, methodDesc);
    }

    chunks.push(code`${methodDesc.formattedName}(${joinCode(params, { on: ',' })}): ${returnType};`);

    // If this is a batch method, auto-generate the singular version of it
    if (options.context) {
      const batchMethod = detectBatchMethod(ctx, fileDesc, serviceDesc, methodDesc);
      if (batchMethod) {
        chunks.push(code`${batchMethod.singleMethodName}(
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
  ctx: Context,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): Code {
  assertInstanceOf(methodDesc, FormattedMethodDescriptor);
  const { options } = ctx;
  const Reader = imp('Reader@protobufjs/minimal');
  const inputType = requestType(ctx, methodDesc);
  const outputType = responseType(ctx, methodDesc);

  const params = [...(options.context ? [code`ctx: Context`] : []), code`request: ${inputType}`];
  const maybeCtx = options.context ? 'ctx,' : '';

  return code`
    ${methodDesc.formattedName}(
      ${joinCode(params, { on: ',' })}
    ): ${responsePromise(ctx, methodDesc)} {
      const data = ${inputType}.encode(request).finish();
      const promise = this.rpc.request(
        ${maybeCtx}
        "${maybePrefixPackage(fileDesc, serviceDesc.name)}",
        "${methodDesc.name}",
        data
      );
      return promise.then(data => ${outputType}.decode(new ${Reader}(data)));
    }
  `;
}

export function generateServiceClientImpl(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];

  // Define the FooServiceImpl class
  const { name } = serviceDesc;
  const i = options.context ? `${name}<Context>` : name;
  const t = options.context ? `<${contextTypeVar}>` : '';
  chunks.push(code`export class ${name}ClientImpl${t} implements ${i} {`);

  // Create the constructor(rpc: Rpc)
  const rpcType = options.context ? 'Rpc<Context>' : 'Rpc';
  chunks.push(code`private readonly rpc: ${rpcType};`);
  chunks.push(code`constructor(rpc: ${rpcType}) {`);
  chunks.push(code`this.rpc = rpc;`);
  // Bind each FooService method to the FooServiceImpl class
  for (const methodDesc of serviceDesc.method) {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);
    chunks.push(code`this.${methodDesc.formattedName} = this.${methodDesc.formattedName}.bind(this);`);
  }
  chunks.push(code`}`);

  // Create a method for each FooService method
  for (const methodDesc of serviceDesc.method) {
    // See if this this fuzzy matches to a batchable method
    if (options.context) {
      const batchMethod = detectBatchMethod(ctx, fileDesc, serviceDesc, methodDesc);
      if (batchMethod) {
        chunks.push(generateBatchingRpcMethod(ctx, batchMethod));
      }
    }

    if (options.context && methodDesc.name.match(/^Get[A-Z]/)) {
      chunks.push(generateCachingRpcMethod(ctx, fileDesc, serviceDesc, methodDesc));
    } else {
      chunks.push(generateRegularRpcMethod(ctx, fileDesc, serviceDesc, methodDesc));
    }
  }

  chunks.push(code`}`);
  return code`${chunks}`;
}

/** We've found a BatchXxx method, create a synthetic GetXxx method that calls it. */
function generateBatchingRpcMethod(ctx: Context, batchMethod: BatchMethod): Code {
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
  assertInstanceOf(methodDesc, FormattedMethodDescriptor);

  // Create the `(keys) => ...` lambda we'll pass to the DataLoader constructor
  const lambda: Code[] = [];
  lambda.push(code`
    (${inputFieldName}) => {
      const request = { ${inputFieldName} };
  `);
  if (mapType) {
    // If the return type is a map, lookup each key in the result
    lambda.push(code`
      return this.${methodDesc.formattedName}(ctx, request).then(res => {
        return ${inputFieldName}.map(key => res.${outputFieldName}[key])
      });
    `);
  } else {
    // Otherwise assume they come back in order
    lambda.push(code`
      return this.${methodDesc.formattedName}(ctx, request).then(res => res.${outputFieldName})
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
  ctx: Context,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): Code {
  assertInstanceOf(methodDesc, FormattedMethodDescriptor);
  const inputType = requestType(ctx, methodDesc);
  const outputType = responseType(ctx, methodDesc);
  const uniqueIdentifier = `${maybePrefixPackage(fileDesc, serviceDesc.name)}.${methodDesc.name}`;
  const lambda = code`
    (requests) => {
      const responses = requests.map(async request => {
        const data = ${inputType}.encode(request).finish()
        const response = await this.rpc.request(ctx, "${maybePrefixPackage(fileDesc, serviceDesc.name)}", "${
    methodDesc.name
  }", data);
        return ${outputType}.decode(new ${Reader}(response));
      });
      return Promise.all(responses);
    }
  `;

  return code`
    ${methodDesc.formattedName}(
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
export function generateRpcType(ctx: Context): Code {
  const { options } = ctx;
  const maybeContext = options.context ? '<Context>' : '';
  const maybeContextParam = options.context ? 'ctx: Context,' : '';
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
