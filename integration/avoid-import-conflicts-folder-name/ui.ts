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

export interface Simple {
  simple2Name: string;
  simple2Age: number;
}

function createBaseSimple(): Simple {
  return { simple2Name: "", simple2Age: 0 };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.simple2Name !== "") {
      writer.uint32(10).string(message.simple2Name);
    }
    if (message.simple2Age !== 0) {
      writer.uint32(16).int32(message.simple2Age);
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

          message.simple2Name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.simple2Age = reader.int32();
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
      simple2Name: isSet(object.simple2Name) ? globalThis.String(object.simple2Name) : "",
      simple2Age: isSet(object.simple2Age) ? globalThis.Number(object.simple2Age) : 0,
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    if (message.simple2Name !== "") {
      obj.simple2Name = message.simple2Name;
    }
    if (message.simple2Age !== 0) {
      obj.simple2Age = Math.round(message.simple2Age);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple>, I>>(base?: I): Simple {
    return Simple.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.simple2Name = object.simple2Name ?? "";
    message.simple2Age = object.simple2Age ?? 0;
    return message;
  },
};

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
