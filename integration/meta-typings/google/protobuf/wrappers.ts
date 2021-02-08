import { IFileDescriptorProto } from 'protobufjs/ext/descriptor';
import * as Long from 'long';
import { Writer, Reader, util, configure } from 'protobufjs/minimal';


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
  value: number;
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
  value: number;
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
};

const fileDescriptor: IFileDescriptorProto = {"dependency":[],"publicDependency":[],"weakDependency":[],"messageType":[{"name":"DoubleValue","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_DOUBLE","jsonName":"value"}]},{"name":"FloatValue","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_FLOAT","jsonName":"value"}]},{"name":"Int64Value","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_INT64","jsonName":"value"}]},{"name":"UInt64Value","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_UINT64","jsonName":"value"}]},{"name":"Int32Value","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_INT32","jsonName":"value"}]},{"name":"UInt32Value","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_UINT32","jsonName":"value"}]},{"name":"BoolValue","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_BOOL","jsonName":"value"}]},{"name":"StringValue","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_STRING","jsonName":"value"}]},{"name":"BytesValue","field":[{"name":"value","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_BYTES","jsonName":"value"}]}],"enumType":[],"service":[],"extension":[],"name":"google/protobuf/wrappers.proto","package":"google.protobuf","options":{"javaPackage":"com.google.protobuf","javaOuterClassname":"WrappersProto","javaMultipleFiles":true,"goPackage":"github.com/golang/protobuf/ptypes/wrappers","ccEnableArenas":true,"objcClassPrefix":"GPB","csharpNamespace":"Google.Protobuf.WellKnownTypes"},"sourceCodeInfo":{"location":[{"path":[4,0],"span":[50,0,53,1],"leadingComments":" Wrapper message for `double`.\n\n The JSON representation for `DoubleValue` is JSON number.\n"},{"path":[4,0,2,0],"span":[52,2,19],"leadingComments":" The double value.\n"},{"path":[4,1],"span":[58,0,61,1],"leadingComments":" Wrapper message for `float`.\n\n The JSON representation for `FloatValue` is JSON number.\n"},{"path":[4,1,2,0],"span":[60,2,18],"leadingComments":" The float value.\n"},{"path":[4,2],"span":[66,0,69,1],"leadingComments":" Wrapper message for `int64`.\n\n The JSON representation for `Int64Value` is JSON string.\n"},{"path":[4,2,2,0],"span":[68,2,18],"leadingComments":" The int64 value.\n"},{"path":[4,3],"span":[74,0,77,1],"leadingComments":" Wrapper message for `uint64`.\n\n The JSON representation for `UInt64Value` is JSON string.\n"},{"path":[4,3,2,0],"span":[76,2,19],"leadingComments":" The uint64 value.\n"},{"path":[4,4],"span":[82,0,85,1],"leadingComments":" Wrapper message for `int32`.\n\n The JSON representation for `Int32Value` is JSON number.\n"},{"path":[4,4,2,0],"span":[84,2,18],"leadingComments":" The int32 value.\n"},{"path":[4,5],"span":[90,0,93,1],"leadingComments":" Wrapper message for `uint32`.\n\n The JSON representation for `UInt32Value` is JSON number.\n"},{"path":[4,5,2,0],"span":[92,2,19],"leadingComments":" The uint32 value.\n"},{"path":[4,6],"span":[98,0,101,1],"leadingComments":" Wrapper message for `bool`.\n\n The JSON representation for `BoolValue` is JSON `true` and `false`.\n"},{"path":[4,6,2,0],"span":[100,2,17],"leadingComments":" The bool value.\n"},{"path":[4,7],"span":[106,0,109,1],"leadingComments":" Wrapper message for `string`.\n\n The JSON representation for `StringValue` is JSON string.\n"},{"path":[4,7,2,0],"span":[108,2,19],"leadingComments":" The string value.\n"},{"path":[4,8],"span":[114,0,117,1],"leadingComments":" Wrapper message for `bytes`.\n\n The JSON representation for `BytesValue` is JSON string.\n"},{"path":[4,8,2,0],"span":[116,2,18],"leadingComments":" The bytes value.\n"}]},"syntax":"proto3"};

const resolvedDependencies: IFileDescriptorProto[] = [];

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const protobufPackage = 'google.protobuf'

export const DoubleValue = {
  encode(message: DoubleValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(9).double(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DoubleValue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDoubleValue } as DoubleValue;
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
};

export const FloatValue = {
  encode(message: FloatValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(13).float(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): FloatValue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFloatValue } as FloatValue;
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
};

export const Int64Value = {
  encode(message: Int64Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Int64Value {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInt64Value } as Int64Value;
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
};

export const UInt64Value = {
  encode(message: UInt64Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UInt64Value {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUInt64Value } as UInt64Value;
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
};

export const Int32Value = {
  encode(message: Int32Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Int32Value {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInt32Value } as Int32Value;
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
};

export const UInt32Value = {
  encode(message: UInt32Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UInt32Value {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUInt32Value } as UInt32Value;
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
};

export const BoolValue = {
  encode(message: BoolValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).bool(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BoolValue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBoolValue } as BoolValue;
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
};

export const StringValue = {
  encode(message: StringValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StringValue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStringValue } as StringValue;
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
};

export const BytesValue = {
  encode(message: BytesValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BytesValue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBytesValue } as BytesValue;
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
};

if (util.Long !== Long as any) {
  util.Long = Long as any;
  configure();
}
