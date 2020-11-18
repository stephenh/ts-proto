import { Writer, Reader } from 'protobufjs/minimal';


export interface PleaseChoose {
  name: string;
  /**
   *  Please to be choosing one of the fields within this oneof clause.
   *  This text exists to ensure we transpose comments correctly.
   *
   * aNumber
   *  Use this if you want a number. Numbers are great. Who doesn't
   *  like them?
   *
   * aString
   *  Use this if you want a string. Strings are also nice. Not as
   *  nice as numbers, but what are you going to do...
   *
   * aBool
   *  We also added a bool option! This was added after the 'age'
   *  field, so it has a higher number.
   */
  choice?: { $case: 'aNumber', aNumber: number } | { $case: 'aString', aString: string } | { $case: 'aMessage', aMessage: PleaseChoose_Submessage } | { $case: 'aBool', aBool: boolean } | { $case: 'bunchaBytes', bunchaBytes: Uint8Array } | { $case: 'anEnum', anEnum: PleaseChoose_StateEnum };
  age: number;
  eitherOr?: { $case: 'either', either: string } | { $case: 'or', or: string } | { $case: 'thirdOption', thirdOption: string };
}

export interface PleaseChoose_Submessage {
  name: string;
}

/**
 * * For testing proto3's field presence feature.  */
export interface SimpleButOptional {
  name?: string | undefined;
  age?: number | undefined;
}

const basePleaseChoose: object = {
  name: "",
  age: 0,
};

const basePleaseChoose_Submessage: object = {
  name: "",
};

const baseSimpleButOptional: object = {
};

export const protobufPackage = 'oneof'

export enum PleaseChoose_StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
  UNRECOGNIZED = -1,
}

export function pleaseChoose_StateEnumFromJSON(object: any): PleaseChoose_StateEnum {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return PleaseChoose_StateEnum.UNKNOWN;
    case 2:
    case "ON":
      return PleaseChoose_StateEnum.ON;
    case 3:
    case "OFF":
      return PleaseChoose_StateEnum.OFF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PleaseChoose_StateEnum.UNRECOGNIZED;
  }
}

export function pleaseChoose_StateEnumToJSON(object: PleaseChoose_StateEnum): string {
  switch (object) {
    case PleaseChoose_StateEnum.UNKNOWN:
      return "UNKNOWN";
    case PleaseChoose_StateEnum.ON:
      return "ON";
    case PleaseChoose_StateEnum.OFF:
      return "OFF";
    default:
      return "UNKNOWN";
  }
}

export const PleaseChoose = {
  encode(message: PleaseChoose, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
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
    writer.uint32(40).uint32(message.age);
    if (message.eitherOr?.$case === 'either') {
      writer.uint32(58).string(message.eitherOr.either);
    }
    if (message.eitherOr?.$case === 'or') {
      writer.uint32(66).string(message.eitherOr.or);
    }
    if (message.eitherOr?.$case === 'thirdOption') {
      writer.uint32(74).string(message.eitherOr.thirdOption);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PleaseChoose {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePleaseChoose } as PleaseChoose;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.choice = {$case: 'aNumber', aNumber: reader.double()};
          break;
        case 3:
          message.choice = {$case: 'aString', aString: reader.string()};
          break;
        case 4:
          message.choice = {$case: 'aMessage', aMessage: PleaseChoose_Submessage.decode(reader, reader.uint32())};
          break;
        case 6:
          message.choice = {$case: 'aBool', aBool: reader.bool()};
          break;
        case 10:
          message.choice = {$case: 'bunchaBytes', bunchaBytes: reader.bytes()};
          break;
        case 11:
          message.choice = {$case: 'anEnum', anEnum: reader.int32() as any};
          break;
        case 5:
          message.age = reader.uint32();
          break;
        case 7:
          message.eitherOr = {$case: 'either', either: reader.string()};
          break;
        case 8:
          message.eitherOr = {$case: 'or', or: reader.string()};
          break;
        case 9:
          message.eitherOr = {$case: 'thirdOption', thirdOption: reader.string()};
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    }
    if (object.aNumber !== undefined && object.aNumber !== null) {
      message.choice = {$case: 'aNumber', aNumber: Number(object.aNumber)};
    }
    if (object.aString !== undefined && object.aString !== null) {
      message.choice = {$case: 'aString', aString: String(object.aString)};
    }
    if (object.aMessage !== undefined && object.aMessage !== null) {
      message.choice = {$case: 'aMessage', aMessage: PleaseChoose_Submessage.fromJSON(object.aMessage)};
    }
    if (object.aBool !== undefined && object.aBool !== null) {
      message.choice = {$case: 'aBool', aBool: Boolean(object.aBool)};
    }
    if (object.bunchaBytes !== undefined && object.bunchaBytes !== null) {
      message.choice = {$case: 'bunchaBytes', bunchaBytes: bytesFromBase64(object.bunchaBytes)};
    }
    if (object.anEnum !== undefined && object.anEnum !== null) {
      message.choice = {$case: 'anEnum', anEnum: pleaseChoose_StateEnumFromJSON(object.anEnum)};
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = Number(object.age);
    }
    if (object.either !== undefined && object.either !== null) {
      message.eitherOr = {$case: 'either', either: String(object.either)};
    }
    if (object.or !== undefined && object.or !== null) {
      message.eitherOr = {$case: 'or', or: String(object.or)};
    }
    if (object.thirdOption !== undefined && object.thirdOption !== null) {
      message.eitherOr = {$case: 'thirdOption', thirdOption: String(object.thirdOption)};
    }
    return message;
  },
  fromPartial(object: DeepPartial<PleaseChoose>): PleaseChoose {
    const message = { ...basePleaseChoose } as PleaseChoose;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.choice?.$case === 'aNumber' && object.choice?.aNumber !== undefined && object.choice?.aNumber !== null) {
      message.choice = {$case: 'aNumber', aNumber: object.choice.aNumber};
    }
    if (object.choice?.$case === 'aString' && object.choice?.aString !== undefined && object.choice?.aString !== null) {
      message.choice = {$case: 'aString', aString: object.choice.aString};
    }
    if (object.choice?.$case === 'aMessage' && object.choice?.aMessage !== undefined && object.choice?.aMessage !== null) {
      message.choice = {$case: 'aMessage', aMessage: PleaseChoose_Submessage.fromPartial(object.choice.aMessage)};
    }
    if (object.choice?.$case === 'aBool' && object.choice?.aBool !== undefined && object.choice?.aBool !== null) {
      message.choice = {$case: 'aBool', aBool: object.choice.aBool};
    }
    if (object.choice?.$case === 'bunchaBytes' && object.choice?.bunchaBytes !== undefined && object.choice?.bunchaBytes !== null) {
      message.choice = {$case: 'bunchaBytes', bunchaBytes: object.choice.bunchaBytes};
    }
    if (object.choice?.$case === 'anEnum' && object.choice?.anEnum !== undefined && object.choice?.anEnum !== null) {
      message.choice = {$case: 'anEnum', anEnum: object.choice.anEnum};
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = object.age;
    }
    if (object.eitherOr?.$case === 'either' && object.eitherOr?.either !== undefined && object.eitherOr?.either !== null) {
      message.eitherOr = {$case: 'either', either: object.eitherOr.either};
    }
    if (object.eitherOr?.$case === 'or' && object.eitherOr?.or !== undefined && object.eitherOr?.or !== null) {
      message.eitherOr = {$case: 'or', or: object.eitherOr.or};
    }
    if (object.eitherOr?.$case === 'thirdOption' && object.eitherOr?.thirdOption !== undefined && object.eitherOr?.thirdOption !== null) {
      message.eitherOr = {$case: 'thirdOption', thirdOption: object.eitherOr.thirdOption};
    }
    return message;
  },
  toJSON(message: PleaseChoose): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.choice?.$case === 'aNumber' && (obj.aNumber = message.choice?.aNumber);
    message.choice?.$case === 'aString' && (obj.aString = message.choice?.aString);
    message.choice?.$case === 'aMessage' && (obj.aMessage = message.choice?.aMessage ? PleaseChoose_Submessage.toJSON(message.choice?.aMessage) : undefined);
    message.choice?.$case === 'aBool' && (obj.aBool = message.choice?.aBool);
    message.choice?.$case === 'bunchaBytes' && (obj.bunchaBytes = message.choice?.bunchaBytes !== undefined ? base64FromBytes(message.choice?.bunchaBytes) : undefined);
    message.choice?.$case === 'anEnum' && (obj.anEnum = message.choice?.anEnum !== undefined ? pleaseChoose_StateEnumToJSON(message.choice?.anEnum) : undefined);
    message.age !== undefined && (obj.age = message.age);
    message.eitherOr?.$case === 'either' && (obj.either = message.eitherOr?.either);
    message.eitherOr?.$case === 'or' && (obj.or = message.eitherOr?.or);
    message.eitherOr?.$case === 'thirdOption' && (obj.thirdOption = message.eitherOr?.thirdOption);
    return obj;
  },
};

export const PleaseChoose_Submessage = {
  encode(message: PleaseChoose_Submessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PleaseChoose_Submessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    }
    return message;
  },
  fromPartial(object: DeepPartial<PleaseChoose_Submessage>): PleaseChoose_Submessage {
    const message = { ...basePleaseChoose_Submessage } as PleaseChoose_Submessage;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toJSON(message: PleaseChoose_Submessage): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
};

export const SimpleButOptional = {
  encode(message: SimpleButOptional, writer: Writer = Writer.create()): Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== undefined) {
      writer.uint32(16).int32(message.age);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleButOptional {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleButOptional } as SimpleButOptional;
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
    const message = { ...baseSimpleButOptional } as SimpleButOptional;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = Number(object.age);
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimpleButOptional>): SimpleButOptional {
    const message = { ...baseSimpleButOptional } as SimpleButOptional;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = object.age;
    }
    return message;
  },
  toJSON(message: SimpleButOptional): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
type Builtin = Date | Function | Uint8Array | string | number | undefined;
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