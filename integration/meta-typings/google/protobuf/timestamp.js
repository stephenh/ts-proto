"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.protoMetadata = exports.Timestamp = exports.protobufPackage = void 0;
/* eslint-disable */
var ts_proto_descriptors_1 = require("ts-proto-descriptors");
var minimal_1 = require("protobufjs/minimal");
var Long = require("long");
exports.protobufPackage = 'google.protobuf';
var baseTimestamp = { seconds: 0, nanos: 0 };
exports.Timestamp = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.seconds !== 0) {
            writer.uint32(8).int64(message.seconds);
        }
        if (message.nanos !== 0) {
            writer.uint32(16).int32(message.nanos);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseTimestamp);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.seconds = longToNumber(reader.int64());
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
    }
};
exports.protoMetadata = {
    fileDescriptor: ts_proto_descriptors_1.FileDescriptorProto.fromPartial({
        dependency: [],
        publicDependency: [],
        weakDependency: [],
        messageType: [
            {
                field: [
                    { name: 'seconds', number: 1, label: 1, type: 3, jsonName: 'seconds' },
                    { name: 'nanos', number: 2, label: 1, type: 5, jsonName: 'nanos' },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Timestamp'
            },
        ],
        enumType: [],
        service: [],
        extension: [],
        name: 'google/protobuf/timestamp.proto',
        package: 'google.protobuf',
        options: {
            uninterpretedOption: [],
            javaPackage: 'com.google.protobuf',
            javaOuterClassname: 'TimestampProto',
            javaMultipleFiles: true,
            goPackage: 'google.golang.org/protobuf/types/known/timestamppb',
            ccEnableArenas: true,
            objcClassPrefix: 'GPB',
            csharpNamespace: 'Google.Protobuf.WellKnownTypes'
        },
        sourceCodeInfo: {
            location: [
                {
                    path: [4, 0],
                    span: [135, 0, 146, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' A Timestamp represents a point in time independent of any time zone or local\n calendar, encoded as a count of seconds and fractions of seconds at\n nanosecond resolution. The count is relative to an epoch at UTC midnight on\n January 1, 1970, in the proleptic Gregorian calendar which extends the\n Gregorian calendar backwards to year one.\n\n All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap\n second table is needed for interpretation, using a [24-hour linear\n smear](https://developers.google.com/time/smear).\n\n The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By\n restricting to that range, we ensure that we can convert to and from [RFC\n 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.\n\n # Examples\n\n Example 1: Compute Timestamp from POSIX `time()`.\n\n     Timestamp timestamp;\n     timestamp.set_seconds(time(NULL));\n     timestamp.set_nanos(0);\n\n Example 2: Compute Timestamp from POSIX `gettimeofday()`.\n\n     struct timeval tv;\n     gettimeofday(&tv, NULL);\n\n     Timestamp timestamp;\n     timestamp.set_seconds(tv.tv_sec);\n     timestamp.set_nanos(tv.tv_usec * 1000);\n\n Example 3: Compute Timestamp from Win32 `GetSystemTimeAsFileTime()`.\n\n     FILETIME ft;\n     GetSystemTimeAsFileTime(&ft);\n     UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;\n\n     // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z\n     // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.\n     Timestamp timestamp;\n     timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));\n     timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));\n\n Example 4: Compute Timestamp from Java `System.currentTimeMillis()`.\n\n     long millis = System.currentTimeMillis();\n\n     Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)\n         .setNanos((int) ((millis % 1000) * 1000000)).build();\n\n\n Example 5: Compute Timestamp from Java `Instant.now()`.\n\n     Instant now = Instant.now();\n\n     Timestamp timestamp =\n         Timestamp.newBuilder().setSeconds(now.getEpochSecond())\n             .setNanos(now.getNano()).build();\n\n\n Example 6: Compute Timestamp from current time in Python.\n\n     timestamp = Timestamp()\n     timestamp.GetCurrentTime()\n\n # JSON Mapping\n\n In JSON format, the Timestamp type is encoded as a string in the\n [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the\n format is "{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z"\n where {year} is always expressed using four digits while {month}, {day},\n {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional\n seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),\n are optional. The "Z" suffix indicates the timezone ("UTC"); the timezone\n is required. A proto3 JSON serializer should always use UTC (as indicated by\n "Z") when printing the Timestamp type and a proto3 JSON parser should be\n able to accept both UTC and other timezones (as indicated by an offset).\n\n For example, "2017-01-15T01:30:15.01Z" encodes 15.01 seconds past\n 01:30 UTC on January 15, 2017.\n\n In JavaScript, one can convert a Date object to this format using the\n standard\n [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)\n method. In Python, a standard `datetime.datetime` object can be converted\n to this format using\n [`strftime`](https://docs.python.org/2/library/time.html#time.strftime) with\n the time format spec \'%Y-%m-%dT%H:%M:%S.%fZ\'. Likewise, in Java, one can use\n the Joda Time\'s [`ISODateTimeFormat.dateTime()`](\n http://www.joda.org/joda-time/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime%2D%2D\n ) to obtain a formatter capable of generating timestamps in this format.\n\n\n'
                },
                {
                    path: [4, 0, 2, 0],
                    span: [139, 2, 20],
                    leadingDetachedComments: [],
                    leadingComments: ' Represents seconds of UTC time since Unix epoch\n 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to\n 9999-12-31T23:59:59Z inclusive.\n'
                },
                {
                    path: [4, 0, 2, 1],
                    span: [145, 2, 18],
                    leadingDetachedComments: [],
                    leadingComments: ' Non-negative fractions of a second at nanosecond resolution. Negative\n second values with fractions must still have non-negative nanos values\n that count forward in time. Must be from 0 to 999,999,999\n inclusive.\n'
                },
            ]
        },
        syntax: 'proto3'
    }),
    references: { '.google.protobuf.Timestamp': exports.Timestamp },
    dependencies: []
};
var globalThis = (function () {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
