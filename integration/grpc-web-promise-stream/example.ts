/* eslint-disable */
import { grpc } from '@improbable-eng/grpc-web';
import { Empty } from './google/protobuf/empty';
import { BrowserHeaders } from 'browser-headers';
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
  PingEmpty(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<PingResponse>;
  Ping(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Promise<PingResponse>;
  PingError(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  PingList(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Promise<GrpcWebResponseStream<PingResponse>>;
  PingPongBidi(options?: {
    metadata?: grpc.Metadata;
    rpcOptions?: grpc.RpcOptions;
  }): Promise<GrpcWebBidirectionalStream<DeepPartial<PingRequest>, PingResponse>>;
  PingStream(options?: {
    metadata?: grpc.Metadata;
    rpcOptions?: grpc.RpcOptions;
  }): Promise<GrpcWebBidirectionalStream<DeepPartial<PingRequest>, PingResponse>>;
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

  PingEmpty(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<PingResponse> {
    return this.rpc.unary(TestServicePingEmptyDesc, Empty.fromPartial(request), metadata);
  }

  Ping(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Promise<PingResponse> {
    return this.rpc.unary(TestServicePingDesc, PingRequest.fromPartial(request), metadata);
  }

  PingError(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(TestServicePingErrorDesc, PingRequest.fromPartial(request), metadata);
  }

  PingList(request: DeepPartial<PingRequest>, metadata?: grpc.Metadata): Promise<GrpcWebResponseStream<PingResponse>> {
    return this.rpc.invoke(TestServicePingListDesc, PingRequest.fromPartial(request), metadata);
  }

  PingPongBidi(options?: {
    metadata?: grpc.Metadata;
    rpcOptions?: grpc.RpcOptions;
  }): Promise<GrpcWebBidirectionalStream<DeepPartial<PingRequest>, PingResponse>> {
    return this.rpc.stream(
      TestServicePingPongBidiDesc,
      PingRequest.fromPartial,
      options?.metadata,
      options?.rpcOptions
    );
  }

  PingStream(options?: {
    metadata?: grpc.Metadata;
    rpcOptions?: grpc.RpcOptions;
  }): Promise<GrpcWebBidirectionalStream<DeepPartial<PingRequest>, PingResponse>> {
    return this.rpc.stream(TestServicePingStreamDesc, PingRequest.fromPartial, options?.metadata, options?.rpcOptions);
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

export type GrpcWebStatus = { details: string; code: number; metadata: grpc.Metadata };
type GrpcWebOnType = 'data' | 'end' | 'status';
type GrpcWebOnDataHandler<T> = (message: T) => void;
type GrpcWebOnEndHandler = (status?: GrpcWebStatus) => void;
type GrpcWebOnStatusHandler = (status: GrpcWebStatus) => void;
type GrpcWebListeners<T> = {
  data: GrpcWebOnDataHandler<T>[];
  end: GrpcWebOnEndHandler[];
  status: GrpcWebOnStatusHandler[];
};
interface GrpcWebResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: GrpcWebOnDataHandler<T>): GrpcWebResponseStream<T>;
  on(type: 'end', handler: GrpcWebOnEndHandler): GrpcWebResponseStream<T>;
  on(type: 'status', handler: GrpcWebOnStatusHandler): GrpcWebResponseStream<T>;
}
interface GrpcWebBidirectionalStream<ReqT, ResT> {
  write(message: ReqT): GrpcWebBidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: GrpcWebOnDataHandler<ResT>): GrpcWebBidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: GrpcWebOnEndHandler): GrpcWebBidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: GrpcWebOnStatusHandler): GrpcWebBidirectionalStream<ReqT, ResT>;
}

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any>;
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<GrpcWebResponseStream<any>>;
  stream<T extends MethodDefinitionish, Req>(
    methodDesc: T,
    fromPartial: (request: any) => Req,
    metadata: grpc.Metadata | undefined,
    rpcOptions: grpc.RpcOptions | undefined
  ): Promise<GrpcWebBidirectionalStream<Req, any>>;
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
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
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

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<GrpcWebResponseStream<any>> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;

    let listeners: GrpcWebListeners<any> = {
      data: [],
      end: [],
      status: [],
    };

    const client = grpc.invoke(methodDesc, {
      host: this.host,
      request,
      transport: this.options.streamingTransport || this.options.transport,
      metadata: maybeCombinedMetadata,
      debug: this.options.debug,
      onMessage: function (message) {
        listeners.data.forEach(function (handler) {
          handler(message);
        });
      },
      onEnd: function (code: grpc.Code, message: string, trailers: grpc.Metadata) {
        listeners.status.forEach(function (handler) {
          handler({ code, details: message, metadata: trailers });
        });
        listeners.end.forEach(function (handler) {
          handler({ code, details: message, metadata: trailers });
        });
        listeners = { data: [], end: [], status: [] };
      },
    });

    const invoke: GrpcWebResponseStream<any> = {
      on: function (
        listenType: GrpcWebOnType,
        hanlder: GrpcWebOnDataHandler<any> | GrpcWebOnEndHandler | GrpcWebOnStatusHandler
      ) {
        listeners[listenType].push(hanlder);
        return this;
      },
      cancel: function () {
        listeners = { data: [], end: [], status: [] };
        client.close();
      },
    };
    return Promise.resolve(invoke);
  }

  stream<T extends MethodDefinitionish, Req>(
    methodDesc: T,
    fromPartial: (request: DeepPartial<Req>) => any,
    metadata: grpc.Metadata | undefined,
    rpcOptions: grpc.RpcOptions | undefined
  ): Promise<GrpcWebBidirectionalStream<DeepPartial<Req>, any>> {
    const defaultOptions = {
      host: this.host,
      debug: rpcOptions?.debug || this.options.debug,
      transport: rpcOptions?.transport || this.options.streamingTransport || this.options.transport,
    };

    let listeners: GrpcWebListeners<any> = {
      data: [],
      end: [],
      status: [],
    };

    const client = grpc.client(methodDesc, defaultOptions);
    client.onMessage(function (message) {
      listeners.data.forEach(function (handler) {
        handler(message);
      });
    });
    client.onEnd(function (code: grpc.Code, message: string, trailers: grpc.Metadata) {
      listeners.status.forEach(function (handler) {
        handler({ code, details: message, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code, details: message, metadata: trailers });
      });
      listeners = { data: [], end: [], status: [] };
    });

    client.start(metadata);

    const bidi: GrpcWebBidirectionalStream<DeepPartial<Req>, any> = {
      on: function (
        listenType: GrpcWebOnType,
        hanlder: GrpcWebOnDataHandler<any> | GrpcWebOnEndHandler | GrpcWebOnStatusHandler
      ) {
        listeners[listenType].push(hanlder);
        return this;
      },
      write: function (message: DeepPartial<Req>) {
        const request = fromPartial(message);
        client.send({ ...request, ...methodDesc.requestType });
        return this;
      },
      end: function () {
        client.finishSend();
      },
      cancel: function () {
        listeners = { data: [], end: [], status: [] };
        client.close();
      },
    };
    return Promise.resolve(bidi);
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
