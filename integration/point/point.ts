/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = '';

export interface Point {
  lat: number;
  lng: number;
}

export interface Area {
  nw: Point | undefined;
  se: Point | undefined;
}

const basePoint: object = { lat: 0, lng: 0 };

export const Point = {
  encode(message: Point, writer: Writer = Writer.create()): Writer {
    if (message.lat !== 0) {
      writer.uint32(9).double(message.lat);
    }
    if (message.lng !== 0) {
      writer.uint32(17).double(message.lng);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Point {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.lat = object.lat !== undefined && object.lat !== null ? Number(object.lat) : 0;
    message.lng = object.lng !== undefined && object.lng !== null ? Number(object.lng) : 0;
    return message;
  },

  toJSON(message: Point): unknown {
    const obj: any = {};
    message.lat !== undefined && (obj.lat = message.lat);
    message.lng !== undefined && (obj.lng = message.lng);
    return obj;
  },

  fromPartial(object: DeepPartial<Point>): Point {
    const message = { ...basePoint } as Point;
    message.lat = object.lat ?? 0;
    message.lng = object.lng ?? 0;
    return message;
  },
};

const baseArea: object = {};

export const Area = {
  encode(message: Area, writer: Writer = Writer.create()): Writer {
    if (message.nw !== undefined) {
      Point.encode(message.nw, writer.uint32(10).fork()).ldelim();
    }
    if (message.se !== undefined) {
      Point.encode(message.se, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Area {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.nw = object.nw !== undefined && object.nw !== null ? Point.fromJSON(object.nw) : undefined;
    message.se = object.se !== undefined && object.se !== null ? Point.fromJSON(object.se) : undefined;
    return message;
  },

  toJSON(message: Area): unknown {
    const obj: any = {};
    message.nw !== undefined && (obj.nw = message.nw ? Point.toJSON(message.nw) : undefined);
    message.se !== undefined && (obj.se = message.se ? Point.toJSON(message.se) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Area>): Area {
    const message = { ...baseArea } as Area;
    message.nw = object.nw !== undefined && object.nw !== null ? Point.fromPartial(object.nw) : undefined;
    message.se = object.se !== undefined && object.se !== null ? Point.fromPartial(object.se) : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
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
