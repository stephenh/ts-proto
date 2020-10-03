import * as Long from 'long';
import { Writer, Reader, util, configure } from 'protobufjs/minimal';


export interface Tile {
  layers: Tile_Layer[];
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

const baseTile: object = {
};

const baseTile_Value: object = {
  stringValue: "",
  floatValue: 0,
  doubleValue: 0,
  intValue: 0,
  uintValue: 0,
  sintValue: 0,
  boolValue: false,
};

const baseTile_Feature: object = {
  id: 0,
  tags: 0,
  type: 0,
  geometry: 0,
};

const baseTile_Layer: object = {
  version: 0,
  name: "",
  keys: "",
  extent: 0,
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const protobufPackage = 'vector_tile'

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
    default:
      return "UNKNOWN";
  }
}

export const Tile = {
  encode(message: Tile, writer: Writer = Writer.create()): Writer {
    for (const v of message.layers) {
      Tile_Layer.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Tile {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTile } as Tile;
    message.layers = [];
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
    const message = { ...baseTile } as Tile;
    message.layers = [];
    if (object.layers !== undefined && object.layers !== null) {
      for (const e of object.layers) {
        message.layers.push(Tile_Layer.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Tile>): Tile {
    const message = { ...baseTile } as Tile;
    message.layers = [];
    if (object.layers !== undefined && object.layers !== null) {
      for (const e of object.layers) {
        message.layers.push(Tile_Layer.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: Tile): unknown {
    const obj: any = {};
    if (message.layers) {
      obj.layers = message.layers.map(e => e ? Tile_Layer.toJSON(e) : undefined);
    } else {
      obj.layers = [];
    }
    return obj;
  },
};

export const Tile_Value = {
  encode(message: Tile_Value, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.stringValue);
    writer.uint32(21).float(message.floatValue);
    writer.uint32(25).double(message.doubleValue);
    writer.uint32(32).int64(message.intValue);
    writer.uint32(40).uint64(message.uintValue);
    writer.uint32(48).sint64(message.sintValue);
    writer.uint32(56).bool(message.boolValue);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Tile_Value {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTile_Value } as Tile_Value;
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
    const message = { ...baseTile_Value } as Tile_Value;
    if (object.stringValue !== undefined && object.stringValue !== null) {
      message.stringValue = String(object.stringValue);
    } else {
      message.stringValue = "";
    }
    if (object.floatValue !== undefined && object.floatValue !== null) {
      message.floatValue = Number(object.floatValue);
    } else {
      message.floatValue = 0;
    }
    if (object.doubleValue !== undefined && object.doubleValue !== null) {
      message.doubleValue = Number(object.doubleValue);
    } else {
      message.doubleValue = 0;
    }
    if (object.intValue !== undefined && object.intValue !== null) {
      message.intValue = Number(object.intValue);
    } else {
      message.intValue = 0;
    }
    if (object.uintValue !== undefined && object.uintValue !== null) {
      message.uintValue = Number(object.uintValue);
    } else {
      message.uintValue = 0;
    }
    if (object.sintValue !== undefined && object.sintValue !== null) {
      message.sintValue = Number(object.sintValue);
    } else {
      message.sintValue = 0;
    }
    if (object.boolValue !== undefined && object.boolValue !== null) {
      message.boolValue = Boolean(object.boolValue);
    } else {
      message.boolValue = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Tile_Value>): Tile_Value {
    const message = { ...baseTile_Value } as Tile_Value;
    if (object.stringValue !== undefined && object.stringValue !== null) {
      message.stringValue = object.stringValue;
    } else {
      message.stringValue = "";
    }
    if (object.floatValue !== undefined && object.floatValue !== null) {
      message.floatValue = object.floatValue;
    } else {
      message.floatValue = 0;
    }
    if (object.doubleValue !== undefined && object.doubleValue !== null) {
      message.doubleValue = object.doubleValue;
    } else {
      message.doubleValue = 0;
    }
    if (object.intValue !== undefined && object.intValue !== null) {
      message.intValue = object.intValue;
    } else {
      message.intValue = 0;
    }
    if (object.uintValue !== undefined && object.uintValue !== null) {
      message.uintValue = object.uintValue;
    } else {
      message.uintValue = 0;
    }
    if (object.sintValue !== undefined && object.sintValue !== null) {
      message.sintValue = object.sintValue;
    } else {
      message.sintValue = 0;
    }
    if (object.boolValue !== undefined && object.boolValue !== null) {
      message.boolValue = object.boolValue;
    } else {
      message.boolValue = false;
    }
    return message;
  },
  toJSON(message: Tile_Value): unknown {
    const obj: any = {};
    message.stringValue !== undefined && (obj.stringValue = message.stringValue);
    message.floatValue !== undefined && (obj.floatValue = message.floatValue);
    message.doubleValue !== undefined && (obj.doubleValue = message.doubleValue);
    message.intValue !== undefined && (obj.intValue = message.intValue);
    message.uintValue !== undefined && (obj.uintValue = message.uintValue);
    message.sintValue !== undefined && (obj.sintValue = message.sintValue);
    message.boolValue !== undefined && (obj.boolValue = message.boolValue);
    return obj;
  },
};

export const Tile_Feature = {
  encode(message: Tile_Feature, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.id);
    writer.uint32(18).fork();
    for (const v of message.tags) {
      writer.uint32(v);
    }
    writer.ldelim();
    writer.uint32(24).int32(message.type);
    writer.uint32(34).fork();
    for (const v of message.geometry) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Tile_Feature {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTile_Feature } as Tile_Feature;
    message.tags = [];
    message.geometry = [];
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
    const message = { ...baseTile_Feature } as Tile_Feature;
    message.tags = [];
    message.geometry = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(Number(e));
      }
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = tile_GeomTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.geometry !== undefined && object.geometry !== null) {
      for (const e of object.geometry) {
        message.geometry.push(Number(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Tile_Feature>): Tile_Feature {
    const message = { ...baseTile_Feature } as Tile_Feature;
    message.tags = [];
    message.geometry = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(e);
      }
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.geometry !== undefined && object.geometry !== null) {
      for (const e of object.geometry) {
        message.geometry.push(e);
      }
    }
    return message;
  },
  toJSON(message: Tile_Feature): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.tags) {
      obj.tags = message.tags.map(e => e);
    } else {
      obj.tags = [];
    }
    message.type !== undefined && (obj.type = tile_GeomTypeToJSON(message.type));
    if (message.geometry) {
      obj.geometry = message.geometry.map(e => e);
    } else {
      obj.geometry = [];
    }
    return obj;
  },
};

export const Tile_Layer = {
  encode(message: Tile_Layer, writer: Writer = Writer.create()): Writer {
    writer.uint32(120).uint32(message.version);
    writer.uint32(10).string(message.name);
    for (const v of message.features) {
      Tile_Feature.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.keys) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.values) {
      Tile_Value.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(40).uint32(message.extent);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Tile_Layer {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTile_Layer } as Tile_Layer;
    message.features = [];
    message.keys = [];
    message.values = [];
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
    const message = { ...baseTile_Layer } as Tile_Layer;
    message.features = [];
    message.keys = [];
    message.values = [];
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version);
    } else {
      message.version = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.features !== undefined && object.features !== null) {
      for (const e of object.features) {
        message.features.push(Tile_Feature.fromJSON(e));
      }
    }
    if (object.keys !== undefined && object.keys !== null) {
      for (const e of object.keys) {
        message.keys.push(String(e));
      }
    }
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(Tile_Value.fromJSON(e));
      }
    }
    if (object.extent !== undefined && object.extent !== null) {
      message.extent = Number(object.extent);
    } else {
      message.extent = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Tile_Layer>): Tile_Layer {
    const message = { ...baseTile_Layer } as Tile_Layer;
    message.features = [];
    message.keys = [];
    message.values = [];
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.features !== undefined && object.features !== null) {
      for (const e of object.features) {
        message.features.push(Tile_Feature.fromPartial(e));
      }
    }
    if (object.keys !== undefined && object.keys !== null) {
      for (const e of object.keys) {
        message.keys.push(e);
      }
    }
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(Tile_Value.fromPartial(e));
      }
    }
    if (object.extent !== undefined && object.extent !== null) {
      message.extent = object.extent;
    } else {
      message.extent = 0;
    }
    return message;
  },
  toJSON(message: Tile_Layer): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.name !== undefined && (obj.name = message.name);
    if (message.features) {
      obj.features = message.features.map(e => e ? Tile_Feature.toJSON(e) : undefined);
    } else {
      obj.features = [];
    }
    if (message.keys) {
      obj.keys = message.keys.map(e => e);
    } else {
      obj.keys = [];
    }
    if (message.values) {
      obj.values = message.values.map(e => e ? Tile_Value.toJSON(e) : undefined);
    } else {
      obj.values = [];
    }
    message.extent !== undefined && (obj.extent = message.extent);
    return obj;
  },
};

if (util.Long !== Long as any) {
  util.Long = Long as any;
  configure();
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;