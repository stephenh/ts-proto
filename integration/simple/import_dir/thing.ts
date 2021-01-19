import { Writer, Reader } from 'protobufjs/minimal';
import { Timestamp } from '../google/protobuf/timestamp';

/* eslint-disable */

export const protobufPackage = 'simple';

export interface ImportedThing {
  createdAt: Date | undefined;
}

const baseImportedThing: object = {};

export const ImportedThing = {
  encode(message: ImportedThing, writer: Writer = Writer.create()): Writer {
    if (message.createdAt !== undefined && message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ImportedThing {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseImportedThing } as ImportedThing;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImportedThing {
    const message = { ...baseImportedThing } as ImportedThing;
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = fromJsonTimestamp(object.createdAt);
    } else {
      message.createdAt = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<ImportedThing>): ImportedThing {
    const message = { ...baseImportedThing } as ImportedThing;
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = undefined;
    }
    return message;
  },

  toJSON(message: ImportedThing): unknown {
    const obj: any = {};
    message.createdAt !== undefined &&
      (obj.createdAt = message.createdAt !== undefined ? message.createdAt.toISOString() : null);
    return obj;
  },
};
