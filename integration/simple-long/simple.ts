/* eslint-disable */
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { StringValue, Int32Value, BoolValue, Int64Value } from './google/protobuf/wrappers.js';

export const protobufPackage = 'simple';

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
  /** Ideally we'd test map<int64, int64> but we present maps as JS objects and `Long` cannot be used as a keys. */
  longLookup: { [key: string]: Long };
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
  key: string;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithWrappers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.age = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.enabled = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.bananas = Int64Value.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.coins.push(Int32Value.decode(reader, reader.uint32()).value);
          break;
        case 7:
          message.snacks.push(StringValue.decode(reader, reader.uint32()).value);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleWithWrappers {
    return {
      name: isSet(object.name) ? String(object.name) : undefined,
      age: isSet(object.age) ? Number(object.age) : undefined,
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : undefined,
      bananas: isSet(object.bananas) ? Long.fromValue(object.bananas) : undefined,
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Number(e)) : [],
      snacks: Array.isArray(object?.snacks) ? object.snacks.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: SimpleWithWrappers): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.bananas !== undefined && (obj.bananas = message.bananas);
    if (message.coins) {
      obj.coins = message.coins.map((e) => e);
    } else {
      obj.coins = [];
    }
    if (message.snacks) {
      obj.snacks = message.snacks.map((e) => e);
    } else {
      obj.snacks = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithWrappers>, I>>(object: I): SimpleWithWrappers {
    const message = createBaseSimpleWithWrappers();
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
    message.enabled = object.enabled ?? undefined;
    message.bananas =
      object.bananas !== undefined && object.bananas !== null ? Long.fromValue(object.bananas) : undefined;
    message.coins = object.coins?.map((e) => e) || [];
    message.snacks = object.snacks?.map((e) => e) || [];
    return message;
  },
};

function createBaseSimpleWithMap(): SimpleWithMap {
  return { nameLookup: {}, intLookup: {}, longLookup: {} };
}

export const SimpleWithMap = {
  encode(message: SimpleWithMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.nameLookup).forEach(([key, value]) => {
      SimpleWithMap_NameLookupEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    Object.entries(message.intLookup).forEach(([key, value]) => {
      SimpleWithMap_IntLookupEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    Object.entries(message.longLookup).forEach(([key, value]) => {
      SimpleWithMap_LongLookupEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          const entry2 = SimpleWithMap_NameLookupEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.nameLookup[entry2.key] = entry2.value;
          }
          break;
        case 3:
          const entry3 = SimpleWithMap_IntLookupEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.intLookup[entry3.key] = entry3.value;
          }
          break;
        case 4:
          const entry4 = SimpleWithMap_LongLookupEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.longLookup[entry4.key] = entry4.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
            acc[Number(key)] = Number(value);
            return acc;
          }, {})
        : {},
      longLookup: isObject(object.longLookup)
        ? Object.entries(object.longLookup).reduce<{ [key: string]: Long }>((acc, [key, value]) => {
            acc[key] = Long.fromValue(value as Long | string);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: SimpleWithMap): unknown {
    const obj: any = {};
    obj.nameLookup = {};
    if (message.nameLookup) {
      Object.entries(message.nameLookup).forEach(([k, v]) => {
        obj.nameLookup[k] = v;
      });
    }
    obj.intLookup = {};
    if (message.intLookup) {
      Object.entries(message.intLookup).forEach(([k, v]) => {
        obj.intLookup[k] = Math.round(v);
      });
    }
    obj.longLookup = {};
    if (message.longLookup) {
      Object.entries(message.longLookup).forEach(([k, v]) => {
        obj.longLookup[k] = v.toString();
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap>, I>>(object: I): SimpleWithMap {
    const message = createBaseSimpleWithMap();
    message.nameLookup = Object.entries(object.nameLookup ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {}
    );
    message.intLookup = Object.entries(object.intLookup ?? {}).reduce<{ [key: number]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = Number(value);
        }
        return acc;
      },
      {}
    );
    message.longLookup = Object.entries(object.longLookup ?? {}).reduce<{ [key: string]: Long }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Long.fromValue(value);
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

function createBaseSimpleWithMap_NameLookupEntry(): SimpleWithMap_NameLookupEntry {
  return { key: '', value: '' };
}

export const SimpleWithMap_NameLookupEntry = {
  encode(message: SimpleWithMap_NameLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_NameLookupEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_NameLookupEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_NameLookupEntry {
    return {
      key: isSet(object.key) ? String(object.key) : '',
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: SimpleWithMap_NameLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_NameLookupEntry>, I>>(
    object: I
  ): SimpleWithMap_NameLookupEntry {
    const message = createBaseSimpleWithMap_NameLookupEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_IntLookupEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_IntLookupEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: SimpleWithMap_IntLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_IntLookupEntry>, I>>(object: I): SimpleWithMap_IntLookupEntry {
    const message = createBaseSimpleWithMap_IntLookupEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseSimpleWithMap_LongLookupEntry(): SimpleWithMap_LongLookupEntry {
  return { key: '', value: Long.ZERO };
}

export const SimpleWithMap_LongLookupEntry = {
  encode(message: SimpleWithMap_LongLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (!message.value.isZero()) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_LongLookupEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_LongLookupEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_LongLookupEntry {
    return {
      key: isSet(object.key) ? String(object.key) : '',
      value: isSet(object.value) ? Long.fromValue(object.value) : Long.ZERO,
    };
  },

  toJSON(message: SimpleWithMap_LongLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = (message.value || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_LongLookupEntry>, I>>(
    object: I
  ): SimpleWithMap_LongLookupEntry {
    const message = createBaseSimpleWithMap_LongLookupEntry();
    message.key = object.key ?? '';
    message.value = object.value !== undefined && object.value !== null ? Long.fromValue(object.value) : Long.ZERO;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumbers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.double = reader.double();
          break;
        case 2:
          message.float = reader.float();
          break;
        case 3:
          message.int32 = reader.int32();
          break;
        case 4:
          message.int64 = reader.int64() as Long;
          break;
        case 5:
          message.uint32 = reader.uint32();
          break;
        case 6:
          message.uint64 = reader.uint64() as Long;
          break;
        case 7:
          message.sint32 = reader.sint32();
          break;
        case 8:
          message.sint64 = reader.sint64() as Long;
          break;
        case 9:
          message.fixed32 = reader.fixed32();
          break;
        case 10:
          message.fixed64 = reader.fixed64() as Long;
          break;
        case 11:
          message.sfixed32 = reader.sfixed32();
          break;
        case 12:
          message.sfixed64 = reader.sfixed64() as Long;
          break;
        case 13:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.manyUint64.push(reader.uint64() as Long);
            }
          } else {
            message.manyUint64.push(reader.uint64() as Long);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Numbers {
    return {
      double: isSet(object.double) ? Number(object.double) : 0,
      float: isSet(object.float) ? Number(object.float) : 0,
      int32: isSet(object.int32) ? Number(object.int32) : 0,
      int64: isSet(object.int64) ? Long.fromValue(object.int64) : Long.ZERO,
      uint32: isSet(object.uint32) ? Number(object.uint32) : 0,
      uint64: isSet(object.uint64) ? Long.fromValue(object.uint64) : Long.UZERO,
      sint32: isSet(object.sint32) ? Number(object.sint32) : 0,
      sint64: isSet(object.sint64) ? Long.fromValue(object.sint64) : Long.ZERO,
      fixed32: isSet(object.fixed32) ? Number(object.fixed32) : 0,
      fixed64: isSet(object.fixed64) ? Long.fromValue(object.fixed64) : Long.UZERO,
      sfixed32: isSet(object.sfixed32) ? Number(object.sfixed32) : 0,
      sfixed64: isSet(object.sfixed64) ? Long.fromValue(object.sfixed64) : Long.ZERO,
      manyUint64: Array.isArray(object?.manyUint64) ? object.manyUint64.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    message.double !== undefined && (obj.double = message.double);
    message.float !== undefined && (obj.float = message.float);
    message.int32 !== undefined && (obj.int32 = Math.round(message.int32));
    message.int64 !== undefined && (obj.int64 = (message.int64 || Long.ZERO).toString());
    message.uint32 !== undefined && (obj.uint32 = Math.round(message.uint32));
    message.uint64 !== undefined && (obj.uint64 = (message.uint64 || Long.UZERO).toString());
    message.sint32 !== undefined && (obj.sint32 = Math.round(message.sint32));
    message.sint64 !== undefined && (obj.sint64 = (message.sint64 || Long.ZERO).toString());
    message.fixed32 !== undefined && (obj.fixed32 = Math.round(message.fixed32));
    message.fixed64 !== undefined && (obj.fixed64 = (message.fixed64 || Long.UZERO).toString());
    message.sfixed32 !== undefined && (obj.sfixed32 = Math.round(message.sfixed32));
    message.sfixed64 !== undefined && (obj.sfixed64 = (message.sfixed64 || Long.ZERO).toString());
    if (message.manyUint64) {
      obj.manyUint64 = message.manyUint64.map((e) => (e || Long.UZERO).toString());
    } else {
      obj.manyUint64 = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Numbers>, I>>(object: I): Numbers {
    const message = createBaseNumbers();
    message.double = object.double ?? 0;
    message.float = object.float ?? 0;
    message.int32 = object.int32 ?? 0;
    message.int64 = object.int64 !== undefined && object.int64 !== null ? Long.fromValue(object.int64) : Long.ZERO;
    message.uint32 = object.uint32 ?? 0;
    message.uint64 = object.uint64 !== undefined && object.uint64 !== null ? Long.fromValue(object.uint64) : Long.UZERO;
    message.sint32 = object.sint32 ?? 0;
    message.sint64 = object.sint64 !== undefined && object.sint64 !== null ? Long.fromValue(object.sint64) : Long.ZERO;
    message.fixed32 = object.fixed32 ?? 0;
    message.fixed64 =
      object.fixed64 !== undefined && object.fixed64 !== null ? Long.fromValue(object.fixed64) : Long.UZERO;
    message.sfixed32 = object.sfixed32 ?? 0;
    message.sfixed64 =
      object.sfixed64 !== undefined && object.sfixed64 !== null ? Long.fromValue(object.sfixed64) : Long.ZERO;
    message.manyUint64 = object.manyUint64?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
