/* eslint-disable */
import { IFileDescriptorProto } from 'protobufjs/ext/descriptor';
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';

export const protobufPackage = 'google.protobuf';

/**
 * A Timestamp represents a point in time independent of any time zone
 * or calendar, represented as seconds and fractions of seconds at
 * nanosecond resolution in UTC Epoch time. It is encoded using the
 * Proleptic Gregorian Calendar which extends the Gregorian calendar
 * backwards to year one. It is encoded assuming all minutes are 60
 * seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from
 * 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z.
 * By restricting to that range, we ensure that we can convert to
 * and from  RFC 3339 date strings.
 * See [https://www.ietf.org/rfc/rfc3339.txt](https://www.ietf.org/rfc/rfc3339.txt).
 *
 * # Examples
 *
 * Example 1: Compute Timestamp from POSIX `time()`.
 *
 *     Timestamp timestamp;
 *     timestamp.set_seconds(time(NULL));
 *     timestamp.set_nanos(0);
 *
 * Example 2: Compute Timestamp from POSIX `gettimeofday()`.
 *
 *     struct timeval tv;
 *     gettimeofday(&tv, NULL);
 *
 *     Timestamp timestamp;
 *     timestamp.set_seconds(tv.tv_sec);
 *     timestamp.set_nanos(tv.tv_usec * 1000);
 *
 * Example 3: Compute Timestamp from Win32 `GetSystemTimeAsFileTime()`.
 *
 *     FILETIME ft;
 *     GetSystemTimeAsFileTime(&ft);
 *     UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;
 *
 *     // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z
 *     // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.
 *     Timestamp timestamp;
 *     timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));
 *     timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));
 *
 * Example 4: Compute Timestamp from Java `System.currentTimeMillis()`.
 *
 *     long millis = System.currentTimeMillis();
 *
 *     Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)
 *         .setNanos((int) ((millis % 1000) * 1000000)).build();
 *
 *
 * Example 5: Compute Timestamp from current time in Python.
 *
 *     timestamp = Timestamp()
 *     timestamp.GetCurrentTime()
 *
 * # JSON Mapping
 *
 * In JSON format, the Timestamp type is encoded as a string in the
 * [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the
 * format is "{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z"
 * where {year} is always expressed using four digits while {month}, {day},
 * {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional
 * seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),
 * are optional. The "Z" suffix indicates the timezone ("UTC"); the timezone
 * is required. A proto3 JSON serializer should always use UTC (as indicated by
 * "Z") when printing the Timestamp type and a proto3 JSON parser should be
 * able to accept both UTC and other timezones (as indicated by an offset).
 *
 * For example, "2017-01-15T01:30:15.01Z" encodes 15.01 seconds past
 * 01:30 UTC on January 15, 2017.
 *
 * In JavaScript, one can convert a Date object to this format using the
 * standard [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString]
 * method. In Python, a standard `datetime.datetime` object can be converted
 * to this format using [`strftime`](https://docs.python.org/2/library/time.html#time.strftime)
 * with the time format spec '%Y-%m-%dT%H:%M:%S.%fZ'. Likewise, in Java, one
 * can use the Joda Time's [`ISODateTimeFormat.dateTime()`](
 * http://www.joda.org/joda-time/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime--
 * ) to obtain a formatter capable of generating timestamps in this format.
 */
export interface Timestamp {
  /**
   * Represents seconds of UTC time since Unix epoch
   * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   * 9999-12-31T23:59:59Z inclusive.
   */
  seconds: number;
  /**
   * Non-negative fractions of a second at nanosecond resolution. Negative
   * second values with fractions must still have non-negative nanos values
   * that count forward in time. Must be from 0 to 999,999,999
   * inclusive.
   */
  nanos: number;
}

const baseTimestamp: object = { seconds: 0, nanos: 0 };

export const Timestamp = {
  encode(message: Timestamp, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.seconds);
    writer.uint32(16).int32(message.nanos);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Timestamp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTimestamp } as Timestamp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.nanos = reader.int32();
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
  fileDescriptor: IFileDescriptorProto;
  references: { [key: string]: any };
  dependencies?: ProtoMetadata[];
}

export const protoMetadata: ProtoMetadata = {
  fileDescriptor: {
    dependency: [],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        name: 'Timestamp',
        field: [
          { name: 'seconds', number: 1, label: 'LABEL_OPTIONAL', type: 'TYPE_INT64', jsonName: 'seconds' },
          { name: 'nanos', number: 2, label: 'LABEL_OPTIONAL', type: 'TYPE_INT32', jsonName: 'nanos' },
        ],
      },
    ],
    enumType: [],
    service: [],
    extension: [],
    name: 'google/protobuf/timestamp.proto',
    package: 'google.protobuf',
    options: {
      javaPackage: 'com.google.protobuf',
      javaOuterClassname: 'TimestampProto',
      javaMultipleFiles: true,
      goPackage: 'github.com/golang/protobuf/ptypes/timestamp',
      ccEnableArenas: true,
      objcClassPrefix: 'GPB',
      csharpNamespace: 'Google.Protobuf.WellKnownTypes',
    },
    sourceCodeInfo: {
      location: [
        {
          path: [4, 0],
          span: [122, 0, 134, 1],
          leadingComments:
            ' A Timestamp represents a point in time independent of any time zone\n or calendar, represented as seconds and fractions of seconds at\n nanosecond resolution in UTC Epoch time. It is encoded using the\n Proleptic Gregorian Calendar which extends the Gregorian calendar\n backwards to year one. It is encoded assuming all minutes are 60\n seconds long, i.e. leap seconds are "smeared" so that no leap second\n table is needed for interpretation. Range is from\n 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z.\n By restricting to that range, we ensure that we can convert to\n and from  RFC 3339 date strings.\n See [https://www.ietf.org/rfc/rfc3339.txt](https://www.ietf.org/rfc/rfc3339.txt).\n\n # Examples\n\n Example 1: Compute Timestamp from POSIX `time()`.\n\n     Timestamp timestamp;\n     timestamp.set_seconds(time(NULL));\n     timestamp.set_nanos(0);\n\n Example 2: Compute Timestamp from POSIX `gettimeofday()`.\n\n     struct timeval tv;\n     gettimeofday(&tv, NULL);\n\n     Timestamp timestamp;\n     timestamp.set_seconds(tv.tv_sec);\n     timestamp.set_nanos(tv.tv_usec * 1000);\n\n Example 3: Compute Timestamp from Win32 `GetSystemTimeAsFileTime()`.\n\n     FILETIME ft;\n     GetSystemTimeAsFileTime(&ft);\n     UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;\n\n     // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z\n     // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.\n     Timestamp timestamp;\n     timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));\n     timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));\n\n Example 4: Compute Timestamp from Java `System.currentTimeMillis()`.\n\n     long millis = System.currentTimeMillis();\n\n     Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)\n         .setNanos((int) ((millis % 1000) * 1000000)).build();\n\n\n Example 5: Compute Timestamp from current time in Python.\n\n     timestamp = Timestamp()\n     timestamp.GetCurrentTime()\n\n # JSON Mapping\n\n In JSON format, the Timestamp type is encoded as a string in the\n [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the\n format is "{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z"\n where {year} is always expressed using four digits while {month}, {day},\n {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional\n seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),\n are optional. The "Z" suffix indicates the timezone ("UTC"); the timezone\n is required. A proto3 JSON serializer should always use UTC (as indicated by\n "Z") when printing the Timestamp type and a proto3 JSON parser should be\n able to accept both UTC and other timezones (as indicated by an offset).\n\n For example, "2017-01-15T01:30:15.01Z" encodes 15.01 seconds past\n 01:30 UTC on January 15, 2017.\n\n In JavaScript, one can convert a Date object to this format using the\n standard [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString]\n method. In Python, a standard `datetime.datetime` object can be converted\n to this format using [`strftime`](https://docs.python.org/2/library/time.html#time.strftime)\n with the time format spec \'%Y-%m-%dT%H:%M:%S.%fZ\'. Likewise, in Java, one\n can use the Joda Time\'s [`ISODateTimeFormat.dateTime()`](\n http://www.joda.org/joda-time/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime--\n ) to obtain a formatter capable of generating timestamps in this format.\n\n\n',
        },
        {
          path: [4, 0, 2, 0],
          span: [127, 2, 20],
          leadingComments:
            ' Represents seconds of UTC time since Unix epoch\n 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to\n 9999-12-31T23:59:59Z inclusive.\n',
        },
        {
          path: [4, 0, 2, 1],
          span: [133, 2, 18],
          leadingComments:
            ' Non-negative fractions of a second at nanosecond resolution. Negative\n second values with fractions must still have non-negative nanos values\n that count forward in time. Must be from 0 to 999,999,999\n inclusive.\n',
        },
      ],
    },
    syntax: 'proto3',
  } as any,
  references: { '.google.protobuf.Timestamp': Timestamp },
  dependencies: [],
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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
