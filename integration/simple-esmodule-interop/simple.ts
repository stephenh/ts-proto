// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// source: simple.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "simple";

export interface Simple {
  name: string;
  age: number;
}

export interface Numbers {
  double: number;
  float: number;
  int32: number;
  int64: number;
  uint32: number;
  uint64: number;
  sint32: number;
  sint64: number;
  fixed32: number;
  fixed64: number;
  sfixed32: number;
  sfixed64: number;
}

function createBaseSimple(): Simple {
  return { name: "", age: 0 };
}

export const Simple: MessageFns<Simple> = {
  encode(message: Simple, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Simple {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
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

  fromJSON(object: any): Simple {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      age: isSet(object.age) ? globalThis.Number(object.age) : 0,
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.age !== 0) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple>, I>>(base?: I): Simple {
    return Simple.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? "";
    message.age = object.age ?? 0;
    return message;
  },
};

function createBaseNumbers(): Numbers {
  return {
    double: 0,
    float: 0,
    int32: 0,
    int64: 0,
    uint32: 0,
    uint64: 0,
    sint32: 0,
    sint64: 0,
    fixed32: 0,
    fixed64: 0,
    sfixed32: 0,
    sfixed64: 0,
  };
}

export const Numbers: MessageFns<Numbers> = {
  encode(message: Numbers, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.double !== 0) {
      writer.uint32(9).double(message.double);
    }
    if (message.float !== 0) {
      writer.uint32(21).float(message.float);
    }
    if (message.int32 !== 0) {
      writer.uint32(24).int32(message.int32);
    }
    if (message.int64 !== 0) {
      writer.uint32(32).int64(message.int64);
    }
    if (message.uint32 !== 0) {
      writer.uint32(40).uint32(message.uint32);
    }
    if (message.uint64 !== 0) {
      writer.uint32(48).uint64(message.uint64);
    }
    if (message.sint32 !== 0) {
      writer.uint32(56).sint32(message.sint32);
    }
    if (message.sint64 !== 0) {
      writer.uint32(64).sint64(message.sint64);
    }
    if (message.fixed32 !== 0) {
      writer.uint32(77).fixed32(message.fixed32);
    }
    if (message.fixed64 !== 0) {
      writer.uint32(81).fixed64(message.fixed64);
    }
    if (message.sfixed32 !== 0) {
      writer.uint32(93).sfixed32(message.sfixed32);
    }
    if (message.sfixed64 !== 0) {
      writer.uint32(97).sfixed64(message.sfixed64);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumbers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 9) {
            break;
          }

          message.double = reader.double();
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }

          message.float = reader.float();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.int32 = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.int64 = longToNumber(reader.int64());
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }

          message.uint32 = reader.uint32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.uint64 = longToNumber(reader.uint64());
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }

          message.sint32 = reader.sint32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.sint64 = longToNumber(reader.sint64());
          continue;
        }
        case 9: {
          if (tag !== 77) {
            break;
          }

          message.fixed32 = reader.fixed32();
          continue;
        }
        case 10: {
          if (tag !== 81) {
            break;
          }

          message.fixed64 = longToNumber(reader.fixed64());
          continue;
        }
        case 11: {
          if (tag !== 93) {
            break;
          }

          message.sfixed32 = reader.sfixed32();
          continue;
        }
        case 12: {
          if (tag !== 97) {
            break;
          }

          message.sfixed64 = longToNumber(reader.sfixed64());
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

  fromJSON(object: any): Numbers {
    return {
      double: isSet(object.double) ? globalThis.Number(object.double) : 0,
      float: isSet(object.float) ? globalThis.Number(object.float) : 0,
      int32: isSet(object.int32) ? globalThis.Number(object.int32) : 0,
      int64: isSet(object.int64) ? globalThis.Number(object.int64) : 0,
      uint32: isSet(object.uint32) ? globalThis.Number(object.uint32) : 0,
      uint64: isSet(object.uint64) ? globalThis.Number(object.uint64) : 0,
      sint32: isSet(object.sint32) ? globalThis.Number(object.sint32) : 0,
      sint64: isSet(object.sint64) ? globalThis.Number(object.sint64) : 0,
      fixed32: isSet(object.fixed32) ? globalThis.Number(object.fixed32) : 0,
      fixed64: isSet(object.fixed64) ? globalThis.Number(object.fixed64) : 0,
      sfixed32: isSet(object.sfixed32) ? globalThis.Number(object.sfixed32) : 0,
      sfixed64: isSet(object.sfixed64) ? globalThis.Number(object.sfixed64) : 0,
    };
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    if (message.double !== 0) {
      obj.double = message.double;
    }
    if (message.float !== 0) {
      obj.float = message.float;
    }
    if (message.int32 !== 0) {
      obj.int32 = Math.round(message.int32);
    }
    if (message.int64 !== 0) {
      obj.int64 = Math.round(message.int64);
    }
    if (message.uint32 !== 0) {
      obj.uint32 = Math.round(message.uint32);
    }
    if (message.uint64 !== 0) {
      obj.uint64 = Math.round(message.uint64);
    }
    if (message.sint32 !== 0) {
      obj.sint32 = Math.round(message.sint32);
    }
    if (message.sint64 !== 0) {
      obj.sint64 = Math.round(message.sint64);
    }
    if (message.fixed32 !== 0) {
      obj.fixed32 = Math.round(message.fixed32);
    }
    if (message.fixed64 !== 0) {
      obj.fixed64 = Math.round(message.fixed64);
    }
    if (message.sfixed32 !== 0) {
      obj.sfixed32 = Math.round(message.sfixed32);
    }
    if (message.sfixed64 !== 0) {
      obj.sfixed64 = Math.round(message.sfixed64);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Numbers>, I>>(base?: I): Numbers {
    return Numbers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Numbers>, I>>(object: I): Numbers {
    const message = createBaseNumbers();
    message.double = object.double ?? 0;
    message.float = object.float ?? 0;
    message.int32 = object.int32 ?? 0;
    message.int64 = object.int64 ?? 0;
    message.uint32 = object.uint32 ?? 0;
    message.uint64 = object.uint64 ?? 0;
    message.sint32 = object.sint32 ?? 0;
    message.sint64 = object.sint64 ?? 0;
    message.fixed32 = object.fixed32 ?? 0;
    message.fixed64 = object.fixed64 ?? 0;
    message.sfixed32 = object.sfixed32 ?? 0;
    message.sfixed64 = object.sfixed64 ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

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
