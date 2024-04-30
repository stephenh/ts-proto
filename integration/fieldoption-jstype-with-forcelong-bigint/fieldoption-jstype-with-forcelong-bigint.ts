/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "foo";

export interface FieldOption {
  normalField: bigint;
  numberField: number;
  stringField: string;
}

function createBaseFieldOption(): FieldOption {
  return { normalField: BigInt("0"), numberField: 0, stringField: "0" };
}

export const FieldOption = {
  encode(message: FieldOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.normalField !== BigInt("0")) {
      if (BigInt.asIntN(64, message.normalField) !== message.normalField) {
        throw new globalThis.Error("value provided for field message.normalField of type int64 too large");
      }
      writer.uint32(8).int64(message.normalField.toString());
    }
    if (message.numberField !== 0) {
      if (BigInt.asIntN(64, BigInt(message.numberField)) !== BigInt(message.numberField)) {
        throw new globalThis.Error("value provided for field BigInt(message.numberField) of type int64 too large");
      }
      writer.uint32(16).int64(BigInt(message.numberField).toString());
    }
    if (message.stringField !== "0") {
      if (BigInt.asIntN(64, BigInt(message.stringField)) !== BigInt(message.stringField)) {
        throw new globalThis.Error("value provided for field BigInt(message.stringField) of type int64 too large");
      }
      writer.uint32(24).int64(BigInt(message.stringField).toString());
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.normalField = longToBigint(reader.int64() as Long);
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

  fromJSON(object: any): FieldOption {
    return {
      normalField: isSet(object.normalField) ? BigInt(object.normalField) : BigInt("0"),
      numberField: isSet(object.numberField) ? globalThis.Number(object.numberField) : 0,
      stringField: isSet(object.stringField) ? globalThis.String(object.stringField) : "0",
    };
  },

  toJSON(message: FieldOption): unknown {
    const obj: any = {};
    if (message.normalField !== BigInt("0")) {
      obj.normalField = message.normalField.toString();
    }
    if (message.numberField !== 0) {
      obj.numberField = globalThis.Number(message.numberField);
    }
    if (message.stringField !== "0") {
      obj.stringField = globalThis.String(message.stringField);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FieldOption>, I>>(base?: I): FieldOption {
    return FieldOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FieldOption>, I>>(object: I): FieldOption {
    const message = createBaseFieldOption();
    message.normalField = object.normalField ?? BigInt("0");
    message.numberField = object.numberField ?? 0;
    message.stringField = object.stringField ?? "0";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | bigint | undefined;

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

function longToBigint(long: Long) {
  return BigInt(long.toString());
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
