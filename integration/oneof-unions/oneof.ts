/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';
import { Value } from './google/protobuf/struct.js';

export const protobufPackage = 'oneof';

export interface PleaseChoose {
  name: string;
  choice?:
    | { $case: 'aNumber'; aNumber: number }
    | { $case: 'aString'; aString: string }
    | { $case: 'aMessage'; aMessage: PleaseChoose_Submessage }
    | { $case: 'aBool'; aBool: boolean }
    | { $case: 'bunchaBytes'; bunchaBytes: Uint8Array }
    | { $case: 'anEnum'; anEnum: PleaseChoose_StateEnum };
  age: number;
  eitherOr?:
    | { $case: 'either'; either: string }
    | { $case: 'or'; or: string }
    | { $case: 'thirdOption'; thirdOption: string };
  signature: Uint8Array;
  value: any | undefined;
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
    case PleaseChoose_StateEnum.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface PleaseChoose_Submessage {
  name: string;
}

/** For testing proto3's field presence feature. */
export interface SimpleButOptional {
  name?: string | undefined;
  age?: number | undefined;
}

function createBasePleaseChoose(): PleaseChoose {
  return { name: '', choice: undefined, age: 0, eitherOr: undefined, signature: new Uint8Array(), value: undefined };
}

export const PleaseChoose = {
  encode(message: PleaseChoose, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.choice?.$case === 'aNumber') {
      writer.uint32(17).double(message.choice.aNumber);
    }
    if (message.choice?.$case === 'aString') {
      writer.uint32(26).string(message.choice.aString);
    }
    if (message.choice?.$case === 'aMessage') {
      PleaseChoose_Submessage.encode(message.choice.aMessage, writer.uint32(34).fork()).ldelim();
    }
    if (message.choice?.$case === 'aBool') {
      writer.uint32(48).bool(message.choice.aBool);
    }
    if (message.choice?.$case === 'bunchaBytes') {
      writer.uint32(82).bytes(message.choice.bunchaBytes);
    }
    if (message.choice?.$case === 'anEnum') {
      writer.uint32(88).int32(message.choice.anEnum);
    }
    if (message.age !== 0) {
      writer.uint32(40).uint32(message.age);
    }
    if (message.eitherOr?.$case === 'either') {
      writer.uint32(58).string(message.eitherOr.either);
    }
    if (message.eitherOr?.$case === 'or') {
      writer.uint32(66).string(message.eitherOr.or);
    }
    if (message.eitherOr?.$case === 'thirdOption') {
      writer.uint32(74).string(message.eitherOr.thirdOption);
    }
    if (message.signature.length !== 0) {
      writer.uint32(98).bytes(message.signature);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PleaseChoose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePleaseChoose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.choice = { $case: 'aNumber', aNumber: reader.double() };
          break;
        case 3:
          message.choice = { $case: 'aString', aString: reader.string() };
          break;
        case 4:
          message.choice = { $case: 'aMessage', aMessage: PleaseChoose_Submessage.decode(reader, reader.uint32()) };
          break;
        case 6:
          message.choice = { $case: 'aBool', aBool: reader.bool() };
          break;
        case 10:
          message.choice = { $case: 'bunchaBytes', bunchaBytes: reader.bytes() };
          break;
        case 11:
          message.choice = { $case: 'anEnum', anEnum: reader.int32() as any };
          break;
        case 5:
          message.age = reader.uint32();
          break;
        case 7:
          message.eitherOr = { $case: 'either', either: reader.string() };
          break;
        case 8:
          message.eitherOr = { $case: 'or', or: reader.string() };
          break;
        case 9:
          message.eitherOr = { $case: 'thirdOption', thirdOption: reader.string() };
          break;
        case 12:
          message.signature = reader.bytes();
          break;
        case 13:
          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PleaseChoose {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      choice: isSet(object.aNumber)
        ? { $case: 'aNumber', aNumber: Number(object.aNumber) }
        : isSet(object.aString)
        ? { $case: 'aString', aString: String(object.aString) }
        : isSet(object.aMessage)
        ? { $case: 'aMessage', aMessage: PleaseChoose_Submessage.fromJSON(object.aMessage) }
        : isSet(object.aBool)
        ? { $case: 'aBool', aBool: Boolean(object.aBool) }
        : isSet(object.bunchaBytes)
        ? { $case: 'bunchaBytes', bunchaBytes: bytesFromBase64(object.bunchaBytes) }
        : isSet(object.anEnum)
        ? { $case: 'anEnum', anEnum: pleaseChoose_StateEnumFromJSON(object.anEnum) }
        : undefined,
      age: isSet(object.age) ? Number(object.age) : 0,
      eitherOr: isSet(object.either)
        ? { $case: 'either', either: String(object.either) }
        : isSet(object.or)
        ? { $case: 'or', or: String(object.or) }
        : isSet(object.thirdOption)
        ? { $case: 'thirdOption', thirdOption: String(object.thirdOption) }
        : undefined,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(),
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: PleaseChoose): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.choice?.$case === 'aNumber' && (obj.aNumber = message.choice?.aNumber);
    message.choice?.$case === 'aString' && (obj.aString = message.choice?.aString);
    message.choice?.$case === 'aMessage' &&
      (obj.aMessage = message.choice?.aMessage ? PleaseChoose_Submessage.toJSON(message.choice?.aMessage) : undefined);
    message.choice?.$case === 'aBool' && (obj.aBool = message.choice?.aBool);
    message.choice?.$case === 'bunchaBytes' &&
      (obj.bunchaBytes =
        message.choice?.bunchaBytes !== undefined ? base64FromBytes(message.choice?.bunchaBytes) : undefined);
    message.choice?.$case === 'anEnum' &&
      (obj.anEnum =
        message.choice?.anEnum !== undefined ? pleaseChoose_StateEnumToJSON(message.choice?.anEnum) : undefined);
    message.age !== undefined && (obj.age = Math.round(message.age));
    message.eitherOr?.$case === 'either' && (obj.either = message.eitherOr?.either);
    message.eitherOr?.$case === 'or' && (obj.or = message.eitherOr?.or);
    message.eitherOr?.$case === 'thirdOption' && (obj.thirdOption = message.eitherOr?.thirdOption);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PleaseChoose>, I>>(object: I): PleaseChoose {
    const message = createBasePleaseChoose();
    message.name = object.name ?? '';
    if (object.choice?.$case === 'aNumber' && object.choice?.aNumber !== undefined && object.choice?.aNumber !== null) {
      message.choice = { $case: 'aNumber', aNumber: object.choice.aNumber };
    }
    if (object.choice?.$case === 'aString' && object.choice?.aString !== undefined && object.choice?.aString !== null) {
      message.choice = { $case: 'aString', aString: object.choice.aString };
    }
    if (
      object.choice?.$case === 'aMessage' &&
      object.choice?.aMessage !== undefined &&
      object.choice?.aMessage !== null
    ) {
      message.choice = { $case: 'aMessage', aMessage: PleaseChoose_Submessage.fromPartial(object.choice.aMessage) };
    }
    if (object.choice?.$case === 'aBool' && object.choice?.aBool !== undefined && object.choice?.aBool !== null) {
      message.choice = { $case: 'aBool', aBool: object.choice.aBool };
    }
    if (
      object.choice?.$case === 'bunchaBytes' &&
      object.choice?.bunchaBytes !== undefined &&
      object.choice?.bunchaBytes !== null
    ) {
      message.choice = { $case: 'bunchaBytes', bunchaBytes: object.choice.bunchaBytes };
    }
    if (object.choice?.$case === 'anEnum' && object.choice?.anEnum !== undefined && object.choice?.anEnum !== null) {
      message.choice = { $case: 'anEnum', anEnum: object.choice.anEnum };
    }
    message.age = object.age ?? 0;
    if (
      object.eitherOr?.$case === 'either' &&
      object.eitherOr?.either !== undefined &&
      object.eitherOr?.either !== null
    ) {
      message.eitherOr = { $case: 'either', either: object.eitherOr.either };
    }
    if (object.eitherOr?.$case === 'or' && object.eitherOr?.or !== undefined && object.eitherOr?.or !== null) {
      message.eitherOr = { $case: 'or', or: object.eitherOr.or };
    }
    if (
      object.eitherOr?.$case === 'thirdOption' &&
      object.eitherOr?.thirdOption !== undefined &&
      object.eitherOr?.thirdOption !== null
    ) {
      message.eitherOr = { $case: 'thirdOption', thirdOption: object.eitherOr.thirdOption };
    }
    message.signature = object.signature ?? new Uint8Array();
    message.value = object.value ?? undefined;
    return message;
  },
};

function createBasePleaseChoose_Submessage(): PleaseChoose_Submessage {
  return { name: '' };
}

export const PleaseChoose_Submessage = {
  encode(message: PleaseChoose_Submessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PleaseChoose_Submessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePleaseChoose_Submessage();
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
    return {
      name: isSet(object.name) ? String(object.name) : '',
    };
  },

  toJSON(message: PleaseChoose_Submessage): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PleaseChoose_Submessage>, I>>(object: I): PleaseChoose_Submessage {
    const message = createBasePleaseChoose_Submessage();
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseSimpleButOptional(): SimpleButOptional {
  return { name: undefined, age: undefined };
}

export const SimpleButOptional = {
  encode(message: SimpleButOptional, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== undefined) {
      writer.uint32(16).int32(message.age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleButOptional {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleButOptional();
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

  fromJSON(object: any): SimpleButOptional {
    return {
      name: isSet(object.name) ? String(object.name) : undefined,
      age: isSet(object.age) ? Number(object.age) : undefined,
    };
  },

  toJSON(message: SimpleButOptional): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = Math.round(message.age));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleButOptional>, I>>(object: I): SimpleButOptional {
    const message = createBaseSimpleButOptional();
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
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
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(''));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]> } & { $case: T['$case'] }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
