/* eslint-disable */
import { grpc } from '@improbable-eng/grpc-web';
import { Empty } from './google/protobuf/empty';
import { BrowserHeaders } from 'browser-headers';
import { take, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'rpx';

export interface PingRequest {
  value: string;
}

export interface PingResponse {
  value: string;
}

function createBasePingRequest(): PingRequest {
  return { value: '' };
}

export const PingRequest = {
  encode(message: PingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== '') {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PingRequest {
    return {
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: PingRequest): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PingRequest>, I>>(object: I): PingRequest {
    const message = createBasePingRequest();
    message.value = object.value ?? '';
    return message;
  },
};

function createBasePingResponse(): PingResponse {
  return { value: '' };
}

export const PingResponse = {
  encode(message: PingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== '') {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PingResponse {
    return {
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PingResponse>, I>>(object: I): PingResponse {
    const message = createBasePingResponse();
    message.value = object.value ?? '';
    return message;
  },
};

export interface TestService {
  PingEmpty(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Observable<PingResponse>;
  Ping(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Observable<PingResponse>;
  PingError(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Observable<Empty>;
  PingList(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Observable<PingResponse>;
  PingPongBidi(
    request: Observable<DeepPartial<PingRequest>>,
    options?: {
      metadata?: grpc.Metadata;
      rpcOptions?: grpc.RpcOptions;
    }
  ): Observable<PingResponse>;
  PingStream(
    request: Observable<DeepPartial<PingRequest>>,
    options?: {
      metadata?: grpc.Metadata;
      rpcOptions?: grpc.RpcOptions;
    }
  ): Observable<PingResponse>;
}

export class TestServiceClientImpl implements TestService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.PingEmpty = this.PingEmpty.bind(this);
    this.Ping = this.Ping.bind(this);
    this.PingError = this.PingError.bind(this);
    this.PingList = this.PingList.bind(this);
    this.PingPongBidi = this.PingPongBidi.bind(this);
    this.PingStream = this.PingStream.bind(this);
  }

  PingEmpty(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Observable<PingResponse> {
    return this.rpc.unary(TestServicePingEmptyDesc, Empty.fromPartial(request), metadata);
  }

  Ping(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Observable<PingResponse> {
    return this.rpc.unary(TestServicePingDesc, PingRequest.fromPartial(request), metadata);
  }

  PingError(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Observable<Empty> {
    return this.rpc.unary(TestServicePingErrorDesc, PingRequest.fromPartial(request), metadata);
  }

  PingList(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Observable<PingResponse> {
    return this.rpc.invoke(TestServicePingListDesc, PingRequest.fromPartial(request), metadata);
  }

  PingPongBidi(
    request: Observable<DeepPartial<PingRequest>>,
    options?: {
      metadata?: grpc.Metadata;
      rpcOptions?: grpc.RpcOptions;
    }
  ): Observable<PingResponse> {
    return this.rpc.stream(TestServicePingPongBidiDesc, request, options?.metadata, options?.rpcOptions);
  }

  PingStream(
    request: Observable<DeepPartial<PingRequest>>,
    options?: {
      metadata?: grpc.Metadata;
      rpcOptions?: grpc.RpcOptions;
    }
  ): Observable<PingResponse> {
    return this.rpc.stream(TestServicePingStreamDesc, request, options?.metadata, options?.rpcOptions);
  }
}

export const TestServiceDesc = {
  serviceName: 'rpx.TestService',
};

export const TestServicePingEmptyDesc: UnaryMethodDefinitionish = {
  methodName: 'PingEmpty',
  service: TestServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...PingResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const TestServicePingDesc: UnaryMethodDefinitionish = {
  methodName: 'Ping',
  service: TestServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return PingRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...PingResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const TestServicePingErrorDesc: UnaryMethodDefinitionish = {
  methodName: 'PingError',
  service: TestServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return PingRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...Empty.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const TestServicePingListDesc: MethodDefinitionish = {
  methodName: 'PingList',
  service: TestServiceDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return PingRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...PingResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const TestServicePingPongBidiDesc: MethodDefinitionish = {
  methodName: 'PingPongBidi',
  service: TestServiceDesc,
  requestStream: true,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return PingRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...PingResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const TestServicePingStreamDesc: MethodDefinitionish = {
  methodName: 'PingStream',
  service: TestServiceDesc,
  requestStream: true,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return PingRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...PingResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface MethodDefinitionishR extends grpc.MethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type MethodDefinitionish = MethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Observable<any>;
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Observable<any>;
  stream<T extends MethodDefinitionish>(
    methodDesc: T,
    request: Observable<any>,
    metadata: grpc.Metadata | undefined,
    rpcOptions: grpc.RpcOptions | undefined
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    }
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Observable<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
    return new Observable((observer) => {
      grpc.unary(methodDesc, {
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
    }).pipe(take(1));
  }

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Observable<any> {
    const upStreamCodes = this.options.upStreamRetryCodes || [];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
    return new Observable((observer) => {
      const upStream = () => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          transport: this.options.streamingTransport || this.options.transport,
          metadata: maybeCombinedMetadata,
          debug: this.options.debug,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string, trailers: grpc.Metadata) => {
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
      };
      upStream();
    }).pipe(share());
  }

  stream<T extends MethodDefinitionish>(
    methodDesc: T,
    _request: Observable<any>,
    metadata: grpc.Metadata | undefined,
    rpcOptions: grpc.RpcOptions | undefined
  ): Observable<any> {
    const defaultOptions = {
      host: this.host,
      debug: rpcOptions?.debug || this.options.debug,
      transport: rpcOptions?.transport || this.options.streamingTransport || this.options.transport,
    };

    let started = false;
    const client = grpc.client(methodDesc, defaultOptions);

    const subscription = _request.subscribe((_req: any) => {
      const request = { ..._req, ...methodDesc.requestType };
      if (!started) {
        client.start(metadata);
        started = true;
      }
      client.send(request);
    });

    subscription.add(() => {
      client.finishSend();
    });

    return new Observable((observer) => {
      client.onEnd((code: grpc.Code, message: string, trailers: grpc.Metadata) => {
        subscription.unsubscribe();
        if (code === 0) {
          observer.complete();
        } else {
          observer.error(new Error(`Error ${code} ${message}`));
        }
      });
      client.onMessage((res: any) => {
        observer.next(res);
      });
      observer.add(() => client.close());
    }).pipe(share());
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
