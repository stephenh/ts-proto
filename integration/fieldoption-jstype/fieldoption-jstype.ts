// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// source: fieldoption-jstype.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "int64";

export interface Int64FieldOption {
  normalField: number;
  numberField: number;
  stringField: string;
}

export interface UInt64FieldOption {
  normalField: number;
  numberField: number;
  stringField: string;
}

export interface SInt64FieldOption {
  normalField: number;
  numberField: number;
  stringField: string;
}

export interface Fixed64FieldOption {
  normalField: number;
  numberField: number;
  stringField: string;
}

export interface SFixed64FieldOption {
  normalField: number;
  numberField: number;
  stringField: string;
}

function createBaseInt64FieldOption(): Int64FieldOption {
  return { normalField: 0, numberField: 0, stringField: "0" };
}

export const Int64FieldOption: MessageFns<Int64FieldOption> = {
  encode(message: Int64FieldOption, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.normalField !== 0) {
      writer.uint32(8).int64(message.normalField);
    }
    if (message.numberField !== 0) {
      writer.uint32(16).int64(message.numberField);
    }
    if (message.stringField !== "0") {
      writer.uint32(24).int64(message.stringField);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Int64FieldOption {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.normalField = longToNumber(reader.int64());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numberField = longToNumber(reader.int64());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stringField = reader.int64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Int64FieldOption {
    return {
      normalField: isSet(object.normalField) ? globalThis.Number(object.normalField) : 0,
      numberField: isSet(object.numberField) ? globalThis.Number(object.numberField) : 0,
      stringField: isSet(object.stringField) ? globalThis.String(object.stringField) : "0",
    };
  },

  toJSON(message: Int64FieldOption): unknown {
    const obj: any = {};
    if (message.normalField !== 0) {
      obj.normalField = Math.round(message.normalField);
    }
    if (message.numberField !== 0) {
      obj.numberField = globalThis.Number(message.numberField);
    }
    if (message.stringField !== "0") {
      obj.stringField = globalThis.String(message.stringField);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Int64FieldOption>, I>>(base?: I): Int64FieldOption {
    return Int64FieldOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Int64FieldOption>, I>>(object: I): Int64FieldOption {
    const message = createBaseInt64FieldOption();
    message.normalField = object.normalField ?? 0;
    message.numberField = object.numberField ?? 0;
    message.stringField = object.stringField ?? "0";
    return message;
  },
};

function createBaseUInt64FieldOption(): UInt64FieldOption {
  return { normalField: 0, numberField: 0, stringField: "0" };
}

export const UInt64FieldOption: MessageFns<UInt64FieldOption> = {
  encode(message: UInt64FieldOption, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.normalField !== 0) {
      writer.uint32(8).uint64(message.normalField);
    }
    if (message.numberField !== 0) {
      writer.uint32(16).uint64(message.numberField);
    }
    if (message.stringField !== "0") {
      writer.uint32(24).uint64(message.stringField);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UInt64FieldOption {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUInt64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.normalField = longToNumber(reader.uint64());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numberField = longToNumber(reader.uint64());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stringField = reader.uint64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UInt64FieldOption {
    return {
      normalField: isSet(object.normalField) ? globalThis.Number(object.normalField) : 0,
      numberField: isSet(object.numberField) ? globalThis.Number(object.numberField) : 0,
      stringField: isSet(object.stringField) ? globalThis.String(object.stringField) : "0",
    };
  },

  toJSON(message: UInt64FieldOption): unknown {
    const obj: any = {};
    if (message.normalField !== 0) {
      obj.normalField = Math.round(message.normalField);
    }
    if (message.numberField !== 0) {
      obj.numberField = globalThis.Number(message.numberField);
    }
    if (message.stringField !== "0") {
      obj.stringField = globalThis.String(message.stringField);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UInt64FieldOption>, I>>(base?: I): UInt64FieldOption {
    return UInt64FieldOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UInt64FieldOption>, I>>(object: I): UInt64FieldOption {
    const message = createBaseUInt64FieldOption();
    message.normalField = object.normalField ?? 0;
    message.numberField = object.numberField ?? 0;
    message.stringField = object.stringField ?? "0";
    return message;
  },
};

function createBaseSInt64FieldOption(): SInt64FieldOption {
  return { normalField: 0, numberField: 0, stringField: "0" };
}

export const SInt64FieldOption: MessageFns<SInt64FieldOption> = {
  encode(message: SInt64FieldOption, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.normalField !== 0) {
      writer.uint32(8).sint64(message.normalField);
    }
    if (message.numberField !== 0) {
      writer.uint32(16).sint64(message.numberField);
    }
    if (message.stringField !== "0") {
      writer.uint32(24).sint64(message.stringField);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SInt64FieldOption {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSInt64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.normalField = longToNumber(reader.sint64());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numberField = longToNumber(reader.sint64());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stringField = reader.sint64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SInt64FieldOption {
    return {
      normalField: isSet(object.normalField) ? globalThis.Number(object.normalField) : 0,
      numberField: isSet(object.numberField) ? globalThis.Number(object.numberField) : 0,
      stringField: isSet(object.stringField) ? globalThis.String(object.stringField) : "0",
    };
  },

  toJSON(message: SInt64FieldOption): unknown {
    const obj: any = {};
    if (message.normalField !== 0) {
      obj.normalField = Math.round(message.normalField);
    }
    if (message.numberField !== 0) {
      obj.numberField = globalThis.Number(message.numberField);
    }
    if (message.stringField !== "0") {
      obj.stringField = globalThis.String(message.stringField);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SInt64FieldOption>, I>>(base?: I): SInt64FieldOption {
    return SInt64FieldOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SInt64FieldOption>, I>>(object: I): SInt64FieldOption {
    const message = createBaseSInt64FieldOption();
    message.normalField = object.normalField ?? 0;
    message.numberField = object.numberField ?? 0;
    message.stringField = object.stringField ?? "0";
    return message;
  },
};

function createBaseFixed64FieldOption(): Fixed64FieldOption {
  return { normalField: 0, numberField: 0, stringField: "0" };
}

export const Fixed64FieldOption: MessageFns<Fixed64FieldOption> = {
  encode(message: Fixed64FieldOption, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.normalField !== 0) {
      writer.uint32(9).fixed64(message.normalField);
    }
    if (message.numberField !== 0) {
      writer.uint32(17).fixed64(message.numberField);
    }
    if (message.stringField !== "0") {
      writer.uint32(25).fixed64(message.stringField);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Fixed64FieldOption {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFixed64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.normalField = longToNumber(reader.fixed64());
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.numberField = longToNumber(reader.fixed64());
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.stringField = reader.fixed64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fixed64FieldOption {
    return {
      normalField: isSet(object.normalField) ? globalThis.Number(object.normalField) : 0,
      numberField: isSet(object.numberField) ? globalThis.Number(object.numberField) : 0,
      stringField: isSet(object.stringField) ? globalThis.String(object.stringField) : "0",
    };
  },

  toJSON(message: Fixed64FieldOption): unknown {
    const obj: any = {};
    if (message.normalField !== 0) {
      obj.normalField = Math.round(message.normalField);
    }
    if (message.numberField !== 0) {
      obj.numberField = globalThis.Number(message.numberField);
    }
    if (message.stringField !== "0") {
      obj.stringField = globalThis.String(message.stringField);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fixed64FieldOption>, I>>(base?: I): Fixed64FieldOption {
    return Fixed64FieldOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fixed64FieldOption>, I>>(object: I): Fixed64FieldOption {
    const message = createBaseFixed64FieldOption();
    message.normalField = object.normalField ?? 0;
    message.numberField = object.numberField ?? 0;
    message.stringField = object.stringField ?? "0";
    return message;
  },
};

function createBaseSFixed64FieldOption(): SFixed64FieldOption {
  return { normalField: 0, numberField: 0, stringField: "0" };
}

export const SFixed64FieldOption: MessageFns<SFixed64FieldOption> = {
  encode(message: SFixed64FieldOption, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.normalField !== 0) {
      writer.uint32(9).sfixed64(message.normalField);
    }
    if (message.numberField !== 0) {
      writer.uint32(17).sfixed64(message.numberField);
    }
    if (message.stringField !== "0") {
      writer.uint32(25).sfixed64(message.stringField);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SFixed64FieldOption {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFixed64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.normalField = longToNumber(reader.sfixed64());
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.numberField = longToNumber(reader.sfixed64());
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.stringField = reader.sfixed64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SFixed64FieldOption {
    return {
      normalField: isSet(object.normalField) ? globalThis.Number(object.normalField) : 0,
      numberField: isSet(object.numberField) ? globalThis.Number(object.numberField) : 0,
      stringField: isSet(object.stringField) ? globalThis.String(object.stringField) : "0",
    };
  },

  toJSON(message: SFixed64FieldOption): unknown {
    const obj: any = {};
    if (message.normalField !== 0) {
      obj.normalField = Math.round(message.normalField);
    }
    if (message.numberField !== 0) {
      obj.numberField = globalThis.Number(message.numberField);
    }
    if (message.stringField !== "0") {
      obj.stringField = globalThis.String(message.stringField);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SFixed64FieldOption>, I>>(base?: I): SFixed64FieldOption {
    return SFixed64FieldOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SFixed64FieldOption>, I>>(object: I): SFixed64FieldOption {
    const message = createBaseSFixed64FieldOption();
    message.normalField = object.normalField ?? 0;
    message.numberField = object.numberField ?? 0;
    message.stringField = object.stringField ?? "0";
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
