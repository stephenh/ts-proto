/* eslint-disable */
import { messageTypeRegistry } from '../typeRegistry';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Foo } from '../foo';

export const protobufPackage = 'foo.bar';

export interface Bar {
  $type: 'foo.bar.Bar';
  foo: Foo | undefined;
}

const baseBar: object = { $type: 'foo.bar.Bar' };

export const Bar = {
  $type: 'foo.bar.Bar' as const,

  encode(message: Bar, writer: Writer = Writer.create()): Writer {
    if (message.foo !== undefined) {
      Foo.encode(message.foo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Bar {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBar } as Bar;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.foo = Foo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bar {
    const message = { ...baseBar } as Bar;
    message.foo = object.foo !== undefined && object.foo !== null ? Foo.fromJSON(object.foo) : undefined;
    return message;
  },

  toJSON(message: Bar): unknown {
    const obj: any = {};
    message.foo !== undefined && (obj.foo = message.foo ? Foo.toJSON(message.foo) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Bar>): Bar {
    const message = { ...baseBar } as Bar;
    message.foo = object.foo !== undefined && object.foo !== null ? Foo.fromPartial(object.foo) : undefined;
    return message;
  },
};

messageTypeRegistry.set(Bar.$type, Bar);

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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
