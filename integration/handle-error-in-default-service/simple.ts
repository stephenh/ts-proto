/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "basic";

export interface GetBasicRequest {
  name: string;
}

export interface GetBasicResponse {
  name: string;
}

function createBaseGetBasicRequest(): GetBasicRequest {
  return { name: "" };
}

export const GetBasicRequest = {
  encode(message: GetBasicRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBasicRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBasicRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBasicRequest {
    return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: GetBasicRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBasicRequest>, I>>(base?: I): GetBasicRequest {
    return GetBasicRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBasicRequest>, I>>(object: I): GetBasicRequest {
    const message = createBaseGetBasicRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseGetBasicResponse(): GetBasicResponse {
  return { name: "" };
}

export const GetBasicResponse = {
  encode(message: GetBasicResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBasicResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBasicResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBasicResponse {
    return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: GetBasicResponse): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBasicResponse>, I>>(base?: I): GetBasicResponse {
    return GetBasicResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBasicResponse>, I>>(object: I): GetBasicResponse {
    const message = createBaseGetBasicResponse();
    message.name = object.name ?? "";
    return message;
  },
};

export interface BasicService {
  GetBasic(request: GetBasicRequest): Promise<GetBasicResponse>;
}

export const BasicServiceServiceName = "basic.BasicService";
export class BasicServiceClientImpl implements BasicService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || BasicServiceServiceName;
    this.rpc = rpc;
    this.GetBasic = this.GetBasic.bind(this);
  }
  GetBasic(request: GetBasicRequest): Promise<GetBasicResponse> {
    const data = GetBasicRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetBasic", data);
    return promise.then((data) => {
      try {
        return GetBasicResponse.decode(_m0.Reader.create(data));
      } catch (error) {
        return Promise.reject(error);
      }
    }).catch((error) => {
      if (this.rpc.handleError) {
        return Promise.reject(this.rpc.handleError(this.service, "GetBasic", error));
      }
      return Promise.reject(error);
    });
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  handleError?(service: string, method: string, error: globalThis.Error): globalThis.Error;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
