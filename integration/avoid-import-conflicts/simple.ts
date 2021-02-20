/* eslint-disable */
import { Simple as Simple1 } from './simple2';
import { Writer, Reader } from 'protobufjs/minimal';

export const protobufPackage = 'simple';

export interface Simple {
  name: string;
  otherSimple: Simple1 | undefined;
}

const baseSimple: object = { name: '' };

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.otherSimple !== undefined) {
      Simple1.encode(message.otherSimple, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimple } as Simple;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.otherSimple = Simple1.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Simple {
    const message = { ...baseSimple } as Simple;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.otherSimple !== undefined && object.otherSimple !== null) {
      message.otherSimple = Simple1.fromJSON(object.otherSimple);
    } else {
      message.otherSimple = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<Simple>): Simple {
    const message = { ...baseSimple } as Simple;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    if (object.otherSimple !== undefined && object.otherSimple !== null) {
      message.otherSimple = Simple1.fromPartial(object.otherSimple);
    } else {
      message.otherSimple = undefined;
    }
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.otherSimple !== undefined &&
      (obj.otherSimple = message.otherSimple ? Simple1.toJSON(message.otherSimple) : undefined);
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
