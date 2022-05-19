/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'file_suffix';

export enum ChildEnum {
  DEFAULT = 0,
  FOO = 1,
  UNRECOGNIZED = -1,
}

export function childEnumFromJSON(object: any): ChildEnum {
  switch (object) {
    case 0:
    case 'DEFAULT':
      return ChildEnum.DEFAULT;
    case 1:
    case 'FOO':
      return ChildEnum.FOO;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ChildEnum.UNRECOGNIZED;
  }
}

export function childEnumToJSON(object: ChildEnum): string {
  switch (object) {
    case ChildEnum.DEFAULT:
      return 'DEFAULT';
    case ChildEnum.FOO:
      return 'FOO';
    default:
      return 'UNKNOWN';
  }
}

export interface Child {
  name: string;
}

function createBaseChild(): Child {
  return { name: '' };
}

export const Child = {
  encode(message: Child, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChild();
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

  fromJSON(object: any): Child {
    return {
      name: isSet(object.name) ? String(object.name) : '',
    };
  },

  toJSON(message: Child): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Child>, I>>(object: I): Child {
    const message = createBaseChild();
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
