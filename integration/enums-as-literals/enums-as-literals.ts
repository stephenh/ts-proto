/* eslint-disable */
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = '';

export interface DividerData {
  type: DividerData_DividerType;
}

export const DividerData_DividerType = {
  DOUBLE: 0,
  SINGLE: 1,
  DASHED: 2,
  DOTTED: 3,
  UNRECOGNIZED: -1,
} as const;

export type DividerData_DividerType = typeof DividerData_DividerType[keyof typeof DividerData_DividerType];

export function dividerData_DividerTypeFromJSON(object: any): DividerData_DividerType {
  switch (object) {
    case 0:
    case 'DOUBLE':
      return DividerData_DividerType.DOUBLE;
    case 1:
    case 'SINGLE':
      return DividerData_DividerType.SINGLE;
    case 2:
    case 'DASHED':
      return DividerData_DividerType.DASHED;
    case 3:
    case 'DOTTED':
      return DividerData_DividerType.DOTTED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_DividerType.UNRECOGNIZED;
  }
}

export function dividerData_DividerTypeToJSON(object: DividerData_DividerType): string {
  switch (object) {
    case DividerData_DividerType.DOUBLE:
      return 'DOUBLE';
    case DividerData_DividerType.SINGLE:
      return 'SINGLE';
    case DividerData_DividerType.DASHED:
      return 'DASHED';
    case DividerData_DividerType.DOTTED:
      return 'DOTTED';
    default:
      return 'UNKNOWN';
  }
}

function createBaseDividerData(): DividerData {
  return { type: 0 };
}

export const DividerData = {
  encode(message: DividerData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
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
          message.type = reader.int32() as any;
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
      type: isSet(object.type) ? dividerData_DividerTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: DividerData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = dividerData_DividerTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DividerData>, I>>(object: I): DividerData {
    const message = createBaseDividerData();
    message.type = object.type ?? 0;
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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
