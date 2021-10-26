/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { StringValue, Int32Value, BoolValue, Int64Value } from './google/protobuf/wrappers';

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
}

export interface SimpleWithMap_NameLookupEntry {
  key: string;
  value: string;
}

export interface SimpleWithMap_IntLookupEntry {
  key: number;
  value: number;
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

const baseSimpleWithWrappers: object = {};

export const SimpleWithWrappers = {
  encode(message: SimpleWithWrappers, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): SimpleWithWrappers {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithWrappers } as SimpleWithWrappers;
    message.coins = [];
    message.snacks = [];
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
    const message = { ...baseSimpleWithWrappers } as SimpleWithWrappers;
    message.coins = [];
    message.snacks = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = undefined;
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = Number(object.age);
    } else {
      message.age = undefined;
    }
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = Boolean(object.enabled);
    } else {
      message.enabled = undefined;
    }
    if (object.bananas !== undefined && object.bananas !== null) {
      message.bananas = Long.fromValue(object.bananas);
    } else {
      message.bananas = undefined;
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Number(e));
      }
    }
    if (object.snacks !== undefined && object.snacks !== null) {
      for (const e of object.snacks) {
        message.snacks.push(String(e));
      }
    }
    return message;
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

  fromPartial(object: DeepPartial<SimpleWithWrappers>): SimpleWithWrappers {
    const message = { ...baseSimpleWithWrappers } as SimpleWithWrappers;
    {
      message.name = object.name ?? undefined;
    }
    {
      message.age = object.age ?? undefined;
    }
    {
      message.enabled = object.enabled ?? undefined;
    }
    if (object.bananas !== undefined && object.bananas !== null) {
      message.bananas = object.bananas as Long | undefined;
    } else {
      message.bananas = undefined;
    }
    message.coins = [];
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(e);
      }
    }
    message.snacks = [];
    if (object.snacks !== undefined && object.snacks !== null) {
      for (const e of object.snacks) {
        message.snacks.push(e);
      }
    }
    return message;
  },
};

const baseSimpleWithMap: object = {};

export const SimpleWithMap = {
  encode(message: SimpleWithMap, writer: Writer = Writer.create()): Writer {
    Object.entries(message.nameLookup).forEach(([key, value]) => {
      SimpleWithMap_NameLookupEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    Object.entries(message.intLookup).forEach(([key, value]) => {
      SimpleWithMap_IntLookupEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.nameLookup = {};
    message.intLookup = {};
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap {
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.nameLookup = {};
    message.intLookup = {};
    if (object.nameLookup !== undefined && object.nameLookup !== null) {
      Object.entries(object.nameLookup).forEach(([key, value]) => {
        message.nameLookup[key] = String(value);
      });
    }
    if (object.intLookup !== undefined && object.intLookup !== null) {
      Object.entries(object.intLookup).forEach(([key, value]) => {
        message.intLookup[Number(key)] = Number(value);
      });
    }
    return message;
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
        obj.intLookup[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap>): SimpleWithMap {
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.nameLookup = {};
    if (object.nameLookup !== undefined && object.nameLookup !== null) {
      Object.entries(object.nameLookup).forEach(([key, value]) => {
        if (value !== undefined) {
          message.nameLookup[key] = String(value);
        }
      });
    }
    message.intLookup = {};
    if (object.intLookup !== undefined && object.intLookup !== null) {
      Object.entries(object.intLookup).forEach(([key, value]) => {
        if (value !== undefined) {
          message.intLookup[Number(key)] = Number(value);
        }
      });
    }
    return message;
  },
};

const baseSimpleWithMap_NameLookupEntry: object = { key: '', value: '' };

export const SimpleWithMap_NameLookupEntry = {
  encode(message: SimpleWithMap_NameLookupEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_NameLookupEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_NameLookupEntry } as SimpleWithMap_NameLookupEntry;
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
    const message = { ...baseSimpleWithMap_NameLookupEntry } as SimpleWithMap_NameLookupEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = '';
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = '';
    }
    return message;
  },

  toJSON(message: SimpleWithMap_NameLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_NameLookupEntry>): SimpleWithMap_NameLookupEntry {
    const message = { ...baseSimpleWithMap_NameLookupEntry } as SimpleWithMap_NameLookupEntry;
    {
      message.key = object.key ?? '';
    }
    {
      message.value = object.value ?? '';
    }
    return message;
  },
};

const baseSimpleWithMap_IntLookupEntry: object = { key: 0, value: 0 };

export const SimpleWithMap_IntLookupEntry = {
  encode(message: SimpleWithMap_IntLookupEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_IntLookupEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_IntLookupEntry } as SimpleWithMap_IntLookupEntry;
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
    const message = { ...baseSimpleWithMap_IntLookupEntry } as SimpleWithMap_IntLookupEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = Number(object.key);
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },

  toJSON(message: SimpleWithMap_IntLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_IntLookupEntry>): SimpleWithMap_IntLookupEntry {
    const message = { ...baseSimpleWithMap_IntLookupEntry } as SimpleWithMap_IntLookupEntry;
    {
      message.key = object.key ?? 0;
    }
    {
      message.value = object.value ?? 0;
    }
    return message;
  },
};

const baseNumbers: object = {
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
  manyUint64: Long.UZERO,
};

export const Numbers = {
  encode(message: Numbers, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNumbers } as Numbers;
    message.manyUint64 = [];
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
    const message = { ...baseNumbers } as Numbers;
    message.manyUint64 = [];
    if (object.double !== undefined && object.double !== null) {
      message.double = Number(object.double);
    } else {
      message.double = 0;
    }
    if (object.float !== undefined && object.float !== null) {
      message.float = Number(object.float);
    } else {
      message.float = 0;
    }
    if (object.int32 !== undefined && object.int32 !== null) {
      message.int32 = Number(object.int32);
    } else {
      message.int32 = 0;
    }
    if (object.int64 !== undefined && object.int64 !== null) {
      message.int64 = Long.fromString(object.int64);
    } else {
      message.int64 = Long.ZERO;
    }
    if (object.uint32 !== undefined && object.uint32 !== null) {
      message.uint32 = Number(object.uint32);
    } else {
      message.uint32 = 0;
    }
    if (object.uint64 !== undefined && object.uint64 !== null) {
      message.uint64 = Long.fromString(object.uint64);
    } else {
      message.uint64 = Long.UZERO;
    }
    if (object.sint32 !== undefined && object.sint32 !== null) {
      message.sint32 = Number(object.sint32);
    } else {
      message.sint32 = 0;
    }
    if (object.sint64 !== undefined && object.sint64 !== null) {
      message.sint64 = Long.fromString(object.sint64);
    } else {
      message.sint64 = Long.ZERO;
    }
    if (object.fixed32 !== undefined && object.fixed32 !== null) {
      message.fixed32 = Number(object.fixed32);
    } else {
      message.fixed32 = 0;
    }
    if (object.fixed64 !== undefined && object.fixed64 !== null) {
      message.fixed64 = Long.fromString(object.fixed64);
    } else {
      message.fixed64 = Long.UZERO;
    }
    if (object.sfixed32 !== undefined && object.sfixed32 !== null) {
      message.sfixed32 = Number(object.sfixed32);
    } else {
      message.sfixed32 = 0;
    }
    if (object.sfixed64 !== undefined && object.sfixed64 !== null) {
      message.sfixed64 = Long.fromString(object.sfixed64);
    } else {
      message.sfixed64 = Long.ZERO;
    }
    if (object.manyUint64 !== undefined && object.manyUint64 !== null) {
      for (const e of object.manyUint64) {
        message.manyUint64.push(Long.fromString(e));
      }
    }
    return message;
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    message.double !== undefined && (obj.double = message.double);
    message.float !== undefined && (obj.float = message.float);
    message.int32 !== undefined && (obj.int32 = message.int32);
    message.int64 !== undefined && (obj.int64 = (message.int64 || Long.ZERO).toString());
    message.uint32 !== undefined && (obj.uint32 = message.uint32);
    message.uint64 !== undefined && (obj.uint64 = (message.uint64 || Long.UZERO).toString());
    message.sint32 !== undefined && (obj.sint32 = message.sint32);
    message.sint64 !== undefined && (obj.sint64 = (message.sint64 || Long.ZERO).toString());
    message.fixed32 !== undefined && (obj.fixed32 = message.fixed32);
    message.fixed64 !== undefined && (obj.fixed64 = (message.fixed64 || Long.UZERO).toString());
    message.sfixed32 !== undefined && (obj.sfixed32 = message.sfixed32);
    message.sfixed64 !== undefined && (obj.sfixed64 = (message.sfixed64 || Long.ZERO).toString());
    if (message.manyUint64) {
      obj.manyUint64 = message.manyUint64.map((e) => (e || Long.UZERO).toString());
    } else {
      obj.manyUint64 = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Numbers>): Numbers {
    const message = { ...baseNumbers } as Numbers;
    {
      message.double = object.double ?? 0;
    }
    {
      message.float = object.float ?? 0;
    }
    {
      message.int32 = object.int32 ?? 0;
    }
    if (object.int64 !== undefined && object.int64 !== null) {
      message.int64 = object.int64 as Long;
    } else {
      message.int64 = Long.ZERO;
    }
    {
      message.uint32 = object.uint32 ?? 0;
    }
    if (object.uint64 !== undefined && object.uint64 !== null) {
      message.uint64 = object.uint64 as Long;
    } else {
      message.uint64 = Long.UZERO;
    }
    {
      message.sint32 = object.sint32 ?? 0;
    }
    if (object.sint64 !== undefined && object.sint64 !== null) {
      message.sint64 = object.sint64 as Long;
    } else {
      message.sint64 = Long.ZERO;
    }
    {
      message.fixed32 = object.fixed32 ?? 0;
    }
    if (object.fixed64 !== undefined && object.fixed64 !== null) {
      message.fixed64 = object.fixed64 as Long;
    } else {
      message.fixed64 = Long.UZERO;
    }
    {
      message.sfixed32 = object.sfixed32 ?? 0;
    }
    if (object.sfixed64 !== undefined && object.sfixed64 !== null) {
      message.sfixed64 = object.sfixed64 as Long;
    } else {
      message.sfixed64 = Long.ZERO;
    }
    message.manyUint64 = [];
    if (object.manyUint64 !== undefined && object.manyUint64 !== null) {
      for (const e of object.manyUint64) {
        message.manyUint64.push(e);
      }
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
