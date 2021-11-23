/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Timestamp } from './google/protobuf/timestamp';

export const protobufPackage = '';

export interface Todo {
  id: string;
  timestamp: string | undefined;
  repeatedTimestamp: string[];
  optionalTimestamp?: string | undefined;
  mapOfTimestamps: { [key: string]: string };
}

export interface Todo_MapOfTimestampsEntry {
  key: string;
  value: string | undefined;
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
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : '';
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null ? String(object.timestamp) : undefined;
    message.repeatedTimestamp = (object.repeatedTimestamp ?? []).map((e: any) => String(e));
    message.optionalTimestamp =
      object.optionalTimestamp !== undefined && object.optionalTimestamp !== null
        ? String(object.optionalTimestamp)
        : undefined;
    message.mapOfTimestamps = Object.entries(object.mapOfTimestamps ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {}
    );
    return message;
  },

  toJSON(message: Todo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    if (message.repeatedTimestamp) {
      obj.repeatedTimestamp = message.repeatedTimestamp.map((e) => e);
    } else {
      obj.repeatedTimestamp = [];
    }
    message.optionalTimestamp !== undefined && (obj.optionalTimestamp = message.optionalTimestamp);
    obj.mapOfTimestamps = {};
    if (message.mapOfTimestamps) {
      Object.entries(message.mapOfTimestamps).forEach(([k, v]) => {
        obj.mapOfTimestamps[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Todo>): Todo {
    const message = { ...baseTodo } as Todo;
    message.id = object.id ?? '';
    message.timestamp = object.timestamp ?? undefined;
    message.repeatedTimestamp = (object.repeatedTimestamp ?? []).map((e) => e);
    message.optionalTimestamp = object.optionalTimestamp ?? undefined;
    message.mapOfTimestamps = Object.entries(object.mapOfTimestamps ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
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
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.key = object.key !== undefined && object.key !== null ? String(object.key) : '';
    message.value = object.value !== undefined && object.value !== null ? String(object.value) : undefined;
    return message;
  },

  toJSON(message: Todo_MapOfTimestampsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<Todo_MapOfTimestampsEntry>): Todo_MapOfTimestampsEntry {
    const message = { ...baseTodo_MapOfTimestampsEntry } as Todo_MapOfTimestampsEntry;
    message.key = object.key ?? '';
    message.value = object.value ?? undefined;
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

function toTimestamp(dateStr: string): Timestamp {
  const date = new Date(dateStr);
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): string {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis).toISOString();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
