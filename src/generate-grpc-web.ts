import { MethodDescriptorProto, FileDescriptorProto, ServiceDescriptorProto } from 'ts-proto-descriptors';
import { rawRequestType, requestType, responsePromiseOrObservable, responseType, observableType } from './types';
import { Code, code, imp, joinCode } from 'ts-poet';
import { Context } from './context';
import { assertInstanceOf, FormattedMethodDescriptor, maybePrefixPackage } from './utils';

const grpc = imp('grpc@@improbable-eng/grpc-web');
const share = imp('share@rxjs/operators');
const take = imp('take@rxjs/operators');
const BrowserHeaders = imp('BrowserHeaders@browser-headers');

/** Generates a client that uses the `@improbable-web/grpc-web` library. */
export function generateGrpcClientImpl(
  ctx: Context,
  _fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto
): Code {
  const chunks: Code[] = [];

  // Define the FooServiceImpl class
  chunks.push(code`
    export class ${serviceDesc.name}ClientImpl implements ${serviceDesc.name} {
  `);

  // Create the constructor(rpc: Rpc)
  chunks.push(code`
    private readonly rpc: Rpc;

    constructor(rpc: Rpc) {
  `);
  chunks.push(code`this.rpc = rpc;`);
  // Bind each FooService method to the FooServiceImpl class
  for (const methodDesc of serviceDesc.method) {
    assertInstanceOf(methodDesc, FormattedMethodDescriptor);
    chunks.push(code`this.${methodDesc.formattedName} = this.${methodDesc.formattedName}.bind(this);`);
  }
  chunks.push(code`}`);

  // Create a method for each FooService method
  for (const methodDesc of serviceDesc.method) {
    chunks.push(generateRpcMethod(ctx, serviceDesc, methodDesc));
  }

  chunks.push(code`}`);
  return joinCode(chunks, { trim: false, on: '\n' });
}

/** Creates the RPC methods that client code actually calls. */
function generateRpcMethod(ctx: Context, serviceDesc: ServiceDescriptorProto, methodDesc: MethodDescriptorProto) {
  assertInstanceOf(methodDesc, FormattedMethodDescriptor);
  const requestMessage = rawRequestType(ctx, methodDesc);
  const inputType = requestType(ctx, methodDesc, true);
  const returns = responsePromiseOrObservable(ctx, methodDesc, true);

  if (methodDesc.clientStreaming) {
    return code`
    ${methodDesc.formattedName}(
      request: ${inputType},
      options?: {
        metadata?: grpc.Metadata,
        rpcOptions?: grpc.RpcOptions,
    }): ${returns} {
      return this.rpc.stream(${methodDescName(
        serviceDesc,
        methodDesc
      )}, request, options?.metadata, options?.rpcOptions)
    }
  `;
  }

  const method = methodDesc.serverStreaming ? 'invoke' : 'unary';
  return code`
    ${methodDesc.formattedName}(
      request: ${inputType},
      metadata?: grpc.Metadata,
    ): ${returns} {
      return this.rpc.${method}(
        ${methodDescName(serviceDesc, methodDesc)},
        ${requestMessage}.fromPartial(request),
        metadata,
      );
    }
  `;
}

/** Creates the service descriptor that grpc-web needs at runtime. */
export function generateGrpcServiceDesc(fileDesc: FileDescriptorProto, serviceDesc: ServiceDescriptorProto): Code {
  return code`
    export const ${serviceDesc.name}Desc = {
      serviceName: "${maybePrefixPackage(fileDesc, serviceDesc.name)}",
    };
  `;
}

/**
 * Creates the method descriptor that grpc-web needs at runtime to make `unary` calls.
 *
 * Note that we take a few liberties in the implementation give we don't 100% match
 * what grpc-web's existing output is, but it works out; see comments in the method
 * implementation.
 */
export function generateGrpcMethodDesc(
  ctx: Context,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): Code {
  const inputType = rawRequestType(ctx, methodDesc);
  const outputType = responseType(ctx, methodDesc);

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
  const requestFn = code`{
    serializeBinary() {
      return ${inputType}.encode(this).finish();
    },
  }`;

  // grpc-web also expects this to be a class, but with a static `deserializeBinary` method to
  // create new instances of messages. We again don't have an actual class constructor/symbol
  // to pass to it, but we can make up a lambda that has a `deserializeBinary` that does what
  // we want/what grpc-web's runtime needs.
  const responseFn = code`{
    deserializeBinary(data: Uint8Array) {
      return { ...${outputType}.decode(data), toObject() { return this; } };
    }
}`;

  const streaming = methodDesc.clientStreaming || methodDesc.serverStreaming;
  const methodDef = streaming ? 'MethodDefinitionish' : 'UnaryMethodDefinitionish';

  return code`
    export const ${methodDescName(serviceDesc, methodDesc)}: ${methodDef} = {
      methodName: "${methodDesc.name}",
      service: ${serviceDesc.name}Desc,
      requestStream: ${methodDesc.clientStreaming ? true : false},
      responseStream: ${methodDesc.serverStreaming ? true : false},
      requestType: ${requestFn} as any,
      responseType: ${responseFn} as any,
    };
  `;
}

function methodDescName(serviceDesc: ServiceDescriptorProto, methodDesc: MethodDescriptorProto): string {
  return `${serviceDesc.name}${methodDesc.name}Desc`;
}

/** Adds misc top-level definitions for grpc-web functionality. */
export function addGrpcWebMisc(ctx: Context, hasStreamingMethods: boolean): Code {
  const { options } = ctx;
  const chunks: Code[] = [];
  chunks.push(code`
    interface UnaryMethodDefinitionishR extends ${grpc}.UnaryMethodDefinition<any, any> { requestStream: any; responseStream: any; }
  `);
  chunks.push(code`type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;`);

  chunks.push(code`
    interface MethodDefinitionishR extends ${grpc}.MethodDefinition<any, any> { requestStream: any; responseStream: any; }
`);
  chunks.push(code`type MethodDefinitionish = MethodDefinitionishR;`);

  chunks.push(generateGrpcWebRpcType(ctx, options.returnObservable, hasStreamingMethods));
  chunks.push(generateGrpcWebImpl(ctx, options.returnObservable, hasStreamingMethods));
  return joinCode(chunks, { on: '\n\n' });
}

/** Makes an `Rpc` interface to decouple from the low-level grpc-web `grpc.invoke and grpc.unary`/etc. methods. */
function generateGrpcWebRpcType(ctx: Context, returnObservable: boolean, hasStreamingMethods: boolean): Code {
  const chunks: Code[] = [];

  chunks.push(code`interface Rpc {`);

  const wrapper = returnObservable ? observableType(ctx) : 'Promise';
  chunks.push(code`
    unary<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      request: any,
      metadata: grpc.Metadata | undefined,
    ): ${wrapper}<any>;
  `);

  if (hasStreamingMethods) {
    chunks.push(code`
      invoke<T extends UnaryMethodDefinitionish>(
        methodDesc: T,
        request: any,
        metadata: grpc.Metadata | undefined,
      ): ${observableType(ctx)}<any>;`);

    chunks.push(code`
  stream<T extends MethodDefinitionish>(
    methodDesc: T,
    request: ${observableType(ctx)}<any>,
    metadata: grpc.Metadata | undefined,
    rpcOptions: grpc.RpcOptions | undefined
  ): ${observableType(ctx)}<any>;`);
  }

  chunks.push(code`}`);
  return joinCode(chunks, { on: '\n' });
}

/** Implements the `Rpc` interface by making calls using the `grpc.unary` method. */
function generateGrpcWebImpl(ctx: Context, returnObservable: boolean, hasStreamingMethods: boolean): Code {
  const options = code`
    {
      transport?: grpc.TransportFactory,
      ${hasStreamingMethods ? 'streamingTransport?: grpc.TransportFactory,' : ``}
      debug?: boolean,
      metadata?: grpc.Metadata,
      upStreamRetryCodes?: number[],
    }
  `;

  const chunks: Code[] = [];
  chunks.push(code`
    export class GrpcWebImpl {
      private host: string;
      private options: ${options};

      constructor(host: string, options: ${options}) {
        this.host = host;
        this.options = options;
      }
  `);

  if (returnObservable) {
    chunks.push(createObservableUnaryMethod(ctx));
  } else {
    chunks.push(createPromiseUnaryMethod());
  }

  if (hasStreamingMethods) {
    chunks.push(createInvokeMethod(ctx));
    chunks.push(createStreamMethod(ctx));
  }

  chunks.push(code`}`);
  return joinCode(chunks, { trim: false });
}

function createPromiseUnaryMethod(): Code {
  return code`
    unary<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      _request: any,
      metadata: grpc.Metadata | undefined
    ): Promise<any> {
      const request = { ..._request, ...methodDesc.requestType };
      const maybeCombinedMetadata =
        metadata && this.options.metadata
          ? new ${BrowserHeaders}({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
          : metadata || this.options.metadata;
      return new Promise((resolve, reject) => {
      ${grpc}.unary(methodDesc, {
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
    }
  `;
}

function createObservableUnaryMethod(ctx: Context): Code {
  return code`
    unary<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      _request: any,
      metadata: grpc.Metadata | undefined
    ): ${observableType(ctx)}<any> {
      const request = { ..._request, ...methodDesc.requestType };
      const maybeCombinedMetadata =
        metadata && this.options.metadata
          ? new ${BrowserHeaders}({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
          : metadata || this.options.metadata;
      return new Observable(observer => {
        ${grpc}.unary(methodDesc, {
          request,
          host: this.host,
          metadata: maybeCombinedMetadata,
          transport: this.options.transport,
          debug: this.options.debug,
          onEnd: (next) => {
            if (next.status !== 0) {
              observer.error({ code: next.status, message: next.statusMessage });
            } else {
              observer.next(next.message as any);
              observer.complete();
            }
          },
        });
      }).pipe(${take}(1));
    }
  `;
}

function createInvokeMethod(ctx: Context) {
  return code`
    invoke<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      _request: any,
      metadata: grpc.Metadata | undefined
    ): ${observableType(ctx)}<any> {
      const upStreamCodes = this.options.upStreamRetryCodes || [];
      const DEFAULT_TIMEOUT_TIME: number = 3_000;
      const request = { ..._request, ...methodDesc.requestType };
      const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new ${BrowserHeaders}({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
      return new Observable(observer => {
        const upStream = (() => {
          const client = ${grpc}.invoke(methodDesc, {
            host: this.host,
            request,
            transport: this.options.streamingTransport || this.options.transport,
            metadata: maybeCombinedMetadata,
            debug: this.options.debug,
            onMessage: (next) => observer.next(next),
            onEnd: (code: ${grpc}.Code, message: string, trailers: ${grpc}.Metadata) => {
              if (code === 0) {
                observer.complete();
              } else if (upStreamCodes.includes(code)) {
                setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
              } else {
                const err = new Error(message) as any;
                err.code = code;
                err.metadata = trailers;
                observer.error(err);
              }
            },
          });
          observer.add(() => client.close());
        });
        upStream();
      }).pipe(${share}());
    }
  `;
}

function createStreamMethod(ctx: Context) {
  return code`
  stream<T extends MethodDefinitionish>(
    methodDesc: T,
    _request: ${observableType(ctx)}<any>,
    metadata: ${grpc}.Metadata | undefined,
    rpcOptions: ${grpc}.RpcOptions | undefined
  ): ${observableType(ctx)}<any> {
    const defaultOptions = {
      host: this.host,
      debug: rpcOptions?.debug || this.options.debug,
      transport: rpcOptions?.transport || this.options.streamingTransport || this.options.transport,
    }

    let started = false;
    const client = ${grpc}.client(methodDesc, defaultOptions);

    const subscription = _request.subscribe((_req: any) => {
      const request = { ..._req, ...methodDesc.requestType };
      if (!started) {
        client.start(metadata);
        started = true;
      }
      client.send(request);
    })

    subscription.add(() => {
      client.finishSend();
    })

    return new Observable((observer) => {
      client.onEnd((code: ${grpc}.Code, message: string, trailers: ${grpc}.Metadata) => {
        subscription.unsubscribe();
        if (code === 0) {
          observer.complete();
        } else {
          observer.error(new Error(\`Error \${code} \${message}\`));
        }
      })
      client.onMessage((res: any) => {
        observer.next(res);
      })
      observer.add(() => client.close())
    }).pipe(share());
  }
`;
}
