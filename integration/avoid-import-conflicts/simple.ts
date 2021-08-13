/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal.js';
import * as Long from 'long';
import {
  SimpleEnum as SimpleEnum1,
  Simple as Simple2,
  simpleEnumFromJSON as simpleEnumFromJSON3,
  simpleEnumToJSON as simpleEnumToJSON4,
} from './simple2';

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
    default:
      return 'UNKNOWN';
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

const baseSimple: object = { name: '' };

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.otherSimple !== undefined) {
      Simple2.encode(message.otherSimple, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimple } as Simple;
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
    const message = { ...baseSimple } as Simple;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.otherSimple !== undefined && object.otherSimple !== null) {
      message.otherSimple = Simple2.fromJSON(object.otherSimple);
    } else {
      message.otherSimple = undefined;
    }
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.otherSimple !== undefined &&
      (obj.otherSimple = message.otherSimple ? Simple2.toJSON(message.otherSimple) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Simple>): Simple {
    const message = { ...baseSimple } as Simple;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    if (object.otherSimple !== undefined && object.otherSimple !== null) {
      message.otherSimple = Simple2.fromPartial(object.otherSimple);
    } else {
      message.otherSimple = undefined;
    }
    return message;
  },
};

const baseSimpleEnums: object = { localEnum: 0, importEnum: 0 };

export const SimpleEnums = {
  encode(message: SimpleEnums, writer: Writer = Writer.create()): Writer {
    if (message.localEnum !== 0) {
      writer.uint32(8).int32(message.localEnum);
    }
    if (message.importEnum !== 0) {
      writer.uint32(16).int32(message.importEnum);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleEnums {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleEnums } as SimpleEnums;
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
    const message = { ...baseSimpleEnums } as SimpleEnums;
    if (object.localEnum !== undefined && object.localEnum !== null) {
      message.localEnum = simpleEnumFromJSON(object.localEnum);
    } else {
      message.localEnum = 0;
    }
    if (object.importEnum !== undefined && object.importEnum !== null) {
      message.importEnum = simpleEnumFromJSON3(object.importEnum);
    } else {
      message.importEnum = 0;
    }
    return message;
  },

  toJSON(message: SimpleEnums): unknown {
    const obj: any = {};
    message.localEnum !== undefined && (obj.localEnum = simpleEnumToJSON(message.localEnum));
    message.importEnum !== undefined && (obj.importEnum = simpleEnumToJSON4(message.importEnum));
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleEnums>): SimpleEnums {
    const message = { ...baseSimpleEnums } as SimpleEnums;
    if (object.localEnum !== undefined && object.localEnum !== null) {
      message.localEnum = object.localEnum;
    } else {
      message.localEnum = 0;
    }
    if (object.importEnum !== undefined && object.importEnum !== null) {
      message.importEnum = object.importEnum;
    } else {
      message.importEnum = 0;
    }
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
