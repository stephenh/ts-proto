import { Reader } from "protobufjs";
import * as Long from "long";
import { Numbers } from "./simple";
import { simple as pbjs, google } from "./pbjs";
import INumbers = pbjs.INumbers;
import PbNumbers = pbjs.Numbers;
import UInt64Value = google.protobuf.UInt64Value;
import PbTimestamp = google.protobuf.Timestamp;

describe("number", () => {
  it("generates types correctly", () => {
    const simple: Numbers = {
      double: 1,
      float: 2,
      int32: 3,
      int64: "4",
      uint32: 5,
      uint64: "6",
      sint32: 7,
      sint64: "8",
      fixed32: 9,
      fixed64: "10",
      sfixed32: 11,
      sfixed64: "12",
      guint64: "13",
      timestamp: new Date("1970-02-03T04:05:06.0071Z"),
    };
    expect(simple.int64).toEqual("4");
    expect(simple.uint64).toEqual("6");
    expect(simple.guint64).toEqual("13");
    expect(simple.timestamp).toEqual(new Date("1970-02-03T04:05:06.0071Z"));
  });

  it("can decode", () => {
    const s1: INumbers = {
      double: 1,
      float: 2,
      int32: 3,
      int64: Long.fromNumber(4),
      uint32: 5,
      uint64: Long.fromNumber(6, true),
      sint32: 7,
      sint64: Long.fromNumber(8),
      fixed32: 9,
      fixed64: Long.fromNumber(10, true),
      sfixed32: 11,
      sfixed64: Long.fromNumber(12),
      guint64: new UInt64Value({ value: Long.fromNumber(13, true) }),
      timestamp: new PbTimestamp({
        nanos: 7000001,
        seconds: Long.fromNumber(1),
      }),
    };
    const expected: Numbers = {
      double: 1,
      float: 2,
      int32: 3,
      int64: "4",
      uint32: 5,
      uint64: "6",
      sint32: 7,
      sint64: "8",
      fixed32: 9,
      fixed64: "10",
      sfixed32: 11,
      sfixed64: "12",
      guint64: "13",
      timestamp: new Date("1970-01-01T00:00:01.007000001Z"),
    };
    const s2 = Numbers.decode(Reader.create(PbNumbers.encode(PbNumbers.fromObject(s1)).finish()));
    expect(s2).toEqual(expected);
  });

  it("can encode", () => {
    const s1: Numbers = {
      double: 1,
      float: 2,
      int32: 3,
      int64: "4",
      uint32: 5,
      uint64: "6",
      sint32: 7,
      sint64: "8",
      fixed32: 9,
      fixed64: "10",
      sfixed32: 11,
      sfixed64: "12",
      guint64: "13",
      timestamp: new Date("1980-01-01T00:00:01.123Z"),
    };
    const expected: INumbers = {
      double: 1,
      float: 2,
      int32: 3,
      int64: Long.fromNumber(4),
      uint32: 5,
      uint64: Long.fromNumber(6, true),
      sint32: 7,
      sint64: Long.fromNumber(8),
      fixed32: 9,
      fixed64: Long.fromNumber(10, true),
      sfixed32: 11,
      sfixed64: Long.fromNumber(12),
      guint64: new UInt64Value({ value: Long.fromNumber(13, true) }),
      timestamp: new PbTimestamp({
        nanos: 123000000,
        seconds: Long.fromNumber(315532801),
      }),
    };
    const s2 = PbNumbers.toObject(PbNumbers.decode(Numbers.encode(s1).finish()));
    expect(s2).toEqual({
      ...expected,
    });
  });

  it("can decode and fallback to default values", () => {
    const s1: INumbers = {};
    const s2 = Numbers.decode(Reader.create(PbNumbers.encode(PbNumbers.fromObject(s1)).finish()));
    expect(s2.double).toEqual(0);
    expect(s2.float).toEqual(0);
    expect(s2.int32).toEqual(0);
    expect(s2.int64).toEqual("0");
    expect(s2.uint32).toEqual(0);
    expect(s2.uint64).toEqual("0");
    expect(s2.sint32).toEqual(0);
    expect(s2.sint64).toEqual("0");
    expect(s2.fixed32).toEqual(0);
    expect(s2.fixed64).toEqual("0");
    expect(s2.sfixed32).toEqual(0);
    expect(s2.guint64).toEqual(undefined);
    expect(s2.timestamp).toEqual(undefined);
  });

  it("observes how pbjs handles null", () => {
    // the types are in theory only useful for construction
    const s1 = PbNumbers.fromObject({ double: null, float: 1 });
    // as after construction, they return the empty string
    expect(s1.double).toEqual(0);
    const s2 = PbNumbers.decode(PbNumbers.encode(s1).finish());
    expect(s2.double).toEqual(0);
  });

  it("has fromPartial", () => {
    const s1 = Numbers.fromPartial({});
    expect(s1).toMatchInlineSnapshot(`
      {
        "double": 0,
        "fixed32": 0,
        "fixed64": "0",
        "float": 0,
        "guint64": undefined,
        "int32": 0,
        "int64": "0",
        "sfixed32": 0,
        "sfixed64": "0",
        "sint32": 0,
        "sint64": "0",
        "timestamp": undefined,
        "uint32": 0,
        "uint64": "0",
      }
    `);
  });
});
