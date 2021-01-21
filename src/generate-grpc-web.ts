import { google } from '../build/pbjs';
import { Options } from './main';
import { requestType, responseObservable, responsePromise, responseType, TypeMap } from './types';
import { Code, code, imp, joinCode } from 'ts-poet';
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;

const grpc = imp('grpc@@improbable-eng/grpc-web');
const UnaryMethodDefinition = imp('UnaryMethodDefinition@@improbable-eng/grpc-web/dist/typings/service');
const share = imp('share@rxjs/operators');
const take = imp('take@rxjs/operators');
const BrowserHeaders = imp('BrowserHeaders@browser-headers');
const Observable = imp('Observable@rxjs');
const GrpcCode = imp('Code@@improbable-eng/grpc-web/dist/typings/Code');

/** Generates a client that uses the `@improbable-web/grpc-web` library. */
export function generateGrpcClientImpl(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  options: Options
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
      this.rpc = rpc;
    }
  `);

  // Create a method for each FooService method
  for (const methodDesc of serviceDesc.method) {
    chunks.push(generateRpcMethod(options, typeMap, serviceDesc, methodDesc));
  }

  chunks.push(code`}`);
  return joinCode(chunks, { trim: false });
}

/** Creates the RPC methods that client code actually calls. */
function generateRpcMethod(
  options: Options,
  typeMap: TypeMap,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
) {
  const inputType = requestType(typeMap, methodDesc, options);
  const partialInputType = code`DeepPartial<${inputType}>`;
  const returns =
    options.returnObservable || methodDesc.serverStreaming
      ? responseObservable(typeMap, methodDesc, options)
      : responsePromise(typeMap, methodDesc, options);
  const method = methodDesc.serverStreaming ? 'invoke' : 'unary';
  return code`
    ${methodDesc.name}(
      request: ${partialInputType},
      metadata?: grpc.Metadata,
    ): ${returns} {
      return this.rpc.${method}(
        ${methodDescName(serviceDesc, methodDesc)},
        ${inputType}.fromPartial(request),
        metadata,
      );
    }
  `;
}

/** Creates the service descriptor that grpc-web needs at runtime. */
export function generateGrpcServiceDesc(fileDesc: FileDescriptorProto, serviceDesc: ServiceDescriptorProto): Code {
  return code`
    export const ${serviceDesc.name}Desc = {
      serviceName: "${fileDesc.package}.${serviceDesc.name}",
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
  options: Options,
  typeMap: TypeMap,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): Code {
  const inputType = requestType(typeMap, methodDesc, options);
  const outputType = responseType(typeMap, methodDesc, options);

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

  return code`
    export const ${methodDescName(serviceDesc, methodDesc)}: UnaryMethodDefinitionish = {
      methodName: "${methodDesc.name}",
      service: ${serviceDesc.name}Desc,
      requestStream: false,
      responseStream: ${methodDesc.serverStreaming ? 'true' : 'false'},
      requestType: ${requestFn} as any,
      responseType: ${responseFn} as any,
    };
  `;
}

function methodDescName(serviceDesc: ServiceDescriptorProto, methodDesc: MethodDescriptorProto): string {
  return `${serviceDesc.name}${methodDesc.name}Desc`;
}

/** Adds misc top-level definitions for grpc-web functionality. */
export function addGrpcWebMisc(options: Options, hasStreamingMethods: boolean): Code {
  const chunks: Code[] = [];
  chunks.push(code`
    interface UnaryMethodDefinitionishR extends ${UnaryMethodDefinition}<any, any> { requestStream: any; responseStream: any; }
  `);
  chunks.push(code`type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;`);
  chunks.push(generateGrpcWebRpcType(options.returnObservable, hasStreamingMethods));
  chunks.push(generateGrpcWebImpl(options.returnObservable, hasStreamingMethods));
  return joinCode(chunks, { on: '\n\n' });
}

/** Makes an `Rpc` interface to decouple from the low-level grpc-web `grpc.invoke and grpc.unary`/etc. methods. */
function generateGrpcWebRpcType(returnObservable: boolean, hasStreamingMethods: boolean): Code {
  const chunks: Code[] = [];

  chunks.push(code`interface Rpc {`);

  const wrapper = returnObservable ? Observable : 'Promise';
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
      ): ${Observable}<any>;
    `);
  }

  chunks.push(code`}`);
  return joinCode(chunks);
}

/** Implements the `Rpc` interface by making calls using the `grpc.unary` method. */
function generateGrpcWebImpl(returnObservable: boolean, hasStreamingMethods: boolean): Code {
  const options = code`
    {
      transport?: grpc.TransportFactory,
      ${hasStreamingMethods ? 'streamingTransport?: grpc.TransportFactory,' : ``}
      debug?: boolean,
      metadata?: grpc.Metadata,
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
    chunks.push(createObservableUnaryMethod());
  } else {
    chunks.push(createPromiseUnaryMethod());
  }

  if (hasStreamingMethods) {
    chunks.push(createInvokeMethod());
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

function createObservableUnaryMethod(): Code {
  return code`
    unary<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      _request: any,
      metadata: grpc.Metadata | undefined
    ): ${Observable}<any> {
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

function createInvokeMethod() {
  return code`
    invoke<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      _request: any,
      metadata: grpc.Metadata | undefined
    ): ${Observable}<any> {
      // Status Response Codes (https://developers.google.com/maps-booking/reference/grpc-api/status_codes)
      const upStreamCodes = [2, 4, 8, 9, 10, 13, 14, 15]; 
      const DEFAULT_TIMEOUT_TIME: number = 3_000;
      const request = { ..._request, ...methodDesc.requestType };
      const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new ${BrowserHeaders}({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
      return new Observable(observer => {
        const upStream = (() => {
          ${grpc}.invoke(methodDesc, {
            host: this.host,
            request,
            transport: this.options.streamingTransport || this.options.transport,
            metadata: maybeCombinedMetadata,
            debug: this.options.debug,
            onMessage: (next) => observer.next(next),
            onEnd: (code: ${GrpcCode}, message: string) => {
              if (code === 0) {
                observer.complete();
              } else if (upStreamCodes.includes(code)) {
                setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
              } else {
                observer.error(new Error(\`Error \${code} \${message}\`));
              }
            },
          });
        });
        upStream();
      }).pipe(${share}());
    }
  `;
}
