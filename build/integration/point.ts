import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface Point {
  lat: number;
  lng: number;
}

export interface Area {
  nw: Point | undefined;
  se: Point | undefined;
}

const basePoint: object = {
  lat: 0,
  lng: 0,
};

const baseArea: object = {
  nw: undefined,
  se: undefined,
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new global.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const Point = {
  encode(message: Point, writer: Writer = Writer.create()): Writer {
    writer.uint32(9).double(message.lat);
    writer.uint32(17).double(message.lng);
    return writer;
  },
  decode(reader: Reader, length?: number): Point {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePoint) as Point;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lat = reader.double();
          break;
        case 2:
          message.lng = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Point {
    const message = Object.create(basePoint) as Point;
    if (object.lat) {
      message.lat = Number(object.lat);
    }
    if (object.lng) {
      message.lng = Number(object.lng);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Point>): Point {
    const message = Object.create(basePoint) as Point;
    if (object.lat) {
      message.lat = object.lat;
    }
    if (object.lng) {
      message.lng = object.lng;
    }
    return message;
  },
  toJSON(message: Point): unknown {
    const obj: any = {};
    obj.lat = message.lat || 0;
    obj.lng = message.lng || 0;
    return obj;
  },
};

export const Area = {
  encode(message: Area, writer: Writer = Writer.create()): Writer {
    if (message.nw !== undefined && message.nw !== undefined) {
      Point.encode(message.nw, writer.uint32(10).fork()).ldelim();
    }
    if (message.se !== undefined && message.se !== undefined) {
      Point.encode(message.se, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): Area {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseArea) as Area;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nw = Point.decode(reader, reader.uint32());
          break;
        case 2:
          message.se = Point.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Area {
    const message = Object.create(baseArea) as Area;
    if (object.nw) {
      message.nw = Point.fromJSON(object.nw);
    }
    if (object.se) {
      message.se = Point.fromJSON(object.se);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Area>): Area {
    const message = Object.create(baseArea) as Area;
    if (object.nw) {
      message.nw = Point.fromPartial(object.nw);
    }
    if (object.se) {
      message.se = Point.fromPartial(object.se);
    }
    return message;
  },
  toJSON(message: Area): unknown {
    const obj: any = {};
    obj.nw = message.nw ? Point.toJSON(message.nw) : undefined;
    obj.se = message.se ? Point.toJSON(message.se) : undefined;
    return obj;
  },
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T[P] extends Date | Function | Uint8Array | undefined
  ? T[P]
  : T[P] extends infer U | undefined
  ? DeepPartial<U>
  : T[P] extends object
  ? DeepPartial<T[P]>
  : T[P]
};