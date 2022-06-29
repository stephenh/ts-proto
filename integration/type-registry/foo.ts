/* eslint-disable */
import { messageTypeRegistry } from './typeRegistry';
import { Timestamp } from './google/protobuf/timestamp.js';
import * as _m0 from 'protobufjs/minimal';
import { Struct } from './google/protobuf/struct.js';

export const protobufPackage = 'foo';

export interface Foo {
  $type: 'foo.Foo';
  timestamp: Date | undefined;
}

export interface Foo2 {
  $type: 'foo.Foo2';
  timestamp: Date | undefined;
}

export interface WithStruct {
  $type: 'foo.WithStruct';
  struct: { [key: string]: any } | undefined;
}

function createBaseFoo(): Foo {
  return { $type: 'foo.Foo', timestamp: undefined };
}

export const Foo = {
  $type: 'foo.Foo' as const,

  encode(message: Foo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Foo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFoo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Foo {
    return {
      $type: Foo.$type,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: Foo): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Foo>, I>>(object: I): Foo {
    const message = createBaseFoo();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Foo.$type, Foo);

function createBaseFoo2(): Foo2 {
  return { $type: 'foo.Foo2', timestamp: undefined };
}

export const Foo2 = {
  $type: 'foo.Foo2' as const,

  encode(message: Foo2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Foo2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFoo2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Foo2 {
    return {
      $type: Foo2.$type,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: Foo2): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Foo2>, I>>(object: I): Foo2 {
    const message = createBaseFoo2();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Foo2.$type, Foo2);

function createBaseWithStruct(): WithStruct {
  return { $type: 'foo.WithStruct', struct: undefined };
}

export const WithStruct = {
  $type: 'foo.WithStruct' as const,

  encode(message: WithStruct, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.struct !== undefined) {
      Struct.encode(Struct.wrap(message.struct), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithStruct {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithStruct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.struct = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithStruct {
    return {
      $type: WithStruct.$type,
      struct: isObject(object.struct) ? object.struct : undefined,
    };
  },

  toJSON(message: WithStruct): unknown {
    const obj: any = {};
    message.struct !== undefined && (obj.struct = message.struct);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WithStruct>, I>>(object: I): WithStruct {
    const message = createBaseWithStruct();
    message.struct = object.struct ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WithStruct.$type, WithStruct);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P> | '$type'>, never>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { $type: 'google.protobuf.Timestamp', seconds, nanos };
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
