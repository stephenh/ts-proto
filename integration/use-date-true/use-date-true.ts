/* eslint-disable */
import { Timestamp } from './google/protobuf/timestamp.js';
import { Empty } from './google/protobuf/empty.js';
import * as _m0 from 'protobufjs/minimal';

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

function createBaseTodo(): Todo {
  return { id: '', timestamp: undefined, repeatedTimestamp: [], optionalTimestamp: undefined, mapOfTimestamps: {} };
}

export const Todo = {
  encode(message: Todo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Todo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTodo();
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
    return {
      id: isSet(object.id) ? String(object.id) : '',
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      repeatedTimestamp: Array.isArray(object?.repeatedTimestamp)
        ? object.repeatedTimestamp.map((e: any) => fromJsonTimestamp(e))
        : [],
      optionalTimestamp: isSet(object.optionalTimestamp) ? fromJsonTimestamp(object.optionalTimestamp) : undefined,
      mapOfTimestamps: isObject(object.mapOfTimestamps)
        ? Object.entries(object.mapOfTimestamps).reduce<{ [key: string]: Date }>((acc, [key, value]) => {
            acc[key] = fromJsonTimestamp(value);
            return acc;
          }, {})
        : {},
    };
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

  fromPartial<I extends Exact<DeepPartial<Todo>, I>>(object: I): Todo {
    const message = createBaseTodo();
    message.id = object.id ?? '';
    message.timestamp = object.timestamp ?? undefined;
    message.repeatedTimestamp = object.repeatedTimestamp?.map((e) => e) || [];
    message.optionalTimestamp = object.optionalTimestamp ?? undefined;
    message.mapOfTimestamps = Object.entries(object.mapOfTimestamps ?? {}).reduce<{ [key: string]: Date }>(
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

function createBaseTodo_MapOfTimestampsEntry(): Todo_MapOfTimestampsEntry {
  return { key: '', value: undefined };
}

export const Todo_MapOfTimestampsEntry = {
  encode(message: Todo_MapOfTimestampsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Todo_MapOfTimestampsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTodo_MapOfTimestampsEntry();
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
    return {
      key: isSet(object.key) ? String(object.key) : '',
      value: isSet(object.value) ? fromJsonTimestamp(object.value) : undefined,
    };
  },

  toJSON(message: Todo_MapOfTimestampsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Todo_MapOfTimestampsEntry>, I>>(object: I): Todo_MapOfTimestampsEntry {
    const message = createBaseTodo_MapOfTimestampsEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? undefined;
    return message;
  },
};

export interface Clock {
  Now(request: Empty): Promise<Date>;
}

export class ClockClientImpl implements Clock {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Now = this.Now.bind(this);
  }
  Now(request: Empty): Promise<Date> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request('Clock', 'Now', data);
    return promise.then((data) => fromTimestamp(Timestamp.decode(new _m0.Reader(data))));
  }
}

export type ClockDefinition = typeof ClockDefinition;
export const ClockDefinition = {
  name: 'Clock',
  fullName: 'Clock',
  methods: {
    now: {
      name: 'Now',
      requestType: Empty,
      requestStream: false,
      responseType: Timestamp,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
