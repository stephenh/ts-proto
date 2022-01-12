/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'something';

export interface Something {
  hello: string;
  foo: number[];
}

const baseSomething: object = { hello: '', foo: 0 };

export const Something = {
  encode(message: Something, writer: Writer = Writer.create()): Writer {
    if (message.hello !== '') {
      writer.uint32(10).string(message.hello);
    }
    writer.uint32(18).fork();
    for (const v of message.foo) {
      writer.int32(v);
    }
    writer.ldelim();
    if ('_unknownFields' in message) {
      for (const key of Object.keys(message['_unknownFields'])) {
        const values = message['_unknownFields'][key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Something {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSomething } as Something;
    message.foo = [];
    (message as any)._unknownFields = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hello = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.foo.push(reader.int32());
            }
          } else {
            message.foo.push(reader.int32());
          }
          break;
        default:
          const startPos = reader.pos;
          reader.skipType(tag & 7);
          (message as any)._unknownFields[tag] = [
            ...((message as any)._unknownFields[tag] || []),
            reader.buf.slice(startPos, reader.pos),
          ];
          break;
      }
    }
    return message;
  },
};

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
