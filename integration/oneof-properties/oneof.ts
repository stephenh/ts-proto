/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'oneof';

export interface PleaseChoose {
  name: string;
  /**
   * Use this if you want a number. Numbers are great. Who doesn't
   * like them?
   */
  aNumber: number | undefined;
  /**
   * Use this if you want a string. Strings are also nice. Not as
   * nice as numbers, but what are you going to do...
   */
  aString: string | undefined;
  aMessage: PleaseChoose_Submessage | undefined;
  /**
   * We also added a bool option! This was added after the 'age'
   * field, so it has a higher number.
   */
  aBool: boolean | undefined;
  bunchaBytes: Uint8Array | undefined;
  anEnum: PleaseChoose_StateEnum | undefined;
  age: number;
  either: string | undefined;
  or: string | undefined;
  thirdOption: string | undefined;
}

export enum PleaseChoose_StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
  UNRECOGNIZED = -1,
}

export function pleaseChoose_StateEnumFromJSON(object: any): PleaseChoose_StateEnum {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return PleaseChoose_StateEnum.UNKNOWN;
    case 2:
    case 'ON':
      return PleaseChoose_StateEnum.ON;
    case 3:
    case 'OFF':
      return PleaseChoose_StateEnum.OFF;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PleaseChoose_StateEnum.UNRECOGNIZED;
  }
}

export function pleaseChoose_StateEnumToJSON(object: PleaseChoose_StateEnum): string {
  switch (object) {
    case PleaseChoose_StateEnum.UNKNOWN:
      return 'UNKNOWN';
    case PleaseChoose_StateEnum.ON:
      return 'ON';
    case PleaseChoose_StateEnum.OFF:
      return 'OFF';
    default:
      return 'UNKNOWN';
  }
}

export interface PleaseChoose_Submessage {
  name: string;
}

const basePleaseChoose: object = { name: '', age: 0 };

export const PleaseChoose = {
  encode(message: PleaseChoose, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.aNumber !== undefined) {
      writer.uint32(17).double(message.aNumber);
    }
    if (message.aString !== undefined) {
      writer.uint32(26).string(message.aString);
    }
    if (message.aMessage !== undefined) {
      PleaseChoose_Submessage.encode(message.aMessage, writer.uint32(34).fork()).ldelim();
    }
    if (message.aBool !== undefined) {
      writer.uint32(48).bool(message.aBool);
    }
    if (message.bunchaBytes !== undefined) {
      writer.uint32(82).bytes(message.bunchaBytes);
    }
    if (message.anEnum !== undefined) {
      writer.uint32(88).int32(message.anEnum);
    }
    if (message.age !== 0) {
      writer.uint32(40).uint32(message.age);
    }
    if (message.either !== undefined) {
      writer.uint32(58).string(message.either);
    }
    if (message.or !== undefined) {
      writer.uint32(66).string(message.or);
    }
    if (message.thirdOption !== undefined) {
      writer.uint32(74).string(message.thirdOption);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PleaseChoose {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePleaseChoose } as PleaseChoose;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.aNumber = reader.double();
          break;
        case 3:
          message.aString = reader.string();
          break;
        case 4:
          message.aMessage = PleaseChoose_Submessage.decode(reader, reader.uint32());
          break;
        case 6:
          message.aBool = reader.bool();
          break;
        case 10:
          message.bunchaBytes = reader.bytes();
          break;
        case 11:
          message.anEnum = reader.int32() as any;
          break;
        case 5:
          message.age = reader.uint32();
          break;
        case 7:
          message.either = reader.string();
          break;
        case 8:
          message.or = reader.string();
          break;
        case 9:
          message.thirdOption = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PleaseChoose {
    const message = { ...basePleaseChoose } as PleaseChoose;
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    message.aNumber = object.aNumber !== undefined && object.aNumber !== null ? Number(object.aNumber) : undefined;
    message.aString = object.aString !== undefined && object.aString !== null ? String(object.aString) : undefined;
    message.aMessage =
      object.aMessage !== undefined && object.aMessage !== null
        ? PleaseChoose_Submessage.fromJSON(object.aMessage)
        : undefined;
    message.aBool = object.aBool !== undefined && object.aBool !== null ? Boolean(object.aBool) : undefined;
    message.bunchaBytes =
      object.bunchaBytes !== undefined && object.bunchaBytes !== null ? bytesFromBase64(object.bunchaBytes) : undefined;
    message.anEnum =
      object.anEnum !== undefined && object.anEnum !== null ? pleaseChoose_StateEnumFromJSON(object.anEnum) : undefined;
    message.age = object.age !== undefined && object.age !== null ? Number(object.age) : 0;
    message.either = object.either !== undefined && object.either !== null ? String(object.either) : undefined;
    message.or = object.or !== undefined && object.or !== null ? String(object.or) : undefined;
    message.thirdOption =
      object.thirdOption !== undefined && object.thirdOption !== null ? String(object.thirdOption) : undefined;
    return message;
  },

  toJSON(message: PleaseChoose): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.aNumber !== undefined && (obj.aNumber = message.aNumber);
    message.aString !== undefined && (obj.aString = message.aString);
    message.aMessage !== undefined &&
      (obj.aMessage = message.aMessage ? PleaseChoose_Submessage.toJSON(message.aMessage) : undefined);
    message.aBool !== undefined && (obj.aBool = message.aBool);
    message.bunchaBytes !== undefined &&
      (obj.bunchaBytes = message.bunchaBytes !== undefined ? base64FromBytes(message.bunchaBytes) : undefined);
    message.anEnum !== undefined &&
      (obj.anEnum = message.anEnum !== undefined ? pleaseChoose_StateEnumToJSON(message.anEnum) : undefined);
    message.age !== undefined && (obj.age = message.age);
    message.either !== undefined && (obj.either = message.either);
    message.or !== undefined && (obj.or = message.or);
    message.thirdOption !== undefined && (obj.thirdOption = message.thirdOption);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PleaseChoose>, I>>(object: I): PleaseChoose {
    const message = { ...basePleaseChoose } as PleaseChoose;
    message.name = object.name ?? '';
    message.aNumber = object.aNumber ?? undefined;
    message.aString = object.aString ?? undefined;
    message.aMessage =
      object.aMessage !== undefined && object.aMessage !== null
        ? PleaseChoose_Submessage.fromPartial(object.aMessage)
        : undefined;
    message.aBool = object.aBool ?? undefined;
    message.bunchaBytes = object.bunchaBytes ?? undefined;
    message.anEnum = object.anEnum ?? undefined;
    message.age = object.age ?? 0;
    message.either = object.either ?? undefined;
    message.or = object.or ?? undefined;
    message.thirdOption = object.thirdOption ?? undefined;
    return message;
  },
};

const basePleaseChoose_Submessage: object = { name: '' };

export const PleaseChoose_Submessage = {
  encode(message: PleaseChoose_Submessage, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PleaseChoose_Submessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePleaseChoose_Submessage } as PleaseChoose_Submessage;
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

  fromJSON(object: any): PleaseChoose_Submessage {
    const message = { ...basePleaseChoose_Submessage } as PleaseChoose_Submessage;
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    return message;
  },

  toJSON(message: PleaseChoose_Submessage): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PleaseChoose_Submessage>, I>>(object: I): PleaseChoose_Submessage {
    const message = { ...basePleaseChoose_Submessage } as PleaseChoose_Submessage;
    message.name = object.name ?? '';
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(''));
}

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
