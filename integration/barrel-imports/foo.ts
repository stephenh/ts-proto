/* eslint-disable */
import { Bar } from './bar';
import { Writer, Reader } from 'protobufjs/minimal';

export interface Foo {
  name: string;
  bar: Bar | undefined;
}

const baseFoo: object = { name: '' };

export const Foo = {
  encode(message: Foo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.bar !== undefined) {
      Bar.encode(message.bar, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Foo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFoo) as Foo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.bar = Bar.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Foo {
    const message = Object.create(baseFoo) as Foo;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.bar !== undefined && object.bar !== null) {
      message.bar = Bar.fromJSON(object.bar);
    } else {
      message.bar = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<Foo>): Foo {
    const message = { ...baseFoo } as Foo;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    if (object.bar !== undefined && object.bar !== null) {
      message.bar = Bar.fromPartial(object.bar);
    } else {
      message.bar = undefined;
    }
    return message;
  },

  toJSON(message: Foo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.bar !== undefined && (obj.bar = message.bar ? Bar.toJSON(message.bar) : undefined);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
