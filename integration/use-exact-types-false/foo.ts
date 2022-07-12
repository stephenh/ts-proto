/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'foo';

export interface Foo {
  bar: string;
  baz: string;
}

function createBaseFoo(): Foo {
  return { bar: '', baz: '' };
}

export const Foo = {
  encode(message: Foo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bar !== '') {
      writer.uint32(10).string(message.bar);
    }
    if (message.baz !== '') {
      writer.uint32(18).string(message.baz);
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
          message.bar = reader.string();
          break;
        case 2:
          message.baz = reader.string();
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
      bar: isSet(object.bar) ? String(object.bar) : '',
      baz: isSet(object.baz) ? String(object.baz) : '',
    };
  },

  toJSON(message: Foo): unknown {
    const obj: any = {};
    message.bar !== undefined && (obj.bar = message.bar);
    message.baz !== undefined && (obj.baz = message.baz);
    return obj;
  },

  fromPartial(object: DeepPartial<Foo>): Foo {
    const message = createBaseFoo();
    message.bar = object.bar ?? '';
    message.baz = object.baz ?? '';
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
