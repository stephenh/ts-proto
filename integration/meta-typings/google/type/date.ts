import { Writer, Reader } from 'protobufjs/minimal';


/**
 *  Represents a whole or partial calendar date, e.g. a birthday. The time of day
 *  and time zone are either specified elsewhere or are not significant. The date
 *  is relative to the Proleptic Gregorian Calendar. This can represent:
 *
 *  * A full date, with non-zero year, month and day values
 *  * A month and day value, with a zero year, e.g. an anniversary
 *  * A year on its own, with zero month and day values
 *  * A year and month value, with a zero day, e.g. a credit card expiration date
 *
 *  Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and `google.protobuf.Timestamp`.
 */
export interface DateMessage {
  /**
   *  Year of date. Must be from 1 to 9999, or 0 if specifying a date without
   *  a year.
   */
  year: number;
  /**
   *  Month of year. Must be from 1 to 12, or 0 if specifying a year without a
   *  month and day.
   */
  month: number;
  /**
   *  Day of month. Must be from 1 to 31 and valid for the year and month, or 0
   *  if specifying a year by itself or a year and month where the day is not
   *  significant.
   */
  day: number;
}

const baseDateMessage: object = {
  year: 0,
  month: 0,
  day: 0,
};

export interface MetaBase {
  readonly kind: 'object' | 'array' | 'map' | 'union' | 'builtin';
}

export interface MetaMessage extends MetaBase {
  readonly kind: 'object';
  readonly type: string;
  readonly name: string;
}

export interface MetaArray extends MetaBase {
  readonly kind: 'array';
  readonly type: MetaBase | string;
}

export interface MetaMap extends MetaBase {
  readonly kind: 'map';
  readonly key: string;
  readonly value: MetaBase | string;
}

export interface MetaUnion extends MetaBase {
  readonly kind: 'union';
  readonly choices: Array<MetaBase | string | undefined>;
}

export interface MetaService<T, R> {
  readonly request: MetaMessage;
  readonly response: MetaMessage;
  readonly clientStreaming: boolean;
  readonly serverStreaming: boolean;
  readonly encodeRequest?: (message: T, writer: Writer) => Writer;
  readonly decodeResponse?: (input: Uint8Array | Reader, length?: number) => R;
}

export interface MetaPrimitive extends MetaBase {
  readonly kind: 'builtin';
  readonly type: string;
  readonly original: string;
}

export const protobufPackage = 'google.type'

export const DateMessage = {
  encode(message: DateMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.year);
    writer.uint32(16).int32(message.month);
    writer.uint32(24).int32(message.day);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DateMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
};

export const metaDateMessage: { [key in keyof Required<DateMessage>]: MetaBase | string } = {
  year: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
  month: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
  day: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
}
export const metadata: { [key: string]: ['service', string, any, { [key: string]: MetaService<any, any> }] | ['enum', string, any, any] | ['message', string, any, { [key: string]: MetaBase | string }] } = {
  DateMessage: ['message', '.google.type.DateMessage', DateMessage, metaDateMessage],
}