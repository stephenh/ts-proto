import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface Timestamp {
  seconds: number;
  nanos: number;
}

const baseTimestamp: object = {
  seconds: 0,
  nanos: 0,
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new global.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const Timestamp = {
  encode(message: Timestamp, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.seconds);
    writer.uint32(16).int32(message.nanos);
    return writer;
  },
  decode(reader: Reader, length?: number): Timestamp {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTimestamp) as Timestamp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Timestamp {
    const message = Object.create(baseTimestamp) as Timestamp;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = Number(object.seconds);
    } else {
      message.seconds = 0;
    }
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = Number(object.nanos);
    } else {
      message.nanos = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Timestamp>): Timestamp {
    const message = Object.create(baseTimestamp) as Timestamp;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = object.seconds;
    } else {
      message.seconds = 0;
    }
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = object.nanos;
    } else {
      message.nanos = 0;
    }
    return message;
  },
  toJSON(message: Timestamp): unknown {
    const obj: any = {};
    obj.seconds = message.seconds || 0;
    obj.nanos = message.nanos || 0;
    return obj;
  },
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T[P] extends Date | Function | Uint8Array | undefined
  ? T[P]
  : T[P] extends infer U | undefined
  ? DeepPartial<U>
  : T[P] extends object
  ? DeepPartial<T[P]>
  : T[P]
};