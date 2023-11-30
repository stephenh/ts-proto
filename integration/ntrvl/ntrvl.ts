/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Bruh {
  id: string;
  name: string;
  is_chill: boolean;
}

export interface Brah {
  id: string;
}

export interface GetBruhRequest {
  id: string;
}

export interface GetBruhResponse {
  bruh: Bruh | undefined;
}

function createBaseBruh(): Bruh {
  return { id: "", name: "", is_chill: false };
}

export const Bruh = {
  encode(message: Bruh, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.is_chill === true) {
      writer.uint32(24).bool(message.is_chill);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bruh {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBruh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.is_chill = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Bruh {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      is_chill: isSet(object.is_chill) ? globalThis.Boolean(object.is_chill) : false,
    };
  },

  toJSON(message: Bruh): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.is_chill === true) {
      obj.is_chill = message.is_chill;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Bruh>, I>>(base?: I): Bruh {
    return Bruh.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Bruh>, I>>(object: I): Bruh {
    const message = createBaseBruh();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.is_chill = object.is_chill ?? false;
    return message;
  },
};

function createBaseBrah(): Brah {
  return { id: "" };
}

export const Brah = {
  encode(message: Brah, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Brah {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrah();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Brah {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: Brah): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Brah>, I>>(base?: I): Brah {
    return Brah.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Brah>, I>>(object: I): Brah {
    const message = createBaseBrah();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetBruhRequest(): GetBruhRequest {
  return { id: "" };
}

export const GetBruhRequest = {
  encode(message: GetBruhRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBruhRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBruhRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBruhRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetBruhRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBruhRequest>, I>>(base?: I): GetBruhRequest {
    return GetBruhRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBruhRequest>, I>>(object: I): GetBruhRequest {
    const message = createBaseGetBruhRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetBruhResponse(): GetBruhResponse {
  return { bruh: undefined };
}

export const GetBruhResponse = {
  encode(message: GetBruhResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bruh !== undefined) {
      Bruh.encode(message.bruh, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBruhResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBruhResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bruh = Bruh.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBruhResponse {
    return { bruh: isSet(object.bruh) ? Bruh.fromJSON(object.bruh) : undefined };
  },

  toJSON(message: GetBruhResponse): unknown {
    const obj: any = {};
    if (message.bruh !== undefined) {
      obj.bruh = Bruh.toJSON(message.bruh);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBruhResponse>, I>>(base?: I): GetBruhResponse {
    return GetBruhResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBruhResponse>, I>>(object: I): GetBruhResponse {
    const message = createBaseGetBruhResponse();
    message.bruh = (object.bruh !== undefined && object.bruh !== null) ? Bruh.fromPartial(object.bruh) : undefined;
    return message;
  },
};

export interface CoolService {
  get_bruh(request: GetBruhRequest, headers?: any): Promise<GetBruhResponse>;
}

export const CoolServiceServiceName = "CoolService";
export class CoolServiceClientImpl implements CoolService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || CoolServiceServiceName;
    this.rpc = rpc;
    this.get_bruh = this.get_bruh.bind(this);
  }
  get_bruh(request: GetBruhRequest, headers: any = {}): Promise<GetBruhResponse> {
    const data = GetBruhRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "get_bruh", data, { headers, timeout: 30000 });
    return promise.then((data) => GetBruhResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array, opts?: any): Promise<Uint8Array>;
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
