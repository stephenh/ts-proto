/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';

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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseDateMessage) as DateMessage;
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
    const message = globalThis.Object.create(baseDateMessage) as DateMessage;
    if (object.year !== undefined && object.year !== null) {
      message.year = Number(object.year);
    } else {
      message.year = 0;
    }
    if (object.month !== undefined && object.month !== null) {
      message.month = Number(object.month);
    } else {
      message.month = 0;
    }
    if (object.day !== undefined && object.day !== null) {
      message.day = Number(object.day);
    } else {
      message.day = 0;
    }
    return message;
  },

  fromPartial(object: DeepPartial<DateMessage>): DateMessage {
    const message = { ...baseDateMessage } as DateMessage;
    if (object.year !== undefined && object.year !== null) {
      message.year = object.year;
    } else {
      message.year = 0;
    }
    if (object.month !== undefined && object.month !== null) {
      message.month = object.month;
    } else {
      message.month = 0;
    }
    if (object.day !== undefined && object.day !== null) {
      message.day = object.day;
    } else {
      message.day = 0;
    }
    return message;
  },

  toJSON(message: DateMessage): unknown {
    const obj: any = {};
    message.year !== undefined && (obj.year = message.year);
    message.month !== undefined && (obj.month = message.month);
    message.day !== undefined && (obj.day = message.day);
    return obj;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('Unable to locate global object');
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
