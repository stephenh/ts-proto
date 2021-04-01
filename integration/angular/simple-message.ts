/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'angular';

export interface SimpleMessage {
  numberField: number;
}

const baseSimpleMessage: object = { numberField: 0 };

export const SimpleMessage = {
  encode(message: SimpleMessage, writer: Writer = Writer.create()): Writer {
    if (message.numberField !== 0) {
      writer.uint32(8).int32(message.numberField);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleMessage } as SimpleMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numberField = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleMessage {
    const message = { ...baseSimpleMessage } as SimpleMessage;
    if (object.numberField !== undefined && object.numberField !== null) {
      message.numberField = Number(object.numberField);
    } else {
      message.numberField = 0;
    }
    return message;
  },

  toJSON(message: SimpleMessage): unknown {
    const obj: any = {};
    message.numberField !== undefined && (obj.numberField = message.numberField);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleMessage>): SimpleMessage {
    const message = { ...baseSimpleMessage } as SimpleMessage;
    if (object.numberField !== undefined && object.numberField !== null) {
      message.numberField = object.numberField;
    } else {
      message.numberField = 0;
    }
    return message;
  },
};

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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
