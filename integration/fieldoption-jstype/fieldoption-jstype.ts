/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

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

export const Int64FieldOption = {
  encode(message: Int64FieldOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Int64FieldOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.normalField = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numberField = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stringField = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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

export const UInt64FieldOption = {
  encode(message: UInt64FieldOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): UInt64FieldOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUInt64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.normalField = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numberField = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stringField = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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

export const SInt64FieldOption = {
  encode(message: SInt64FieldOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SInt64FieldOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSInt64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.normalField = longToNumber(reader.sint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numberField = longToNumber(reader.sint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stringField = longToString(reader.sint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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

export const Fixed64FieldOption = {
  encode(message: Fixed64FieldOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Fixed64FieldOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFixed64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.normalField = longToNumber(reader.fixed64() as Long);
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.numberField = longToNumber(reader.fixed64() as Long);
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.stringField = longToString(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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

export const SFixed64FieldOption = {
  encode(message: SFixed64FieldOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SFixed64FieldOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSFixed64FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.normalField = longToNumber(reader.sfixed64() as Long);
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.numberField = longToNumber(reader.sfixed64() as Long);
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.stringField = longToString(reader.sfixed64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
