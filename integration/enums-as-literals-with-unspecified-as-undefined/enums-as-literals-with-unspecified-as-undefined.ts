/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = '';

export interface DividerData {
  type: DividerData_DividerType | undefined;
}

export const DividerData_DividerType = {
  DOUBLE: 'DOUBLE',
  SINGLE: 'SINGLE',
  DASHED: 'DASHED',
  DOTTED: 'DOTTED',
  UNRECOGNIZED: 'UNRECOGNIZED',
} as const;

export type DividerData_DividerType = typeof DividerData_DividerType[keyof typeof DividerData_DividerType] | undefined;

export function dividerData_DividerTypeFromJSON(object: any): DividerData_DividerType | undefined {
  switch (object) {
    case 0:
    case 'DIVIDER_TYPE_UNSPECIFIED':
    case undefined:
      return undefined;
    case 1:
    case 'DOUBLE':
      return DividerData_DividerType.DOUBLE;
    case 2:
    case 'SINGLE':
      return DividerData_DividerType.SINGLE;
    case 3:
    case 'DASHED':
      return DividerData_DividerType.DASHED;
    case 4:
    case 'DOTTED':
      return DividerData_DividerType.DOTTED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_DividerType.UNRECOGNIZED;
  }
}

export function dividerData_DividerTypeToJSON(object: DividerData_DividerType | undefined): string | undefined {
  switch (object) {
    case undefined:
      return undefined;
    case DividerData_DividerType.DOUBLE:
      return 'DOUBLE';
    case DividerData_DividerType.SINGLE:
      return 'SINGLE';
    case DividerData_DividerType.DASHED:
      return 'DASHED';
    case DividerData_DividerType.DOTTED:
      return 'DOTTED';
    case DividerData_DividerType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export function dividerData_DividerTypeToNumber(object: DividerData_DividerType | undefined): number {
  switch (object) {
    case undefined:
      return 0;
    case DividerData_DividerType.DOUBLE:
      return 1;
    case DividerData_DividerType.SINGLE:
      return 2;
    case DividerData_DividerType.DASHED:
      return 3;
    case DividerData_DividerType.DOTTED:
      return 4;
    case DividerData_DividerType.UNRECOGNIZED:
    default:
      return -1;
  }
}

function createBaseDividerData(): DividerData {
  return { type: undefined };
}

export const DividerData = {
  encode(message: DividerData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined) {
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
      switch (tag >>> 3) {
        case 1:
          message.type = dividerData_DividerTypeFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DividerData {
    return {
      type: isSet(object.type) ? dividerData_DividerTypeFromJSON(object.type) : undefined,
    };
  },

  toJSON(message: DividerData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = dividerData_DividerTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DividerData>, I>>(object: I): DividerData {
    const message = createBaseDividerData();
    message.type = object.type ?? undefined;
    return message;
  },
};

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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
