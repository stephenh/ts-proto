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
  arrowFunction,
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

  maybeAddComment(options, sourceInfo, chunks, serviceDesc.options?.deprecated);
  const maybeTypeVar = options.context ? `<${contextTypeVar}>` : "";
  chunks.push(code`export interface ${def(serviceDesc.name)}${maybeTypeVar} {`);

  serviceDesc.method.forEach((methodDesc, index) => {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);
    const info = sourceInfo.lookup(Fields.service.method, index);
    maybeAddComment(options, info, chunks, methodDesc.options?.deprecated);

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
    } else if (options.metadataType) {
      // custom `metadataType` has precedence over `addGrpcMetadata` that injects Metadata from grpc-js
      const Metadata = imp(options.metadataType);
      params.push(code`metadata?: ${Metadata}`);
    } else if (options.addGrpcMetadata) {
      const Metadata = imp("Metadata@@grpc/grpc-js");
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
  const metadataType = options.metadataType ? imp(options.metadataType) : imp("Metadata@@grpc/grpc-js");

  const params = [
    ...(options.context ? [code`ctx: Context`] : []),
    code`request: ${inputType}`,
    ...(options.metadataType || options.addGrpcMetadata ? [code`metadata?: ${metadataType}`] : []),
    ...(options.useAbortSignal ? [code`abortSignal?: AbortSignal`] : []),
  ];
  const maybeCtx = options.context ? "ctx," : "";
  const maybeMetadata = options.addGrpcMetadata ? "metadata," : "";
  const maybeAbortSignal = options.useAbortSignal ? "abortSignal || undefined," : "";

  let errorHandler: Code;
  if (options.rpcErrorHandler) {
    errorHandler = code`
      if (this.rpc.handleError) {
        return Promise.reject(this.rpc.handleError(this.service, "${methodDesc.name}", error));
      }
      return Promise.reject(error);
    `;
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

  function generateRpcBody() : Code {
    let encode = code`${rawInputType}.encode(request).finish()`;
    let beforeRequest;
    if (options.rpcBeforeRequest && !methodDesc.clientStreaming) {
      beforeRequest = generateBeforeRequest(methodDesc.name);
    } else if (methodDesc.clientStreaming && options.rpcBeforeRequest) {
      encode = code`{const encodedRequest = ${encode}; ${generateBeforeRequest(
          methodDesc.name,
          "encodedRequest",
      )}; return encodedRequest}`;
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

    return code`      const data = ${encode}; ${beforeRequest ? beforeRequest : ""}
      const ${returnVariable} = this.rpc.${rpcMethod}(
        ${maybeCtx}
        this.service,
        "${methodDesc.name}",
        data,
        ${maybeMetadata}
        ${maybeAbortSignal}
      );
      return ${returnStatement};`
  }

  function generateGenericRpcBody(): Code {
    let beforeRequest = code``;
    let requestParamName = 'request';
    if (options.rpcBeforeRequest) {
      beforeRequest = generateBeforeRequest(methodDesc.name);
      if (methodDesc.clientStreaming) {
        beforeRequest = code`const reqStream = request.pipe(${imp("map@rxjs/operators")}(request => {${beforeRequest} return request;}))`;
        requestParamName = 'reqStream';
      }
    }

    let requestInvocation = code`this.rpc.${rpcMethod}<${rawInputType},${responseType(ctx, methodDesc, {keepValueType: true})}>(
          ${maybeCtx}
          this.service,
          "${methodDesc.name}",
          ${requestParamName},
          ${rawInputType},
          ${responseType(ctx, methodDesc, {keepValueType: true})});`;
      
    let afterRequest = code``;
    if (options.rpcAfterResponse) {
      requestInvocation = code`const response = ${requestInvocation}`;
      afterRequest = code`
      if (this.rpc.afterResponse) {
        this.rpc.afterResponse(this.service, "${methodDesc.name}", response);
      }
      return response;
    `;
      if (methodDesc.serverStreaming) {
        afterRequest = code`return response.pipe(request => {${afterRequest}})`;
      }
    } else {
      requestInvocation = code `return ${requestInvocation}`;
    }

    // if (options.useDate && rawOutputType.toString().includes("Timestamp")) {
    //   decode = code`data => ${utils.fromTimestamp}(${rawOutputType}.decode(${Reader}.create(data)))`;
    // }
    // if (methodDesc.clientStreaming) {
      // if (options.useAsyncIterable) {
      //   encode = code`${rawInputType}.encodeTransform(request)`;
      // } else {
    //   }
    // }

    // const returnStatement = createDefaultServiceReturn(ctx, methodDesc, decode, errorHandler);

    // let returnVariable: string;
    // if (options.returnObservable || methodDesc.serverStreaming) {
    //   returnVariable = "result";
    // } else {
    //   returnVariable = "promise";
    // }

    return code`${beforeRequest}
        ${requestInvocation}
        ${afterRequest}`;
  }
  
  const body = options.outputClientImpl === "generic" ? generateGenericRpcBody() : generateRpcBody();
  return code`
    ${methodDesc.formattedName}(
      ${joinCode(params, { on: "," })}
    ): ${responsePromiseOrObservable(ctx, methodDesc)} {
      ${body}
    }
  `;
}

function generateBeforeRequest(methodName: string, requestVariableName: string = "request") {
  return code`
    if (this.rpc.beforeRequest) {
      this.rpc.beforeRequest(this.service, "${methodName}", ${requestVariableName});
    }`;
}

function createDefaultServiceReturn(
  ctx: Context,
  methodDesc: MethodDescriptorProto,
  decode: Code,
  errorHandler?: Code,
): Code {
  const { options } = ctx;
  const rawOutputType = responseType(ctx, methodDesc, { keepValueType: true });
  const returnStatement = arrowFunction("data", decode, !options.rpcAfterResponse);

  if (options.returnObservable || methodDesc.serverStreaming) {
    if (options.useAsyncIterable) {
      return code`${rawOutputType}.decodeTransform(result)`;
    } else {
      if (errorHandler) {
        const tc = arrowFunction("data", tryCatchBlock(decode, code`throw error`), !options.rpcAfterResponse);
        return code`result.pipe(${imp("map@rxjs/operators")}(${tc}))`;
      }
      return code`result.pipe(${imp("map@rxjs/operators")}(${returnStatement}))`;
    }
  }

  if (errorHandler) {
    if (!options.rpcAfterResponse) {
      decode = code`return ${decode}`;
    }
    return code`promise.then(${arrowFunction(
      "data",
      tryCatchBlock(decode, code`return Promise.reject(error);`),
      false,
    )}).catch(${arrowFunction("error", errorHandler, false)})`;
  }
  return code`promise.then(${returnStatement})`;
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
  const metadata = options.metadataType ? imp(options.metadataType) : imp("Metadata@@grpc/grpc-js");
  const metadataType = metadata.symbol;
  const maybeContext = options.context ? "<Context>" : "";
  const maybeContextParam = options.context ? "ctx: Context," : "";
  const maybeMetadataParam = options.metadataType || options.addGrpcMetadata ? `metadata?: ${metadataType},` : "";
  const maybeAbortSignalParam = options.useAbortSignal ? "abortSignal?: AbortSignal," : "";
  const messageType = impFile(options, "MessageType@./typeRegistry");
  
  const outputGenericClient = options.outputClientImpl === "generic";
  
  const maybeMessageTypeParams = outputGenericClient ? code`reqType: ${messageType}, respType: ${messageType},` : code``;
  const maybeTypeParameters = outputGenericClient  ? "<Req, Res>" : "";
  const requestType = outputGenericClient ? "Req" : "Uint8Array";
  const responseType = outputGenericClient ? "Res" : "Uint8Array";
  const requestParam = outputGenericClient ? "request" : "data";
  
  const methods: Code[][]= [];
  methods.push([code`request${maybeTypeParameters}`, code`${requestType}`, code`Promise<${responseType}>`]);
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
    additionalMethods.push(
      code`handleError?(service: string, method: string, error: globalThis.Error): globalThis.Error;`,
    );
  }

  if (hasStreamingMethods) {
    const observable = observableType(ctx, true);
    methods.push([code`clientStreamingRequest${maybeTypeParameters}`, code`${observable}<${requestType}>`, code`Promise<${responseType}>`]);
    methods.push([code`serverStreamingRequest${maybeTypeParameters}`, code`${requestType}`, code`${observable}<${responseType}>`]);
    methods.push([
      code`bidirectionalStreamingRequest${maybeTypeParameters}`,
      code`${observable}<${requestType}>`,
      code`${observable}<${responseType}>`,
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
        ${requestParam}: ${method[1]},
        ${maybeMessageTypeParams}
        ${maybeMetadataParam}
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
