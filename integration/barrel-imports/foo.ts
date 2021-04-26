/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Bar } from './bar';

export interface Foo {
  name: string;
  bar: Bar | undefined;
}

const baseFoo: object = { name: '' };

export const Foo = {
  encode(message: Foo, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.bar !== undefined) {
      Bar.encode(message.bar, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Foo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFoo } as Foo;
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
    const message = { ...baseFoo } as Foo;
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

  toJSON(message: Foo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.bar !== undefined && (obj.bar = message.bar ? Bar.toJSON(message.bar) : undefined);
    return obj;
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
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
