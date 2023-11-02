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
import { MessageType, messageTypeRegistry } from "./typeRegistry";

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
  $type: "simple.Simple";
  name: string;
  otherSimple: Simple3 | undefined;
}

export interface DifferentSimple {
  $type: "simple.DifferentSimple";
  name: string;
  otherOptionalSimple2?: Simple3 | undefined;
}

export interface SimpleEnums {
  $type: "simple.SimpleEnums";
  localEnum: SimpleEnum;
  importEnum: SimpleEnum1;
}

export interface FooServiceCreateRequest {
  $type: "simple.FooServiceCreateRequest";
  kind: FooService2;
}

export interface FooServiceCreateResponse {
  $type: "simple.FooServiceCreateResponse";
  kind: FooService2;
}

function createBaseSimple(): Simple {
  return { $type: "simple.Simple", name: "", otherSimple: undefined };
}

export const Simple = {
  $type: "simple.Simple" as const,

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
      $type: Simple.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      otherSimple: isSet(object.otherSimple) ? Simple3.fromJSON(object.otherSimple) : undefined,
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.otherSimple !== undefined) {
      obj.otherSimple = Simple3.toJSON(message.otherSimple);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple>, I>>(base?: I): Simple {
    return Simple.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? "";
    message.otherSimple =
      object.otherSimple !== undefined && object.otherSimple !== null
        ? Simple3.fromPartial(object.otherSimple)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(Simple.$type, Simple);

function createBaseDifferentSimple(): DifferentSimple {
  return { $type: "simple.DifferentSimple", name: "", otherOptionalSimple2: undefined };
}

export const DifferentSimple = {
  $type: "simple.DifferentSimple" as const,

  encode(message: DifferentSimple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.otherOptionalSimple2 !== undefined) {
      Simple3.encode(message.otherOptionalSimple2, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DifferentSimple {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDifferentSimple();
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

          message.otherOptionalSimple2 = Simple3.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DifferentSimple {
    return {
      $type: DifferentSimple.$type,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      otherOptionalSimple2: isSet(object.otherOptionalSimple2)
        ? Simple3.fromJSON(object.otherOptionalSimple2)
        : undefined,
    };
  },

  toJSON(message: DifferentSimple): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.otherOptionalSimple2 !== undefined) {
      obj.otherOptionalSimple2 = Simple3.toJSON(message.otherOptionalSimple2);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DifferentSimple>, I>>(base?: I): DifferentSimple {
    return DifferentSimple.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DifferentSimple>, I>>(object: I): DifferentSimple {
    const message = createBaseDifferentSimple();
    message.name = object.name ?? "";
    message.otherOptionalSimple2 =
      object.otherOptionalSimple2 !== undefined && object.otherOptionalSimple2 !== null
        ? Simple3.fromPartial(object.otherOptionalSimple2)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(DifferentSimple.$type, DifferentSimple);

function createBaseSimpleEnums(): SimpleEnums {
  return { $type: "simple.SimpleEnums", localEnum: 0, importEnum: 0 };
}

export const SimpleEnums = {
  $type: "simple.SimpleEnums" as const,

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
      $type: SimpleEnums.$type,
      localEnum: isSet(object.localEnum) ? simpleEnumFromJSON(object.localEnum) : 0,
      importEnum: isSet(object.importEnum) ? simpleEnumFromJSON4(object.importEnum) : 0,
    };
  },

  toJSON(message: SimpleEnums): unknown {
    const obj: any = {};
    if (message.localEnum !== 0) {
      obj.localEnum = simpleEnumToJSON(message.localEnum);
    }
    if (message.importEnum !== 0) {
      obj.importEnum = simpleEnumToJSON5(message.importEnum);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleEnums>, I>>(base?: I): SimpleEnums {
    return SimpleEnums.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimpleEnums>, I>>(object: I): SimpleEnums {
    const message = createBaseSimpleEnums();
    message.localEnum = object.localEnum ?? 0;
    message.importEnum = object.importEnum ?? 0;
    return message;
  },
};

messageTypeRegistry.set(SimpleEnums.$type, SimpleEnums);

function createBaseFooServiceCreateRequest(): FooServiceCreateRequest {
  return { $type: "simple.FooServiceCreateRequest", kind: 0 };
}

export const FooServiceCreateRequest = {
  $type: "simple.FooServiceCreateRequest" as const,

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
    return { $type: FooServiceCreateRequest.$type, kind: isSet(object.kind) ? fooServiceFromJSON(object.kind) : 0 };
  },

  toJSON(message: FooServiceCreateRequest): unknown {
    const obj: any = {};
    if (message.kind !== 0) {
      obj.kind = fooServiceToJSON(message.kind);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FooServiceCreateRequest>, I>>(base?: I): FooServiceCreateRequest {
    return FooServiceCreateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FooServiceCreateRequest>, I>>(object: I): FooServiceCreateRequest {
    const message = createBaseFooServiceCreateRequest();
    message.kind = object.kind ?? 0;
    return message;
  },
};

messageTypeRegistry.set(FooServiceCreateRequest.$type, FooServiceCreateRequest);

function createBaseFooServiceCreateResponse(): FooServiceCreateResponse {
  return { $type: "simple.FooServiceCreateResponse", kind: 0 };
}

export const FooServiceCreateResponse = {
  $type: "simple.FooServiceCreateResponse" as const,

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
    return { $type: FooServiceCreateResponse.$type, kind: isSet(object.kind) ? fooServiceFromJSON(object.kind) : 0 };
  },

  toJSON(message: FooServiceCreateResponse): unknown {
    const obj: any = {};
    if (message.kind !== 0) {
      obj.kind = fooServiceToJSON(message.kind);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FooServiceCreateResponse>, I>>(base?: I): FooServiceCreateResponse {
    return FooServiceCreateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FooServiceCreateResponse>, I>>(object: I): FooServiceCreateResponse {
    const message = createBaseFooServiceCreateResponse();
    message.kind = object.kind ?? 0;
    return message;
  },
};

messageTypeRegistry.set(FooServiceCreateResponse.$type, FooServiceCreateResponse);

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
    const requestMethod = messageTypeRegistry.get(request.$type);
    if (this.rpc.beforeRequest && requestMethod) {
      this.rpc.beforeRequest(requestMethod);
    }
    const promise = this.rpc.request(this.service, "Create", data);
    return promise.then((data) => {
      const response = FooServiceCreateResponse.decode(_m0.Reader.create(data));
      const responseMethod = messageTypeRegistry.get(response.$type);
      if (response && this.rpc.afterResponse && responseMethod) {
        this.rpc.afterResponse(responseMethod);
      }
      return response;
    });
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  afterResponse?(response: MessageType): void;
  beforeRequest?(request: MessageType): void;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
