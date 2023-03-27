/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface MapBigInt {
  map?: Map<string, string>;
  _unknownFields?: { [key: number]: Uint8Array[] };
}

export interface MapBigInt_MapEntry {
  key: string;
  value: string;
  _unknownFields?: { [key: number]: Uint8Array[] };
}

function createBaseMapBigInt(): MapBigInt {
  return {};
}

export const MapBigInt = {
  encode(message: MapBigInt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    (message.map || new Map()).forEach((value, key) => {
      MapBigInt_MapEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    if (message._unknownFields !== undefined) {
      for (const key in message._unknownFields) {
        const values = message._unknownFields[key];
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MapBigInt {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMapBigInt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          const entry1 = MapBigInt_MapEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            if (message.map === undefined) {
              message.map = new Map();
            }

            message.map!.set(entry1.key, entry1.value);
          }
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      if (message._unknownFields === undefined) {
        message._unknownFields = {};
      }

      const list = message._unknownFields[tag];

      if (list === undefined) {
        message._unknownFields[tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },

  fromJSON(object: any): MapBigInt {
    return {
      map: isObject(object.map)
        ? Object.entries(object.map).reduce<Map<string, string>>((acc, [key, value]) => {
          acc.set(key, String(value));
          return acc;
        }, new Map())
        : undefined,
    };
  },

  toJSON(message: MapBigInt): unknown {
    const obj: any = {};
    obj.map = {};
    if (message.map) {
      message.map.forEach((v, k) => {
        obj.map[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MapBigInt>, I>>(base?: I): MapBigInt {
    return MapBigInt.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MapBigInt>, I>>(object: I): MapBigInt {
    const message = createBaseMapBigInt();
    message.map = (object.map === undefined || object.map === null) ? undefined : (() => {
      const m = new Map();
      (object.map as Map<string, string> ?? new Map()).forEach((value, key) => {
        if (value !== undefined) {
          m.set(key, String(value));
        }
      });
      return m;
    })();
    return message;
  },
};

function createBaseMapBigInt_MapEntry(): MapBigInt_MapEntry {
  return { key: "0", value: "0" };
}

export const MapBigInt_MapEntry = {
  encode(message: MapBigInt_MapEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "0") {
      writer.uint32(9).fixed64(message.key);
    }
    if (message.value !== "0") {
      writer.uint32(16).int64(message.value);
    }
    if (message._unknownFields !== undefined) {
      for (const key in message._unknownFields) {
        const values = message._unknownFields[key];
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MapBigInt_MapEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMapBigInt_MapEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 9) {
            break;
          }

          message.key = longToString(reader.fixed64() as Long);
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.value = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      if (message._unknownFields === undefined) {
        message._unknownFields = {};
      }

      const list = message._unknownFields[tag];

      if (list === undefined) {
        message._unknownFields[tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },

  fromJSON(object: any): MapBigInt_MapEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "0",
      value: isSet(object.value) ? String(object.value) : "0",
    };
  },

  toJSON(message: MapBigInt_MapEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<MapBigInt_MapEntry>, I>>(base?: I): MapBigInt_MapEntry {
    return MapBigInt_MapEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MapBigInt_MapEntry>, I>>(object: I): MapBigInt_MapEntry {
    const message = createBaseMapBigInt_MapEntry();
    message.key = object.key ?? "0";
    message.value = object.value ?? "0";
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

function longToString(long: Long) {
  return long.toString();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
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
