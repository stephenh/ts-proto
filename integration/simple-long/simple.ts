/* eslint-disable */
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { BoolValue, Int32Value, Int64Value, StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "simple";

export interface SimpleWithWrappers {
  name: string | undefined;
  age: number | undefined;
  enabled: boolean | undefined;
  bananas: Long | undefined;
  coins: number[];
  snacks: string[];
}

export interface SimpleWithMap {
  nameLookup: { [key: string]: string };
  intLookup: { [key: number]: number };
  longLookup: Map<Long, Long>;
}

export interface SimpleWithMap_NameLookupEntry {
  key: string;
  value: string;
}

export interface SimpleWithMap_IntLookupEntry {
  key: number;
  value: number;
}

export interface SimpleWithMap_LongLookupEntry {
  key: Long;
  value: Long;
}

export interface Numbers {
  double: number;
  float: number;
  int32: number;
  int64: Long;
  uint32: number;
  uint64: Long;
  sint32: number;
  sint64: Long;
  fixed32: number;
  fixed64: Long;
  sfixed32: number;
  sfixed64: Long;
  /** repro https://github.com/stephenh/ts-proto/issues/187 */
  manyUint64: Long[];
}

function createBaseSimpleWithWrappers(): SimpleWithWrappers {
  return { name: undefined, age: undefined, enabled: undefined, bananas: undefined, coins: [], snacks: [] };
}

export const SimpleWithWrappers = {
  encode(message: SimpleWithWrappers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      StringValue.encode({ value: message.name! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.age !== undefined) {
      Int32Value.encode({ value: message.age! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.enabled !== undefined) {
      BoolValue.encode({ value: message.enabled! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.bananas !== undefined) {
      Int64Value.encode({ value: message.bananas! }, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.coins) {
      Int32Value.encode({ value: v!! }, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.snacks) {
      StringValue.encode({ value: v!! }, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithWrappers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithWrappers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.age = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.enabled = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.bananas = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.coins.push(Int32Value.decode(reader, reader.uint32()).value);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.snacks.push(StringValue.decode(reader, reader.uint32()).value);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithWrappers {
    return {
      name: isSet(object.name) ? String(object.name) : undefined,
      age: isSet(object.age) ? Number(object.age) : undefined,
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : undefined,
      bananas: isSet(object.bananas) ? Long.fromValue(object.bananas) : undefined,
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Number(e)) : [],
      snacks: globalThis.Array.isArray(object?.snacks) ? object.snacks.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: SimpleWithWrappers): unknown {
    const obj: any = {};
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.age !== undefined) {
      obj.age = message.age;
    }
    if (message.enabled !== undefined) {
      obj.enabled = message.enabled;
    }
    if (message.bananas !== undefined) {
      obj.bananas = message.bananas;
    }
    if (message.coins?.length) {
      obj.coins = message.coins;
    }
    if (message.snacks?.length) {
      obj.snacks = message.snacks;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithWrappers>, I>>(base?: I): SimpleWithWrappers {
    return SimpleWithWrappers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimpleWithWrappers>, I>>(object: I): SimpleWithWrappers {
    const message = createBaseSimpleWithWrappers();
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
    message.enabled = object.enabled ?? undefined;
    message.bananas = (object.bananas !== undefined && object.bananas !== null)
      ? Long.fromValue(object.bananas)
      : undefined;
    message.coins = object.coins?.map((e) => e) || [];
    message.snacks = object.snacks?.map((e) => e) || [];
    return message;
  },
};

function createBaseSimpleWithMap(): SimpleWithMap {
  return { nameLookup: {}, intLookup: {}, longLookup: new Map() };
}

export const SimpleWithMap = {
  encode(message: SimpleWithMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.nameLookup).forEach(([key, value]) => {
      SimpleWithMap_NameLookupEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    Object.entries(message.intLookup).forEach(([key, value]) => {
      SimpleWithMap_IntLookupEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    (message.longLookup).forEach((value, key) => {
      SimpleWithMap_LongLookupEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = SimpleWithMap_NameLookupEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.nameLookup[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = SimpleWithMap_IntLookupEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.intLookup[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = SimpleWithMap_LongLookupEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.longLookup.set(entry4.key, entry4.value);
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

  fromJSON(object: any): SimpleWithMap {
    return {
      nameLookup: isObject(object.nameLookup)
        ? Object.entries(object.nameLookup).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      intLookup: isObject(object.intLookup)
        ? Object.entries(object.intLookup).reduce<{ [key: number]: number }>((acc, [key, value]) => {
          acc[globalThis.Number(key)] = Number(value);
          return acc;
        }, {})
        : {},
      longLookup: isObject(object.longLookup)
        ? Object.entries(object.longLookup).reduce<Map<Long, Long>>((acc, [key, value]) => {
          acc.set(Long.fromValue(key), Long.fromValue(value as Long | string));
          return acc;
        }, new Map())
        : new Map(),
    };
  },

  toJSON(message: SimpleWithMap): unknown {
    const obj: any = {};
    if (message.nameLookup) {
      const entries = Object.entries(message.nameLookup);
      if (entries.length > 0) {
        obj.nameLookup = {};
        entries.forEach(([k, v]) => {
          obj.nameLookup[k] = v;
        });
      }
    }
    if (message.intLookup) {
      const entries = Object.entries(message.intLookup);
      if (entries.length > 0) {
        obj.intLookup = {};
        entries.forEach(([k, v]) => {
          obj.intLookup[k] = Math.round(v);
        });
      }
    }
    if (message.longLookup?.size) {
      obj.longLookup = {};
      message.longLookup.forEach((v, k) => {
        obj.longLookup[longToNumber(k)] = v.toString();
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap>, I>>(base?: I): SimpleWithMap {
    return SimpleWithMap.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimpleWithMap>, I>>(object: I): SimpleWithMap {
    const message = createBaseSimpleWithMap();
    message.nameLookup = Object.entries(object.nameLookup ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.String(value);
        }
        return acc;
      },
      {},
    );
    message.intLookup = Object.entries(object.intLookup ?? {}).reduce<{ [key: number]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[globalThis.Number(key)] = globalThis.Number(value);
        }
        return acc;
      },
      {},
    );
    message.longLookup = (() => {
      const m = new Map();
      (object.longLookup as Map<Long, Long> ?? new Map()).forEach((value, key) => {
        if (value !== undefined) {
          m.set(key, Long.fromValue(value));
        }
      });
      return m;
    })();
    return message;
  },
};

function createBaseSimpleWithMap_NameLookupEntry(): SimpleWithMap_NameLookupEntry {
  return { key: "", value: "" };
}

export const SimpleWithMap_NameLookupEntry = {
  encode(message: SimpleWithMap_NameLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_NameLookupEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_NameLookupEntry();
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

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_NameLookupEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: SimpleWithMap_NameLookupEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_NameLookupEntry>, I>>(base?: I): SimpleWithMap_NameLookupEntry {
    return SimpleWithMap_NameLookupEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_NameLookupEntry>, I>>(
    object: I,
  ): SimpleWithMap_NameLookupEntry {
    const message = createBaseSimpleWithMap_NameLookupEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseSimpleWithMap_IntLookupEntry(): SimpleWithMap_IntLookupEntry {
  return { key: 0, value: 0 };
}

export const SimpleWithMap_IntLookupEntry = {
  encode(message: SimpleWithMap_IntLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_IntLookupEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_IntLookupEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_IntLookupEntry {
    return {
      key: isSet(object.key) ? globalThis.Number(object.key) : 0,
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: SimpleWithMap_IntLookupEntry): unknown {
    const obj: any = {};
    if (message.key !== 0) {
      obj.key = Math.round(message.key);
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_IntLookupEntry>, I>>(base?: I): SimpleWithMap_IntLookupEntry {
    return SimpleWithMap_IntLookupEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_IntLookupEntry>, I>>(object: I): SimpleWithMap_IntLookupEntry {
    const message = createBaseSimpleWithMap_IntLookupEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseSimpleWithMap_LongLookupEntry(): SimpleWithMap_LongLookupEntry {
  return { key: Long.ZERO, value: Long.ZERO };
}

export const SimpleWithMap_LongLookupEntry = {
  encode(message: SimpleWithMap_LongLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.key.isZero()) {
      writer.uint32(8).int64(message.key);
    }
    if (!message.value.isZero()) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_LongLookupEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_LongLookupEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_LongLookupEntry {
    return {
      key: isSet(object.key) ? Long.fromValue(object.key) : Long.ZERO,
      value: isSet(object.value) ? Long.fromValue(object.value) : Long.ZERO,
    };
  },

  toJSON(message: SimpleWithMap_LongLookupEntry): unknown {
    const obj: any = {};
    if (!message.key.isZero()) {
      obj.key = (message.key || Long.ZERO).toString();
    }
    if (!message.value.isZero()) {
      obj.value = (message.value || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_LongLookupEntry>, I>>(base?: I): SimpleWithMap_LongLookupEntry {
    return SimpleWithMap_LongLookupEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_LongLookupEntry>, I>>(
    object: I,
  ): SimpleWithMap_LongLookupEntry {
    const message = createBaseSimpleWithMap_LongLookupEntry();
    message.key = (object.key !== undefined && object.key !== null) ? Long.fromValue(object.key) : Long.ZERO;
    message.value = (object.value !== undefined && object.value !== null) ? Long.fromValue(object.value) : Long.ZERO;
    return message;
  },
};

function createBaseNumbers(): Numbers {
  return {
    double: 0,
    float: 0,
    int32: 0,
    int64: Long.ZERO,
    uint32: 0,
    uint64: Long.UZERO,
    sint32: 0,
    sint64: Long.ZERO,
    fixed32: 0,
    fixed64: Long.UZERO,
    sfixed32: 0,
    sfixed64: Long.ZERO,
    manyUint64: [],
  };
}

export const Numbers = {
  encode(message: Numbers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.double !== 0) {
      writer.uint32(9).double(message.double);
    }
    if (message.float !== 0) {
      writer.uint32(21).float(message.float);
    }
    if (message.int32 !== 0) {
      writer.uint32(24).int32(message.int32);
    }
    if (!message.int64.isZero()) {
      writer.uint32(32).int64(message.int64);
    }
    if (message.uint32 !== 0) {
      writer.uint32(40).uint32(message.uint32);
    }
    if (!message.uint64.isZero()) {
      writer.uint32(48).uint64(message.uint64);
    }
    if (message.sint32 !== 0) {
      writer.uint32(56).sint32(message.sint32);
    }
    if (!message.sint64.isZero()) {
      writer.uint32(64).sint64(message.sint64);
    }
    if (message.fixed32 !== 0) {
      writer.uint32(77).fixed32(message.fixed32);
    }
    if (!message.fixed64.isZero()) {
      writer.uint32(81).fixed64(message.fixed64);
    }
    if (message.sfixed32 !== 0) {
      writer.uint32(93).sfixed32(message.sfixed32);
    }
    if (!message.sfixed64.isZero()) {
      writer.uint32(97).sfixed64(message.sfixed64);
    }
    writer.uint32(106).fork();
    for (const v of message.manyUint64) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumbers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.double = reader.double();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.float = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.int32 = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.int64 = reader.int64() as Long;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.uint32 = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.uint64 = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.sint32 = reader.sint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.sint64 = reader.sint64() as Long;
          continue;
        case 9:
          if (tag !== 77) {
            break;
          }

          message.fixed32 = reader.fixed32();
          continue;
        case 10:
          if (tag !== 81) {
            break;
          }

          message.fixed64 = reader.fixed64() as Long;
          continue;
        case 11:
          if (tag !== 93) {
            break;
          }

          message.sfixed32 = reader.sfixed32();
          continue;
        case 12:
          if (tag !== 97) {
            break;
          }

          message.sfixed64 = reader.sfixed64() as Long;
          continue;
        case 13:
          if (tag === 104) {
            message.manyUint64.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 106) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.manyUint64.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Numbers {
    return {
      double: isSet(object.double) ? globalThis.Number(object.double) : 0,
      float: isSet(object.float) ? globalThis.Number(object.float) : 0,
      int32: isSet(object.int32) ? globalThis.Number(object.int32) : 0,
      int64: isSet(object.int64) ? Long.fromValue(object.int64) : Long.ZERO,
      uint32: isSet(object.uint32) ? globalThis.Number(object.uint32) : 0,
      uint64: isSet(object.uint64) ? Long.fromValue(object.uint64) : Long.UZERO,
      sint32: isSet(object.sint32) ? globalThis.Number(object.sint32) : 0,
      sint64: isSet(object.sint64) ? Long.fromValue(object.sint64) : Long.ZERO,
      fixed32: isSet(object.fixed32) ? globalThis.Number(object.fixed32) : 0,
      fixed64: isSet(object.fixed64) ? Long.fromValue(object.fixed64) : Long.UZERO,
      sfixed32: isSet(object.sfixed32) ? globalThis.Number(object.sfixed32) : 0,
      sfixed64: isSet(object.sfixed64) ? Long.fromValue(object.sfixed64) : Long.ZERO,
      manyUint64: globalThis.Array.isArray(object?.manyUint64)
        ? object.manyUint64.map((e: any) => Long.fromValue(e))
        : [],
    };
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    if (message.double !== 0) {
      obj.double = message.double;
    }
    if (message.float !== 0) {
      obj.float = message.float;
    }
    if (message.int32 !== 0) {
      obj.int32 = Math.round(message.int32);
    }
    if (!message.int64.isZero()) {
      obj.int64 = (message.int64 || Long.ZERO).toString();
    }
    if (message.uint32 !== 0) {
      obj.uint32 = Math.round(message.uint32);
    }
    if (!message.uint64.isZero()) {
      obj.uint64 = (message.uint64 || Long.UZERO).toString();
    }
    if (message.sint32 !== 0) {
      obj.sint32 = Math.round(message.sint32);
    }
    if (!message.sint64.isZero()) {
      obj.sint64 = (message.sint64 || Long.ZERO).toString();
    }
    if (message.fixed32 !== 0) {
      obj.fixed32 = Math.round(message.fixed32);
    }
    if (!message.fixed64.isZero()) {
      obj.fixed64 = (message.fixed64 || Long.UZERO).toString();
    }
    if (message.sfixed32 !== 0) {
      obj.sfixed32 = Math.round(message.sfixed32);
    }
    if (!message.sfixed64.isZero()) {
      obj.sfixed64 = (message.sfixed64 || Long.ZERO).toString();
    }
    if (message.manyUint64?.length) {
      obj.manyUint64 = message.manyUint64.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Numbers>, I>>(base?: I): Numbers {
    return Numbers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Numbers>, I>>(object: I): Numbers {
    const message = createBaseNumbers();
    message.double = object.double ?? 0;
    message.float = object.float ?? 0;
    message.int32 = object.int32 ?? 0;
    message.int64 = (object.int64 !== undefined && object.int64 !== null) ? Long.fromValue(object.int64) : Long.ZERO;
    message.uint32 = object.uint32 ?? 0;
    message.uint64 = (object.uint64 !== undefined && object.uint64 !== null)
      ? Long.fromValue(object.uint64)
      : Long.UZERO;
    message.sint32 = object.sint32 ?? 0;
    message.sint64 = (object.sint64 !== undefined && object.sint64 !== null)
      ? Long.fromValue(object.sint64)
      : Long.ZERO;
    message.fixed32 = object.fixed32 ?? 0;
    message.fixed64 = (object.fixed64 !== undefined && object.fixed64 !== null)
      ? Long.fromValue(object.fixed64)
      : Long.UZERO;
    message.sfixed32 = object.sfixed32 ?? 0;
    message.sfixed64 = (object.sfixed64 !== undefined && object.sfixed64 !== null)
      ? Long.fromValue(object.sfixed64)
      : Long.ZERO;
    message.manyUint64 = object.manyUint64?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
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
