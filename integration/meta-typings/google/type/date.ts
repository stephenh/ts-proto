/* eslint-disable */
import { FileDescriptorProto } from 'ts-proto-descriptors';
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

const createBaseDateMessage = (): DateMessage => ({ year: 0, month: 0, day: 0 });

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
    const message = createBaseDateMessage();
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

export interface ProtoMetadata {
  fileDescriptor: FileDescriptorProto;
  references: { [key: string]: any };
  dependencies?: ProtoMetadata[];
}

export const protoMetadata: ProtoMetadata = {
  fileDescriptor: FileDescriptorProto.fromPartial({
    dependency: [],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        field: [
          { name: 'year', number: 1, label: 1, type: 5, jsonName: 'year' },
          { name: 'month', number: 2, label: 1, type: 5, jsonName: 'month' },
          { name: 'day', number: 3, label: 1, type: 5, jsonName: 'day' },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'Date',
      },
    ],
    enumType: [],
    service: [],
    extension: [],
    name: 'google/type/date.proto',
    package: 'google.type',
    options: {
      uninterpretedOption: [],
      javaPackage: 'com.google.type',
      javaOuterClassname: 'DateProto',
      javaMultipleFiles: true,
      goPackage: 'google.golang.org/genproto/googleapis/type/date;date',
      ccEnableArenas: true,
      objcClassPrefix: 'GTP',
    },
    sourceCodeInfo: {
      location: [
        {
          path: [4, 0],
          span: [36, 0, 49, 1],
          leadingDetachedComments: [],
          leadingComments:
            ' Represents a whole or partial calendar date, e.g. a birthday. The time of day\n and time zone are either specified elsewhere or are not significant. The date\n is relative to the Proleptic Gregorian Calendar. This can represent:\n\n * A full date, with non-zero year, month and day values\n * A month and day value, with a zero year, e.g. an anniversary\n * A year on its own, with zero month and day values\n * A year and month value, with a zero day, e.g. a credit card expiration date\n\n Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and `google.protobuf.Timestamp`.\n',
        },
        {
          path: [4, 0, 2, 0],
          span: [39, 2, 17],
          leadingDetachedComments: [],
          leadingComments: ' Year of date. Must be from 1 to 9999, or 0 if specifying a date without\n a year.\n',
        },
        {
          path: [4, 0, 2, 1],
          span: [43, 2, 18],
          leadingDetachedComments: [],
          leadingComments:
            ' Month of year. Must be from 1 to 12, or 0 if specifying a year without a\n month and day.\n',
        },
        {
          path: [4, 0, 2, 2],
          span: [48, 2, 16],
          leadingDetachedComments: [],
          leadingComments:
            ' Day of month. Must be from 1 to 31 and valid for the year and month, or 0\n if specifying a year by itself or a year and month where the day is not\n significant.\n',
        },
      ],
    },
    syntax: 'proto3',
  }),
  references: { '.google.type.DateMessage': DateMessage },
  dependencies: [],
};

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
