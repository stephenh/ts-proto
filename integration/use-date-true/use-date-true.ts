/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Timestamp } from './google/protobuf/timestamp';

export const protobufPackage = '';

export interface Todo {
  id: string;
  timestamp: Date | undefined;
  repeatedTimestamp: Date[];
  optionalTimestamp?: Date | undefined;
  mapOfTimestamps: { [key: string]: Date };
}

export interface Todo_MapOfTimestampsEntry {
  key: string;
  value: Date | undefined;
}

const baseTodo: object = { id: '' };

export const Todo = {
  encode(message: Todo, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.repeatedTimestamp) {
      Timestamp.encode(toTimestamp(v!), writer.uint32(26).fork()).ldelim();
    }
    if (message.optionalTimestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.optionalTimestamp), writer.uint32(34).fork()).ldelim();
    }
    Object.entries(message.mapOfTimestamps).forEach(([key, value]) => {
      Todo_MapOfTimestampsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Todo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTodo } as Todo;
    message.repeatedTimestamp = [];
    message.mapOfTimestamps = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.repeatedTimestamp.push(fromTimestamp(Timestamp.decode(reader, reader.uint32())));
          break;
        case 4:
          message.optionalTimestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          const entry5 = Todo_MapOfTimestampsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.mapOfTimestamps[entry5.key] = entry5.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Todo {
    const message = { ...baseTodo } as Todo;
    message.repeatedTimestamp = [];
    message.mapOfTimestamps = {};
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp);
    } else {
      message.timestamp = undefined;
    }
    if (object.repeatedTimestamp !== undefined && object.repeatedTimestamp !== null) {
      for (const e of object.repeatedTimestamp) {
        message.repeatedTimestamp.push(fromJsonTimestamp(e));
      }
    }
    if (object.optionalTimestamp !== undefined && object.optionalTimestamp !== null) {
      message.optionalTimestamp = fromJsonTimestamp(object.optionalTimestamp);
    } else {
      message.optionalTimestamp = undefined;
    }
    if (object.mapOfTimestamps !== undefined && object.mapOfTimestamps !== null) {
      Object.entries(object.mapOfTimestamps).forEach(([key, value]) => {
        message.mapOfTimestamps[key] = fromJsonTimestamp(value);
      });
    }
    return message;
  },

  toJSON(message: Todo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    if (message.repeatedTimestamp) {
      obj.repeatedTimestamp = message.repeatedTimestamp.map((e) => e.toISOString());
    } else {
      obj.repeatedTimestamp = [];
    }
    message.optionalTimestamp !== undefined && (obj.optionalTimestamp = message.optionalTimestamp.toISOString());
    obj.mapOfTimestamps = {};
    if (message.mapOfTimestamps) {
      Object.entries(message.mapOfTimestamps).forEach(([k, v]) => {
        obj.mapOfTimestamps[k] = v.toISOString();
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Todo>): Todo {
    const message = { ...baseTodo } as Todo;
    message.repeatedTimestamp = [];
    message.mapOfTimestamps = {};
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = undefined;
    }
    if (object.repeatedTimestamp !== undefined && object.repeatedTimestamp !== null) {
      for (const e of object.repeatedTimestamp) {
        message.repeatedTimestamp.push(e);
      }
    }
    if (object.optionalTimestamp !== undefined && object.optionalTimestamp !== null) {
      message.optionalTimestamp = object.optionalTimestamp;
    } else {
      message.optionalTimestamp = undefined;
    }
    if (object.mapOfTimestamps !== undefined && object.mapOfTimestamps !== null) {
      Object.entries(object.mapOfTimestamps).forEach(([key, value]) => {
        if (value !== undefined) {
          message.mapOfTimestamps[key] = value;
        }
      });
    }
    return message;
  },
};

const baseTodo_MapOfTimestampsEntry: object = { key: '' };

export const Todo_MapOfTimestampsEntry = {
  encode(message: Todo_MapOfTimestampsEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Todo_MapOfTimestampsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTodo_MapOfTimestampsEntry } as Todo_MapOfTimestampsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Todo_MapOfTimestampsEntry {
    const message = { ...baseTodo_MapOfTimestampsEntry } as Todo_MapOfTimestampsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = '';
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = fromJsonTimestamp(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Todo_MapOfTimestampsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Todo_MapOfTimestampsEntry>): Todo_MapOfTimestampsEntry {
    const message = { ...baseTodo_MapOfTimestampsEntry } as Todo_MapOfTimestampsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = '';
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = undefined;
    }
    return message;
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
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
