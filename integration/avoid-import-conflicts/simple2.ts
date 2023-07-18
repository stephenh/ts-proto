/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "simple2";

export enum SimpleEnum {
  IMPORT_DEFAULT = 0,
  IMPORT_FOO = 10,
  IMPORT_BAR = 11,
  UNRECOGNIZED = -1,
}

export function simpleEnumFromJSON(object: any): SimpleEnum {
  switch (object) {
    case 0:
    case "IMPORT_DEFAULT":
      return SimpleEnum.IMPORT_DEFAULT;
    case 10:
    case "IMPORT_FOO":
      return SimpleEnum.IMPORT_FOO;
    case 11:
    case "IMPORT_BAR":
      return SimpleEnum.IMPORT_BAR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SimpleEnum.UNRECOGNIZED;
  }
}

export function simpleEnumToJSON(object: SimpleEnum): string {
  switch (object) {
    case SimpleEnum.IMPORT_DEFAULT:
      return "IMPORT_DEFAULT";
    case SimpleEnum.IMPORT_FOO:
      return "IMPORT_FOO";
    case SimpleEnum.IMPORT_BAR:
      return "IMPORT_BAR";
    case SimpleEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum FooService {
  FOO_SERVICE_DEFAULT = 0,
  FOO_SERVICE_FOO = 1,
  FOO_SERVICE_BAR = 2,
  UNRECOGNIZED = -1,
}

export function fooServiceFromJSON(object: any): FooService {
  switch (object) {
    case 0:
    case "FOO_SERVICE_DEFAULT":
      return FooService.FOO_SERVICE_DEFAULT;
    case 1:
    case "FOO_SERVICE_FOO":
      return FooService.FOO_SERVICE_FOO;
    case 2:
    case "FOO_SERVICE_BAR":
      return FooService.FOO_SERVICE_BAR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FooService.UNRECOGNIZED;
  }
}

export function fooServiceToJSON(object: FooService): string {
  switch (object) {
    case FooService.FOO_SERVICE_DEFAULT:
      return "FOO_SERVICE_DEFAULT";
    case FooService.FOO_SERVICE_FOO:
      return "FOO_SERVICE_FOO";
    case FooService.FOO_SERVICE_BAR:
      return "FOO_SERVICE_BAR";
    case FooService.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Simple {
  name: string;
  age: number;
}

function createBaseSimple(): Simple {
  return { name: "", age: 0 };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
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
          if (tag !== 16) {
            break;
          }

          message.age = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.age !== 0) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },

  fromJSON(object: any): Simple {
    return { name: isSet(object.name) ? String(object.name) : "", age: isSet(object.age) ? Number(object.age) : 0 };
  },

  create<I extends Exact<DeepPartial<Simple>, I>>(base?: I): Simple {
    return Simple.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? "";
    message.age = object.age ?? 0;
    return message;
  },
};

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
