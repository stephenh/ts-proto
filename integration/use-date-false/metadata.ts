/* eslint-disable */
import { Timestamp } from './google/protobuf/timestamp';
import { Writer, Reader } from 'protobufjs/minimal';

export const protobufPackage = '';

export interface Metadata {
  lastEdited: Timestamp | undefined;
}

const baseMetadata: object = {};

export const Metadata = {
  encode(message: Metadata, writer: Writer = Writer.create()): Writer {
    if (message.lastEdited !== undefined) {
      Timestamp.encode(message.lastEdited, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMetadata } as Metadata;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastEdited = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    const message = { ...baseMetadata } as Metadata;
    if (object.lastEdited !== undefined && object.lastEdited !== null) {
      message.lastEdited = fromJsonTimestamp(object.lastEdited);
    } else {
      message.lastEdited = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<Metadata>): Metadata {
    const message = { ...baseMetadata } as Metadata;
    if (object.lastEdited !== undefined && object.lastEdited !== null) {
      message.lastEdited = Timestamp.fromPartial(object.lastEdited);
    } else {
      message.lastEdited = undefined;
    }
    return message;
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.lastEdited !== undefined &&
      (obj.lastEdited = message.lastEdited !== undefined ? fromTimestamp(message.lastEdited).toISOString() : null);
    return obj;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof Date) {
    return toTimestamp(o);
  } else if (typeof o === 'string') {
    return toTimestamp(new Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}
