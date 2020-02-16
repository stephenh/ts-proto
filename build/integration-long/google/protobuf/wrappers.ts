import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


/**
 *  Wrapper message for `double`.
 *
 *  The JSON representation for `DoubleValue` is JSON number.
 */
export interface DoubleValue {
  /**
   *  The double value.
   */
  value: number;
}

/**
 *  Wrapper message for `float`.
 *
 *  The JSON representation for `FloatValue` is JSON number.
 */
export interface FloatValue {
  /**
   *  The float value.
   */
  value: number;
}

/**
 *  Wrapper message for `int64`.
 *
 *  The JSON representation for `Int64Value` is JSON string.
 */
export interface Int64Value {
  /**
   *  The int64 value.
   */
  value: Long;
}

/**
 *  Wrapper message for `uint64`.
 *
 *  The JSON representation for `UInt64Value` is JSON string.
 */
export interface UInt64Value {
  /**
   *  The uint64 value.
   */
  value: Long;
}

/**
 *  Wrapper message for `int32`.
 *
 *  The JSON representation for `Int32Value` is JSON number.
 */
export interface Int32Value {
  /**
   *  The int32 value.
   */
  value: number;
}

/**
 *  Wrapper message for `uint32`.
 *
 *  The JSON representation for `UInt32Value` is JSON number.
 */
export interface UInt32Value {
  /**
   *  The uint32 value.
   */
  value: number;
}

/**
 *  Wrapper message for `bool`.
 *
 *  The JSON representation for `BoolValue` is JSON `true` and `false`.
 */
export interface BoolValue {
  /**
   *  The bool value.
   */
  value: boolean;
}

/**
 *  Wrapper message for `string`.
 *
 *  The JSON representation for `StringValue` is JSON string.
 */
export interface StringValue {
  /**
   *  The string value.
   */
  value: string;
}

/**
 *  Wrapper message for `bytes`.
 *
 *  The JSON representation for `BytesValue` is JSON string.
 */
export interface BytesValue {
  /**
   *  The bytes value.
   */
  value: Uint8Array;
}

const baseDoubleValue: object = {
  value: 0,
};

const baseFloatValue: object = {
  value: 0,
};

const baseInt64Value: object = {
  value: Long.ZERO,
};

const baseUInt64Value: object = {
  value: Long.UZERO,
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

function numberToLong(number: number) {
  return Long.fromNumber(number);
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
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DoubleValue>): DoubleValue {
    const message = Object.create(baseDoubleValue) as DoubleValue;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
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
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<FloatValue>): FloatValue {
    const message = Object.create(baseFloatValue) as FloatValue;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
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
          message.value = reader.int64() as Long;
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
    if (object.value !== undefined && object.value !== null) {
      message.value = Long.fromString(object.value);
    } else {
      message.value = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Int64Value>): Int64Value {
    const message = Object.create(baseInt64Value) as Int64Value;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value as Long;
    } else {
      message.value = Long.ZERO;
    }
    return message;
  },
  toJSON(message: Int64Value): unknown {
    const obj: any = {};
    obj.value = (message.value || Long.ZERO).toString();
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
          message.value = reader.uint64() as Long;
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
    if (object.value !== undefined && object.value !== null) {
      message.value = Long.fromString(object.value);
    } else {
      message.value = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<UInt64Value>): UInt64Value {
    const message = Object.create(baseUInt64Value) as UInt64Value;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value as Long;
    } else {
      message.value = Long.UZERO;
    }
    return message;
  },
  toJSON(message: UInt64Value): unknown {
    const obj: any = {};
    obj.value = (message.value || Long.UZERO).toString();
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
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Int32Value>): Int32Value {
    const message = Object.create(baseInt32Value) as Int32Value;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
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
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<UInt32Value>): UInt32Value {
    const message = Object.create(baseUInt32Value) as UInt32Value;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
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
    if (object.value !== undefined && object.value !== null) {
      message.value = Boolean(object.value);
    } else {
      message.value = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<BoolValue>): BoolValue {
    const message = Object.create(baseBoolValue) as BoolValue;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = false;
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
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<StringValue>): StringValue {
    const message = Object.create(baseStringValue) as StringValue;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
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
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  fromPartial(object: DeepPartial<BytesValue>): BytesValue {
    const message = Object.create(baseBytesValue) as BytesValue;
    if (object.value !== undefined && object.value !== null) {
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