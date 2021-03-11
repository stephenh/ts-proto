import { protoMetadata } from './simple';

describe('simple', () => {
  it('generates types correctly', () => {
    expect(protoMetadata).toMatchInlineSnapshot(`
      Object {
        "dependencies": Array [
          Object {
            "dependencies": Array [],
            "fileDescriptor": Object {
              "dependency": Array [],
              "enumType": Array [],
              "extension": Array [],
              "messageType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "year",
                      "label": 1,
                      "name": "year",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "month",
                      "label": 1,
                      "name": "month",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "day",
                      "label": 1,
                      "name": "day",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                  ],
                  "name": "Date",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "name": "google/type/date.proto",
              "options": Object {
                "ccEnableArenas": true,
                "ccGenericServices": false,
                "csharpNamespace": "",
                "deprecated": false,
                "goPackage": "google.golang.org/genproto/googleapis/type/date;date",
                "javaGenerateEqualsAndHash": false,
                "javaGenericServices": false,
                "javaMultipleFiles": true,
                "javaOuterClassname": "DateProto",
                "javaPackage": "com.google.type",
                "javaStringCheckUtf8": false,
                "objcClassPrefix": "GTP",
                "optimizeFor": 1,
                "phpClassPrefix": "",
                "phpGenericServices": false,
                "phpMetadataNamespace": "",
                "phpNamespace": "",
                "pyGenericServices": false,
                "rubyPackage": "",
                "swiftPrefix": "",
                "uninterpretedOption": Array [],
              },
              "package": "google.type",
              "publicDependency": Array [],
              "service": Array [],
              "sourceCodeInfo": Object {
                "location": Array [
                  Object {
                    "leadingComments": " Represents a whole or partial calendar date, e.g. a birthday. The time of day
       and time zone are either specified elsewhere or are not significant. The date
       is relative to the Proleptic Gregorian Calendar. This can represent:

       * A full date, with non-zero year, month and day values
       * A month and day value, with a zero year, e.g. an anniversary
       * A year on its own, with zero month and day values
       * A year and month value, with a zero day, e.g. a credit card expiration date

       Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and \`google.protobuf.Timestamp\`.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                    ],
                    "span": Array [
                      36,
                      0,
                      49,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Year of date. Must be from 1 to 9999, or 0 if specifying a date without
       a year.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      39,
                      2,
                      17,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Month of year. Must be from 1 to 12, or 0 if specifying a year without a
       month and day.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      43,
                      2,
                      18,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Day of month. Must be from 1 to 31 and valid for the year and month, or 0
       if specifying a year by itself or a year and month where the day is not
       significant.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                      2,
                      2,
                    ],
                    "span": Array [
                      48,
                      2,
                      16,
                    ],
                    "trailingComments": "",
                  },
                ],
              },
              "syntax": "proto3",
              "weakDependency": Array [],
            },
            "references": Object {
              ".google.type.DateMessage": Object {
                "decode": [Function],
                "encode": [Function],
              },
            },
          },
          Object {
            "dependencies": Array [],
            "fileDescriptor": Object {
              "dependency": Array [],
              "enumType": Array [],
              "extension": Array [],
              "messageType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 1,
                      "typeName": "",
                    },
                  ],
                  "name": "DoubleValue",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 2,
                      "typeName": "",
                    },
                  ],
                  "name": "FloatValue",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 3,
                      "typeName": "",
                    },
                  ],
                  "name": "Int64Value",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 4,
                      "typeName": "",
                    },
                  ],
                  "name": "UInt64Value",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                  ],
                  "name": "Int32Value",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 13,
                      "typeName": "",
                    },
                  ],
                  "name": "UInt32Value",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                  ],
                  "name": "BoolValue",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                  ],
                  "name": "StringValue",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 12,
                      "typeName": "",
                    },
                  ],
                  "name": "BytesValue",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "name": "google/protobuf/wrappers.proto",
              "options": Object {
                "ccEnableArenas": true,
                "ccGenericServices": false,
                "csharpNamespace": "Google.Protobuf.WellKnownTypes",
                "deprecated": false,
                "goPackage": "github.com/golang/protobuf/ptypes/wrappers",
                "javaGenerateEqualsAndHash": false,
                "javaGenericServices": false,
                "javaMultipleFiles": true,
                "javaOuterClassname": "WrappersProto",
                "javaPackage": "com.google.protobuf",
                "javaStringCheckUtf8": false,
                "objcClassPrefix": "GPB",
                "optimizeFor": 1,
                "phpClassPrefix": "",
                "phpGenericServices": false,
                "phpMetadataNamespace": "",
                "phpNamespace": "",
                "pyGenericServices": false,
                "rubyPackage": "",
                "swiftPrefix": "",
                "uninterpretedOption": Array [],
              },
              "package": "google.protobuf",
              "publicDependency": Array [],
              "service": Array [],
              "sourceCodeInfo": Object {
                "location": Array [
                  Object {
                    "leadingComments": " Wrapper message for \`double\`.

       The JSON representation for \`DoubleValue\` is JSON number.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                    ],
                    "span": Array [
                      50,
                      0,
                      53,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The double value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      52,
                      2,
                      19,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`float\`.

       The JSON representation for \`FloatValue\` is JSON number.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                    ],
                    "span": Array [
                      58,
                      0,
                      61,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The float value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      0,
                    ],
                    "span": Array [
                      60,
                      2,
                      18,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`int64\`.

       The JSON representation for \`Int64Value\` is JSON string.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                    ],
                    "span": Array [
                      66,
                      0,
                      69,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The int64 value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                      2,
                      0,
                    ],
                    "span": Array [
                      68,
                      2,
                      18,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`uint64\`.

       The JSON representation for \`UInt64Value\` is JSON string.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      3,
                    ],
                    "span": Array [
                      74,
                      0,
                      77,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The uint64 value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      3,
                      2,
                      0,
                    ],
                    "span": Array [
                      76,
                      2,
                      19,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`int32\`.

       The JSON representation for \`Int32Value\` is JSON number.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                    ],
                    "span": Array [
                      82,
                      0,
                      85,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The int32 value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      2,
                      0,
                    ],
                    "span": Array [
                      84,
                      2,
                      18,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`uint32\`.

       The JSON representation for \`UInt32Value\` is JSON number.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      5,
                    ],
                    "span": Array [
                      90,
                      0,
                      93,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The uint32 value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      5,
                      2,
                      0,
                    ],
                    "span": Array [
                      92,
                      2,
                      19,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`bool\`.

       The JSON representation for \`BoolValue\` is JSON \`true\` and \`false\`.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      6,
                    ],
                    "span": Array [
                      98,
                      0,
                      101,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The bool value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      6,
                      2,
                      0,
                    ],
                    "span": Array [
                      100,
                      2,
                      17,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`string\`.

       The JSON representation for \`StringValue\` is JSON string.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      7,
                    ],
                    "span": Array [
                      106,
                      0,
                      109,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The string value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      7,
                      2,
                      0,
                    ],
                    "span": Array [
                      108,
                      2,
                      19,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`bytes\`.

       The JSON representation for \`BytesValue\` is JSON string.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      8,
                    ],
                    "span": Array [
                      114,
                      0,
                      117,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The bytes value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      8,
                      2,
                      0,
                    ],
                    "span": Array [
                      116,
                      2,
                      18,
                    ],
                    "trailingComments": "",
                  },
                ],
              },
              "syntax": "proto3",
              "weakDependency": Array [],
            },
            "references": Object {
              ".google.protobuf.BoolValue": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.BytesValue": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.DoubleValue": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.FloatValue": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.Int32Value": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.Int64Value": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.StringValue": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.UInt32Value": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.UInt64Value": Object {
                "decode": [Function],
                "encode": [Function],
              },
            },
          },
          Object {
            "dependencies": Array [],
            "fileDescriptor": Object {
              "dependency": Array [],
              "enumType": Array [],
              "extension": Array [],
              "messageType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "seconds",
                      "label": 1,
                      "name": "seconds",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 3,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "nanos",
                      "label": 1,
                      "name": "nanos",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                  ],
                  "name": "Timestamp",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "name": "google/protobuf/timestamp.proto",
              "options": Object {
                "ccEnableArenas": true,
                "ccGenericServices": false,
                "csharpNamespace": "Google.Protobuf.WellKnownTypes",
                "deprecated": false,
                "goPackage": "google.golang.org/protobuf/types/known/timestamppb",
                "javaGenerateEqualsAndHash": false,
                "javaGenericServices": false,
                "javaMultipleFiles": true,
                "javaOuterClassname": "TimestampProto",
                "javaPackage": "com.google.protobuf",
                "javaStringCheckUtf8": false,
                "objcClassPrefix": "GPB",
                "optimizeFor": 1,
                "phpClassPrefix": "",
                "phpGenericServices": false,
                "phpMetadataNamespace": "",
                "phpNamespace": "",
                "pyGenericServices": false,
                "rubyPackage": "",
                "swiftPrefix": "",
                "uninterpretedOption": Array [],
              },
              "package": "google.protobuf",
              "publicDependency": Array [],
              "service": Array [],
              "sourceCodeInfo": Object {
                "location": Array [
                  Object {
                    "leadingComments": " A Timestamp represents a point in time independent of any time zone or local
       calendar, encoded as a count of seconds and fractions of seconds at
       nanosecond resolution. The count is relative to an epoch at UTC midnight on
       January 1, 1970, in the proleptic Gregorian calendar which extends the
       Gregorian calendar backwards to year one.

       All minutes are 60 seconds long. Leap seconds are \\"smeared\\" so that no leap
       second table is needed for interpretation, using a [24-hour linear
       smear](https://developers.google.com/time/smear).

       The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By
       restricting to that range, we ensure that we can convert to and from [RFC
       3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.

       # Examples

       Example 1: Compute Timestamp from POSIX \`time()\`.

           Timestamp timestamp;
           timestamp.set_seconds(time(NULL));
           timestamp.set_nanos(0);

       Example 2: Compute Timestamp from POSIX \`gettimeofday()\`.

           struct timeval tv;
           gettimeofday(&tv, NULL);

           Timestamp timestamp;
           timestamp.set_seconds(tv.tv_sec);
           timestamp.set_nanos(tv.tv_usec * 1000);

       Example 3: Compute Timestamp from Win32 \`GetSystemTimeAsFileTime()\`.

           FILETIME ft;
           GetSystemTimeAsFileTime(&ft);
           UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;

           // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z
           // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.
           Timestamp timestamp;
           timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));
           timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));

       Example 4: Compute Timestamp from Java \`System.currentTimeMillis()\`.

           long millis = System.currentTimeMillis();

           Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)
               .setNanos((int) ((millis % 1000) * 1000000)).build();


       Example 5: Compute Timestamp from Java \`Instant.now()\`.

           Instant now = Instant.now();

           Timestamp timestamp =
               Timestamp.newBuilder().setSeconds(now.getEpochSecond())
                   .setNanos(now.getNano()).build();


       Example 6: Compute Timestamp from current time in Python.

           timestamp = Timestamp()
           timestamp.GetCurrentTime()

       # JSON Mapping

       In JSON format, the Timestamp type is encoded as a string in the
       [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the
       format is \\"{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z\\"
       where {year} is always expressed using four digits while {month}, {day},
       {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional
       seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),
       are optional. The \\"Z\\" suffix indicates the timezone (\\"UTC\\"); the timezone
       is required. A proto3 JSON serializer should always use UTC (as indicated by
       \\"Z\\") when printing the Timestamp type and a proto3 JSON parser should be
       able to accept both UTC and other timezones (as indicated by an offset).

       For example, \\"2017-01-15T01:30:15.01Z\\" encodes 15.01 seconds past
       01:30 UTC on January 15, 2017.

       In JavaScript, one can convert a Date object to this format using the
       standard
       [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
       method. In Python, a standard \`datetime.datetime\` object can be converted
       to this format using
       [\`strftime\`](https://docs.python.org/2/library/time.html#time.strftime) with
       the time format spec '%Y-%m-%dT%H:%M:%S.%fZ'. Likewise, in Java, one can use
       the Joda Time's [\`ISODateTimeFormat.dateTime()\`](
       http://www.joda.org/joda-time/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime%2D%2D
       ) to obtain a formatter capable of generating timestamps in this format.


      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                    ],
                    "span": Array [
                      135,
                      0,
                      146,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Represents seconds of UTC time since Unix epoch
       1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
       9999-12-31T23:59:59Z inclusive.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      139,
                      2,
                      20,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Non-negative fractions of a second at nanosecond resolution. Negative
       second values with fractions must still have non-negative nanos values
       that count forward in time. Must be from 0 to 999,999,999
       inclusive.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      145,
                      2,
                      18,
                    ],
                    "trailingComments": "",
                  },
                ],
              },
              "syntax": "proto3",
              "weakDependency": Array [],
            },
            "references": Object {
              ".google.protobuf.Timestamp": Object {
                "decode": [Function],
                "encode": [Function],
              },
            },
          },
          Object {
            "dependencies": Array [
              Object {
                "dependencies": Array [],
                "fileDescriptor": Object {
                  "dependency": Array [],
                  "enumType": Array [],
                  "extension": Array [],
                  "messageType": Array [
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "seconds",
                          "label": 1,
                          "name": "seconds",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 3,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "nanos",
                          "label": 1,
                          "name": "nanos",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                      ],
                      "name": "Timestamp",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                  ],
                  "name": "google/protobuf/timestamp.proto",
                  "options": Object {
                    "ccEnableArenas": true,
                    "ccGenericServices": false,
                    "csharpNamespace": "Google.Protobuf.WellKnownTypes",
                    "deprecated": false,
                    "goPackage": "google.golang.org/protobuf/types/known/timestamppb",
                    "javaGenerateEqualsAndHash": false,
                    "javaGenericServices": false,
                    "javaMultipleFiles": true,
                    "javaOuterClassname": "TimestampProto",
                    "javaPackage": "com.google.protobuf",
                    "javaStringCheckUtf8": false,
                    "objcClassPrefix": "GPB",
                    "optimizeFor": 1,
                    "phpClassPrefix": "",
                    "phpGenericServices": false,
                    "phpMetadataNamespace": "",
                    "phpNamespace": "",
                    "pyGenericServices": false,
                    "rubyPackage": "",
                    "swiftPrefix": "",
                    "uninterpretedOption": Array [],
                  },
                  "package": "google.protobuf",
                  "publicDependency": Array [],
                  "service": Array [],
                  "sourceCodeInfo": Object {
                    "location": Array [
                      Object {
                        "leadingComments": " A Timestamp represents a point in time independent of any time zone or local
       calendar, encoded as a count of seconds and fractions of seconds at
       nanosecond resolution. The count is relative to an epoch at UTC midnight on
       January 1, 1970, in the proleptic Gregorian calendar which extends the
       Gregorian calendar backwards to year one.

       All minutes are 60 seconds long. Leap seconds are \\"smeared\\" so that no leap
       second table is needed for interpretation, using a [24-hour linear
       smear](https://developers.google.com/time/smear).

       The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By
       restricting to that range, we ensure that we can convert to and from [RFC
       3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.

       # Examples

       Example 1: Compute Timestamp from POSIX \`time()\`.

           Timestamp timestamp;
           timestamp.set_seconds(time(NULL));
           timestamp.set_nanos(0);

       Example 2: Compute Timestamp from POSIX \`gettimeofday()\`.

           struct timeval tv;
           gettimeofday(&tv, NULL);

           Timestamp timestamp;
           timestamp.set_seconds(tv.tv_sec);
           timestamp.set_nanos(tv.tv_usec * 1000);

       Example 3: Compute Timestamp from Win32 \`GetSystemTimeAsFileTime()\`.

           FILETIME ft;
           GetSystemTimeAsFileTime(&ft);
           UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;

           // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z
           // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.
           Timestamp timestamp;
           timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));
           timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));

       Example 4: Compute Timestamp from Java \`System.currentTimeMillis()\`.

           long millis = System.currentTimeMillis();

           Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)
               .setNanos((int) ((millis % 1000) * 1000000)).build();


       Example 5: Compute Timestamp from Java \`Instant.now()\`.

           Instant now = Instant.now();

           Timestamp timestamp =
               Timestamp.newBuilder().setSeconds(now.getEpochSecond())
                   .setNanos(now.getNano()).build();


       Example 6: Compute Timestamp from current time in Python.

           timestamp = Timestamp()
           timestamp.GetCurrentTime()

       # JSON Mapping

       In JSON format, the Timestamp type is encoded as a string in the
       [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the
       format is \\"{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z\\"
       where {year} is always expressed using four digits while {month}, {day},
       {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional
       seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),
       are optional. The \\"Z\\" suffix indicates the timezone (\\"UTC\\"); the timezone
       is required. A proto3 JSON serializer should always use UTC (as indicated by
       \\"Z\\") when printing the Timestamp type and a proto3 JSON parser should be
       able to accept both UTC and other timezones (as indicated by an offset).

       For example, \\"2017-01-15T01:30:15.01Z\\" encodes 15.01 seconds past
       01:30 UTC on January 15, 2017.

       In JavaScript, one can convert a Date object to this format using the
       standard
       [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
       method. In Python, a standard \`datetime.datetime\` object can be converted
       to this format using
       [\`strftime\`](https://docs.python.org/2/library/time.html#time.strftime) with
       the time format spec '%Y-%m-%dT%H:%M:%S.%fZ'. Likewise, in Java, one can use
       the Joda Time's [\`ISODateTimeFormat.dateTime()\`](
       http://www.joda.org/joda-time/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime%2D%2D
       ) to obtain a formatter capable of generating timestamps in this format.


      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          0,
                        ],
                        "span": Array [
                          135,
                          0,
                          146,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Represents seconds of UTC time since Unix epoch
       1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
       9999-12-31T23:59:59Z inclusive.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          139,
                          2,
                          20,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Non-negative fractions of a second at nanosecond resolution. Negative
       second values with fractions must still have non-negative nanos values
       that count forward in time. Must be from 0 to 999,999,999
       inclusive.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          0,
                          2,
                          1,
                        ],
                        "span": Array [
                          145,
                          2,
                          18,
                        ],
                        "trailingComments": "",
                      },
                    ],
                  },
                  "syntax": "proto3",
                  "weakDependency": Array [],
                },
                "references": Object {
                  ".google.protobuf.Timestamp": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                },
              },
            ],
            "fileDescriptor": Object {
              "dependency": Array [
                "google/protobuf/timestamp.proto",
              ],
              "enumType": Array [],
              "extension": Array [],
              "messageType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "createdAt",
                      "label": 1,
                      "name": "created_at",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.Timestamp",
                    },
                  ],
                  "name": "ImportedThing",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "name": "import_dir/thing.proto",
              "options": undefined,
              "package": "simple",
              "publicDependency": Array [],
              "service": Array [],
              "sourceCodeInfo": Object {
                "location": Array [],
              },
              "syntax": "proto3",
              "weakDependency": Array [],
            },
            "references": Object {
              ".simple.ImportedThing": Object {
                "decode": [Function],
                "encode": [Function],
              },
            },
          },
        ],
        "fileDescriptor": Object {
          "dependency": Array [
            "google/type/date.proto",
            "google/protobuf/wrappers.proto",
            "google/protobuf/timestamp.proto",
            "import_dir/thing.proto",
          ],
          "enumType": Array [
            Object {
              "name": "StateEnum",
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
              "value": Array [
                Object {
                  "name": "UNKNOWN",
                  "number": 0,
                  "options": undefined,
                },
                Object {
                  "name": "ON",
                  "number": 2,
                  "options": undefined,
                },
                Object {
                  "name": "OFF",
                  "number": 3,
                  "options": undefined,
                },
              ],
            },
          ],
          "extension": Array [],
          "messageType": Array [
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 9,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "age",
                  "label": 1,
                  "name": "age",
                  "number": 2,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 5,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "createdAt",
                  "label": 1,
                  "name": "created_at",
                  "number": 9,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".google.protobuf.Timestamp",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "child",
                  "label": 1,
                  "name": "child",
                  "number": 3,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.Child",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "state",
                  "label": 1,
                  "name": "state",
                  "number": 4,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 14,
                  "typeName": ".simple.StateEnum",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "grandChildren",
                  "label": 3,
                  "name": "grand_children",
                  "number": 5,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.Child",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "coins",
                  "label": 3,
                  "name": "coins",
                  "number": 6,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 5,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "snacks",
                  "label": 3,
                  "name": "snacks",
                  "number": 7,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 9,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "oldStates",
                  "label": 3,
                  "name": "old_states",
                  "number": 8,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 14,
                  "typeName": ".simple.StateEnum",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "thing",
                  "label": 1,
                  "name": "thing",
                  "number": 10,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.ImportedThing",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "blobs",
                  "label": 3,
                  "name": "blobs",
                  "number": 11,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 12,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "birthday",
                  "label": 1,
                  "name": "birthday",
                  "number": 12,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".google.type.Date",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "blob",
                  "label": 1,
                  "name": "blob",
                  "number": 13,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 12,
                  "typeName": "",
                },
              ],
              "name": "Simple",
              "nestedType": Array [],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [
                Object {
                  "name": "Type",
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                  "value": Array [
                    Object {
                      "name": "UNKNOWN",
                      "number": 0,
                      "options": undefined,
                    },
                    Object {
                      "name": "GOOD",
                      "number": 1,
                      "options": undefined,
                    },
                    Object {
                      "name": "BAD",
                      "number": 2,
                      "options": undefined,
                    },
                  ],
                },
              ],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 9,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "type",
                  "label": 1,
                  "name": "type",
                  "number": 2,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 14,
                  "typeName": ".simple.Child.Type",
                },
              ],
              "name": "Child",
              "nestedType": Array [],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [
                Object {
                  "name": "InnerEnum",
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                  "value": Array [
                    Object {
                      "name": "UNKNOWN_INNER",
                      "number": 0,
                      "options": undefined,
                    },
                    Object {
                      "name": "GOOD",
                      "number": 100,
                      "options": undefined,
                    },
                    Object {
                      "name": "BAD",
                      "number": 1000,
                      "options": undefined,
                    },
                  ],
                },
              ],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 9,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "message",
                  "label": 1,
                  "name": "message",
                  "number": 2,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.Nested.InnerMessage",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "state",
                  "label": 1,
                  "name": "state",
                  "number": 3,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 14,
                  "typeName": ".simple.Nested.InnerEnum",
                },
              ],
              "name": "Nested",
              "nestedType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "deep",
                      "label": 1,
                      "name": "deep",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".simple.Nested.InnerMessage.DeepMessage",
                    },
                  ],
                  "name": "InnerMessage",
                  "nestedType": Array [
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                      ],
                      "name": "DeepMessage",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                  ],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "first",
                  "label": 1,
                  "name": "first",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 9,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "last",
                  "label": 1,
                  "name": "last",
                  "number": 2,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 9,
                  "typeName": "",
                },
              ],
              "name": "OneOfMessage",
              "nestedType": Array [],
              "oneofDecl": Array [
                Object {
                  "name": "name_fields",
                  "options": undefined,
                },
              ],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".google.protobuf.StringValue",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "age",
                  "label": 1,
                  "name": "age",
                  "number": 2,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".google.protobuf.Int32Value",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "enabled",
                  "label": 1,
                  "name": "enabled",
                  "number": 3,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".google.protobuf.BoolValue",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "coins",
                  "label": 3,
                  "name": "coins",
                  "number": 6,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".google.protobuf.Int32Value",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "snacks",
                  "label": 3,
                  "name": "snacks",
                  "number": 7,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".google.protobuf.StringValue",
                },
              ],
              "name": "SimpleWithWrappers",
              "nestedType": Array [],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "id",
                  "label": 1,
                  "name": "id",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 5,
                  "typeName": "",
                },
              ],
              "name": "Entity",
              "nestedType": Array [],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "entitiesById",
                  "label": 3,
                  "name": "entitiesById",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.EntitiesByIdEntry",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "nameLookup",
                  "label": 3,
                  "name": "nameLookup",
                  "number": 2,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.NameLookupEntry",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "intLookup",
                  "label": 3,
                  "name": "intLookup",
                  "number": 3,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.IntLookupEntry",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "mapOfTimestamps",
                  "label": 3,
                  "name": "mapOfTimestamps",
                  "number": 4,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.MapOfTimestampsEntry",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "mapOfBytes",
                  "label": 3,
                  "name": "mapOfBytes",
                  "number": 5,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.MapOfBytesEntry",
                },
              ],
              "name": "SimpleWithMap",
              "nestedType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".simple.Entity",
                    },
                  ],
                  "name": "EntitiesByIdEntry",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": Object {
                    "deprecated": false,
                    "mapEntry": true,
                    "messageSetWireFormat": false,
                    "noStandardDescriptorAccessor": false,
                    "uninterpretedOption": Array [],
                  },
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                  ],
                  "name": "NameLookupEntry",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": Object {
                    "deprecated": false,
                    "mapEntry": true,
                    "messageSetWireFormat": false,
                    "noStandardDescriptorAccessor": false,
                    "uninterpretedOption": Array [],
                  },
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                  ],
                  "name": "IntLookupEntry",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": Object {
                    "deprecated": false,
                    "mapEntry": true,
                    "messageSetWireFormat": false,
                    "noStandardDescriptorAccessor": false,
                    "uninterpretedOption": Array [],
                  },
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.Timestamp",
                    },
                  ],
                  "name": "MapOfTimestampsEntry",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": Object {
                    "deprecated": false,
                    "mapEntry": true,
                    "messageSetWireFormat": false,
                    "noStandardDescriptorAccessor": false,
                    "uninterpretedOption": Array [],
                  },
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 12,
                      "typeName": "",
                    },
                  ],
                  "name": "MapOfBytesEntry",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": Object {
                    "deprecated": false,
                    "mapEntry": true,
                    "messageSetWireFormat": false,
                    "noStandardDescriptorAccessor": false,
                    "uninterpretedOption": Array [],
                  },
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "entitiesById",
                  "label": 3,
                  "name": "entities_by_id",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry",
                },
              ],
              "name": "SimpleWithSnakeCaseMap",
              "nestedType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".simple.Entity",
                    },
                  ],
                  "name": "EntitiesByIdEntry",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": Object {
                    "deprecated": false,
                    "mapEntry": true,
                    "messageSetWireFormat": false,
                    "noStandardDescriptorAccessor": false,
                    "uninterpretedOption": Array [],
                  },
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "enumsById",
                  "label": 3,
                  "name": "enums_by_id",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMapOfEnums.EnumsByIdEntry",
                },
              ],
              "name": "SimpleWithMapOfEnums",
              "nestedType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 14,
                      "typeName": ".simple.StateEnum",
                    },
                  ],
                  "name": "EnumsByIdEntry",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": Object {
                    "deprecated": false,
                    "mapEntry": true,
                    "messageSetWireFormat": false,
                    "noStandardDescriptorAccessor": false,
                    "uninterpretedOption": Array [],
                  },
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "input",
                  "label": 1,
                  "name": "input",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 9,
                  "typeName": "",
                },
              ],
              "name": "PingRequest",
              "nestedType": Array [],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "output",
                  "label": 1,
                  "name": "output",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 9,
                  "typeName": "",
                },
              ],
              "name": "PingResponse",
              "nestedType": Array [],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "double",
                  "label": 1,
                  "name": "double",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 1,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "float",
                  "label": 1,
                  "name": "float",
                  "number": 2,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 2,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "int32",
                  "label": 1,
                  "name": "int32",
                  "number": 3,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 5,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "int64",
                  "label": 1,
                  "name": "int64",
                  "number": 4,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 3,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "uint32",
                  "label": 1,
                  "name": "uint32",
                  "number": 5,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 13,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "uint64",
                  "label": 1,
                  "name": "uint64",
                  "number": 6,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 4,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "sint32",
                  "label": 1,
                  "name": "sint32",
                  "number": 7,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 17,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "sint64",
                  "label": 1,
                  "name": "sint64",
                  "number": 8,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 18,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "fixed32",
                  "label": 1,
                  "name": "fixed32",
                  "number": 9,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 7,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "fixed64",
                  "label": 1,
                  "name": "fixed64",
                  "number": 10,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 6,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "sfixed32",
                  "label": 1,
                  "name": "sfixed32",
                  "number": 11,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 15,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "sfixed64",
                  "label": 1,
                  "name": "sfixed64",
                  "number": 12,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": false,
                  "type": 16,
                  "typeName": "",
                },
              ],
              "name": "Numbers",
              "nestedType": Array [],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": true,
                  "type": 9,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "age",
                  "label": 1,
                  "name": "age",
                  "number": 2,
                  "oneofIndex": 1,
                  "options": undefined,
                  "proto3Optional": true,
                  "type": 5,
                  "typeName": "",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "createdAt",
                  "label": 1,
                  "name": "created_at",
                  "number": 9,
                  "oneofIndex": 2,
                  "options": undefined,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".google.protobuf.Timestamp",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "child",
                  "label": 1,
                  "name": "child",
                  "number": 3,
                  "oneofIndex": 3,
                  "options": undefined,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".simple.Child",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "state",
                  "label": 1,
                  "name": "state",
                  "number": 4,
                  "oneofIndex": 4,
                  "options": undefined,
                  "proto3Optional": true,
                  "type": 14,
                  "typeName": ".simple.StateEnum",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "thing",
                  "label": 1,
                  "name": "thing",
                  "number": 10,
                  "oneofIndex": 5,
                  "options": undefined,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".simple.ImportedThing",
                },
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "birthday",
                  "label": 1,
                  "name": "birthday",
                  "number": 12,
                  "oneofIndex": 6,
                  "options": undefined,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".google.type.Date",
                },
              ],
              "name": "SimpleButOptional",
              "nestedType": Array [],
              "oneofDecl": Array [
                Object {
                  "name": "_name",
                  "options": undefined,
                },
                Object {
                  "name": "_age",
                  "options": undefined,
                },
                Object {
                  "name": "_created_at",
                  "options": undefined,
                },
                Object {
                  "name": "_child",
                  "options": undefined,
                },
                Object {
                  "name": "_state",
                  "options": undefined,
                },
                Object {
                  "name": "_thing",
                  "options": undefined,
                },
                Object {
                  "name": "_birthday",
                  "options": undefined,
                },
              ],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [],
              "name": "Empty",
              "nestedType": Array [],
              "oneofDecl": Array [],
              "options": undefined,
              "reservedName": Array [],
              "reservedRange": Array [],
            },
          ],
          "name": "simple.proto",
          "options": undefined,
          "package": "simple",
          "publicDependency": Array [],
          "service": Array [
            Object {
              "method": Array [
                Object {
                  "clientStreaming": false,
                  "inputType": ".simple.PingRequest",
                  "name": "ping",
                  "options": undefined,
                  "outputType": ".simple.PingResponse",
                  "serverStreaming": false,
                },
              ],
              "name": "PingService",
              "options": undefined,
            },
          ],
          "sourceCodeInfo": Object {
            "location": Array [
              Object {
                "leadingComments": " Adding a comment to the syntax will become the first
       comment in the output source file.
      ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  12,
                ],
                "span": Array [
                  2,
                  0,
                  18,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": "* Example comment on the Simple message ",
                "leadingDetachedComments": Array [
                  " This comment is seperated by a blank non-comment line, and will detatch from 
       the following comment on the message Simple.
      ",
                ],
                "path": Array [
                  4,
                  0,
                ],
                "span": Array [
                  13,
                  0,
                  30,
                  1,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": " Name field
      ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  0,
                  2,
                  0,
                ],
                "span": Array [
                  15,
                  2,
                  18,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": " Age ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  0,
                  2,
                  1,
                ],
                "span": Array [
                  17,
                  2,
                  16,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": "",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  0,
                  2,
                  2,
                ],
                "span": Array [
                  18,
                  2,
                  43,
                ],
                "trailingComments": " This comment will also attach
      ",
              },
              Object {
                "leadingComments": " A thing (imported from thing)
      ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  0,
                  2,
                  9,
                ],
                "span": Array [
                  26,
                  2,
                  27,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": " Comment for a nested message */
      ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  2,
                  3,
                  0,
                ],
                "span": Array [
                  54,
                  2,
                  61,
                  3,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": "* For testing proto3's field presence feature. ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  12,
                ],
                "span": Array [
                  133,
                  0,
                  144,
                  1,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": " Name field
      ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  12,
                  2,
                  0,
                ],
                "span": Array [
                  135,
                  2,
                  27,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": " Age ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  12,
                  2,
                  1,
                ],
                "span": Array [
                  137,
                  2,
                  25,
                ],
                "trailingComments": "",
              },
              Object {
                "leadingComments": "",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  12,
                  2,
                  2,
                ],
                "span": Array [
                  138,
                  2,
                  52,
                ],
                "trailingComments": " This comment will also attach
      ",
              },
              Object {
                "leadingComments": " A thing (imported from thing)
      ",
                "leadingDetachedComments": Array [],
                "path": Array [
                  4,
                  12,
                  2,
                  5,
                ],
                "span": Array [
                  142,
                  2,
                  36,
                ],
                "trailingComments": "",
              },
            ],
          },
          "syntax": "proto3",
          "weakDependency": Array [],
        },
        "references": Object {
          ".simple.Child": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.Child.Type": Object {
            "-1": "UNRECOGNIZED",
            "0": "UNKNOWN",
            "1": "GOOD",
            "2": "BAD",
            "BAD": 2,
            "GOOD": 1,
            "UNKNOWN": 0,
            "UNRECOGNIZED": -1,
          },
          ".simple.Empty": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.Entity": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.Nested": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.Nested.InnerEnum": Object {
            "-1": "UNRECOGNIZED",
            "0": "UNKNOWN_INNER",
            "100": "GOOD",
            "1000": "BAD",
            "BAD": 1000,
            "GOOD": 100,
            "UNKNOWN_INNER": 0,
            "UNRECOGNIZED": -1,
          },
          ".simple.Nested.InnerMessage": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.Nested.InnerMessage.DeepMessage": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.Numbers": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.OneOfMessage": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.PingRequest": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.PingResponse": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.PingService": [Function],
          ".simple.Simple": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleButOptional": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithMap": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithMap.EntitiesByIdEntry": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithMap.IntLookupEntry": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithMap.MapOfBytesEntry": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithMap.MapOfTimestampsEntry": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithMap.NameLookupEntry": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithMapOfEnums": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithMapOfEnums.EnumsByIdEntry": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithSnakeCaseMap": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.SimpleWithWrappers": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".simple.StateEnum": Object {
            "-1": "UNRECOGNIZED",
            "0": "UNKNOWN",
            "2": "ON",
            "3": "OFF",
            "OFF": 3,
            "ON": 2,
            "UNKNOWN": 0,
            "UNRECOGNIZED": -1,
          },
        },
      }
    `);
  });
});
