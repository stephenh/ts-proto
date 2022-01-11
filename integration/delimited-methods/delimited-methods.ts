/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = '';

export interface Simple {
  name: string;
  age: number;
  children: string[];
}

export interface AnotherSimple {
  num: number;
  str: string;
}

function createBaseSimple(): Simple {
  return { name: '', age: 0, children: [] };
}

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    for (const v of message.children) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.age = reader.int32();
          break;
        case 3:
          message.children.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  encodeDelimited(message: Simple, writer: Writer = Writer.create()): Writer {
    return this.encode(message, writer.fork()).ldelim();
  },

  decodeDelimited(input: Reader | Uint8Array): Simple {
    const reader = input instanceof Reader ? input : new Reader(input);
    const length = reader.uint32();
    return this.decode(reader, length);
  },

  fromJSON(object: any): Simple {
    const message = createBaseSimple();
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    message.age = object.age !== undefined && object.age !== null ? Number(object.age) : 0;
    message.children = (object.children ?? []).map((e: any) => String(e));
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = Math.round(message.age));
    if (message.children) {
      obj.children = message.children.map((e) => e);
    } else {
      obj.children = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? '';
    message.age = object.age ?? 0;
    message.children = object.children?.map((e) => e) || [];
    return message;
  },
};

function createBaseAnotherSimple(): AnotherSimple {
  return { num: 0, str: '' };
}

export const AnotherSimple = {
  encode(message: AnotherSimple, writer: Writer = Writer.create()): Writer {
    if (message.num !== 0) {
      writer.uint32(13).float(message.num);
    }
    if (message.str !== '') {
      writer.uint32(18).string(message.str);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AnotherSimple {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnotherSimple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.num = reader.float();
          break;
        case 2:
          message.str = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  encodeDelimited(message: AnotherSimple, writer: Writer = Writer.create()): Writer {
    return this.encode(message, writer.fork()).ldelim();
  },

  decodeDelimited(input: Reader | Uint8Array): AnotherSimple {
    const reader = input instanceof Reader ? input : new Reader(input);
    const length = reader.uint32();
    return this.decode(reader, length);
  },

  fromJSON(object: any): AnotherSimple {
    const message = createBaseAnotherSimple();
    message.num = object.num !== undefined && object.num !== null ? Number(object.num) : 0;
    message.str = object.str !== undefined && object.str !== null ? String(object.str) : '';
    return message;
  },

  toJSON(message: AnotherSimple): unknown {
    const obj: any = {};
    message.num !== undefined && (obj.num = message.num);
    message.str !== undefined && (obj.str = message.str);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnotherSimple>, I>>(object: I): AnotherSimple {
    const message = createBaseAnotherSimple();
    message.num = object.num ?? 0;
    message.str = object.str ?? '';
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
