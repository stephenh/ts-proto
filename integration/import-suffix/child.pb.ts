/* eslint-disable */
import * as _m0 from "protobufjs/minimal.js";

export const protobufPackage = "file_suffix";

export enum ChildEnum {
  DEFAULT = 0,
  FOO = 1,
  UNRECOGNIZED = -1,
}

export function childEnumFromJSON(object: any): ChildEnum {
  switch (object) {
    case 0:
    case "DEFAULT":
      return ChildEnum.DEFAULT;
    case 1:
    case "FOO":
      return ChildEnum.FOO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChildEnum.UNRECOGNIZED;
  }
}

export function childEnumToJSON(object: ChildEnum): string {
  switch (object) {
    case ChildEnum.DEFAULT:
      return "DEFAULT";
    case ChildEnum.FOO:
      return "FOO";
    case ChildEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Child {
  name: string;
}

function createBaseChild(): Child {
  return { name: "" };
}

export const Child = {
  encode(message: Child, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Child {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: Child): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<Child>, I>>(base?: I): Child {
    return Child.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Child>, I>>(object: I): Child {
    const message = createBaseChild();
    message.name = object.name ?? "";
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
