/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface DividerData {
  type: DividerData_DividerType;
}

export const DividerData_DividerType = {
  DOUBLE: "DOUBLE",
  SINGLE: "SINGLE",
  DASHED: "DASHED",
  DOTTED: "DOTTED",
  UNRECOGNIZED: "UNRECOGNIZED",
} as const;

export type DividerData_DividerType = typeof DividerData_DividerType[keyof typeof DividerData_DividerType];

export function dividerData_DividerTypeFromJSON(object: any): DividerData_DividerType {
  switch (object) {
    case 0:
    case "DOUBLE":
      return DividerData_DividerType.DOUBLE;
    case 1:
    case "SINGLE":
      return DividerData_DividerType.SINGLE;
    case 2:
    case "DASHED":
      return DividerData_DividerType.DASHED;
    case 3:
    case "DOTTED":
      return DividerData_DividerType.DOTTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DividerData_DividerType.UNRECOGNIZED;
  }
}

export function dividerData_DividerTypeToJSON(object: DividerData_DividerType): string {
  switch (object) {
    case DividerData_DividerType.DOUBLE:
      return "DOUBLE";
    case DividerData_DividerType.SINGLE:
      return "SINGLE";
    case DividerData_DividerType.DASHED:
      return "DASHED";
    case DividerData_DividerType.DOTTED:
      return "DOTTED";
    case DividerData_DividerType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export function dividerData_DividerTypeToNumber(object: DividerData_DividerType): number {
  switch (object) {
    case DividerData_DividerType.DOUBLE:
      return 0;
    case DividerData_DividerType.SINGLE:
      return 1;
    case DividerData_DividerType.DASHED:
      return 2;
    case DividerData_DividerType.DOTTED:
      return 3;
    case DividerData_DividerType.UNRECOGNIZED:
    default:
      return -1;
  }
}

function createBaseDividerData(): DividerData {
  return { type: DividerData_DividerType.DOUBLE };
}

export const DividerData = {
  encode(message: DividerData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== DividerData_DividerType.DOUBLE) {
      writer.uint32(8).int32(dividerData_DividerTypeToNumber(message.type));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DividerData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDividerData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 8:
          message.type = dividerData_DividerTypeFromJSON(reader.int32());
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DividerData {
    return { type: isSet(object.type) ? dividerData_DividerTypeFromJSON(object.type) : DividerData_DividerType.DOUBLE };
  },

  toJSON(message: DividerData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = dividerData_DividerTypeToJSON(message.type));
    return obj;
  },

  create<I extends Exact<DeepPartial<DividerData>, I>>(base?: I): DividerData {
    return DividerData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DividerData>, I>>(object: I): DividerData {
    const message = createBaseDividerData();
    message.type = object.type ?? DividerData_DividerType.DOUBLE;
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
