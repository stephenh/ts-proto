/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

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

export function nullValueFromJSON(object: any): NullValue {
  switch (object) {
    case 0:
    case "NULL_VALUE":
      return NullValue.NULL_VALUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NullValue.UNRECOGNIZED;
  }
}

export function nullValueToJSON(object: NullValue): string {
  switch (object) {
    case NullValue.NULL_VALUE:
      return "NULL_VALUE";
    case NullValue.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
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
  kind?:
    | { $case: "null_value"; null_value: NullValue }
    | { $case: "number_value"; number_value: number }
    | { $case: "string_value"; string_value: string }
    | { $case: "bool_value"; bool_value: boolean }
    | { $case: "struct_value"; struct_value: { [key: string]: any } | undefined }
    | { $case: "list_value"; list_value: Array<any> | undefined }
    | undefined;
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

function createBaseStruct(): Struct {
  return { fields: {} };
}

export const Struct = {
  encode(message: Struct, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.fields).forEach(([key, value]) => {
      if (value !== undefined) {
        Struct_FieldsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
      }
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Struct {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStruct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = Struct_FieldsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.fields[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Struct {
    return {
      fields: isObject(object.fields)
        ? Object.entries(object.fields).reduce<{ [key: string]: any | undefined }>((acc, [key, value]) => {
          acc[key] = value as any | undefined;
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Struct): unknown {
    const obj: any = {};
    if (message.fields) {
      const entries = Object.entries(message.fields);
      if (entries.length > 0) {
        obj.fields = {};
        entries.forEach(([k, v]) => {
          obj.fields[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Struct>, I>>(base?: I): Struct {
    return Struct.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Struct>, I>>(object: I): Struct {
    const message = createBaseStruct();
    message.fields = Object.entries(object.fields ?? {}).reduce<{ [key: string]: any | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },

  wrap(object: { [key: string]: any } | undefined): Struct {
    const struct = createBaseStruct();
    if (object !== undefined) {
      Object.keys(object).forEach((key) => {
        struct.fields[key] = object[key];
      });
    }
    return struct;
  },

  unwrap(message: Struct): { [key: string]: any } {
    const object: { [key: string]: any } = {};
    if (message.fields) {
      Object.keys(message.fields).forEach((key) => {
        object[key] = message.fields[key];
      });
    }
    return object;
  },
};

function createBaseStruct_FieldsEntry(): Struct_FieldsEntry {
  return { key: "", value: undefined };
}

export const Struct_FieldsEntry = {
  encode(message: Struct_FieldsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Struct_FieldsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStruct_FieldsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Struct_FieldsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object?.value) ? object.value : undefined };
  },

  toJSON(message: Struct_FieldsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Struct_FieldsEntry>, I>>(base?: I): Struct_FieldsEntry {
    return Struct_FieldsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Struct_FieldsEntry>, I>>(object: I): Struct_FieldsEntry {
    const message = createBaseStruct_FieldsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

function createBaseValue(): Value {
  return { kind: undefined };
}

export const Value = {
  encode(message: Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.kind?.$case) {
      case "null_value":
        writer.uint32(8).int32(message.kind.null_value);
        break;
      case "number_value":
        writer.uint32(17).double(message.kind.number_value);
        break;
      case "string_value":
        writer.uint32(26).string(message.kind.string_value);
        break;
      case "bool_value":
        writer.uint32(32).bool(message.kind.bool_value);
        break;
      case "struct_value":
        Struct.encode(Struct.wrap(message.kind.struct_value), writer.uint32(42).fork()).ldelim();
        break;
      case "list_value":
        ListValue.encode(ListValue.wrap(message.kind.list_value), writer.uint32(50).fork()).ldelim();
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.kind = { $case: "null_value", null_value: reader.int32() as any };
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.kind = { $case: "number_value", number_value: reader.double() };
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.kind = { $case: "string_value", string_value: reader.string() };
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.kind = { $case: "bool_value", bool_value: reader.bool() };
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.kind = { $case: "struct_value", struct_value: Struct.unwrap(Struct.decode(reader, reader.uint32())) };
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.kind = {
            $case: "list_value",
            list_value: ListValue.unwrap(ListValue.decode(reader, reader.uint32())),
          };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Value {
    return {
      kind: isSet(object.null_value)
        ? { $case: "null_value", null_value: nullValueFromJSON(object.null_value) }
        : isSet(object.number_value)
        ? { $case: "number_value", number_value: Number(object.number_value) }
        : isSet(object.string_value)
        ? { $case: "string_value", string_value: String(object.string_value) }
        : isSet(object.bool_value)
        ? { $case: "bool_value", bool_value: Boolean(object.bool_value) }
        : isSet(object.struct_value)
        ? { $case: "struct_value", struct_value: object.struct_value }
        : isSet(object.list_value)
        ? { $case: "list_value", list_value: [...object.list_value] }
        : undefined,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    if (message.kind?.$case === "null_value") {
      obj.null_value = message.kind?.null_value !== undefined ? nullValueToJSON(message.kind?.null_value) : undefined;
    }
    if (message.kind?.$case === "number_value") {
      obj.number_value = message.kind?.number_value;
    }
    if (message.kind?.$case === "string_value") {
      obj.string_value = message.kind?.string_value;
    }
    if (message.kind?.$case === "bool_value") {
      obj.bool_value = message.kind?.bool_value;
    }
    if (message.kind?.$case === "struct_value") {
      obj.struct_value = message.kind?.struct_value;
    }
    if (message.kind?.$case === "list_value") {
      obj.list_value = message.kind?.list_value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Value>, I>>(base?: I): Value {
    return Value.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Value>, I>>(object: I): Value {
    const message = createBaseValue();
    if (
      object.kind?.$case === "null_value" && object.kind?.null_value !== undefined && object.kind?.null_value !== null
    ) {
      message.kind = { $case: "null_value", null_value: object.kind.null_value };
    }
    if (
      object.kind?.$case === "number_value" &&
      object.kind?.number_value !== undefined &&
      object.kind?.number_value !== null
    ) {
      message.kind = { $case: "number_value", number_value: object.kind.number_value };
    }
    if (
      object.kind?.$case === "string_value" &&
      object.kind?.string_value !== undefined &&
      object.kind?.string_value !== null
    ) {
      message.kind = { $case: "string_value", string_value: object.kind.string_value };
    }
    if (
      object.kind?.$case === "bool_value" && object.kind?.bool_value !== undefined && object.kind?.bool_value !== null
    ) {
      message.kind = { $case: "bool_value", bool_value: object.kind.bool_value };
    }
    if (
      object.kind?.$case === "struct_value" &&
      object.kind?.struct_value !== undefined &&
      object.kind?.struct_value !== null
    ) {
      message.kind = { $case: "struct_value", struct_value: object.kind.struct_value };
    }
    if (
      object.kind?.$case === "list_value" && object.kind?.list_value !== undefined && object.kind?.list_value !== null
    ) {
      message.kind = { $case: "list_value", list_value: object.kind.list_value };
    }
    return message;
  },

  wrap(value: any): Value {
    const result = createBaseValue();
    if (value === null) {
      result.kind = { $case: "null_value", null_value: NullValue.NULL_VALUE };
    } else if (typeof value === "boolean") {
      result.kind = { $case: "bool_value", bool_value: value };
    } else if (typeof value === "number") {
      result.kind = { $case: "number_value", number_value: value };
    } else if (typeof value === "string") {
      result.kind = { $case: "string_value", string_value: value };
    } else if (Array.isArray(value)) {
      result.kind = { $case: "list_value", list_value: value };
    } else if (typeof value === "object") {
      result.kind = { $case: "struct_value", struct_value: value };
    } else if (typeof value !== "undefined") {
      throw new Error("Unsupported any value type: " + typeof value);
    }
    return result;
  },

  unwrap(message: Value): string | number | boolean | Object | null | Array<any> | undefined {
    if (message.kind?.$case === "null_value") {
      return null;
    } else if (message.kind?.$case === "number_value") {
      return message.kind?.number_value;
    } else if (message.kind?.$case === "string_value") {
      return message.kind?.string_value;
    } else if (message.kind?.$case === "bool_value") {
      return message.kind?.bool_value;
    } else if (message.kind?.$case === "struct_value") {
      return message.kind?.struct_value;
    } else if (message.kind?.$case === "list_value") {
      return message.kind?.list_value;
    } else {
      return undefined;
    }
  },
};

function createBaseListValue(): ListValue {
  return { values: [] };
}

export const ListValue = {
  encode(message: ListValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.values) {
      Value.encode(Value.wrap(v!), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.values.push(Value.unwrap(Value.decode(reader, reader.uint32())));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListValue {
    return { values: Array.isArray(object?.values) ? [...object.values] : [] };
  },

  toJSON(message: ListValue): unknown {
    const obj: any = {};
    if (message.values?.length) {
      obj.values = message.values;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListValue>, I>>(base?: I): ListValue {
    return ListValue.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListValue>, I>>(object: I): ListValue {
    const message = createBaseListValue();
    message.values = object.values?.map((e) => e) || [];
    return message;
  },

  wrap(array: Array<any> | undefined): ListValue {
    const result = createBaseListValue();
    result.values = array ?? [];
    return result;
  },

  unwrap(message: ListValue): Array<any> {
    if (message?.hasOwnProperty("values") && Array.isArray(message.values)) {
      return message.values;
    } else {
      return message as any;
    }
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
