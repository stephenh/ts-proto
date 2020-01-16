import * as Long from 'long';
import { Timestamp } from '../google/protobuf/timestamp';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ImportedThing {
  created_at: Date | undefined;
}

const baseImportedThing: object = {
  created_at: undefined,
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new global.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

export const ImportedThing = {
  encode(message: ImportedThing, writer: Writer = Writer.create()): Writer {
    if (message.created_at !== undefined && message.created_at !== undefined) {
      Timestamp.encode(toTimestamp(message.created_at), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): ImportedThing {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseImportedThing) as ImportedThing;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.created_at = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ImportedThing {
    const message = Object.create(baseImportedThing) as ImportedThing;
    if (object.created_at !== undefined && object.created_at !== null) {
      message.created_at = fromJsonTimestamp(object.created_at);
    } else {
      message.created_at = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ImportedThing>): ImportedThing {
    const message = Object.create(baseImportedThing) as ImportedThing;
    if (object.created_at !== undefined && object.created_at !== null) {
      message.created_at = object.created_at;
    } else {
      message.created_at = undefined;
    }
    return message;
  },
  toJSON(message: ImportedThing): unknown {
    const obj: any = {};
    obj.created_at = message.created_at !== undefined ? message.created_at.toISOString() : null;
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