/* eslint-disable */
import { wrappers } from "protobufjs";

export const protobufPackage = "google.protobuf";

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 *  The JSON representation for `NullValue` is JSON `null`.
 */
export enum NullValue {
  /** NULL_VALUE - Null value. */
  NULL_VALUE = 0,
  UNRECOGNIZED = -1,
}

/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 */
export interface Struct {
  /** Unordered map of dynamically typed values. */
  fields: { [key: string]: any | undefined };
}

export interface Struct_FieldsEntry {
  key: string;
  value: any | undefined;
}

/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 */
export interface Value {
  /** Represents a null value. */
  nullValue?:
    | NullValue
    | undefined;
  /** Represents a double value. */
  numberValue?:
    | number
    | undefined;
  /** Represents a string value. */
  stringValue?:
    | string
    | undefined;
  /** Represents a boolean value. */
  boolValue?:
    | boolean
    | undefined;
  /** Represents a structured value. */
  structValue?:
    | { [key: string]: any }
    | undefined;
  /** Represents a repeated `Value`. */
  listValue?: Array<any> | undefined;
}

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValue {
  /** Repeated field of dynamically typed values. */
  values: any[];
}

export const GOOGLE_PROTOBUF_PACKAGE_NAME = "google.protobuf";

function createBaseStruct(): Struct {
  return { fields: {} };
}

export const Struct = {
  wrap(object: { [key: string]: any } | undefined): Struct {
    const struct = createBaseStruct();
    if (object !== undefined) {
      Object.keys(object).forEach((key) => {
        struct.fields[key] = Value.wrap(object[key]);
      });
    }
    return struct;
  },

  unwrap(message: Struct): { [key: string]: any } {
    const object: { [key: string]: any } = {};
    if (message.fields) {
      Object.keys(message.fields).forEach((key) => {
        object[key] = Value.unwrap(message.fields[key]);
      });
    }
    return object;
  },
};

function createBaseValue(): Value {
  return {};
}

export const Value = {
  wrap(value: any): Value {
    const result = {} as any;
    if (value === null) {
      result.nullValue = NullValue.NULL_VALUE;
    } else if (typeof value === "boolean") {
      result.boolValue = value;
    } else if (typeof value === "number") {
      result.numberValue = value;
    } else if (typeof value === "string") {
      result.stringValue = value;
    } else if (Array.isArray(value)) {
      result.listValue = ListValue.wrap(value);
    } else if (typeof value === "object") {
      result.structValue = Struct.wrap(value);
    } else if (typeof value !== "undefined") {
      throw new Error("Unsupported any value type: " + typeof value);
    }
    return result;
  },

  unwrap(message: any): string | number | boolean | Object | null | Array<any> | undefined {
    if (message?.hasOwnProperty("stringValue") && message.stringValue !== undefined) {
      return message.stringValue;
    } else if (message?.hasOwnProperty("numberValue") && message?.numberValue !== undefined) {
      return message.numberValue;
    } else if (message?.hasOwnProperty("boolValue") && message?.boolValue !== undefined) {
      return message.boolValue;
    } else if (message?.hasOwnProperty("structValue") && message?.structValue !== undefined) {
      return Struct.unwrap(message.structValue as any);
    } else if (message?.hasOwnProperty("listValue") && message?.listValue !== undefined) {
      return ListValue.unwrap(message.listValue);
    } else if (message?.hasOwnProperty("nullValue") && message?.nullValue !== undefined) {
      return null;
    }
    return undefined;
  },
};

function createBaseListValue(): ListValue {
  return { values: [] };
}

export const ListValue = {
  wrap(array: Array<any> | undefined): ListValue {
    const result = createBaseListValue();
    result.values = (array ?? []).map(Value.wrap);
    return result;
  },

  unwrap(message: ListValue): Array<any> {
    if (message?.hasOwnProperty("values") && Array.isArray(message.values)) {
      return message.values.map(Value.unwrap);
    } else {
      return message as any;
    }
  },
};

wrappers[".google.protobuf.Struct"] = { fromObject: Struct.wrap, toObject: Struct.unwrap } as any;
