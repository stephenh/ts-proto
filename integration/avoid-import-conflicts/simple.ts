/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {
  FooService as FooService2,
  fooServiceFromJSON,
  fooServiceToJSON,
  Simple as Simple3,
  SimpleEnum as SimpleEnum1,
  simpleEnumFromJSON as simpleEnumFromJSON4,
  simpleEnumToJSON as simpleEnumToJSON5,
} from "./simple2";

export const protobufPackage = "simple";

export enum SimpleEnum {
  LOCAL_DEFAULT = 0,
  LOCAL_FOO = 1,
  LOCAL_BAR = 2,
  UNRECOGNIZED = -1,
}

export function simpleEnumFromJSON(object: any): SimpleEnum {
  switch (object) {
    case 0:
    case "LOCAL_DEFAULT":
      return SimpleEnum.LOCAL_DEFAULT;
    case 1:
    case "LOCAL_FOO":
      return SimpleEnum.LOCAL_FOO;
    case 2:
    case "LOCAL_BAR":
      return SimpleEnum.LOCAL_BAR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SimpleEnum.UNRECOGNIZED;
  }
}

export function simpleEnumToJSON(object: SimpleEnum): string {
  switch (object) {
    case SimpleEnum.LOCAL_DEFAULT:
      return "LOCAL_DEFAULT";
    case SimpleEnum.LOCAL_FOO:
      return "LOCAL_FOO";
    case SimpleEnum.LOCAL_BAR:
      return "LOCAL_BAR";
    case SimpleEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Simple {
  name: string;
  otherSimple: Simple3 | undefined;
}

export interface SimpleEnums {
  localEnum: SimpleEnum;
  importEnum: SimpleEnum1;
}

export interface FooServiceCreateRequest {
  kind: FooService2;
}

export interface FooServiceCreateResponse {
  kind: FooService2;
}

function createBaseSimple(): Simple {
  return { name: "", otherSimple: undefined };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.otherSimple !== undefined) {
      Simple3.encode(message.otherSimple, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.otherSimple = Simple3.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Simple {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      otherSimple: isSet(object.otherSimple) ? Simple3.fromJSON(object.otherSimple) : undefined,
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.otherSimple !== undefined &&
      (obj.otherSimple = message.otherSimple ? Simple3.toJSON(message.otherSimple) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple>, I>>(base?: I): Simple {
    return Simple.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? "";
    message.otherSimple = (object.otherSimple !== undefined && object.otherSimple !== null)
      ? Simple3.fromPartial(object.otherSimple)
      : undefined;
    return message;
  },
};

function createBaseSimpleEnums(): SimpleEnums {
  return { localEnum: 0, importEnum: 0 };
}

export const SimpleEnums = {
  encode(message: SimpleEnums, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.localEnum !== 0) {
      writer.uint32(8).int32(message.localEnum);
    }
    if (message.importEnum !== 0) {
      writer.uint32(16).int32(message.importEnum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleEnums {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleEnums();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.localEnum = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.importEnum = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleEnums {
    return {
      localEnum: isSet(object.localEnum) ? simpleEnumFromJSON(object.localEnum) : 0,
      importEnum: isSet(object.importEnum) ? simpleEnumFromJSON4(object.importEnum) : 0,
    };
  },

  toJSON(message: SimpleEnums): unknown {
    const obj: any = {};
    message.localEnum !== undefined && (obj.localEnum = simpleEnumToJSON(message.localEnum));
    message.importEnum !== undefined && (obj.importEnum = simpleEnumToJSON5(message.importEnum));
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleEnums>, I>>(base?: I): SimpleEnums {
    return SimpleEnums.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleEnums>, I>>(object: I): SimpleEnums {
    const message = createBaseSimpleEnums();
    message.localEnum = object.localEnum ?? 0;
    message.importEnum = object.importEnum ?? 0;
    return message;
  },
};

function createBaseFooServiceCreateRequest(): FooServiceCreateRequest {
  return { kind: 0 };
}

export const FooServiceCreateRequest = {
  encode(message: FooServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind !== 0) {
      writer.uint32(8).int32(message.kind);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FooServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFooServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.kind = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FooServiceCreateRequest {
    return { kind: isSet(object.kind) ? fooServiceFromJSON(object.kind) : 0 };
  },

  toJSON(message: FooServiceCreateRequest): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = fooServiceToJSON(message.kind));
    return obj;
  },

  create<I extends Exact<DeepPartial<FooServiceCreateRequest>, I>>(base?: I): FooServiceCreateRequest {
    return FooServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FooServiceCreateRequest>, I>>(object: I): FooServiceCreateRequest {
    const message = createBaseFooServiceCreateRequest();
    message.kind = object.kind ?? 0;
    return message;
  },
};

function createBaseFooServiceCreateResponse(): FooServiceCreateResponse {
  return { kind: 0 };
}

export const FooServiceCreateResponse = {
  encode(message: FooServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind !== 0) {
      writer.uint32(8).int32(message.kind);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FooServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFooServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.kind = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FooServiceCreateResponse {
    return { kind: isSet(object.kind) ? fooServiceFromJSON(object.kind) : 0 };
  },

  toJSON(message: FooServiceCreateResponse): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = fooServiceToJSON(message.kind));
    return obj;
  },

  create<I extends Exact<DeepPartial<FooServiceCreateResponse>, I>>(base?: I): FooServiceCreateResponse {
    return FooServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FooServiceCreateResponse>, I>>(object: I): FooServiceCreateResponse {
    const message = createBaseFooServiceCreateResponse();
    message.kind = object.kind ?? 0;
    return message;
  },
};

export interface FooService {
  Create(request: FooServiceCreateRequest): Promise<FooServiceCreateResponse>;
}

export const FooServiceServiceName = "simple.FooService";
export class FooServiceClientImpl implements FooService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || FooServiceServiceName;
    this.rpc = rpc;
    this.Create = this.Create.bind(this);
  }
  Create(request: FooServiceCreateRequest): Promise<FooServiceCreateResponse> {
    const data = FooServiceCreateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Create", data);
    return promise.then((data) => FooServiceCreateResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
