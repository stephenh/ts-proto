/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "";

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

function createBaseTodo(): Todo {
  return { id: "", timestamp: undefined, repeatedTimestamp: [], optionalTimestamp: undefined, mapOfTimestamps: {} };
}

export const Todo = {
  encode(message: Todo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTodo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.repeatedTimestamp.push(fromTimestamp(Timestamp.decode(reader, reader.uint32())));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.optionalTimestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = Todo_MapOfTimestampsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.mapOfTimestamps[entry5.key] = entry5.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Todo {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      timestamp: isSet(object.timestamp) ? globalThis.String(object.timestamp) : undefined,
      repeatedTimestamp: globalThis.Array.isArray(object?.repeatedTimestamp)
        ? object.repeatedTimestamp.map((e: any) => globalThis.String(e))
        : [],
      optionalTimestamp: isSet(object.optionalTimestamp) ? globalThis.String(object.optionalTimestamp) : undefined,
      mapOfTimestamps: isObject(object.mapOfTimestamps)
        ? Object.entries(object.mapOfTimestamps).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = globalThis.String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Todo): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp;
    }
    if (message.repeatedTimestamp?.length) {
      obj.repeatedTimestamp = message.repeatedTimestamp;
    }
    if (message.optionalTimestamp !== undefined) {
      obj.optionalTimestamp = message.optionalTimestamp;
    }
    if (message.mapOfTimestamps) {
      const entries = Object.entries(message.mapOfTimestamps);
      if (entries.length > 0) {
        obj.mapOfTimestamps = {};
        entries.forEach(([k, v]) => {
          obj.mapOfTimestamps[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Todo>, I>>(base?: I): Todo {
    return Todo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Todo>, I>>(object: I): Todo {
    const message = createBaseTodo();
    message.id = object.id ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.repeatedTimestamp = object.repeatedTimestamp?.map((e) => e) || [];
    message.optionalTimestamp = object.optionalTimestamp ?? undefined;
    message.mapOfTimestamps = Object.entries(object.mapOfTimestamps ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseTodo_MapOfTimestampsEntry(): Todo_MapOfTimestampsEntry {
  return { key: "", value: undefined };
}

export const Todo_MapOfTimestampsEntry = {
  encode(message: Todo_MapOfTimestampsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Todo_MapOfTimestampsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTodo_MapOfTimestampsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Todo_MapOfTimestampsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : undefined,
    };
  },

  toJSON(message: Todo_MapOfTimestampsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Todo_MapOfTimestampsEntry>, I>>(base?: I): Todo_MapOfTimestampsEntry {
    return Todo_MapOfTimestampsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Todo_MapOfTimestampsEntry>, I>>(object: I): Todo_MapOfTimestampsEntry {
    const message = createBaseTodo_MapOfTimestampsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(dateStr: string): Timestamp {
  const date = new globalThis.Date(dateStr);
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): string {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis).toISOString();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
