import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface DoubleValue {
  value: number;
}

export interface FloatValue {
  value: number;
}

export interface Int64Value {
  value: number;
}

export interface UInt64Value {
  value: number;
}

export interface Int32Value {
  value: number;
}

export interface UInt32Value {
  value: number;
}

export interface BoolValue {
  value: boolean;
}

export interface StringValue {
  value: string;
}

export interface BytesValue {
  value: Uint8Array;
}

const baseDoubleValue: object = {
  value: 0,
};

const baseFloatValue: object = {
  value: 0,
};

const baseInt64Value: object = {
  value: 0,
};

const baseUInt64Value: object = {
  value: 0,
};

const baseInt32Value: object = {
  value: 0,
};

const baseUInt32Value: object = {
  value: 0,
};

const baseBoolValue: object = {
  value: false,
};

const baseStringValue: object = {
  value: "",
};

const baseBytesValue: object = {
  value: undefined,
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new global.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const DoubleValue = {
  encode(message: DoubleValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(9).double(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): DoubleValue {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseDoubleValue) as DoubleValue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DoubleValue {
    const message = Object.create(baseDoubleValue) as DoubleValue;
    if (object.value) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<DoubleValue>): DoubleValue {
    const message = Object.create(baseDoubleValue) as DoubleValue;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: DoubleValue): unknown {
    const obj: any = {};
    obj.value = message.value || 0;
    return obj;
  },
};

export const FloatValue = {
  encode(message: FloatValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(13).float(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): FloatValue {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFloatValue) as FloatValue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FloatValue {
    const message = Object.create(baseFloatValue) as FloatValue;
    if (object.value) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<FloatValue>): FloatValue {
    const message = Object.create(baseFloatValue) as FloatValue;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: FloatValue): unknown {
    const obj: any = {};
    obj.value = message.value || 0;
    return obj;
  },
};

export const Int64Value = {
  encode(message: Int64Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): Int64Value {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseInt64Value) as Int64Value;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Int64Value {
    const message = Object.create(baseInt64Value) as Int64Value;
    if (object.value) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Int64Value>): Int64Value {
    const message = Object.create(baseInt64Value) as Int64Value;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: Int64Value): unknown {
    const obj: any = {};
    obj.value = message.value || 0;
    return obj;
  },
};

export const UInt64Value = {
  encode(message: UInt64Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): UInt64Value {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUInt64Value) as UInt64Value;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UInt64Value {
    const message = Object.create(baseUInt64Value) as UInt64Value;
    if (object.value) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<UInt64Value>): UInt64Value {
    const message = Object.create(baseUInt64Value) as UInt64Value;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: UInt64Value): unknown {
    const obj: any = {};
    obj.value = message.value || 0;
    return obj;
  },
};

export const Int32Value = {
  encode(message: Int32Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): Int32Value {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseInt32Value) as Int32Value;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Int32Value {
    const message = Object.create(baseInt32Value) as Int32Value;
    if (object.value) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Int32Value>): Int32Value {
    const message = Object.create(baseInt32Value) as Int32Value;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: Int32Value): unknown {
    const obj: any = {};
    obj.value = message.value || 0;
    return obj;
  },
};

export const UInt32Value = {
  encode(message: UInt32Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): UInt32Value {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUInt32Value) as UInt32Value;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UInt32Value {
    const message = Object.create(baseUInt32Value) as UInt32Value;
    if (object.value) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<UInt32Value>): UInt32Value {
    const message = Object.create(baseUInt32Value) as UInt32Value;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: UInt32Value): unknown {
    const obj: any = {};
    obj.value = message.value || 0;
    return obj;
  },
};

export const BoolValue = {
  encode(message: BoolValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).bool(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): BoolValue {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBoolValue) as BoolValue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BoolValue {
    const message = Object.create(baseBoolValue) as BoolValue;
    if (object.value) {
      message.value = Boolean(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<BoolValue>): BoolValue {
    const message = Object.create(baseBoolValue) as BoolValue;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: BoolValue): unknown {
    const obj: any = {};
    obj.value = message.value || false;
    return obj;
  },
};

export const StringValue = {
  encode(message: StringValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): StringValue {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseStringValue) as StringValue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): StringValue {
    const message = Object.create(baseStringValue) as StringValue;
    if (object.value) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<StringValue>): StringValue {
    const message = Object.create(baseStringValue) as StringValue;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: StringValue): unknown {
    const obj: any = {};
    obj.value = message.value || "";
    return obj;
  },
};

export const BytesValue = {
  encode(message: BytesValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.value);
    return writer;
  },
  decode(reader: Reader, length?: number): BytesValue {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBytesValue) as BytesValue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BytesValue {
    const message = Object.create(baseBytesValue) as BytesValue;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  fromPartial(object: DeepPartial<BytesValue>): BytesValue {
    const message = Object.create(baseBytesValue) as BytesValue;
    if (object.value) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: BytesValue): unknown {
    const obj: any = {};
    obj.value = message.value || undefined;
    return obj;
  },
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T[P] extends Date | Function | Uint8Array | undefined
  ? T[P]
  : T[P] extends infer U | undefined
  ? DeepPartial<U>
  : T[P] extends object
  ? DeepPartial<T[P]>
  : T[P]
};