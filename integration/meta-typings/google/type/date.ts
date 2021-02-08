import { IFileDescriptorProto } from 'protobufjs/ext/descriptor';
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

const fileDescriptor: IFileDescriptorProto = {"dependency":[],"publicDependency":[],"weakDependency":[],"messageType":[{"name":"Date","field":[{"name":"year","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_INT32","jsonName":"year"},{"name":"month","number":2,"label":"LABEL_OPTIONAL","type":"TYPE_INT32","jsonName":"month"},{"name":"day","number":3,"label":"LABEL_OPTIONAL","type":"TYPE_INT32","jsonName":"day"}]}],"enumType":[],"service":[],"extension":[],"name":"google/type/date.proto","package":"google.type","options":{"javaPackage":"com.google.type","javaOuterClassname":"DateProto","javaMultipleFiles":true,"goPackage":"google.golang.org/genproto/googleapis/type/date;date","ccEnableArenas":true,"objcClassPrefix":"GTP"},"sourceCodeInfo":{"location":[{"path":[4,0],"span":[36,0,49,1],"leadingComments":" Represents a whole or partial calendar date, e.g. a birthday. The time of day\n and time zone are either specified elsewhere or are not significant. The date\n is relative to the Proleptic Gregorian Calendar. This can represent:\n\n * A full date, with non-zero year, month and day values\n * A month and day value, with a zero year, e.g. an anniversary\n * A year on its own, with zero month and day values\n * A year and month value, with a zero day, e.g. a credit card expiration date\n\n Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and `google.protobuf.Timestamp`.\n"},{"path":[4,0,2,0],"span":[39,2,17],"leadingComments":" Year of date. Must be from 1 to 9999, or 0 if specifying a date without\n a year.\n"},{"path":[4,0,2,1],"span":[43,2,18],"leadingComments":" Month of year. Must be from 1 to 12, or 0 if specifying a year without a\n month and day.\n"},{"path":[4,0,2,2],"span":[48,2,16],"leadingComments":" Day of month. Must be from 1 to 31 and valid for the year and month, or 0\n if specifying a year by itself or a year and month where the day is not\n significant.\n"}]},"syntax":"proto3"};

const resolvedDependencies: IFileDescriptorProto[] = [];

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
