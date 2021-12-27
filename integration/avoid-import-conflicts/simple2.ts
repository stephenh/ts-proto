/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'simple2';

export enum SimpleEnum {
  IMPORT_DEFAULT = 0,
  IMPORT_FOO = 10,
  IMPORT_BAR = 11,
  UNRECOGNIZED = -1,
}

export function simpleEnumFromJSON(object: any): SimpleEnum {
  switch (object) {
    case 0:
    case 'IMPORT_DEFAULT':
      return SimpleEnum.IMPORT_DEFAULT;
    case 10:
    case 'IMPORT_FOO':
      return SimpleEnum.IMPORT_FOO;
    case 11:
    case 'IMPORT_BAR':
      return SimpleEnum.IMPORT_BAR;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SimpleEnum.UNRECOGNIZED;
  }
}

export function simpleEnumToJSON(object: SimpleEnum): string {
  switch (object) {
    case SimpleEnum.IMPORT_DEFAULT:
      return 'IMPORT_DEFAULT';
    case SimpleEnum.IMPORT_FOO:
      return 'IMPORT_FOO';
    case SimpleEnum.IMPORT_BAR:
      return 'IMPORT_BAR';
    default:
      return 'UNKNOWN';
  }
}

export interface Simple {
  name: string;
  age: number;
}

const createBaseSimple = (): Simple => ({ name: '', age: 0 });

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Simple {
    const message = createBaseSimple();
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    message.age = object.age !== undefined && object.age !== null ? Number(object.age) : 0;
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = Math.round(message.age));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? '';
    message.age = object.age ?? 0;
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
