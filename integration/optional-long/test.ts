/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";
import Long = require("long");

export const protobufPackage = "";

export interface Example {
  datetime?: Date | undefined;
}

function createBaseExample(): Example {
  return { datetime: undefined };
}

export const Example = {
  encode(message: Example, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.datetime !== undefined) {
      Timestamp.encode(toTimestamp(message.datetime), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Example {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExample();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.datetime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Example {
    return { datetime: isSet(object.datetime) ? fromJsonTimestamp(object.datetime) : undefined };
  },

  toJSON(message: Example): unknown {
    const obj: any = {};
    if (message.datetime !== undefined) {
      obj.datetime = message.datetime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Example>, I>>(base?: I): Example {
    return Example.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Example>, I>>(object: I): Example {
    const message = createBaseExample();
    message.datetime = object.datetime ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds?.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
