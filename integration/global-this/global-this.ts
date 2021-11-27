/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'simple';

export interface Object {
  name: string;
}

export interface Error {
  name: string;
}

const baseObject: object = { name: '' };

export const Object = {
  encode(message: Object, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Object {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseObject } as Object;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Object {
    const message = { ...baseObject } as Object;
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    return message;
  },

  toJSON(message: Object): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Object>, I>>(object: I): Object {
    const message = { ...baseObject } as Object;
    message.name = object.name ?? '';
    return message;
  },
};

const baseError: object = { name: '' };

export const Error = {
  encode(message: Error, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseError } as Error;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error {
    const message = { ...baseError } as Error;
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    return message;
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = { ...baseError } as Error;
    message.name = object.name ?? '';
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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
