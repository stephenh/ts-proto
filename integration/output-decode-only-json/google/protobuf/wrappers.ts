/* eslint-disable */

export const protobufPackage = "google.protobuf";

/**
 * Wrapper message for `double`.
 *
 * The JSON representation for `DoubleValue` is JSON number.
 */
export interface DoubleValue {
  /** The double value. */
  value: number;
}

/**
 * Wrapper message for `float`.
 *
 * The JSON representation for `FloatValue` is JSON number.
 */
export interface FloatValue {
  /** The float value. */
  value: number;
}

/**
 * Wrapper message for `int64`.
 *
 * The JSON representation for `Int64Value` is JSON string.
 */
export interface Int64Value {
  /** The int64 value. */
  value: number;
}

/**
 * Wrapper message for `uint64`.
 *
 * The JSON representation for `UInt64Value` is JSON string.
 */
export interface UInt64Value {
  /** The uint64 value. */
  value: number;
}

/**
 * Wrapper message for `int32`.
 *
 * The JSON representation for `Int32Value` is JSON number.
 */
export interface Int32Value {
  /** The int32 value. */
  value: number;
}

/**
 * Wrapper message for `uint32`.
 *
 * The JSON representation for `UInt32Value` is JSON number.
 */
export interface UInt32Value {
  /** The uint32 value. */
  value: number;
}

/**
 * Wrapper message for `bool`.
 *
 * The JSON representation for `BoolValue` is JSON `true` and `false`.
 */
export interface BoolValue {
  /** The bool value. */
  value: boolean;
}

/**
 * Wrapper message for `string`.
 *
 * The JSON representation for `StringValue` is JSON string.
 */
export interface StringValue {
  /** The string value. */
  value: string;
}

/**
 * Wrapper message for `bytes`.
 *
 * The JSON representation for `BytesValue` is JSON string.
 */
export interface BytesValue {
  /** The bytes value. */
  value: Uint8Array;
}

export const DoubleValue = {
  fromJSON(object: any): DoubleValue {
    return { value: isSet(object.value) ? Number(object.value) : 0 };
  },
};

export const FloatValue = {
  fromJSON(object: any): FloatValue {
    return { value: isSet(object.value) ? Number(object.value) : 0 };
  },
};

export const Int64Value = {
  fromJSON(object: any): Int64Value {
    return { value: isSet(object.value) ? Number(object.value) : 0 };
  },
};

export const UInt64Value = {
  fromJSON(object: any): UInt64Value {
    return { value: isSet(object.value) ? Number(object.value) : 0 };
  },
};

export const Int32Value = {
  fromJSON(object: any): Int32Value {
    return { value: isSet(object.value) ? Number(object.value) : 0 };
  },
};

export const UInt32Value = {
  fromJSON(object: any): UInt32Value {
    return { value: isSet(object.value) ? Number(object.value) : 0 };
  },
};

export const BoolValue = {
  fromJSON(object: any): BoolValue {
    return { value: isSet(object.value) ? Boolean(object.value) : false };
  },
};

export const StringValue = {
  fromJSON(object: any): StringValue {
    return { value: isSet(object.value) ? String(object.value) : "" };
  },
};

export const BytesValue = {
  fromJSON(object: any): BytesValue {
    return { value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0) };
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
