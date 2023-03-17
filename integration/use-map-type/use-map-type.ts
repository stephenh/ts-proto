/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Struct } from "./google/protobuf/struct";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "simple";

export interface Entity {
  id: number;
}

export interface Maps {
  strToEntity: Map<string, Entity>;
  int32ToInt32: Map<number, number>;
  stringToBytes: Map<string, Uint8Array>;
  int64ToInt64: Map<number, number>;
  mapOfTimestamps: Map<string, Date>;
  struct: { [key: string]: any } | undefined;
}

export interface Maps_StrToEntityEntry {
  key: string;
  value: Entity | undefined;
}

export interface Maps_Int32ToInt32Entry {
  key: number;
  value: number;
}

export interface Maps_StringToBytesEntry {
  key: string;
  value: Uint8Array;
}

export interface Maps_Int64ToInt64Entry {
  key: number;
  value: number;
}

export interface Maps_MapOfTimestampsEntry {
  key: string;
  value: Date | undefined;
}

function createBaseEntity(): Entity {
  return { id: 0 };
}

export const Entity = {
  encode(message: Entity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 8:
          message.id = reader.int32();
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Entity {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: Entity): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  create<I extends Exact<DeepPartial<Entity>, I>>(base?: I): Entity {
    return Entity.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Entity>, I>>(object: I): Entity {
    const message = createBaseEntity();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMaps(): Maps {
  return {
    strToEntity: new Map(),
    int32ToInt32: new Map(),
    stringToBytes: new Map(),
    int64ToInt64: new Map(),
    mapOfTimestamps: new Map(),
    struct: undefined,
  };
}

export const Maps = {
  encode(message: Maps, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    message.strToEntity.forEach((value, key) => {
      Maps_StrToEntityEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    message.int32ToInt32.forEach((value, key) => {
      Maps_Int32ToInt32Entry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    message.stringToBytes.forEach((value, key) => {
      Maps_StringToBytesEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    message.int64ToInt64.forEach((value, key) => {
      Maps_Int64ToInt64Entry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    message.mapOfTimestamps.forEach((value, key) => {
      Maps_MapOfTimestampsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.struct !== undefined) {
      Struct.encode(Struct.wrap(message.struct), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Maps {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 10:
          const entry1 = Maps_StrToEntityEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.strToEntity.set(entry1.key, entry1.value);
          }
          break;
        case 18:
          const entry2 = Maps_Int32ToInt32Entry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.int32ToInt32.set(entry2.key, entry2.value);
          }
          break;
        case 26:
          const entry3 = Maps_StringToBytesEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.stringToBytes.set(entry3.key, entry3.value);
          }
          break;
        case 34:
          const entry4 = Maps_Int64ToInt64Entry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.int64ToInt64.set(entry4.key, entry4.value);
          }
          break;
        case 42:
          const entry5 = Maps_MapOfTimestampsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.mapOfTimestamps.set(entry5.key, entry5.value);
          }
          break;
        case 50:
          message.struct = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Maps {
    return {
      strToEntity: isObject(object.strToEntity)
        ? Object.entries(object.strToEntity).reduce<Map<string, Entity>>((acc, [key, value]) => {
          acc.set(key, Entity.fromJSON(value));
          return acc;
        }, new Map())
        : new Map(),
      int32ToInt32: isObject(object.int32ToInt32)
        ? Object.entries(object.int32ToInt32).reduce<Map<number, number>>((acc, [key, value]) => {
          acc.set(Number(key), Number(value));
          return acc;
        }, new Map())
        : new Map(),
      stringToBytes: isObject(object.stringToBytes)
        ? Object.entries(object.stringToBytes).reduce<Map<string, Uint8Array>>((acc, [key, value]) => {
          acc.set(key, bytesFromBase64(value as string));
          return acc;
        }, new Map())
        : new Map(),
      int64ToInt64: isObject(object.int64ToInt64)
        ? Object.entries(object.int64ToInt64).reduce<Map<number, number>>((acc, [key, value]) => {
          acc.set(Number(key), Number(value));
          return acc;
        }, new Map())
        : new Map(),
      mapOfTimestamps: isObject(object.mapOfTimestamps)
        ? Object.entries(object.mapOfTimestamps).reduce<Map<string, Date>>((acc, [key, value]) => {
          acc.set(key, fromJsonTimestamp(value));
          return acc;
        }, new Map())
        : new Map(),
      struct: isObject(object.struct) ? object.struct : undefined,
    };
  },

  toJSON(message: Maps): unknown {
    const obj: any = {};
    obj.strToEntity = {};
    if (message.strToEntity) {
      message.strToEntity.forEach((v, k) => {
        obj.strToEntity[k] = Entity.toJSON(v);
      });
    }
    obj.int32ToInt32 = {};
    if (message.int32ToInt32) {
      message.int32ToInt32.forEach((v, k) => {
        obj.int32ToInt32[k] = Math.round(v);
      });
    }
    obj.stringToBytes = {};
    if (message.stringToBytes) {
      message.stringToBytes.forEach((v, k) => {
        obj.stringToBytes[k] = base64FromBytes(v);
      });
    }
    obj.int64ToInt64 = {};
    if (message.int64ToInt64) {
      message.int64ToInt64.forEach((v, k) => {
        obj.int64ToInt64[k] = Math.round(v);
      });
    }
    obj.mapOfTimestamps = {};
    if (message.mapOfTimestamps) {
      message.mapOfTimestamps.forEach((v, k) => {
        obj.mapOfTimestamps[k] = v.toISOString();
      });
    }
    message.struct !== undefined && (obj.struct = message.struct);
    return obj;
  },

  create<I extends Exact<DeepPartial<Maps>, I>>(base?: I): Maps {
    return Maps.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Maps>, I>>(object: I): Maps {
    const message = createBaseMaps();
    message.strToEntity = (() => {
      const m = new Map();
      (object.strToEntity as Map<string, Entity> ?? new Map()).forEach((value, key) => {
        if (value !== undefined) {
          m.set(key, Entity.fromPartial(value));
        }
      });
      return m;
    })();
    message.int32ToInt32 = (() => {
      const m = new Map();
      (object.int32ToInt32 as Map<number, number> ?? new Map()).forEach((value, key) => {
        if (value !== undefined) {
          m.set(Number(key), Number(value));
        }
      });
      return m;
    })();
    message.stringToBytes = (() => {
      const m = new Map();
      (object.stringToBytes as Map<string, Uint8Array> ?? new Map()).forEach((value, key) => {
        if (value !== undefined) {
          m.set(key, value);
        }
      });
      return m;
    })();
    message.int64ToInt64 = (() => {
      const m = new Map();
      (object.int64ToInt64 as Map<number, number> ?? new Map()).forEach((value, key) => {
        if (value !== undefined) {
          m.set(Number(key), Number(value));
        }
      });
      return m;
    })();
    message.mapOfTimestamps = (() => {
      const m = new Map();
      (object.mapOfTimestamps as Map<string, Date> ?? new Map()).forEach((value, key) => {
        if (value !== undefined) {
          m.set(key, value);
        }
      });
      return m;
    })();
    message.struct = object.struct ?? undefined;
    return message;
  },
};

function createBaseMaps_StrToEntityEntry(): Maps_StrToEntityEntry {
  return { key: "", value: undefined };
}

export const Maps_StrToEntityEntry = {
  encode(message: Maps_StrToEntityEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Maps_StrToEntityEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaps_StrToEntityEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 10:
          message.key = reader.string();
          break;
        case 18:
          message.value = Entity.decode(reader, reader.uint32());
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Maps_StrToEntityEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Entity.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Maps_StrToEntityEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Entity.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Maps_StrToEntityEntry>, I>>(base?: I): Maps_StrToEntityEntry {
    return Maps_StrToEntityEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Maps_StrToEntityEntry>, I>>(object: I): Maps_StrToEntityEntry {
    const message = createBaseMaps_StrToEntityEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? Entity.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseMaps_Int32ToInt32Entry(): Maps_Int32ToInt32Entry {
  return { key: 0, value: 0 };
}

export const Maps_Int32ToInt32Entry = {
  encode(message: Maps_Int32ToInt32Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Maps_Int32ToInt32Entry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaps_Int32ToInt32Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 8:
          message.key = reader.int32();
          break;
        case 16:
          message.value = reader.int32();
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Maps_Int32ToInt32Entry {
    return { key: isSet(object.key) ? Number(object.key) : 0, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: Maps_Int32ToInt32Entry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  create<I extends Exact<DeepPartial<Maps_Int32ToInt32Entry>, I>>(base?: I): Maps_Int32ToInt32Entry {
    return Maps_Int32ToInt32Entry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Maps_Int32ToInt32Entry>, I>>(object: I): Maps_Int32ToInt32Entry {
    const message = createBaseMaps_Int32ToInt32Entry();
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseMaps_StringToBytesEntry(): Maps_StringToBytesEntry {
  return { key: "", value: new Uint8Array() };
}

export const Maps_StringToBytesEntry = {
  encode(message: Maps_StringToBytesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Maps_StringToBytesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaps_StringToBytesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 10:
          message.key = reader.string();
          break;
        case 18:
          message.value = reader.bytes();
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Maps_StringToBytesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(),
    };
  },

  toJSON(message: Maps_StringToBytesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<Maps_StringToBytesEntry>, I>>(base?: I): Maps_StringToBytesEntry {
    return Maps_StringToBytesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Maps_StringToBytesEntry>, I>>(object: I): Maps_StringToBytesEntry {
    const message = createBaseMaps_StringToBytesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

function createBaseMaps_Int64ToInt64Entry(): Maps_Int64ToInt64Entry {
  return { key: 0, value: 0 };
}

export const Maps_Int64ToInt64Entry = {
  encode(message: Maps_Int64ToInt64Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int64(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Maps_Int64ToInt64Entry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaps_Int64ToInt64Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 8:
          message.key = longToNumber(reader.int64() as Long);
          break;
        case 16:
          message.value = longToNumber(reader.int64() as Long);
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Maps_Int64ToInt64Entry {
    return { key: isSet(object.key) ? Number(object.key) : 0, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: Maps_Int64ToInt64Entry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  create<I extends Exact<DeepPartial<Maps_Int64ToInt64Entry>, I>>(base?: I): Maps_Int64ToInt64Entry {
    return Maps_Int64ToInt64Entry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Maps_Int64ToInt64Entry>, I>>(object: I): Maps_Int64ToInt64Entry {
    const message = createBaseMaps_Int64ToInt64Entry();
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseMaps_MapOfTimestampsEntry(): Maps_MapOfTimestampsEntry {
  return { key: "", value: undefined };
}

export const Maps_MapOfTimestampsEntry = {
  encode(message: Maps_MapOfTimestampsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Maps_MapOfTimestampsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaps_MapOfTimestampsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 10:
          message.key = reader.string();
          break;
        case 18:
          message.value = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Maps_MapOfTimestampsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? fromJsonTimestamp(object.value) : undefined,
    };
  },

  toJSON(message: Maps_MapOfTimestampsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<Maps_MapOfTimestampsEntry>, I>>(base?: I): Maps_MapOfTimestampsEntry {
    return Maps_MapOfTimestampsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Maps_MapOfTimestampsEntry>, I>>(object: I): Maps_MapOfTimestampsEntry {
    const message = createBaseMaps_MapOfTimestampsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
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

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
