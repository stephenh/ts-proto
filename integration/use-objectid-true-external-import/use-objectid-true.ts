/* eslint-disable */
import * as mongodb from 'mongodb';
import * as _m0 from 'protobufjs/minimal';
import { ObjectId } from './objectid/objectid.js';

export const protobufPackage = 'foo';

export interface Todo {
  id: string;
  oid: mongodb.ObjectId | undefined;
  repeatedOid: mongodb.ObjectId[];
  optionalOid?: mongodb.ObjectId | undefined;
  mapOfOids: { [key: string]: mongodb.ObjectId };
}

export interface Todo_MapOfOidsEntry {
  key: string;
  value: mongodb.ObjectId | undefined;
}

function createBaseTodo(): Todo {
  return { id: '', oid: undefined, repeatedOid: [], optionalOid: undefined, mapOfOids: {} };
}

export const Todo = {
  encode(message: Todo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.oid !== undefined) {
      ObjectId.encode(toProtoObjectId(message.oid), writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.repeatedOid) {
      ObjectId.encode(toProtoObjectId(v!), writer.uint32(26).fork()).ldelim();
    }
    if (message.optionalOid !== undefined) {
      ObjectId.encode(toProtoObjectId(message.optionalOid), writer.uint32(34).fork()).ldelim();
    }
    Object.entries(message.mapOfOids).forEach(([key, value]) => {
      Todo_MapOfOidsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
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
          message.oid = fromProtoObjectId(ObjectId.decode(reader, reader.uint32()));
          break;
        case 3:
          message.repeatedOid.push(fromProtoObjectId(ObjectId.decode(reader, reader.uint32())));
          break;
        case 4:
          message.optionalOid = fromProtoObjectId(ObjectId.decode(reader, reader.uint32()));
          break;
        case 5:
          const entry5 = Todo_MapOfOidsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.mapOfOids[entry5.key] = entry5.value;
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
      oid: isSet(object.oid) ? fromJsonObjectId(object.oid) : undefined,
      repeatedOid: Array.isArray(object?.repeatedOid) ? object.repeatedOid.map((e: any) => fromJsonObjectId(e)) : [],
      optionalOid: isSet(object.optionalOid) ? fromJsonObjectId(object.optionalOid) : undefined,
      mapOfOids: isObject(object.mapOfOids)
        ? Object.entries(object.mapOfOids).reduce<{ [key: string]: mongodb.ObjectId }>((acc, [key, value]) => {
            acc[key] = fromJsonObjectId(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: Todo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.oid !== undefined && (obj.oid = message.oid.toString());
    if (message.repeatedOid) {
      obj.repeatedOid = message.repeatedOid.map((e) => e.toString());
    } else {
      obj.repeatedOid = [];
    }
    message.optionalOid !== undefined && (obj.optionalOid = message.optionalOid.toString());
    obj.mapOfOids = {};
    if (message.mapOfOids) {
      Object.entries(message.mapOfOids).forEach(([k, v]) => {
        obj.mapOfOids[k] = v.toString();
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Todo>, I>>(object: I): Todo {
    const message = createBaseTodo();
    message.id = object.id ?? '';
    message.oid = object.oid !== undefined && object.oid !== null ? (object.oid as mongodb.ObjectId) : undefined;
    message.repeatedOid = object.repeatedOid?.map((e) => e as mongodb.ObjectId) || [];
    message.optionalOid =
      object.optionalOid !== undefined && object.optionalOid !== null
        ? (object.optionalOid as mongodb.ObjectId)
        : undefined;
    message.mapOfOids = Object.entries(object.mapOfOids ?? {}).reduce<{ [key: string]: mongodb.ObjectId }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value as mongodb.ObjectId;
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

function createBaseTodo_MapOfOidsEntry(): Todo_MapOfOidsEntry {
  return { key: '', value: undefined };
}

export const Todo_MapOfOidsEntry = {
  encode(message: Todo_MapOfOidsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ObjectId.encode(toProtoObjectId(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Todo_MapOfOidsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTodo_MapOfOidsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = fromProtoObjectId(ObjectId.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Todo_MapOfOidsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : '',
      value: isSet(object.value) ? fromJsonObjectId(object.value) : undefined,
    };
  },

  toJSON(message: Todo_MapOfOidsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value.toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Todo_MapOfOidsEntry>, I>>(object: I): Todo_MapOfOidsEntry {
    const message = createBaseTodo_MapOfOidsEntry();
    message.key = object.key ?? '';
    message.value =
      object.value !== undefined && object.value !== null ? (object.value as mongodb.ObjectId) : undefined;
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

function fromJsonObjectId(o: any): mongodb.ObjectId {
  if (o instanceof mongodb.ObjectId) {
    return o;
  } else if (typeof o === 'string') {
    return new mongodb.ObjectId(o);
  } else {
    return fromProtoObjectId(ObjectId.fromJSON(o));
  }
}

function fromProtoObjectId(oid: ObjectId): mongodb.ObjectId {
  return new mongodb.ObjectId(oid.value);
}

function toProtoObjectId(oid: mongodb.ObjectId): ObjectId {
  const value = oid.toString();
  return { value };
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
