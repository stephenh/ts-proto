import { MethodDescriptorProto, FileDescriptorProto, ServiceDescriptorProto } from "ts-proto-descriptors";
import { Code, code, def, imp, joinCode } from "ts-poet";
import {
  BatchMethod,
  detectBatchMethod,
  requestType,
  rawRequestType,
  responsePromiseOrObservable,
  responseType,
  observableType,
} from "./types";
import {
  assertInstanceOf,
  FormattedMethodDescriptor,
  impFile,
  maybeAddComment,
  maybePrefixPackage,
  singular,
  tryCatchBlock,
} from "./utils";
import SourceInfo, { Fields } from "./sourceInfo";
import { contextTypeVar } from "./main";
import { Context } from "./context";

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
  serviceDesc: ServiceDescriptorProto,
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, chunks, serviceDesc.options?.deprecated);
  const maybeTypeVar = options.context ? `<${contextTypeVar}>` : "";
  chunks.push(code`export interface ${def(serviceDesc.name)}${maybeTypeVar} {`);

  serviceDesc.method.forEach((methodDesc, index) => {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(info, chunks, methodDesc.options?.deprecated);

    const params: Code[] = [];
    if (options.context) {
      params.push(code`ctx: Context`);
    }

    // the grpc-web clients auto-`fromPartial` the input before handing off to grpc-web's
    // serde runtime, so it's okay to accept partial results from the client
    const partialInput = options.outputClientImpl === "grpc-web";
    const inputType = requestType(ctx, methodDesc, partialInput);
    params.push(code`request: ${inputType}`);

    // Use metadata as last argument for interface only configuration
    if (options.outputClientImpl === "grpc-web") {
      // We have to use grpc.Metadata where grpc will come from @improbable-eng
      params.push(code`metadata?: grpc.Metadata`);
    } else if (options.addGrpcMetadata) {
      const Metadata = imp("Metadata@@grpc/grpc-js");
      const q = options.addNestjsRestParameter ? "" : "?";
      params.push(code`metadata${q}: ${Metadata}`);
    } else if (options.metadataType) {
      const Metadata = imp(options.metadataType);
      params.push(code`metadata?: ${Metadata}`);
    }
    if (options.useAbortSignal) {
      params.push(code`abortSignal?: AbortSignal`);
    }
    if (options.addNestjsRestParameter) {
      params.push(code`...rest: any`);
    }

    chunks.push(
      code`${methodDesc.formattedName}(${joinCode(params, { on: "," })}): ${responsePromiseOrObservable(
        ctx,
        methodDesc,
      )};`,
    );

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

  return joinCode(chunks, { on: "\n" });
}

function generateRegularRpcMethod(ctx: Context, methodDesc: MethodDescriptorProto): Code {
  assertInstanceOf(methodDesc, FormattedMethodDescriptor);
  const { options } = ctx;
  const Reader = impFile(ctx.options, "Reader@protobufjs/minimal");
  const rawInputType = rawRequestType(ctx, methodDesc, { keepValueType: true });
  const inputType = requestType(ctx, methodDesc);
  const rawOutputType = responseType(ctx, methodDesc, { keepValueType: true });

  const params = [
    ...(options.context ? [code`ctx: Context`] : []),
    code`request: ${inputType}`,
    ...(options.useAbortSignal ? [code`abortSignal?: AbortSignal`] : []),
  ];
  const maybeCtx = options.context ? "ctx," : "";
  const maybeAbortSignal = options.useAbortSignal ? "abortSignal || undefined," : "";

  let errorHandler;
  if (options.rpcErrorHandler) {
    errorHandler = code`
      if (error instanceof Error && this.rpc.handleError) {
        return Promise.reject(this.rpc.handleError(this.service, "${methodDesc.name}", error));
      }
      return Promise.reject(error);
    `;
  }

  let encode = code`${rawInputType}.encode(request).finish()`;
  let beforeRequest;
  if (options.rpcBeforeRequest) {
    beforeRequest = code`
    if (this.rpc.beforeRequest) {
      this.rpc.beforeRequest(this.service, "${methodDesc.name}", request);
    }`;
  }
  let decode = code`${rawOutputType}.decode(${Reader}.create(data))`;
  if (options.rpcAfterResponse) {
    decode = code`
      const response = ${rawOutputType}.decode(${Reader}.create(data));
      if (this.rpc.afterResponse) {
        this.rpc.afterResponse(this.service, "${methodDesc.name}", response);
      }
      return response;
    `;
  }

  // if (options.useDate && rawOutputType.toString().includes("Timestamp")) {
  //   decode = code`data => ${utils.fromTimestamp}(${rawOutputType}.decode(${Reader}.create(data)))`;
  // }
  if (methodDesc.clientStreaming) {
    if (options.useAsyncIterable) {
      encode = code`${rawInputType}.encodeTransform(request)`;
    } else {
      encode = code`request.pipe(${imp("map@rxjs/operators")}(request => ${encode}))`;
    }
  }

  const returnStatement = createDefaultServiceReturn(ctx, methodDesc, decode, errorHandler);

  let returnVariable: string;
  if (options.returnObservable || methodDesc.serverStreaming) {
    returnVariable = "result";
  } else {
    returnVariable = "promise";
  }

  let rpcMethod: string;
  if (methodDesc.clientStreaming && methodDesc.serverStreaming) {
    rpcMethod = "bidirectionalStreamingRequest";
  } else if (methodDesc.serverStreaming) {
    rpcMethod = "serverStreamingRequest";
  } else if (methodDesc.clientStreaming) {
    rpcMethod = "clientStreamingRequest";
  } else {
    rpcMethod = "request";
  }

  return code`
    ${methodDesc.formattedName}(
      ${joinCode(params, { on: "," })}
    ): ${responsePromiseOrObservable(ctx, methodDesc)} {
      const data = ${encode}; ${beforeRequest ? beforeRequest : ""}
      const ${returnVariable} = this.rpc.${rpcMethod}(
        ${maybeCtx}
        this.service,
        "${methodDesc.name}",
        data,
        ${maybeAbortSignal}
      );
      return ${returnStatement};
    }
  `;
}

function createDefaultServiceReturn(
  ctx: Context,
  methodDesc: MethodDescriptorProto,
  decode: Code,
  errorHandler?: Code,
): Code {
  const { options } = ctx;
  const rawOutputType = responseType(ctx, methodDesc, { keepValueType: true });
  if (options.returnObservable || methodDesc.serverStreaming) {
    if (options.useAsyncIterable) {
      return code`${rawOutputType}.decodeTransform(result)`;
    } else {
      return code`result.pipe(${imp("map@rxjs/operators")}(data => ${decode}))`;
    }
  }

  if (errorHandler) {
    let tryBlock = decode;
    if (!options.rpcAfterResponse) {
      tryBlock = code`return ${decode}`;
    }
    return code`promise.then(data => { ${tryCatchBlock(
      tryBlock,
      code`return Promise.reject(error);`,
    )}}).catch((error) => { ${errorHandler} })`;
  } else if (options.rpcAfterResponse) {
    return code`promise.then(data => { ${decode} } )`;
  }
  return code`promise.then(data => ${decode})`;
}

export function generateServiceClientImpl(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];

  // Determine information about the service.
  const { name } = serviceDesc;
  const serviceName = maybePrefixPackage(fileDesc, serviceDesc.name);

  // Define the service name constant.
  const serviceNameConst = `${name}ServiceName`;
  chunks.push(code`export const ${serviceNameConst} = "${serviceName}";`);

  // Define the FooServiceImpl class
  const i = options.context ? `${name}<Context>` : name;
  const t = options.context ? `<${contextTypeVar}>` : "";
  chunks.push(code`export class ${name}ClientImpl${t} implements ${def(i)} {`);

  // Create the constructor(rpc: Rpc)
  const rpcType = options.context ? "Rpc<Context>" : "Rpc";
  chunks.push(code`private readonly rpc: ${rpcType};`);
  chunks.push(code`private readonly service: string;`);
  chunks.push(code`constructor(rpc: ${rpcType}, opts?: {service?: string}) {`);
  chunks.push(code`this.service = opts?.service || ${serviceNameConst};`);
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
      chunks.push(generateRegularRpcMethod(ctx, methodDesc));
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

  const { options } = ctx;

  const hash = options.esModuleInterop ? imp("hash=object-hash") : imp("hash*object-hash");
  const dataloader = options.esModuleInterop ? imp("DataLoader=dataloader") : imp("DataLoader*dataloader");

  // Create the `(keys) => ...` lambda we'll pass to the DataLoader constructor
  const lambda: Code[] = [];
  lambda.push(code`
    (${inputFieldName}) => {
      const request = { ${inputFieldName} };
  `);
  if (mapType) {
    // If the return type is a map, lookup each key in the result
    lambda.push(code`
      return this.${methodDesc.formattedName}(ctx, request as any).then(res => {
        return ${inputFieldName}.map(key => res.${outputFieldName}[key] ?? ${ctx.utils.fail}())
      });
    `);
  } else {
    // Otherwise assume they come back in order
    lambda.push(code`
      return this.${methodDesc.formattedName}(ctx, request as any).then(res => res.${outputFieldName})
    `);
  }
  lambda.push(code`}`);

  return code`
    ${singleMethodName}(
      ctx: Context,
      ${singular(inputFieldName)}: ${inputType}
    ): Promise<${outputType}> {
      const dl = ctx.getDataLoader("${uniqueIdentifier}", () => {
        return new ${dataloader}<${inputType}, ${outputType}, string>(
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
  methodDesc: MethodDescriptorProto,
): Code {
  assertInstanceOf(methodDesc, FormattedMethodDescriptor);

  const { options } = ctx;

  const hash = options.esModuleInterop ? imp("hash=object-hash") : imp("hash*object-hash");
  const dataloader = options.esModuleInterop ? imp("DataLoader=dataloader") : imp("DataLoader*dataloader");

  const inputType = requestType(ctx, methodDesc);
  const outputType = responseType(ctx, methodDesc);
  const uniqueIdentifier = `${maybePrefixPackage(fileDesc, serviceDesc.name)}.${methodDesc.name}`;
  const Reader = impFile(ctx.options, "Reader@protobufjs/minimal");
  const lambda = code`
    (requests) => {
      const responses = requests.map(async request => {
        const data = ${inputType}.encode(request).finish()
        const response = await this.rpc.request(ctx, "${maybePrefixPackage(fileDesc, serviceDesc.name)}", "${
    methodDesc.name
  }", data);
        return ${outputType}.decode(${Reader}.create(response));
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
        return new ${dataloader}<${inputType}, ${outputType}, string>(
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
 * This also requires clientStreamingRequest, serverStreamingRequest and
 * bidirectionalStreamingRequest methods if any of the RPCs is streaming.
 *
 * We don't export this because if a project uses multiple `*.proto` files,
 * we don't want our the barrel imports in `index.ts` to have multiple `Rpc`
 * types.
 */
export function generateRpcType(ctx: Context, hasStreamingMethods: boolean): Code {
  const { options } = ctx;
  const maybeContext = options.context ? "<Context>" : "";
  const maybeContextParam = options.context ? "ctx: Context," : "";
  const maybeAbortSignalParam = options.useAbortSignal ? "abortSignal?: AbortSignal," : "";
  const methods = [[code`request`, code`Uint8Array`, code`Promise<Uint8Array>`]];
  const additionalMethods = [];
  if (options.rpcBeforeRequest) {
    additionalMethods.push(
      code`beforeRequest?<T extends { [k in keyof T]: unknown }>(service: string, method: string, request: T): void;`,
    );
  }
  if (options.rpcAfterResponse) {
    additionalMethods.push(
      code`afterResponse?<T extends { [k in keyof T]: unknown }>(service: string, method: string, response: T): void;`,
    );
  }
  if (options.rpcErrorHandler) {
    additionalMethods.push(code`handleError?(service: string, method: string, error: Error): Error;`);
  }

  if (hasStreamingMethods) {
    const observable = observableType(ctx, true);
    methods.push([code`clientStreamingRequest`, code`${observable}<Uint8Array>`, code`Promise<Uint8Array>`]);
    methods.push([code`serverStreamingRequest`, code`Uint8Array`, code`${observable}<Uint8Array>`]);
    methods.push([
      code`bidirectionalStreamingRequest`,
      code`${observable}<Uint8Array>`,
      code`${observable}<Uint8Array>`,
    ]);
  }
  const chunks: Code[] = [];
  chunks.push(code`    interface Rpc${maybeContext} {`);
  methods.forEach((method) => {
    chunks.push(code`
      ${method[0]}(
        ${maybeContextParam}
        service: string,
        method: string,
        data: ${method[1]},
        ${maybeAbortSignalParam}
      ): ${method[2]};`);
  });
  additionalMethods.forEach((method) => chunks.push(method));
  chunks.push(code`    }`);
  return joinCode(chunks, { on: "\n" });
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
