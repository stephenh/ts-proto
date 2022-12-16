/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "vector_tile";

export interface Tile {
  layers: Tile_Layer[];
}

export enum Tile_GeomType {
  UNKNOWN = 0,
  POINT = 1,
  LINESTRING = 2,
  POLYGON = 3,
  UNRECOGNIZED = -1,
}

export function tile_GeomTypeFromJSON(object: any): Tile_GeomType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return Tile_GeomType.UNKNOWN;
    case 1:
    case "POINT":
      return Tile_GeomType.POINT;
    case 2:
    case "LINESTRING":
      return Tile_GeomType.LINESTRING;
    case 3:
    case "POLYGON":
      return Tile_GeomType.POLYGON;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Tile_GeomType.UNRECOGNIZED;
  }
}

export function tile_GeomTypeToJSON(object: Tile_GeomType): string {
  switch (object) {
    case Tile_GeomType.UNKNOWN:
      return "UNKNOWN";
    case Tile_GeomType.POINT:
      return "POINT";
    case Tile_GeomType.LINESTRING:
      return "LINESTRING";
    case Tile_GeomType.POLYGON:
      return "POLYGON";
    case Tile_GeomType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Tile_Value {
  stringValue: string;
  floatValue: number;
  doubleValue: number;
  intValue: number;
  uintValue: number;
  sintValue: number;
  boolValue: boolean;
}

export interface Tile_Feature {
  id: number;
  tags: number[];
  type: Tile_GeomType;
  geometry: number[];
}

export interface Tile_Layer {
  version: number;
  name: string;
  features: Tile_Feature[];
  keys: string[];
  values: Tile_Value[];
  extent: number;
}

function createBaseTile(): Tile {
  return { layers: [] };
}

export const Tile = {
  encode(message: Tile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.layers) {
      Tile_Layer.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tile {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.layers.push(Tile_Layer.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tile {
    return { layers: Array.isArray(object?.layers) ? object.layers.map((e: any) => Tile_Layer.fromJSON(e)) : [] };
  },

  toJSON(message: Tile): unknown {
    const obj: any = {};
    if (message.layers) {
      obj.layers = message.layers.map((e) => e ? Tile_Layer.toJSON(e) : undefined);
    } else {
      obj.layers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tile>, I>>(object: I): Tile {
    const message = createBaseTile();
    message.layers = object.layers?.map((e) => Tile_Layer.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTile_Value(): Tile_Value {
  return { stringValue: "", floatValue: 0, doubleValue: 0, intValue: 0, uintValue: 0, sintValue: 0, boolValue: false };
}

export const Tile_Value = {
  encode(message: Tile_Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stringValue !== "") {
      writer.uint32(10).string(message.stringValue);
    }
    if (message.floatValue !== 0) {
      writer.uint32(21).float(message.floatValue);
    }
    if (message.doubleValue !== 0) {
      writer.uint32(25).double(message.doubleValue);
    }
    if (message.intValue !== 0) {
      writer.uint32(32).int64(message.intValue);
    }
    if (message.uintValue !== 0) {
      writer.uint32(40).uint64(message.uintValue);
    }
    if (message.sintValue !== 0) {
      writer.uint32(48).sint64(message.sintValue);
    }
    if (message.boolValue === true) {
      writer.uint32(56).bool(message.boolValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tile_Value {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTile_Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stringValue = reader.string();
          break;
        case 2:
          message.floatValue = reader.float();
          break;
        case 3:
          message.doubleValue = reader.double();
          break;
        case 4:
          message.intValue = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.uintValue = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.sintValue = longToNumber(reader.sint64() as Long);
          break;
        case 7:
          message.boolValue = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tile_Value {
    return {
      stringValue: isSet(object.stringValue) ? String(object.stringValue) : "",
      floatValue: isSet(object.floatValue) ? Number(object.floatValue) : 0,
      doubleValue: isSet(object.doubleValue) ? Number(object.doubleValue) : 0,
      intValue: isSet(object.intValue) ? Number(object.intValue) : 0,
      uintValue: isSet(object.uintValue) ? Number(object.uintValue) : 0,
      sintValue: isSet(object.sintValue) ? Number(object.sintValue) : 0,
      boolValue: isSet(object.boolValue) ? Boolean(object.boolValue) : false,
    };
  },

  toJSON(message: Tile_Value): unknown {
    const obj: any = {};
    message.stringValue !== undefined && (obj.stringValue = message.stringValue);
    message.floatValue !== undefined && (obj.floatValue = message.floatValue);
    message.doubleValue !== undefined && (obj.doubleValue = message.doubleValue);
    message.intValue !== undefined && (obj.intValue = Math.round(message.intValue));
    message.uintValue !== undefined && (obj.uintValue = Math.round(message.uintValue));
    message.sintValue !== undefined && (obj.sintValue = Math.round(message.sintValue));
    message.boolValue !== undefined && (obj.boolValue = message.boolValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tile_Value>, I>>(object: I): Tile_Value {
    const message = createBaseTile_Value();
    message.stringValue = object.stringValue ?? "";
    message.floatValue = object.floatValue ?? 0;
    message.doubleValue = object.doubleValue ?? 0;
    message.intValue = object.intValue ?? 0;
    message.uintValue = object.uintValue ?? 0;
    message.sintValue = object.sintValue ?? 0;
    message.boolValue = object.boolValue ?? false;
    return message;
  },
};

function createBaseTile_Feature(): Tile_Feature {
  return { id: 0, tags: [], type: 0, geometry: [] };
}

export const Tile_Feature = {
  encode(message: Tile_Feature, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    writer.uint32(18).fork();
    for (const v of message.tags) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    writer.uint32(34).fork();
    for (const v of message.geometry) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tile_Feature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTile_Feature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.tags.push(reader.uint32());
            }
          } else {
            message.tags.push(reader.uint32());
          }
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.geometry.push(reader.uint32());
            }
          } else {
            message.geometry.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tile_Feature {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => Number(e)) : [],
      type: isSet(object.type) ? tile_GeomTypeFromJSON(object.type) : 0,
      geometry: Array.isArray(object?.geometry) ? object.geometry.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: Tile_Feature): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.tags) {
      obj.tags = message.tags.map((e) => Math.round(e));
    } else {
      obj.tags = [];
    }
    message.type !== undefined && (obj.type = tile_GeomTypeToJSON(message.type));
    if (message.geometry) {
      obj.geometry = message.geometry.map((e) => Math.round(e));
    } else {
      obj.geometry = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tile_Feature>, I>>(object: I): Tile_Feature {
    const message = createBaseTile_Feature();
    message.id = object.id ?? 0;
    message.tags = object.tags?.map((e) => e) || [];
    message.type = object.type ?? 0;
    message.geometry = object.geometry?.map((e) => e) || [];
    return message;
  },
};

function createBaseTile_Layer(): Tile_Layer {
  return { version: 0, name: "", features: [], keys: [], values: [], extent: 0 };
}

export const Tile_Layer = {
  encode(message: Tile_Layer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(120).uint32(message.version);
    }
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.features) {
      Tile_Feature.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.keys) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.values) {
      Tile_Value.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.extent !== 0) {
      writer.uint32(40).uint32(message.extent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tile_Layer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTile_Layer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 15:
          message.version = reader.uint32();
          break;
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.features.push(Tile_Feature.decode(reader, reader.uint32()));
          break;
        case 3:
          message.keys.push(reader.string());
          break;
        case 4:
          message.values.push(Tile_Value.decode(reader, reader.uint32()));
          break;
        case 5:
          message.extent = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tile_Layer {
    return {
      version: isSet(object.version) ? Number(object.version) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      features: Array.isArray(object?.features) ? object.features.map((e: any) => Tile_Feature.fromJSON(e)) : [],
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => String(e)) : [],
      values: Array.isArray(object?.values) ? object.values.map((e: any) => Tile_Value.fromJSON(e)) : [],
      extent: isSet(object.extent) ? Number(object.extent) : 0,
    };
  },

  toJSON(message: Tile_Layer): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = Math.round(message.version));
    message.name !== undefined && (obj.name = message.name);
    if (message.features) {
      obj.features = message.features.map((e) => e ? Tile_Feature.toJSON(e) : undefined);
    } else {
      obj.features = [];
    }
    if (message.keys) {
      obj.keys = message.keys.map((e) => e);
    } else {
      obj.keys = [];
    }
    if (message.values) {
      obj.values = message.values.map((e) => e ? Tile_Value.toJSON(e) : undefined);
    } else {
      obj.values = [];
    }
    message.extent !== undefined && (obj.extent = Math.round(message.extent));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tile_Layer>, I>>(object: I): Tile_Layer {
    const message = createBaseTile_Layer();
    message.version = object.version ?? 0;
    message.name = object.name ?? "";
    message.features = object.features?.map((e) => Tile_Feature.fromPartial(e)) || [];
    message.keys = object.keys?.map((e) => e) || [];
    message.values = object.values?.map((e) => Tile_Value.fromPartial(e)) || [];
    message.extent = object.extent ?? 0;
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
