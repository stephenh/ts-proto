/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'google.type';

/**
 * Represents a whole or partial calendar date, e.g. a birthday. The time of day
 * and time zone are either specified elsewhere or are not significant. The date
 * is relative to the Proleptic Gregorian Calendar. This can represent:
 *
 * * A full date, with non-zero year, month and day values
 * * A month and day value, with a zero year, e.g. an anniversary
 * * A year on its own, with zero month and day values
 * * A year and month value, with a zero day, e.g. a credit card expiration date
 *
 * Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and `google.protobuf.Timestamp`.
 */
export interface DateMessage {
  /**
   * Year of date. Must be from 1 to 9999, or 0 if specifying a date without
   * a year.
   */
  year: number;
  /**
   * Month of year. Must be from 1 to 12, or 0 if specifying a year without a
   * month and day.
   */
  month: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month, or 0
   * if specifying a year by itself or a year and month where the day is not
   * significant.
   */
  day: number;
}

const baseDateMessage: object = { year: 0, month: 0, day: 0 };

export const DateMessage = {
  encode(message: DateMessage, writer: Writer = Writer.create()): Writer {
    if (message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    if (message.day !== 0) {
      writer.uint32(24).int32(message.day);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DateMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDateMessage } as DateMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.year = reader.int32();
          break;
        case 2:
          message.month = reader.int32();
          break;
        case 3:
          message.day = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DateMessage {
    const message = { ...baseDateMessage } as DateMessage;
    message.year = object.year !== undefined && object.year !== null ? Number(object.year) : 0;
    message.month = object.month !== undefined && object.month !== null ? Number(object.month) : 0;
    message.day = object.day !== undefined && object.day !== null ? Number(object.day) : 0;
    return message;
  },

  toJSON(message: DateMessage): unknown {
    const obj: any = {};
    message.year !== undefined && (obj.year = message.year);
    message.month !== undefined && (obj.month = message.month);
    message.day !== undefined && (obj.day = message.day);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DateMessage>, I>>(object: I): DateMessage {
    const message = { ...baseDateMessage } as DateMessage;
    message.year = object.year ?? 0;
    message.month = object.month ?? 0;
    message.day = object.day ?? 0;
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

type KeysOfUnion<T> = T extends T ? keyof T : never;

export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
