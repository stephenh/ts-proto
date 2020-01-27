import Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface Timestamp {
  seconds: Long;
  nanos: number;
}

const baseTimestamp: object = {
  seconds: Long.ZERO,
  nanos: 0,
};

function numberToLong(number: number) {
  return Long.fromNumber(number);
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
          message.seconds = reader.int64() as Long;
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
      message.seconds = Long.fromString(object.seconds);
    } else {
      message.seconds = Long.ZERO;
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
      message.seconds = object.seconds as Long;
    } else {
      message.seconds = Long.ZERO;
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
    obj.seconds = (message.seconds || Long.ZERO).toString();
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
