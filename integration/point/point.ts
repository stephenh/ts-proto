/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Point {
  lat: number;
  lng: number;
}

export interface Area {
  nw: Point | undefined;
  se: Point | undefined;
}

function createBasePoint(): Point {
  return { lat: 0, lng: 0 };
}

export const Point = {
  encode(message: Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lat !== 0) {
      writer.uint32(9).double(message.lat);
    }
    if (message.lng !== 0) {
      writer.uint32(17).double(message.lng);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Point {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 9) {
            break;
          }

          message.lat = reader.double();
          continue;
        case 2:
          if (tag != 17) {
            break;
          }

          message.lng = reader.double();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Point {
    return { lat: isSet(object.lat) ? Number(object.lat) : 0, lng: isSet(object.lng) ? Number(object.lng) : 0 };
  },

  toJSON(message: Point): unknown {
    const obj: any = {};
    message.lat !== undefined && (obj.lat = message.lat);
    message.lng !== undefined && (obj.lng = message.lng);
    return obj;
  },

  create<I extends Exact<DeepPartial<Point>, I>>(base?: I): Point {
    return Point.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Point>, I>>(object: I): Point {
    const message = createBasePoint();
    message.lat = object.lat ?? 0;
    message.lng = object.lng ?? 0;
    return message;
  },
};

function createBaseArea(): Area {
  return { nw: undefined, se: undefined };
}

export const Area = {
  encode(message: Area, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nw !== undefined) {
      Point.encode(message.nw, writer.uint32(10).fork()).ldelim();
    }
    if (message.se !== undefined) {
      Point.encode(message.se, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Area {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArea();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.nw = Point.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.se = Point.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Area {
    return {
      nw: isSet(object.nw) ? Point.fromJSON(object.nw) : undefined,
      se: isSet(object.se) ? Point.fromJSON(object.se) : undefined,
    };
  },

  toJSON(message: Area): unknown {
    const obj: any = {};
    message.nw !== undefined && (obj.nw = message.nw ? Point.toJSON(message.nw) : undefined);
    message.se !== undefined && (obj.se = message.se ? Point.toJSON(message.se) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Area>, I>>(base?: I): Area {
    return Area.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Area>, I>>(object: I): Area {
    const message = createBaseArea();
    message.nw = (object.nw !== undefined && object.nw !== null) ? Point.fromPartial(object.nw) : undefined;
    message.se = (object.se !== undefined && object.se !== null) ? Point.fromPartial(object.se) : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
