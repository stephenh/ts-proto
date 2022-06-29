/* eslint-disable */
import {
  SimpleEnum as SimpleEnum1,
  Simple as Simple2,
  simpleEnumFromJSON as simpleEnumFromJSON3,
  simpleEnumToJSON as simpleEnumToJSON4,
} from './simple2.js';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'simple';

export enum SimpleEnum {
  LOCAL_DEFAULT = 0,
  LOCAL_FOO = 1,
  LOCAL_BAR = 2,
  UNRECOGNIZED = -1,
}

export function simpleEnumFromJSON(object: any): SimpleEnum {
  switch (object) {
    case 0:
    case 'LOCAL_DEFAULT':
      return SimpleEnum.LOCAL_DEFAULT;
    case 1:
    case 'LOCAL_FOO':
      return SimpleEnum.LOCAL_FOO;
    case 2:
    case 'LOCAL_BAR':
      return SimpleEnum.LOCAL_BAR;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SimpleEnum.UNRECOGNIZED;
  }
}

export function simpleEnumToJSON(object: SimpleEnum): string {
  switch (object) {
    case SimpleEnum.LOCAL_DEFAULT:
      return 'LOCAL_DEFAULT';
    case SimpleEnum.LOCAL_FOO:
      return 'LOCAL_FOO';
    case SimpleEnum.LOCAL_BAR:
      return 'LOCAL_BAR';
    case SimpleEnum.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface Simple {
  name: string;
  otherSimple: Simple2 | undefined;
}

export interface SimpleEnums {
  localEnum: SimpleEnum;
  importEnum: SimpleEnum1;
}

function createBaseSimple(): Simple {
  return { name: '', otherSimple: undefined };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.otherSimple !== undefined) {
      Simple2.encode(message.otherSimple, writer.uint32(18).fork()).ldelim();
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
          message.otherSimple = Simple2.decode(reader, reader.uint32());
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
      otherSimple: isSet(object.otherSimple) ? Simple2.fromJSON(object.otherSimple) : undefined,
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.otherSimple !== undefined &&
      (obj.otherSimple = message.otherSimple ? Simple2.toJSON(message.otherSimple) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? '';
    message.otherSimple =
      object.otherSimple !== undefined && object.otherSimple !== null
        ? Simple2.fromPartial(object.otherSimple)
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleEnums();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localEnum = reader.int32() as any;
          break;
        case 2:
          message.importEnum = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleEnums {
    return {
      localEnum: isSet(object.localEnum) ? simpleEnumFromJSON(object.localEnum) : 0,
      importEnum: isSet(object.importEnum) ? simpleEnumFromJSON3(object.importEnum) : 0,
    };
  },

  toJSON(message: SimpleEnums): unknown {
    const obj: any = {};
    message.localEnum !== undefined && (obj.localEnum = simpleEnumToJSON(message.localEnum));
    message.importEnum !== undefined && (obj.importEnum = simpleEnumToJSON4(message.importEnum));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleEnums>, I>>(object: I): SimpleEnums {
    const message = createBaseSimpleEnums();
    message.localEnum = object.localEnum ?? 0;
    message.importEnum = object.importEnum ?? 0;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
