import { Reader } from "protobufjs";
import Long = require("long");
import { Numbers } from "./simple";
import { simple as pbjs } from "./pbjs";
import INumbers = pbjs.INumbers;
import PbNumbers = pbjs.Numbers;

describe("number", () => {
  it("generates types correctly", () => {
    const simple: Numbers = {
      double: 0,
      float: 1,
      int32: 2,
      int64: Long.fromNumber(3),
      uint32: 4,
      uint64: Long.fromNumber(5, true),
      sint32: 6,
      sint64: Long.fromNumber(7),
      fixed32: 8,
      fixed64: Long.fromNumber(9, true),
      sfixed32: 10,
      sfixed64: Long.fromNumber(11),
      manyUint64: [Long.fromNumber(5, true)],
    };
    expect(simple.int64).toEqual(Long.fromNumber(3));
    expect(simple.uint64).toEqual(Long.fromNumber(5, true));
  });

  it("can decode", () => {
    const s1: INumbers = {
      double: 0,
      float: 1,
      int32: 2,
      int64: Long.fromNumber(3),
      uint32: 4,
      uint64: Long.fromNumber(5, true),
      sint32: 6,
      sint64: Long.fromNumber(7),
      fixed32: 8,
      fixed64: Long.fromNumber(9, true),
      sfixed32: 10,
      sfixed64: Long.fromNumber(11),
      manyUint64: [Long.fromNumber(12, true)],
    };
    const s2 = Numbers.decode(Reader.create(PbNumbers.encode(PbNumbers.fromObject(s1)).finish()));
    expect(s2).toEqual(s1);
  });

  it("can encode", () => {
    const s1: Numbers = {
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
      manyUint64: [Long.fromNumber(13, true)],
    };
    const s2 = PbNumbers.toObject(PbNumbers.decode(Numbers.encode(s1).finish()));
    expect(s2).toEqual({
      ...s1,
    });
  });

  it("can decode and fallback to default values", () => {
    const s1: INumbers = {};
    const s2 = Numbers.decode(Reader.create(PbNumbers.encode(PbNumbers.fromObject(s1)).finish()));
    expect(s2.double).toEqual(0);
    expect(s2.float).toEqual(0);
    expect(s2.int32).toEqual(0);
    expect(s2.int64).toEqual(Long.ZERO);
    expect(s2.uint32).toEqual(0);
    expect(s2.uint64).toEqual(Long.UZERO);
    expect(s2.sint32).toEqual(0);
    expect(s2.sint64).toEqual(Long.ZERO);
    expect(s2.fixed32).toEqual(0);
    expect(s2.fixed64).toEqual(Long.UZERO);
    expect(s2.sfixed32).toEqual(0);
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
        "fixed64": Long {
          "high": 0,
          "low": 0,
          "unsigned": true,
        },
        "float": 0,
        "int32": 0,
        "int64": Long {
          "high": 0,
          "low": 0,
          "unsigned": false,
        },
        "manyUint64": [],
        "sfixed32": 0,
        "sfixed64": Long {
          "high": 0,
          "low": 0,
          "unsigned": false,
        },
        "sint32": 0,
        "sint64": Long {
          "high": 0,
          "low": 0,
          "unsigned": false,
        },
        "uint32": 0,
        "uint64": Long {
          "high": 0,
          "low": 0,
          "unsigned": true,
        },
      }
    `);
  });
});
