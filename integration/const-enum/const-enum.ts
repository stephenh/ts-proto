/* eslint-disable */
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = '';

export interface DividerData {
  type: DividerData_DividerType;
  typeMap: { [key: string]: DividerData_DividerType };
}

export const enum DividerData_DividerType {
  DOUBLE = 'DOUBLE',
  SINGLE = 'SINGLE',
  DASHED = 'DASHED',
  DOTTED = 'DOTTED',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

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
    case DividerData_DividerType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
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

export interface DividerData_TypeMapEntry {
  key: string;
  value: DividerData_DividerType;
}

function createBaseDividerData(): DividerData {
  return { type: DividerData_DividerType.DOUBLE, typeMap: {} };
}

export const DividerData = {
  encode(message: DividerData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== DividerData_DividerType.DOUBLE) {
      writer.uint32(8).int32(dividerData_DividerTypeToNumber(message.type));
    }
    Object.entries(message.typeMap).forEach(([key, value]) => {
      DividerData_TypeMapEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
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
        case 2:
          const entry2 = DividerData_TypeMapEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.typeMap[entry2.key] = entry2.value;
          }
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
      type: isSet(object.type) ? dividerData_DividerTypeFromJSON(object.type) : DividerData_DividerType.DOUBLE,
      typeMap: isObject(object.typeMap)
        ? Object.entries(object.typeMap).reduce<{ [key: string]: DividerData_DividerType }>((acc, [key, value]) => {
            acc[key] = value as DividerData_DividerType;
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: DividerData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = dividerData_DividerTypeToJSON(message.type));
    obj.typeMap = {};
    if (message.typeMap) {
      Object.entries(message.typeMap).forEach(([k, v]) => {
        obj.typeMap[k] = dividerData_DividerTypeToJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DividerData>, I>>(object: I): DividerData {
    const message = createBaseDividerData();
    message.type = object.type ?? DividerData_DividerType.DOUBLE;
    message.typeMap = Object.entries(object.typeMap ?? {}).reduce<{ [key: string]: DividerData_DividerType }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value as DividerData_DividerType;
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

function createBaseDividerData_TypeMapEntry(): DividerData_TypeMapEntry {
  return { key: '', value: DividerData_DividerType.DOUBLE };
}

export const DividerData_TypeMapEntry = {
  encode(message: DividerData_TypeMapEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== DividerData_DividerType.DOUBLE) {
      writer.uint32(16).int32(dividerData_DividerTypeToNumber(message.value));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DividerData_TypeMapEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDividerData_TypeMapEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = dividerData_DividerTypeFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DividerData_TypeMapEntry {
    return {
      key: isSet(object.key) ? String(object.key) : '',
      value: isSet(object.value) ? dividerData_DividerTypeFromJSON(object.value) : DividerData_DividerType.DOUBLE,
    };
  },

  toJSON(message: DividerData_TypeMapEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = dividerData_DividerTypeToJSON(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DividerData_TypeMapEntry>, I>>(object: I): DividerData_TypeMapEntry {
    const message = createBaseDividerData_TypeMapEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? DividerData_DividerType.DOUBLE;
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

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
