/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'simple2';

export enum SimpleEnum {
  IMPORT_DEFAULT = 0,
  IMPORT_FOO = 10,
  IMPORT_BAR = 11,
  UNRECOGNIZED = -1,
}

export function simpleEnumFromJSON(object: any): SimpleEnum {
  switch (object) {
    case 0:
    case 'IMPORT_DEFAULT':
      return SimpleEnum.IMPORT_DEFAULT;
    case 10:
    case 'IMPORT_FOO':
      return SimpleEnum.IMPORT_FOO;
    case 11:
    case 'IMPORT_BAR':
      return SimpleEnum.IMPORT_BAR;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SimpleEnum.UNRECOGNIZED;
  }
}

export function simpleEnumToJSON(object: SimpleEnum): string {
  switch (object) {
    case SimpleEnum.IMPORT_DEFAULT:
      return 'IMPORT_DEFAULT';
    case SimpleEnum.IMPORT_FOO:
      return 'IMPORT_FOO';
    case SimpleEnum.IMPORT_BAR:
      return 'IMPORT_BAR';
    case SimpleEnum.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface Simple {
  name: string;
  age: number;
}

function createBaseSimple(): Simple {
  return { name: '', age: 0 };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.age = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Simple {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      age: isSet(object.age) ? Number(object.age) : 0,
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = Math.round(message.age));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? '';
    message.age = object.age ?? 0;
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
