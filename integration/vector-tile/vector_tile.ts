/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.layers.push(Tile_Layer.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Tile {
    return {
      layers: tsProtoGlobalThis.Array.isArray(object?.layers)
        ? object.layers.map((e: any) => Tile_Layer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Tile): unknown {
    const obj: any = {};
    if (message.layers?.length) {
      obj.layers = message.layers.map((e) => Tile_Layer.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tile>, I>>(base?: I): Tile {
    return Tile.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTile_Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stringValue = reader.string();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.floatValue = reader.float();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.doubleValue = reader.double();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.intValue = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.uintValue = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.sintValue = longToNumber(reader.sint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.boolValue = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    if (message.stringValue !== "") {
      obj.stringValue = message.stringValue;
    }
    if (message.floatValue !== 0) {
      obj.floatValue = message.floatValue;
    }
    if (message.doubleValue !== 0) {
      obj.doubleValue = message.doubleValue;
    }
    if (message.intValue !== 0) {
      obj.intValue = Math.round(message.intValue);
    }
    if (message.uintValue !== 0) {
      obj.uintValue = Math.round(message.uintValue);
    }
    if (message.sintValue !== 0) {
      obj.sintValue = Math.round(message.sintValue);
    }
    if (message.boolValue === true) {
      obj.boolValue = message.boolValue;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tile_Value>, I>>(base?: I): Tile_Value {
    return Tile_Value.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTile_Feature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag === 16) {
            message.tags.push(reader.uint32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.tags.push(reader.uint32());
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 4:
          if (tag === 32) {
            message.geometry.push(reader.uint32());

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.geometry.push(reader.uint32());
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

  fromJSON(object: any): Tile_Feature {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      tags: tsProtoGlobalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => Number(e)) : [],
      type: isSet(object.type) ? tile_GeomTypeFromJSON(object.type) : 0,
      geometry: tsProtoGlobalThis.Array.isArray(object?.geometry) ? object.geometry.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: Tile_Feature): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.tags?.length) {
      obj.tags = message.tags.map((e) => Math.round(e));
    }
    if (message.type !== 0) {
      obj.type = tile_GeomTypeToJSON(message.type);
    }
    if (message.geometry?.length) {
      obj.geometry = message.geometry.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tile_Feature>, I>>(base?: I): Tile_Feature {
    return Tile_Feature.fromPartial(base ?? ({} as any));
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTile_Layer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 15:
          if (tag !== 120) {
            break;
          }

          message.version = reader.uint32();
          continue;
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

          message.features.push(Tile_Feature.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.keys.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.values.push(Tile_Value.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.extent = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Tile_Layer {
    return {
      version: isSet(object.version) ? Number(object.version) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      features: tsProtoGlobalThis.Array.isArray(object?.features)
        ? object.features.map((e: any) => Tile_Feature.fromJSON(e))
        : [],
      keys: tsProtoGlobalThis.Array.isArray(object?.keys) ? object.keys.map((e: any) => String(e)) : [],
      values: tsProtoGlobalThis.Array.isArray(object?.values)
        ? object.values.map((e: any) => Tile_Value.fromJSON(e))
        : [],
      extent: isSet(object.extent) ? Number(object.extent) : 0,
    };
  },

  toJSON(message: Tile_Layer): unknown {
    const obj: any = {};
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.features?.length) {
      obj.features = message.features.map((e) => Tile_Feature.toJSON(e));
    }
    if (message.keys?.length) {
      obj.keys = message.keys;
    }
    if (message.values?.length) {
      obj.values = message.values.map((e) => Tile_Value.toJSON(e));
    }
    if (message.extent !== 0) {
      obj.extent = Math.round(message.extent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tile_Layer>, I>>(base?: I): Tile_Layer {
    return Tile_Layer.fromPartial(base ?? ({} as any));
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(tsProtoGlobalThis.Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
