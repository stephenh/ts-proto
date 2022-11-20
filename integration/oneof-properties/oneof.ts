/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "oneof";

export interface PleaseChoose {
  name: string;
  /**
   * Use this if you want a number. Numbers are great. Who doesn't
   * like them?
   */
  aNumber?:
    | number
    | undefined;
  /**
   * Use this if you want a string. Strings are also nice. Not as
   * nice as numbers, but what are you going to do...
   */
  aString?: string | undefined;
  aMessage?:
    | PleaseChoose_Submessage
    | undefined;
  /**
   * We also added a bool option! This was added after the 'age'
   * field, so it has a higher number.
   */
  aBool?: boolean | undefined;
  bunchaBytes?: Uint8Array | undefined;
  anEnum?: PleaseChoose_StateEnum | undefined;
  age: number;
  either?: string | undefined;
  or?: string | undefined;
  thirdOption?: string | undefined;
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
    case PleaseChoose_StateEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface PleaseChoose_Submessage {
  name: string;
}

function createBasePleaseChoose(): PleaseChoose {
  return {
    name: "",
    aNumber: undefined,
    aString: undefined,
    aMessage: undefined,
    aBool: undefined,
    bunchaBytes: undefined,
    anEnum: undefined,
    age: 0,
    either: undefined,
    or: undefined,
    thirdOption: undefined,
  };
}

export const PleaseChoose = {
  encode(message: PleaseChoose, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
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
    return {
      name: isSet(object.name) ? String(object.name) : "",
      aNumber: isSet(object.aNumber) ? Number(object.aNumber) : undefined,
      aString: isSet(object.aString) ? String(object.aString) : undefined,
      aMessage: isSet(object.aMessage) ? PleaseChoose_Submessage.fromJSON(object.aMessage) : undefined,
      aBool: isSet(object.aBool) ? Boolean(object.aBool) : undefined,
      bunchaBytes: isSet(object.bunchaBytes) ? bytesFromBase64(object.bunchaBytes) : undefined,
      anEnum: isSet(object.anEnum) ? pleaseChoose_StateEnumFromJSON(object.anEnum) : undefined,
      age: isSet(object.age) ? Number(object.age) : 0,
      either: isSet(object.either) ? String(object.either) : undefined,
      or: isSet(object.or) ? String(object.or) : undefined,
      thirdOption: isSet(object.thirdOption) ? String(object.thirdOption) : undefined,
    };
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
    message.age !== undefined && (obj.age = Math.round(message.age));
    message.either !== undefined && (obj.either = message.either);
    message.or !== undefined && (obj.or = message.or);
    message.thirdOption !== undefined && (obj.thirdOption = message.thirdOption);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PleaseChoose>, I>>(object: I): PleaseChoose {
    const message = createBasePleaseChoose();
    message.name = object.name ?? "";
    message.aNumber = object.aNumber ?? undefined;
    message.aString = object.aString ?? undefined;
    message.aMessage = (object.aMessage !== undefined && object.aMessage !== null)
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

function createBasePleaseChoose_Submessage(): PleaseChoose_Submessage {
  return { name: "" };
}

export const PleaseChoose_Submessage = {
  encode(message: PleaseChoose_Submessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
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
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: PleaseChoose_Submessage): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PleaseChoose_Submessage>, I>>(object: I): PleaseChoose_Submessage {
    const message = createBasePleaseChoose_Submessage();
    message.name = object.name ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
