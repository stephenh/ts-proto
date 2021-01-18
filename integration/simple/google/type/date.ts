/* eslint-disable */

export const protobufPackage = 'google.type';

/** Represents a whole or partial calendar date, e.g. a birthday. The time of day
 *  and time zone are either specified elsewhere or are not significant. The date
 *  is relative to the Proleptic Gregorian Calendar. This can represent:
 *
 *  * A full date, with non-zero year, month and day values
 *  * A month and day value, with a zero year, e.g. an anniversary
 *  * A year on its own, with zero month and day values
 *  * A year and month value, with a zero day, e.g. a credit card expiration date
 *
 *  Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and `google.protobuf.Timestamp`. */
export interface DateMessage {
  /** Year of date. Must be from 1 to 9999, or 0 if specifying a date without
   *  a year. */
  year: number;
  /** Month of year. Must be from 1 to 12, or 0 if specifying a year without a
   *  month and day. */
  month: number;
  /** Day of month. Must be from 1 to 31 and valid for the year and month, or 0
   *  if specifying a year by itself or a year and month where the day is not
   *  significant. */
  day: number;
}

const baseDateMessage: object = { year: 0, month: 0, day: 0 };
