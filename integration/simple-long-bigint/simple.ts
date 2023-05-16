/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";
import { UInt64Value } from "./google/protobuf/wrappers";

export const protobufPackage = "simple";

export interface Numbers {
  double: number;
  float: number;
  int32: number;
  int64: bigint;
  uint32: number;
  uint64: bigint;
  sint32: number;
  sint64: bigint;
  fixed32: number;
  fixed64: bigint;
  sfixed32: number;
  sfixed64: bigint;
  guint64: bigint | undefined;
  timestamp: Date | undefined;
  uint64s: bigint[];
}

function createBaseNumbers(): Numbers {
  return {
    double: 0,
    float: 0,
    int32: 0,
    int64: BigInt("0"),
    uint32: 0,
    uint64: BigInt("0"),
    sint32: 0,
    sint64: BigInt("0"),
    fixed32: 0,
    fixed64: BigInt("0"),
    sfixed32: 0,
    sfixed64: BigInt("0"),
    guint64: undefined,
    timestamp: undefined,
    uint64s: [],
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
    if (message.int64 !== BigInt("0")) {
      writer.uint32(32).int64(message.int64.toString());
    }
    if (message.uint32 !== 0) {
      writer.uint32(40).uint32(message.uint32);
    }
    if (message.uint64 !== BigInt("0")) {
      writer.uint32(48).uint64(message.uint64.toString());
    }
    if (message.sint32 !== 0) {
      writer.uint32(56).sint32(message.sint32);
    }
    if (message.sint64 !== BigInt("0")) {
      writer.uint32(64).sint64(message.sint64.toString());
    }
    if (message.fixed32 !== 0) {
      writer.uint32(77).fixed32(message.fixed32);
    }
    if (message.fixed64 !== BigInt("0")) {
      writer.uint32(81).fixed64(message.fixed64.toString());
    }
    if (message.sfixed32 !== 0) {
      writer.uint32(93).sfixed32(message.sfixed32);
    }
    if (message.sfixed64 !== BigInt("0")) {
      writer.uint32(97).sfixed64(message.sfixed64.toString());
    }
    if (message.guint64 !== undefined) {
      UInt64Value.encode({ value: message.guint64! }, writer.uint32(106).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(114).fork()).ldelim();
    }
    writer.uint32(122).fork();
    for (const v of message.uint64s) {
      writer.uint64(v.toString());
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumbers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.double = reader.double();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.float = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.int32 = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.int64 = longToBigint(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.uint32 = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.uint64 = longToBigint(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.sint32 = reader.sint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.sint64 = longToBigint(reader.sint64() as Long);
          continue;
        case 9:
          if (tag !== 77) {
            break;
          }

          message.fixed32 = reader.fixed32();
          continue;
        case 10:
          if (tag !== 81) {
            break;
          }

          message.fixed64 = longToBigint(reader.fixed64() as Long);
          continue;
        case 11:
          if (tag !== 93) {
            break;
          }

          message.sfixed32 = reader.sfixed32();
          continue;
        case 12:
          if (tag !== 97) {
            break;
          }

          message.sfixed64 = longToBigint(reader.sfixed64() as Long);
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.guint64 = UInt64Value.decode(reader, reader.uint32()).value;
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag === 120) {
            message.uint64s.push(longToBigint(reader.uint64() as Long));

            continue;
          }

          if (tag === 122) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.uint64s.push(longToBigint(reader.uint64() as Long));
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

  fromJSON(object: any): Numbers {
    return {
      double: isSet(object.double) ? Number(object.double) : 0,
      float: isSet(object.float) ? Number(object.float) : 0,
      int32: isSet(object.int32) ? Number(object.int32) : 0,
      int64: isSet(object.int64) ? BigInt(object.int64) : BigInt("0"),
      uint32: isSet(object.uint32) ? Number(object.uint32) : 0,
      uint64: isSet(object.uint64) ? BigInt(object.uint64) : BigInt("0"),
      sint32: isSet(object.sint32) ? Number(object.sint32) : 0,
      sint64: isSet(object.sint64) ? BigInt(object.sint64) : BigInt("0"),
      fixed32: isSet(object.fixed32) ? Number(object.fixed32) : 0,
      fixed64: isSet(object.fixed64) ? BigInt(object.fixed64) : BigInt("0"),
      sfixed32: isSet(object.sfixed32) ? Number(object.sfixed32) : 0,
      sfixed64: isSet(object.sfixed64) ? BigInt(object.sfixed64) : BigInt("0"),
      guint64: isSet(object.guint64) ? BigInt(object.guint64) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      uint64s: Array.isArray(object?.uint64s) ? object.uint64s.map((e: any) => BigInt(e)) : [],
    };
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    message.double !== undefined && (obj.double = message.double);
    message.float !== undefined && (obj.float = message.float);
    message.int32 !== undefined && (obj.int32 = Math.round(message.int32));
    message.int64 !== undefined && (obj.int64 = message.int64.toString());
    message.uint32 !== undefined && (obj.uint32 = Math.round(message.uint32));
    message.uint64 !== undefined && (obj.uint64 = message.uint64.toString());
    message.sint32 !== undefined && (obj.sint32 = Math.round(message.sint32));
    message.sint64 !== undefined && (obj.sint64 = message.sint64.toString());
    message.fixed32 !== undefined && (obj.fixed32 = Math.round(message.fixed32));
    message.fixed64 !== undefined && (obj.fixed64 = message.fixed64.toString());
    message.sfixed32 !== undefined && (obj.sfixed32 = Math.round(message.sfixed32));
    message.sfixed64 !== undefined && (obj.sfixed64 = message.sfixed64.toString());
    message.guint64 !== undefined && (obj.guint64 = message.guint64);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    if (message.uint64s) {
      obj.uint64s = message.uint64s.map((e) => e.toString());
    } else {
      obj.uint64s = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Numbers>, I>>(base?: I): Numbers {
    return Numbers.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Numbers>, I>>(object: I): Numbers {
    const message = createBaseNumbers();
    message.double = object.double ?? 0;
    message.float = object.float ?? 0;
    message.int32 = object.int32 ?? 0;
    message.int64 = object.int64 ?? BigInt("0");
    message.uint32 = object.uint32 ?? 0;
    message.uint64 = object.uint64 ?? BigInt("0");
    message.sint32 = object.sint32 ?? 0;
    message.sint64 = object.sint64 ?? BigInt("0");
    message.fixed32 = object.fixed32 ?? 0;
    message.fixed64 = object.fixed64 ?? BigInt("0");
    message.sfixed32 = object.sfixed32 ?? 0;
    message.sfixed64 = object.sfixed64 ?? BigInt("0");
    message.guint64 = object.guint64 ?? undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.uint64s = object.uint64s?.map((e) => e) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | bigint | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = BigInt(Math.trunc(date.getTime() / 1_000));
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (Number(t.seconds.toString()) || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToBigint(long: Long) {
  return BigInt(long.toString());
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
