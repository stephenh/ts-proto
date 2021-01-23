/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';

export const protobufPackage = 'simple';

export interface Numbers {
  double: number;
  float: number;
  int32: number;
  int64: string;
  uint32: number;
  uint64: string;
  sint32: number;
  sint64: string;
  fixed32: number;
  fixed64: string;
  sfixed32: number;
  sfixed64: string;
}

const baseNumbers: object = {
  double: 0,
  float: 0,
  int32: 0,
  int64: '0',
  uint32: 0,
  uint64: '0',
  sint32: 0,
  sint64: '0',
  fixed32: 0,
  fixed64: '0',
  sfixed32: 0,
  sfixed64: '0',
};

export const Numbers = {
  encode(message: Numbers, writer: Writer = Writer.create()): Writer {
    writer.uint32(9).double(message.double);
    writer.uint32(21).float(message.float);
    writer.uint32(24).int32(message.int32);
    writer.uint32(32).int64(message.int64);
    writer.uint32(40).uint32(message.uint32);
    writer.uint32(48).uint64(message.uint64);
    writer.uint32(56).sint32(message.sint32);
    writer.uint32(64).sint64(message.sint64);
    writer.uint32(77).fixed32(message.fixed32);
    writer.uint32(81).fixed64(message.fixed64);
    writer.uint32(93).sfixed32(message.sfixed32);
    writer.uint32(97).sfixed64(message.sfixed64);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNumbers } as Numbers;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.double = reader.double();
          break;
        case 2:
          message.float = reader.float();
          break;
        case 3:
          message.int32 = reader.int32();
          break;
        case 4:
          message.int64 = longToString(reader.int64() as Long);
          break;
        case 5:
          message.uint32 = reader.uint32();
          break;
        case 6:
          message.uint64 = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.sint32 = reader.sint32();
          break;
        case 8:
          message.sint64 = longToString(reader.sint64() as Long);
          break;
        case 9:
          message.fixed32 = reader.fixed32();
          break;
        case 10:
          message.fixed64 = longToString(reader.fixed64() as Long);
          break;
        case 11:
          message.sfixed32 = reader.sfixed32();
          break;
        case 12:
          message.sfixed64 = longToString(reader.sfixed64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Numbers {
    const message = { ...baseNumbers } as Numbers;
    if (object.double !== undefined && object.double !== null) {
      message.double = Number(object.double);
    } else {
      message.double = 0;
    }
    if (object.float !== undefined && object.float !== null) {
      message.float = Number(object.float);
    } else {
      message.float = 0;
    }
    if (object.int32 !== undefined && object.int32 !== null) {
      message.int32 = Number(object.int32);
    } else {
      message.int32 = 0;
    }
    if (object.int64 !== undefined && object.int64 !== null) {
      message.int64 = String(object.int64);
    } else {
      message.int64 = '0';
    }
    if (object.uint32 !== undefined && object.uint32 !== null) {
      message.uint32 = Number(object.uint32);
    } else {
      message.uint32 = 0;
    }
    if (object.uint64 !== undefined && object.uint64 !== null) {
      message.uint64 = String(object.uint64);
    } else {
      message.uint64 = '0';
    }
    if (object.sint32 !== undefined && object.sint32 !== null) {
      message.sint32 = Number(object.sint32);
    } else {
      message.sint32 = 0;
    }
    if (object.sint64 !== undefined && object.sint64 !== null) {
      message.sint64 = String(object.sint64);
    } else {
      message.sint64 = '0';
    }
    if (object.fixed32 !== undefined && object.fixed32 !== null) {
      message.fixed32 = Number(object.fixed32);
    } else {
      message.fixed32 = 0;
    }
    if (object.fixed64 !== undefined && object.fixed64 !== null) {
      message.fixed64 = String(object.fixed64);
    } else {
      message.fixed64 = '0';
    }
    if (object.sfixed32 !== undefined && object.sfixed32 !== null) {
      message.sfixed32 = Number(object.sfixed32);
    } else {
      message.sfixed32 = 0;
    }
    if (object.sfixed64 !== undefined && object.sfixed64 !== null) {
      message.sfixed64 = String(object.sfixed64);
    } else {
      message.sfixed64 = '0';
    }
    return message;
  },

  fromPartial(object: DeepPartial<Numbers>): Numbers {
    const message = { ...baseNumbers } as Numbers;
    if (object.double !== undefined && object.double !== null) {
      message.double = object.double;
    } else {
      message.double = 0;
    }
    if (object.float !== undefined && object.float !== null) {
      message.float = object.float;
    } else {
      message.float = 0;
    }
    if (object.int32 !== undefined && object.int32 !== null) {
      message.int32 = object.int32;
    } else {
      message.int32 = 0;
    }
    if (object.int64 !== undefined && object.int64 !== null) {
      message.int64 = object.int64;
    } else {
      message.int64 = '0';
    }
    if (object.uint32 !== undefined && object.uint32 !== null) {
      message.uint32 = object.uint32;
    } else {
      message.uint32 = 0;
    }
    if (object.uint64 !== undefined && object.uint64 !== null) {
      message.uint64 = object.uint64;
    } else {
      message.uint64 = '0';
    }
    if (object.sint32 !== undefined && object.sint32 !== null) {
      message.sint32 = object.sint32;
    } else {
      message.sint32 = 0;
    }
    if (object.sint64 !== undefined && object.sint64 !== null) {
      message.sint64 = object.sint64;
    } else {
      message.sint64 = '0';
    }
    if (object.fixed32 !== undefined && object.fixed32 !== null) {
      message.fixed32 = object.fixed32;
    } else {
      message.fixed32 = 0;
    }
    if (object.fixed64 !== undefined && object.fixed64 !== null) {
      message.fixed64 = object.fixed64;
    } else {
      message.fixed64 = '0';
    }
    if (object.sfixed32 !== undefined && object.sfixed32 !== null) {
      message.sfixed32 = object.sfixed32;
    } else {
      message.sfixed32 = 0;
    }
    if (object.sfixed64 !== undefined && object.sfixed64 !== null) {
      message.sfixed64 = object.sfixed64;
    } else {
      message.sfixed64 = '0';
    }
    return message;
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    message.double !== undefined && (obj.double = message.double);
    message.float !== undefined && (obj.float = message.float);
    message.int32 !== undefined && (obj.int32 = message.int32);
    message.int64 !== undefined && (obj.int64 = message.int64);
    message.uint32 !== undefined && (obj.uint32 = message.uint32);
    message.uint64 !== undefined && (obj.uint64 = message.uint64);
    message.sint32 !== undefined && (obj.sint32 = message.sint32);
    message.sint64 !== undefined && (obj.sint64 = message.sint64);
    message.fixed32 !== undefined && (obj.fixed32 = message.fixed32);
    message.fixed64 !== undefined && (obj.fixed64 = message.fixed64);
    message.sfixed32 !== undefined && (obj.sfixed32 = message.sfixed32);
    message.sfixed64 !== undefined && (obj.sfixed64 = message.sfixed64);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToString(long: Long) {
  return long.toString();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
