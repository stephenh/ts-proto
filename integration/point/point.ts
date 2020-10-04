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
};

export const protobufPackage = ''

export const Point = {
  encode(message: Point, writer: Writer = Writer.create()): Writer {
    writer.uint32(9).double(message.lat);
    writer.uint32(17).double(message.lng);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Point {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePoint } as Point;
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
    const message = { ...basePoint } as Point;
    if (object.lat !== undefined && object.lat !== null) {
      message.lat = Number(object.lat);
    } else {
      message.lat = 0;
    }
    if (object.lng !== undefined && object.lng !== null) {
      message.lng = Number(object.lng);
    } else {
      message.lng = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Point>): Point {
    const message = { ...basePoint } as Point;
    if (object.lat !== undefined && object.lat !== null) {
      message.lat = object.lat;
    } else {
      message.lat = 0;
    }
    if (object.lng !== undefined && object.lng !== null) {
      message.lng = object.lng;
    } else {
      message.lng = 0;
    }
    return message;
  },
  toJSON(message: Point): unknown {
    const obj: any = {};
    message.lat !== undefined && (obj.lat = message.lat);
    message.lng !== undefined && (obj.lng = message.lng);
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
  decode(input: Uint8Array | Reader, length?: number): Area {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseArea } as Area;
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
    const message = { ...baseArea } as Area;
    if (object.nw !== undefined && object.nw !== null) {
      message.nw = Point.fromJSON(object.nw);
    } else {
      message.nw = undefined;
    }
    if (object.se !== undefined && object.se !== null) {
      message.se = Point.fromJSON(object.se);
    } else {
      message.se = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Area>): Area {
    const message = { ...baseArea } as Area;
    if (object.nw !== undefined && object.nw !== null) {
      message.nw = Point.fromPartial(object.nw);
    } else {
      message.nw = undefined;
    }
    if (object.se !== undefined && object.se !== null) {
      message.se = Point.fromPartial(object.se);
    } else {
      message.se = undefined;
    }
    return message;
  },
  toJSON(message: Area): unknown {
    const obj: any = {};
    message.nw !== undefined && (obj.nw = message.nw ? Point.toJSON(message.nw) : undefined);
    message.se !== undefined && (obj.se = message.se ? Point.toJSON(message.se) : undefined);
    return obj;
  },
};

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