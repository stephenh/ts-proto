import { protoMetadata } from './simple';

describe('simple', () => {
  it('generates types correctly', () => {
    expect(protoMetadata).toMatchInlineSnapshot(`
      Object {
        "dependencies": Array [
          Object {
            "dependencies": Array [],
            "fileDescriptor": Object {
              "messageType": Array [
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "year",
                      "label": 1,
                      "name": "year",
                      "number": 1,
                      "type": 5,
                    },
                    Object {
                      "jsonName": "month",
                      "label": 1,
                      "name": "month",
                      "number": 2,
                      "type": 5,
                    },
                    Object {
                      "jsonName": "day",
                      "label": 1,
                      "name": "day",
                      "number": 3,
                      "type": 5,
                    },
                  ],
                  "name": "Date",
                },
              ],
              "name": "google/type/date.proto",
              "options": Object {
                "ccEnableArenas": true,
                "goPackage": "google.golang.org/genproto/googleapis/type/date;date",
                "javaMultipleFiles": true,
                "javaOuterClassname": "DateProto",
                "javaPackage": "com.google.type",
                "objcClassPrefix": "GTP",
              },
              "package": "google.type",
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
                  },
                  Object {
                    "leadingComments": " Year of date. Must be from 1 to 9999, or 0 if specifying a date without
       a year.
      ",
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
                  },
                  Object {
                    "leadingComments": " Month of year. Must be from 1 to 12, or 0 if specifying a year without a
       month and day.
      ",
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
                  },
                  Object {
                    "leadingComments": " Day of month. Must be from 1 to 31 and valid for the year and month, or 0
       if specifying a year by itself or a year and month where the day is not
       significant.
      ",
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
                  },
                ],
              },
              "syntax": "proto3",
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
              "messageType": Array [
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 1,
                    },
                  ],
                  "name": "DoubleValue",
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 2,
                    },
                  ],
                  "name": "FloatValue",
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 3,
                    },
                  ],
                  "name": "Int64Value",
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 4,
                    },
                  ],
                  "name": "UInt64Value",
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 5,
                    },
                  ],
                  "name": "Int32Value",
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 13,
                    },
                  ],
                  "name": "UInt32Value",
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 8,
                    },
                  ],
                  "name": "BoolValue",
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 9,
                    },
                  ],
                  "name": "StringValue",
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 1,
                      "type": 12,
                    },
                  ],
                  "name": "BytesValue",
                },
              ],
              "name": "google/protobuf/wrappers.proto",
              "options": Object {
                "ccEnableArenas": true,
                "csharpNamespace": "Google.Protobuf.WellKnownTypes",
                "goPackage": "github.com/golang/protobuf/ptypes/wrappers",
                "javaMultipleFiles": true,
                "javaOuterClassname": "WrappersProto",
                "javaPackage": "com.google.protobuf",
                "objcClassPrefix": "GPB",
              },
              "package": "google.protobuf",
              "sourceCodeInfo": Object {
                "location": Array [
                  Object {
                    "leadingComments": " Wrapper message for \`double\`.

       The JSON representation for \`DoubleValue\` is JSON number.
      ",
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
                  },
                  Object {
                    "leadingComments": " The double value.
      ",
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
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`float\`.

       The JSON representation for \`FloatValue\` is JSON number.
      ",
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
                  },
                  Object {
                    "leadingComments": " The float value.
      ",
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
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`int64\`.

       The JSON representation for \`Int64Value\` is JSON string.
      ",
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
                  },
                  Object {
                    "leadingComments": " The int64 value.
      ",
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
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`uint64\`.

       The JSON representation for \`UInt64Value\` is JSON string.
      ",
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
                  },
                  Object {
                    "leadingComments": " The uint64 value.
      ",
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
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`int32\`.

       The JSON representation for \`Int32Value\` is JSON number.
      ",
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
                  },
                  Object {
                    "leadingComments": " The int32 value.
      ",
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
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`uint32\`.

       The JSON representation for \`UInt32Value\` is JSON number.
      ",
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
                  },
                  Object {
                    "leadingComments": " The uint32 value.
      ",
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
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`bool\`.

       The JSON representation for \`BoolValue\` is JSON \`true\` and \`false\`.
      ",
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
                  },
                  Object {
                    "leadingComments": " The bool value.
      ",
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
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`string\`.

       The JSON representation for \`StringValue\` is JSON string.
      ",
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
                  },
                  Object {
                    "leadingComments": " The string value.
      ",
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
                  },
                  Object {
                    "leadingComments": " Wrapper message for \`bytes\`.

       The JSON representation for \`BytesValue\` is JSON string.
      ",
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
                  },
                  Object {
                    "leadingComments": " The bytes value.
      ",
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
                  },
                ],
              },
              "syntax": "proto3",
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
              "messageType": Array [
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "seconds",
                      "label": 1,
                      "name": "seconds",
                      "number": 1,
                      "type": 3,
                    },
                    Object {
                      "jsonName": "nanos",
                      "label": 1,
                      "name": "nanos",
                      "number": 2,
                      "type": 5,
                    },
                  ],
                  "name": "Timestamp",
                },
              ],
              "name": "google/protobuf/timestamp.proto",
              "options": Object {
                "ccEnableArenas": true,
                "csharpNamespace": "Google.Protobuf.WellKnownTypes",
                "goPackage": "github.com/golang/protobuf/ptypes/timestamp",
                "javaMultipleFiles": true,
                "javaOuterClassname": "TimestampProto",
                "javaPackage": "com.google.protobuf",
                "objcClassPrefix": "GPB",
              },
              "package": "google.protobuf",
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


       Example 5: Compute Timestamp from current time in Python.

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
                    "path": Array [
                      4,
                      0,
                    ],
                    "span": Array [
                      126,
                      0,
                      137,
                      1,
                    ],
                  },
                  Object {
                    "leadingComments": " Represents seconds of UTC time since Unix epoch
       1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
       9999-12-31T23:59:59Z inclusive.
      ",
                    "path": Array [
                      4,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      130,
                      2,
                      20,
                    ],
                  },
                  Object {
                    "leadingComments": " Non-negative fractions of a second at nanosecond resolution. Negative
       second values with fractions must still have non-negative nanos values
       that count forward in time. Must be from 0 to 999,999,999
       inclusive.
      ",
                    "path": Array [
                      4,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      136,
                      2,
                      18,
                    ],
                  },
                ],
              },
              "syntax": "proto3",
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
                  "messageType": Array [
                    Object {
                      "field": Array [
                        Object {
                          "jsonName": "seconds",
                          "label": 1,
                          "name": "seconds",
                          "number": 1,
                          "type": 3,
                        },
                        Object {
                          "jsonName": "nanos",
                          "label": 1,
                          "name": "nanos",
                          "number": 2,
                          "type": 5,
                        },
                      ],
                      "name": "Timestamp",
                    },
                  ],
                  "name": "google/protobuf/timestamp.proto",
                  "options": Object {
                    "ccEnableArenas": true,
                    "csharpNamespace": "Google.Protobuf.WellKnownTypes",
                    "goPackage": "github.com/golang/protobuf/ptypes/timestamp",
                    "javaMultipleFiles": true,
                    "javaOuterClassname": "TimestampProto",
                    "javaPackage": "com.google.protobuf",
                    "objcClassPrefix": "GPB",
                  },
                  "package": "google.protobuf",
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


       Example 5: Compute Timestamp from current time in Python.

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
                        "path": Array [
                          4,
                          0,
                        ],
                        "span": Array [
                          126,
                          0,
                          137,
                          1,
                        ],
                      },
                      Object {
                        "leadingComments": " Represents seconds of UTC time since Unix epoch
       1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
       9999-12-31T23:59:59Z inclusive.
      ",
                        "path": Array [
                          4,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          130,
                          2,
                          20,
                        ],
                      },
                      Object {
                        "leadingComments": " Non-negative fractions of a second at nanosecond resolution. Negative
       second values with fractions must still have non-negative nanos values
       that count forward in time. Must be from 0 to 999,999,999
       inclusive.
      ",
                        "path": Array [
                          4,
                          0,
                          2,
                          1,
                        ],
                        "span": Array [
                          136,
                          2,
                          18,
                        ],
                      },
                    ],
                  },
                  "syntax": "proto3",
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
              "messageType": Array [
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "createdAt",
                      "label": 1,
                      "name": "created_at",
                      "number": 1,
                      "type": 11,
                      "typeName": ".google.protobuf.Timestamp",
                    },
                  ],
                  "name": "ImportedThing",
                },
              ],
              "name": "import_dir/thing.proto",
              "package": "simple",
              "sourceCodeInfo": Object {
                "location": Array [],
              },
              "syntax": "proto3",
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
              "value": Array [
                Object {
                  "name": "UNKNOWN",
                  "number": 0,
                },
                Object {
                  "name": "ON",
                  "number": 2,
                },
                Object {
                  "name": "OFF",
                  "number": 3,
                },
              ],
            },
          ],
          "messageType": Array [
            Object {
              "field": Array [
                Object {
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "type": 9,
                },
                Object {
                  "jsonName": "age",
                  "label": 1,
                  "name": "age",
                  "number": 2,
                  "type": 5,
                },
                Object {
                  "jsonName": "createdAt",
                  "label": 1,
                  "name": "created_at",
                  "number": 9,
                  "type": 11,
                  "typeName": ".google.protobuf.Timestamp",
                },
                Object {
                  "jsonName": "child",
                  "label": 1,
                  "name": "child",
                  "number": 3,
                  "type": 11,
                  "typeName": ".simple.Child",
                },
                Object {
                  "jsonName": "state",
                  "label": 1,
                  "name": "state",
                  "number": 4,
                  "type": 14,
                  "typeName": ".simple.StateEnum",
                },
                Object {
                  "jsonName": "grandChildren",
                  "label": 3,
                  "name": "grand_children",
                  "number": 5,
                  "type": 11,
                  "typeName": ".simple.Child",
                },
                Object {
                  "jsonName": "coins",
                  "label": 3,
                  "name": "coins",
                  "number": 6,
                  "type": 5,
                },
                Object {
                  "jsonName": "snacks",
                  "label": 3,
                  "name": "snacks",
                  "number": 7,
                  "type": 9,
                },
                Object {
                  "jsonName": "oldStates",
                  "label": 3,
                  "name": "old_states",
                  "number": 8,
                  "type": 14,
                  "typeName": ".simple.StateEnum",
                },
                Object {
                  "jsonName": "thing",
                  "label": 1,
                  "name": "thing",
                  "number": 10,
                  "type": 11,
                  "typeName": ".simple.ImportedThing",
                },
                Object {
                  "jsonName": "blobs",
                  "label": 3,
                  "name": "blobs",
                  "number": 11,
                  "type": 12,
                },
                Object {
                  "jsonName": "birthday",
                  "label": 1,
                  "name": "birthday",
                  "number": 12,
                  "type": 11,
                  "typeName": ".google.type.Date",
                },
                Object {
                  "jsonName": "blob",
                  "label": 1,
                  "name": "blob",
                  "number": 13,
                  "type": 12,
                },
              ],
              "name": "Simple",
            },
            Object {
              "enumType": Array [
                Object {
                  "name": "Type",
                  "value": Array [
                    Object {
                      "name": "UNKNOWN",
                      "number": 0,
                    },
                    Object {
                      "name": "GOOD",
                      "number": 1,
                    },
                    Object {
                      "name": "BAD",
                      "number": 2,
                    },
                  ],
                },
              ],
              "field": Array [
                Object {
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "type": 9,
                },
                Object {
                  "jsonName": "type",
                  "label": 1,
                  "name": "type",
                  "number": 2,
                  "type": 14,
                  "typeName": ".simple.Child.Type",
                },
              ],
              "name": "Child",
            },
            Object {
              "enumType": Array [
                Object {
                  "name": "InnerEnum",
                  "value": Array [
                    Object {
                      "name": "UNKNOWN_INNER",
                      "number": 0,
                    },
                    Object {
                      "name": "GOOD",
                      "number": 100,
                    },
                    Object {
                      "name": "BAD",
                      "number": 1000,
                    },
                  ],
                },
              ],
              "field": Array [
                Object {
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "type": 9,
                },
                Object {
                  "jsonName": "message",
                  "label": 1,
                  "name": "message",
                  "number": 2,
                  "type": 11,
                  "typeName": ".simple.Nested.InnerMessage",
                },
                Object {
                  "jsonName": "state",
                  "label": 1,
                  "name": "state",
                  "number": 3,
                  "type": 14,
                  "typeName": ".simple.Nested.InnerEnum",
                },
              ],
              "name": "Nested",
              "nestedType": Array [
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "type": 9,
                    },
                    Object {
                      "jsonName": "deep",
                      "label": 1,
                      "name": "deep",
                      "number": 2,
                      "type": 11,
                      "typeName": ".simple.Nested.InnerMessage.DeepMessage",
                    },
                  ],
                  "name": "InnerMessage",
                  "nestedType": Array [
                    Object {
                      "field": Array [
                        Object {
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "type": 9,
                        },
                      ],
                      "name": "DeepMessage",
                    },
                  ],
                },
              ],
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "first",
                  "label": 1,
                  "name": "first",
                  "number": 1,
                  "oneofIndex": 0,
                  "type": 9,
                },
                Object {
                  "jsonName": "last",
                  "label": 1,
                  "name": "last",
                  "number": 2,
                  "oneofIndex": 0,
                  "type": 9,
                },
              ],
              "name": "OneOfMessage",
              "oneofDecl": Array [
                Object {
                  "name": "name_fields",
                },
              ],
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "type": 11,
                  "typeName": ".google.protobuf.StringValue",
                },
                Object {
                  "jsonName": "age",
                  "label": 1,
                  "name": "age",
                  "number": 2,
                  "type": 11,
                  "typeName": ".google.protobuf.Int32Value",
                },
                Object {
                  "jsonName": "enabled",
                  "label": 1,
                  "name": "enabled",
                  "number": 3,
                  "type": 11,
                  "typeName": ".google.protobuf.BoolValue",
                },
                Object {
                  "jsonName": "coins",
                  "label": 3,
                  "name": "coins",
                  "number": 6,
                  "type": 11,
                  "typeName": ".google.protobuf.Int32Value",
                },
                Object {
                  "jsonName": "snacks",
                  "label": 3,
                  "name": "snacks",
                  "number": 7,
                  "type": 11,
                  "typeName": ".google.protobuf.StringValue",
                },
              ],
              "name": "SimpleWithWrappers",
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "id",
                  "label": 1,
                  "name": "id",
                  "number": 1,
                  "type": 5,
                },
              ],
              "name": "Entity",
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "entitiesById",
                  "label": 3,
                  "name": "entitiesById",
                  "number": 1,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.EntitiesByIdEntry",
                },
                Object {
                  "jsonName": "nameLookup",
                  "label": 3,
                  "name": "nameLookup",
                  "number": 2,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.NameLookupEntry",
                },
                Object {
                  "jsonName": "intLookup",
                  "label": 3,
                  "name": "intLookup",
                  "number": 3,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.IntLookupEntry",
                },
                Object {
                  "jsonName": "mapOfTimestamps",
                  "label": 3,
                  "name": "mapOfTimestamps",
                  "number": 4,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.MapOfTimestampsEntry",
                },
                Object {
                  "jsonName": "mapOfBytes",
                  "label": 3,
                  "name": "mapOfBytes",
                  "number": 5,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMap.MapOfBytesEntry",
                },
              ],
              "name": "SimpleWithMap",
              "nestedType": Array [
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "type": 5,
                    },
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "type": 11,
                      "typeName": ".simple.Entity",
                    },
                  ],
                  "name": "EntitiesByIdEntry",
                  "options": Object {
                    "mapEntry": true,
                  },
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "type": 9,
                    },
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "type": 9,
                    },
                  ],
                  "name": "NameLookupEntry",
                  "options": Object {
                    "mapEntry": true,
                  },
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "type": 5,
                    },
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "type": 5,
                    },
                  ],
                  "name": "IntLookupEntry",
                  "options": Object {
                    "mapEntry": true,
                  },
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "type": 9,
                    },
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "type": 11,
                      "typeName": ".google.protobuf.Timestamp",
                    },
                  ],
                  "name": "MapOfTimestampsEntry",
                  "options": Object {
                    "mapEntry": true,
                  },
                },
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "type": 9,
                    },
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "type": 12,
                    },
                  ],
                  "name": "MapOfBytesEntry",
                  "options": Object {
                    "mapEntry": true,
                  },
                },
              ],
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "entitiesById",
                  "label": 3,
                  "name": "entities_by_id",
                  "number": 1,
                  "type": 11,
                  "typeName": ".simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry",
                },
              ],
              "name": "SimpleWithSnakeCaseMap",
              "nestedType": Array [
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "type": 5,
                    },
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "type": 11,
                      "typeName": ".simple.Entity",
                    },
                  ],
                  "name": "EntitiesByIdEntry",
                  "options": Object {
                    "mapEntry": true,
                  },
                },
              ],
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "enumsById",
                  "label": 3,
                  "name": "enums_by_id",
                  "number": 1,
                  "type": 11,
                  "typeName": ".simple.SimpleWithMapOfEnums.EnumsByIdEntry",
                },
              ],
              "name": "SimpleWithMapOfEnums",
              "nestedType": Array [
                Object {
                  "field": Array [
                    Object {
                      "jsonName": "key",
                      "label": 1,
                      "name": "key",
                      "number": 1,
                      "type": 5,
                    },
                    Object {
                      "jsonName": "value",
                      "label": 1,
                      "name": "value",
                      "number": 2,
                      "type": 14,
                      "typeName": ".simple.StateEnum",
                    },
                  ],
                  "name": "EnumsByIdEntry",
                  "options": Object {
                    "mapEntry": true,
                  },
                },
              ],
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "input",
                  "label": 1,
                  "name": "input",
                  "number": 1,
                  "type": 9,
                },
              ],
              "name": "PingRequest",
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "output",
                  "label": 1,
                  "name": "output",
                  "number": 1,
                  "type": 9,
                },
              ],
              "name": "PingResponse",
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "double",
                  "label": 1,
                  "name": "double",
                  "number": 1,
                  "type": 1,
                },
                Object {
                  "jsonName": "float",
                  "label": 1,
                  "name": "float",
                  "number": 2,
                  "type": 2,
                },
                Object {
                  "jsonName": "int32",
                  "label": 1,
                  "name": "int32",
                  "number": 3,
                  "type": 5,
                },
                Object {
                  "jsonName": "int64",
                  "label": 1,
                  "name": "int64",
                  "number": 4,
                  "type": 3,
                },
                Object {
                  "jsonName": "uint32",
                  "label": 1,
                  "name": "uint32",
                  "number": 5,
                  "type": 13,
                },
                Object {
                  "jsonName": "uint64",
                  "label": 1,
                  "name": "uint64",
                  "number": 6,
                  "type": 4,
                },
                Object {
                  "jsonName": "sint32",
                  "label": 1,
                  "name": "sint32",
                  "number": 7,
                  "type": 17,
                },
                Object {
                  "jsonName": "sint64",
                  "label": 1,
                  "name": "sint64",
                  "number": 8,
                  "type": 18,
                },
                Object {
                  "jsonName": "fixed32",
                  "label": 1,
                  "name": "fixed32",
                  "number": 9,
                  "type": 7,
                },
                Object {
                  "jsonName": "fixed64",
                  "label": 1,
                  "name": "fixed64",
                  "number": 10,
                  "type": 6,
                },
                Object {
                  "jsonName": "sfixed32",
                  "label": 1,
                  "name": "sfixed32",
                  "number": 11,
                  "type": 15,
                },
                Object {
                  "jsonName": "sfixed64",
                  "label": 1,
                  "name": "sfixed64",
                  "number": 12,
                  "type": 16,
                },
              ],
              "name": "Numbers",
            },
            Object {
              "field": Array [
                Object {
                  "jsonName": "name",
                  "label": 1,
                  "name": "name",
                  "number": 1,
                  "oneofIndex": 0,
                  "proto3Optional": true,
                  "type": 9,
                },
                Object {
                  "jsonName": "age",
                  "label": 1,
                  "name": "age",
                  "number": 2,
                  "oneofIndex": 1,
                  "proto3Optional": true,
                  "type": 5,
                },
                Object {
                  "jsonName": "createdAt",
                  "label": 1,
                  "name": "created_at",
                  "number": 9,
                  "oneofIndex": 2,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".google.protobuf.Timestamp",
                },
                Object {
                  "jsonName": "child",
                  "label": 1,
                  "name": "child",
                  "number": 3,
                  "oneofIndex": 3,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".simple.Child",
                },
                Object {
                  "jsonName": "state",
                  "label": 1,
                  "name": "state",
                  "number": 4,
                  "oneofIndex": 4,
                  "proto3Optional": true,
                  "type": 14,
                  "typeName": ".simple.StateEnum",
                },
                Object {
                  "jsonName": "thing",
                  "label": 1,
                  "name": "thing",
                  "number": 10,
                  "oneofIndex": 5,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".simple.ImportedThing",
                },
                Object {
                  "jsonName": "birthday",
                  "label": 1,
                  "name": "birthday",
                  "number": 12,
                  "oneofIndex": 6,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".google.type.Date",
                },
              ],
              "name": "SimpleButOptional",
              "oneofDecl": Array [
                Object {
                  "name": "_name",
                },
                Object {
                  "name": "_age",
                },
                Object {
                  "name": "_created_at",
                },
                Object {
                  "name": "_child",
                },
                Object {
                  "name": "_state",
                },
                Object {
                  "name": "_thing",
                },
                Object {
                  "name": "_birthday",
                },
              ],
            },
            Object {
              "name": "Empty",
            },
          ],
          "name": "simple.proto",
          "package": "simple",
          "service": Array [
            Object {
              "method": Array [
                Object {
                  "inputType": ".simple.PingRequest",
                  "name": "ping",
                  "outputType": ".simple.PingResponse",
                },
              ],
              "name": "PingService",
            },
          ],
          "sourceCodeInfo": Object {
            "location": Array [
              Object {
                "leadingComments": " Adding a comment to the syntax will become the first
       comment in the output source file.
      ",
                "path": Array [
                  12,
                ],
                "span": Array [
                  2,
                  0,
                  18,
                ],
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
              },
              Object {
                "leadingComments": " Name field
      ",
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
              },
              Object {
                "leadingComments": " Age ",
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
              },
              Object {
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
              },
              Object {
                "leadingComments": " Comment for a nested message */
      ",
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
              },
              Object {
                "leadingComments": "* For testing proto3's field presence feature. ",
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
              },
              Object {
                "leadingComments": " Name field
      ",
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
              },
              Object {
                "leadingComments": " Age ",
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
              },
              Object {
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
              },
            ],
          },
          "syntax": "proto3",
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
