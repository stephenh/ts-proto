/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "something";

export interface Something {
  hello: string;
  foo: number[];
}

function createBaseSomething(): Something {
  return { hello: "", foo: [] };
}

export const Something = {
  encode(message: Something, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hello !== "") {
      writer.uint32(10).string(message.hello);
    }
    writer.uint32(18).fork();
    for (const v of message.foo) {
      writer.int32(v);
    }
    writer.ldelim();
    if ("_unknownFields" in message) {
      const msgUnknownFields: any = (message as any)["_unknownFields"];
      for (const key of Object.keys(msgUnknownFields)) {
        const values = msgUnknownFields[key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Something {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSomething();
    (message as any)._unknownFields = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.hello = reader.string();
          continue;
        case 2:
          if (tag == 16) {
            message.foo.push(reader.int32());
            continue;
          }

          if (tag == 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.foo.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      (message as any)._unknownFields[tag] = [
        ...((message as any)._unknownFields[tag] || []),
        reader.buf.slice(startPos, reader.pos),
      ];
    }
    return message;
  },
};
