/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';

export const protobufPackage = '';

export interface Baz {
  foo: FooBar | undefined;
}

export interface FooBar {}

const baseBaz: object = {};

export const Baz = {
  encode(message: Baz, writer: Writer = Writer.create()): Writer {
    if (message.foo !== undefined) {
      FooBar.encode(message.foo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Baz {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseBaz) as Baz;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.foo = FooBar.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Baz {
    const message = globalThis.Object.create(baseBaz) as Baz;
    if (object.foo !== undefined && object.foo !== null) {
      message.foo = FooBar.fromJSON(object.foo);
    } else {
      message.foo = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<Baz>): Baz {
    const message = { ...baseBaz } as Baz;
    if (object.foo !== undefined && object.foo !== null) {
      message.foo = FooBar.fromPartial(object.foo);
    } else {
      message.foo = undefined;
    }
    return message;
  },

  toJSON(message: Baz): unknown {
    const obj: any = {};
    message.foo !== undefined && (obj.foo = message.foo ? FooBar.toJSON(message.foo) : undefined);
    return obj;
  },
};

const baseFooBar: object = {};

export const FooBar = {
  encode(_: FooBar, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FooBar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseFooBar) as FooBar;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): FooBar {
    const message = globalThis.Object.create(baseFooBar) as FooBar;
    return message;
  },

  fromPartial(_: DeepPartial<FooBar>): FooBar {
    const message = { ...baseFooBar } as FooBar;
    return message;
  },

  toJSON(_: FooBar): unknown {
    const obj: any = {};
    return obj;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('Unable to locate global object');
})();

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
