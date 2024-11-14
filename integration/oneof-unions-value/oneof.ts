// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// source: oneof.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Value } from "./google/protobuf/struct";

export const protobufPackage = "oneof";

export interface PleaseChoose {
  name: string;
  /**
   * Please to be choosing one of the fields within this oneof clause.
   * This text exists to ensure we transpose comments correctly.
   */ choice?:
    | //
    /**
     * Use this if you want a number. Numbers are great. Who doesn't
     * like them?
     */
    { $case: "aNumber"; value: number }
    | //
    /**
     * Use this if you want a string. Strings are also nice. Not as
     * nice as numbers, but what are you going to do...
     */
    { $case: "aString"; value: string }
    | //
    { $case: "aMessage"; value: PleaseChoose_Submessage }
    | //
    /**
     * We also added a bool option! This was added after the 'age'
     * field, so it has a higher number.
     */
    { $case: "aBool"; value: boolean }
    | //
    { $case: "bunchaBytes"; value: Uint8Array }
    | //
    { $case: "anEnum"; value: PleaseChoose_StateEnum }
    | undefined;
  age: number;
  eitherOr?:
    | //
    { $case: "either"; value: string }
    | //
    { $case: "or"; value: string }
    | //
    { $case: "thirdOption"; value: string }
    | undefined;
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

/** For testing proto3's field presence feature. */
export interface SimpleButOptional {
  name?: string | undefined;
  age?: number | undefined;
}

function createBasePleaseChoose(): PleaseChoose {
  return { name: "", choice: undefined, age: 0, eitherOr: undefined, signature: new Uint8Array(0), value: undefined };
}

export const PleaseChoose: MessageFns<PleaseChoose> = {
  encode(message: PleaseChoose, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    switch (message.choice?.$case) {
      case "aNumber":
        writer.uint32(17).double(message.choice.value);
        break;
      case "aString":
        writer.uint32(26).string(message.choice.value);
        break;
      case "aMessage":
        PleaseChoose_Submessage.encode(message.choice.value, writer.uint32(34).fork()).join();
        break;
      case "aBool":
        writer.uint32(48).bool(message.choice.value);
        break;
      case "bunchaBytes":
        writer.uint32(82).bytes(message.choice.value);
        break;
      case "anEnum":
        writer.uint32(88).int32(message.choice.value);
        break;
    }
    if (message.age !== 0) {
      writer.uint32(40).uint32(message.age);
    }
    switch (message.eitherOr?.$case) {
      case "either":
        writer.uint32(58).string(message.eitherOr.value);
        break;
      case "or":
        writer.uint32(66).string(message.eitherOr.value);
        break;
      case "thirdOption":
        writer.uint32(74).string(message.eitherOr.value);
        break;
    }
    if (message.signature.length !== 0) {
      writer.uint32(98).bytes(message.signature);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(106).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): PleaseChoose {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePleaseChoose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 17) {
            break;
          }

          message.choice = { $case: "aNumber", value: reader.double() };
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.choice = { $case: "aString", value: reader.string() };
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.choice = { $case: "aMessage", value: PleaseChoose_Submessage.decode(reader, reader.uint32()) };
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.choice = { $case: "aBool", value: reader.bool() };
          continue;
        }
        case 10: {
          if (tag !== 82) {
            break;
          }

          message.choice = { $case: "bunchaBytes", value: reader.bytes() };
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }

          message.choice = { $case: "anEnum", value: reader.int32() as any };
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }

          message.age = reader.uint32();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.eitherOr = { $case: "either", value: reader.string() };
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }

          message.eitherOr = { $case: "or", value: reader.string() };
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.eitherOr = { $case: "thirdOption", value: reader.string() };
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        }
        case 13: {
          if (tag !== 106) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PleaseChoose {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      choice: isSet(object.aNumber)
        ? { $case: "aNumber", value: globalThis.Number(object.aNumber) }
        : isSet(object.aString)
        ? { $case: "aString", value: globalThis.String(object.aString) }
        : isSet(object.aMessage)
        ? { $case: "aMessage", value: PleaseChoose_Submessage.fromJSON(object.aMessage) }
        : isSet(object.aBool)
        ? { $case: "aBool", value: globalThis.Boolean(object.aBool) }
        : isSet(object.bunchaBytes)
        ? { $case: "bunchaBytes", value: bytesFromBase64(object.bunchaBytes) }
        : isSet(object.anEnum)
        ? { $case: "anEnum", value: pleaseChoose_StateEnumFromJSON(object.anEnum) }
        : undefined,
      age: isSet(object.age) ? globalThis.Number(object.age) : 0,
      eitherOr: isSet(object.either)
        ? { $case: "either", value: globalThis.String(object.either) }
        : isSet(object.or)
        ? { $case: "or", value: globalThis.String(object.or) }
        : isSet(object.thirdOption)
        ? { $case: "thirdOption", value: globalThis.String(object.thirdOption) }
        : undefined,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: PleaseChoose): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.choice?.$case === "aNumber") {
      obj.aNumber = message.choice.value;
    }
    if (message.choice?.$case === "aString") {
      obj.aString = message.choice.value;
    }
    if (message.choice?.$case === "aMessage") {
      obj.aMessage = PleaseChoose_Submessage.toJSON(message.choice.value);
    }
    if (message.choice?.$case === "aBool") {
      obj.aBool = message.choice.value;
    }
    if (message.choice?.$case === "bunchaBytes") {
      obj.bunchaBytes = base64FromBytes(message.choice.value);
    }
    if (message.choice?.$case === "anEnum") {
      obj.anEnum = pleaseChoose_StateEnumToJSON(message.choice.value);
    }
    if (message.age !== 0) {
      obj.age = Math.round(message.age);
    }
    if (message.eitherOr?.$case === "either") {
      obj.either = message.eitherOr.value;
    }
    if (message.eitherOr?.$case === "or") {
      obj.or = message.eitherOr.value;
    }
    if (message.eitherOr?.$case === "thirdOption") {
      obj.thirdOption = message.eitherOr.value;
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PleaseChoose>, I>>(base?: I): PleaseChoose {
    return PleaseChoose.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PleaseChoose>, I>>(object: I): PleaseChoose {
    const message = createBasePleaseChoose();
    message.name = object.name ?? "";
    if (object.choice?.$case === "aNumber" && object.choice?.value !== undefined && object.choice?.value !== null) {
      message.choice = { $case: "aNumber", value: object.choice.value };
    }
    if (object.choice?.$case === "aString" && object.choice?.value !== undefined && object.choice?.value !== null) {
      message.choice = { $case: "aString", value: object.choice.value };
    }
    if (object.choice?.$case === "aMessage" && object.choice?.value !== undefined && object.choice?.value !== null) {
      message.choice = { $case: "aMessage", value: PleaseChoose_Submessage.fromPartial(object.choice.value) };
    }
    if (object.choice?.$case === "aBool" && object.choice?.value !== undefined && object.choice?.value !== null) {
      message.choice = { $case: "aBool", value: object.choice.value };
    }
    if (object.choice?.$case === "bunchaBytes" && object.choice?.value !== undefined && object.choice?.value !== null) {
      message.choice = { $case: "bunchaBytes", value: object.choice.value };
    }
    if (object.choice?.$case === "anEnum" && object.choice?.value !== undefined && object.choice?.value !== null) {
      message.choice = { $case: "anEnum", value: object.choice.value };
    }
    message.age = object.age ?? 0;
    if (
      object.eitherOr?.$case === "either" && object.eitherOr?.value !== undefined && object.eitherOr?.value !== null
    ) {
      message.eitherOr = { $case: "either", value: object.eitherOr.value };
    }
    if (object.eitherOr?.$case === "or" && object.eitherOr?.value !== undefined && object.eitherOr?.value !== null) {
      message.eitherOr = { $case: "or", value: object.eitherOr.value };
    }
    if (
      object.eitherOr?.$case === "thirdOption" &&
      object.eitherOr?.value !== undefined &&
      object.eitherOr?.value !== null
    ) {
      message.eitherOr = { $case: "thirdOption", value: object.eitherOr.value };
    }
    message.signature = object.signature ?? new Uint8Array(0);
    message.value = object.value ?? undefined;
    return message;
  },
};

function createBasePleaseChoose_Submessage(): PleaseChoose_Submessage {
  return { name: "" };
}

export const PleaseChoose_Submessage: MessageFns<PleaseChoose_Submessage> = {
  encode(message: PleaseChoose_Submessage, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): PleaseChoose_Submessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePleaseChoose_Submessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PleaseChoose_Submessage {
    return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: PleaseChoose_Submessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PleaseChoose_Submessage>, I>>(base?: I): PleaseChoose_Submessage {
    return PleaseChoose_Submessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PleaseChoose_Submessage>, I>>(object: I): PleaseChoose_Submessage {
    const message = createBasePleaseChoose_Submessage();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseSimpleButOptional(): SimpleButOptional {
  return { name: undefined, age: undefined };
}

export const SimpleButOptional: MessageFns<SimpleButOptional> = {
  encode(message: SimpleButOptional, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== undefined) {
      writer.uint32(16).int32(message.age);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SimpleButOptional {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleButOptional();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.age = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleButOptional {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      age: isSet(object.age) ? globalThis.Number(object.age) : undefined,
    };
  },

  toJSON(message: SimpleButOptional): unknown {
    const obj: any = {};
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.age !== undefined) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleButOptional>, I>>(base?: I): SimpleButOptional {
    return SimpleButOptional.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimpleButOptional>, I>>(object: I): SimpleButOptional {
    const message = createBaseSimpleButOptional();
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
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
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string; value: unknown } ? { $case: T["$case"]; value?: DeepPartial<T["value"]> }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
