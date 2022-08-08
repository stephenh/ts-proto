/* eslint-disable */
import { Empty } from './google/protobuf/empty';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'rpx';

export interface PingRequest {
  value: string;
}

export interface PingResponse {
  Value: string;
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
  return { Value: '' };
}

export const PingResponse = {
  encode(message: PingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Value !== '') {
      writer.uint32(10).string(message.Value);
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
          message.Value = reader.string();
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
      Value: isSet(object.Value) ? String(object.Value) : '',
    };
  },

  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    message.Value !== undefined && (obj.Value = message.Value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PingResponse>, I>>(object: I): PingResponse {
    const message = createBasePingResponse();
    message.Value = object.Value ?? '';
    return message;
  },
};

export interface TestService {
  PingEmpty(request: Empty): Promise<PingResponse>;
  Ping(request: PingRequest): Promise<PingResponse>;
  PingError(request: PingRequest): Promise<Empty>;
  PingList(request: PingRequest): Observable<PingResponse>;
  PingPongBidi(request: Observable<PingRequest>): Observable<PingResponse>;
  PingStream(request: Observable<PingRequest>): Promise<PingResponse>;
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
  PingEmpty(request: Empty): Promise<PingResponse> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request('rpx.TestService', 'PingEmpty', data);
    return promise.then((data) => PingResponse.decode(new _m0.Reader(data)));
  }

  Ping(request: PingRequest): Promise<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const promise = this.rpc.request('rpx.TestService', 'Ping', data);
    return promise.then((data) => PingResponse.decode(new _m0.Reader(data)));
  }

  PingError(request: PingRequest): Promise<Empty> {
    const data = PingRequest.encode(request).finish();
    const promise = this.rpc.request('rpx.TestService', 'PingError', data);
    return promise.then((data) => Empty.decode(new _m0.Reader(data)));
  }

  PingList(request: PingRequest): Observable<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest('rpx.TestService', 'PingList', data);
    return result.pipe(map((data) => PingResponse.decode(new _m0.Reader(data))));
  }

  PingPongBidi(request: Observable<PingRequest>): Observable<PingResponse> {
    const data = request.pipe(map((request) => PingRequest.encode(request).finish()));
    const result = this.rpc.bidirectionalStreamingRequest('rpx.TestService', 'PingPongBidi', data);
    return result.pipe(map((data) => PingResponse.decode(new _m0.Reader(data))));
  }

  PingStream(request: Observable<PingRequest>): Promise<PingResponse> {
    const data = request.pipe(map((request) => PingRequest.encode(request).finish()));
    const promise = this.rpc.clientStreamingRequest('rpx.TestService', 'PingStream', data);
    return promise.then((data) => PingResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
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
