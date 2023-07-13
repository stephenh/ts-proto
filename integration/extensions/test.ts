/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum Enum {
  ENUM_UNRECOGNIZED = 0,
  ENUM_ONE = 1,
  ENUM_TWO = 2,
  UNRECOGNIZED = -1,
}

export function enumFromJSON(object: any): Enum {
  switch (object) {
    case 0:
    case "ENUM_UNRECOGNIZED":
      return Enum.ENUM_UNRECOGNIZED;
    case 1:
    case "ENUM_ONE":
      return Enum.ENUM_ONE;
    case 2:
    case "ENUM_TWO":
      return Enum.ENUM_TWO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Enum.UNRECOGNIZED;
  }
}

export function enumToJSON(object: Enum): string {
  switch (object) {
    case Enum.ENUM_UNRECOGNIZED:
      return "ENUM_UNRECOGNIZED";
    case Enum.ENUM_ONE:
      return "ENUM_ONE";
    case Enum.ENUM_TWO:
      return "ENUM_TWO";
    case Enum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Extendable {
  field?: string | undefined;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface Nested {
  field?: string | undefined;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface Group {
  name?: string | undefined;
  value?: string | undefined;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

function createBaseExtendable(): Extendable {
  return {};
}

export const Extendable = {
  encode(message: Extendable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== undefined && message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  setExtension<T>(message: Extendable, extension: Extension<T>, value: T): void {
    const encoded = extension.encode!(value);

    if (message._unknownFields !== undefined) {
      delete message._unknownFields[extension.tag];

      if (extension.singularTag !== undefined) {
        delete message._unknownFields[extension.singularTag];
      }
    }

    if (encoded.length !== 0) {
      if (message._unknownFields === undefined) {
        message._unknownFields = {};
      }

      message._unknownFields[extension.tag] = encoded;
    }
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Extendable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      if (message._unknownFields === undefined) {
        message._unknownFields = {};
      }

      const list = message._unknownFields[tag];

      if (list === undefined) {
        message._unknownFields[tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },

  getExtension<T>(message: Extendable, extension: Extension<T>): T | undefined {
    let results: T | undefined = undefined;

    if (message._unknownFields === undefined) {
      return undefined;
    }

    let list = message._unknownFields[extension.tag];

    if (list !== undefined) {
      results = extension.decode!(extension.tag, list);
    }

    if (extension.singularTag === undefined) {
      return results;
    }

    list = message._unknownFields[extension.singularTag];

    if (list !== undefined) {
      const results2 = extension.decode!(extension.singularTag, list);

      if (results !== undefined && (results as any).length !== 0) {
        results = (results as any).concat(results2);
      } else {
        results = results2;
      }
    }

    return results;
  },

  fromJSON(object: any): Extendable {
    return { field: isSet(object.field) ? String(object.field) : undefined };
  },

  toJSON(message: Extendable): unknown {
    const obj: any = {};
    if (message.field !== undefined && message.field !== "") {
      obj.field = message.field;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Extendable>, I>>(base?: I): Extendable {
    return Extendable.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Extendable>, I>>(object: I): Extendable {
    const message = createBaseExtendable();
    message.field = object.field ?? undefined;
    return message;
  },
};

function createBaseNested(): Nested {
  return {};
}

export const Nested = {
  message: <Extension<Nested[]>> {
    number: 4,
    tag: 34,
    repeated: true,
    packed: false,
    encode: (value: Nested[]): Uint8Array[] => {
      const encoded: Uint8Array[] = [];
      for (const v of value) {
        const writer = _m0.Writer.create();
        Nested.encode(v, writer.fork()).ldelim();
        encoded.push(writer.finish());
      }
      return encoded;
    },
    decode: (tag: number, input: Uint8Array[]): Nested[] => {
      const values: Nested[] = [];
      for (const buffer of input) {
        const reader = _m0.Reader.create(buffer);
        values.push(Nested.decode(reader, reader.uint32()));
      }

      return values;
    },
  },

  encode(message: Nested, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== undefined && message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Nested {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNested();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      if (message._unknownFields === undefined) {
        message._unknownFields = {};
      }

      const list = message._unknownFields[tag];

      if (list === undefined) {
        message._unknownFields[tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },

  fromJSON(object: any): Nested {
    return { field: isSet(object.field) ? String(object.field) : undefined };
  },

  toJSON(message: Nested): unknown {
    const obj: any = {};
    if (message.field !== undefined && message.field !== "") {
      obj.field = message.field;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Nested>, I>>(base?: I): Nested {
    return Nested.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Nested>, I>>(object: I): Nested {
    const message = createBaseNested();
    message.field = object.field ?? undefined;
    return message;
  },
};

function createBaseGroup(): Group {
  return {};
}

export const Group = {
  encode(message: Group, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Group {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      if (message._unknownFields === undefined) {
        message._unknownFields = {};
      }

      const list = message._unknownFields[tag];

      if (list === undefined) {
        message._unknownFields[tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },

  fromJSON(object: any): Group {
    return {
      name: isSet(object.name) ? String(object.name) : undefined,
      value: isSet(object.value) ? String(object.value) : undefined,
    };
  },

  toJSON(message: Group): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.value !== undefined && message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Group>, I>>(base?: I): Group {
    return Group.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Group>, I>>(object: I): Group {
    const message = createBaseGroup();
    message.name = object.name ?? undefined;
    message.value = object.value ?? undefined;
    return message;
  },
};

export const packed: Extension<number[]> = {
  number: 5,
  tag: 42,
  singularTag: 40,
  repeated: true,
  packed: true,
  encode: (value: number[]): Uint8Array[] => {
    const encoded: Uint8Array[] = [];
    const writer = _m0.Writer.create();
    writer.fork();
    for (const v of value) {
      writer.int32(v);
    }
    writer.ldelim();
    encoded.push(writer.finish());
    return encoded;
  },
  decode: (tag: number, input: Uint8Array[]): number[] => {
    const values: number[] = [];
    for (const buffer of input) {
      const reader = _m0.Reader.create(buffer);
      if (tag == 42) {
        const end2 = reader.uint32() + reader.pos;
        while (reader.pos < end2) {
          values.push(reader.int32());
        }
      } else {
        values.push(reader.int32());
      }
    }

    return values;
  },
};

export const repeated: Extension<number[]> = {
  number: 6,
  tag: 50,
  singularTag: 48,
  repeated: true,
  packed: false,
  encode: (value: number[]): Uint8Array[] => {
    const encoded: Uint8Array[] = [];
    const writer = _m0.Writer.create();
    writer.fork();
    for (const v of value) {
      writer.int32(v);
    }
    writer.ldelim();
    encoded.push(writer.finish());
    return encoded;
  },
  decode: (tag: number, input: Uint8Array[]): number[] => {
    const values: number[] = [];
    for (const buffer of input) {
      const reader = _m0.Reader.create(buffer);
      if (tag == 50) {
        const end2 = reader.uint32() + reader.pos;
        while (reader.pos < end2) {
          values.push(reader.int32());
        }
      } else {
        values.push(reader.int32());
      }
    }

    return values;
  },
};

export const bytes: Extension<Uint8Array> = {
  number: 7,
  tag: 58,
  repeated: false,
  packed: false,
  encode: (value: Uint8Array): Uint8Array[] => {
    const encoded: Uint8Array[] = [];
    if (value !== undefined && value.length !== 0) {
      const writer = _m0.Writer.create();
      writer.bytes(value);
      encoded.push(writer.finish());
    }
    return encoded;
  },
  decode: (tag: number, input: Uint8Array[]): Uint8Array => {
    const reader = _m0.Reader.create(input[input.length - 1] ?? fail());
    return reader.bytes();
  },
};

export const string: Extension<string> = {
  number: 8,
  tag: 66,
  repeated: false,
  packed: false,
  encode: (value: string): Uint8Array[] => {
    const encoded: Uint8Array[] = [];
    if (value !== undefined && value !== "") {
      const writer = _m0.Writer.create();
      writer.string(value);
      encoded.push(writer.finish());
    }
    return encoded;
  },
  decode: (tag: number, input: Uint8Array[]): string => {
    const reader = _m0.Reader.create(input[input.length - 1] ?? fail());
    return reader.string();
  },
};

export const long: Extension<Long> = {
  number: 9,
  tag: 72,
  repeated: false,
  packed: false,
  encode: (value: Long): Uint8Array[] => {
    const encoded: Uint8Array[] = [];
    if (value !== undefined && !value.isZero()) {
      const writer = _m0.Writer.create();
      writer.int64(value);
      encoded.push(writer.finish());
    }
    return encoded;
  },
  decode: (tag: number, input: Uint8Array[]): Long => {
    const reader = _m0.Reader.create(input[input.length - 1] ?? fail());
    return reader.int64() as Long;
  },
};

export const fixed: Extension<Long> = {
  number: 10,
  tag: 81,
  repeated: false,
  packed: false,
  encode: (value: Long): Uint8Array[] => {
    const encoded: Uint8Array[] = [];
    if (value !== undefined && !value.isZero()) {
      const writer = _m0.Writer.create();
      writer.fixed64(value);
      encoded.push(writer.finish());
    }
    return encoded;
  },
  decode: (tag: number, input: Uint8Array[]): Long => {
    const reader = _m0.Reader.create(input[input.length - 1] ?? fail());
    return reader.fixed64() as Long;
  },
};

export const enumField: Extension<Enum> = {
  number: 11,
  tag: 88,
  repeated: false,
  packed: false,
  encode: (value: Enum): Uint8Array[] => {
    const encoded: Uint8Array[] = [];
    if (value !== undefined && value !== 0) {
      const writer = _m0.Writer.create();
      writer.int32(value);
      encoded.push(writer.finish());
    }
    return encoded;
  },
  decode: (tag: number, input: Uint8Array[]): Enum => {
    const reader = _m0.Reader.create(input[input.length - 1] ?? fail());
    return reader.int32() as any;
  },
};

export const group: Extension<Group> = {
  number: 12,
  tag: 99,
  repeated: false,
  packed: false,
  encode: (value: Group): Uint8Array[] => {
    const encoded: Uint8Array[] = [];
    const writer = _m0.Writer.create();
    Group.encode(value, writer).uint32(100);
    encoded.push(writer.finish());
    return encoded;
  },
  decode: (tag: number, input: Uint8Array[]): Group => {
    const reader = _m0.Reader.create(input[input.length - 1] ?? fail());
    return Group.decode(reader);
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface Extension<T> {
  number: number;
  tag: number;
  singularTag?: number;
  encode?: (message: T) => Uint8Array[];
  decode?: (tag: number, input: Uint8Array[]) => T;
  repeated: boolean;
  packed: boolean;
}

function fail(message?: string): never {
  throw new Error(message ?? "Failed");
}
