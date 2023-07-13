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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePleaseChoose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.aNumber = reader.double();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.aString = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.aMessage = PleaseChoose_Submessage.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.aBool = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.bunchaBytes = reader.bytes();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.anEnum = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.age = reader.uint32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.either = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.or = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.thirdOption = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.aNumber !== undefined) {
      obj.aNumber = message.aNumber;
    }
    if (message.aString !== undefined) {
      obj.aString = message.aString;
    }
    if (message.aMessage !== undefined) {
      obj.aMessage = message.aMessage ? PleaseChoose_Submessage.toJSON(message.aMessage) : undefined;
    }
    if (message.aBool !== undefined) {
      obj.aBool = message.aBool;
    }
    if (message.bunchaBytes !== undefined) {
      obj.bunchaBytes = message.bunchaBytes !== undefined ? base64FromBytes(message.bunchaBytes) : undefined;
    }
    if (message.anEnum !== undefined) {
      obj.anEnum = message.anEnum !== undefined ? pleaseChoose_StateEnumToJSON(message.anEnum) : undefined;
    }
    if (message.age !== 0) {
      obj.age = Math.round(message.age);
    }
    if (message.either !== undefined) {
      obj.either = message.either;
    }
    if (message.or !== undefined) {
      obj.or = message.or;
    }
    if (message.thirdOption !== undefined) {
      obj.thirdOption = message.thirdOption;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PleaseChoose>, I>>(base?: I): PleaseChoose {
    return PleaseChoose.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePleaseChoose_Submessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PleaseChoose_Submessage {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: PleaseChoose_Submessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PleaseChoose_Submessage>, I>>(base?: I): PleaseChoose_Submessage {
    return PleaseChoose_Submessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PleaseChoose_Submessage>, I>>(object: I): PleaseChoose_Submessage {
    const message = createBasePleaseChoose_Submessage();
    message.name = object.name ?? "";
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
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
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
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
