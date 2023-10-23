import { Reader } from "protobufjs";
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
      int64: 3,
      uint32: 4,
      uint64: 5,
      sint32: 6,
      sint64: 7,
      fixed32: 8,
      fixed64: 9,
      sfixed32: 10,
      sfixed64: 11,
    };
    expect(simple.int64).toEqual(3);
  });

  it("can decode", () => {
    const s1: INumbers = {
      double: 1,
      float: 2,
      int32: 3,
      int64: 4,
      uint32: 5,
      uint64: 6,
      sint32: 7,
      sint64: 8,
      fixed32: 9,
      fixed64: 10,
      sfixed32: 11,
      sfixed64: 12,
    };
    const s2 = Numbers.decode(Reader.create(PbNumbers.encode(PbNumbers.fromObject(s1)).finish()));
    expect(s2).toEqual(s1);
    expect(typeof s2.uint32).toEqual("number");
    expect(typeof s2.int64).toEqual("number");
    expect(s2.int64).toEqual(4);
  });

  it("can encode", () => {
    const s1: Numbers = {
      double: 1,
      float: 2,
      int32: 3,
      int64: 4,
      uint32: 5,
      uint64: 6,
      sint32: 7,
      sint64: 8,
      fixed32: 9,
      fixed64: 10,
      sfixed32: 11,
      sfixed64: 12,
    };
    const s2 = PbNumbers.toObject(PbNumbers.decode(Numbers.encode(s1).finish()), { longs: Number });
    expect(s2).toEqual({
      ...s1,
      sfixed64: 12,
    });
  });

  it("can decode and fallback to default values", () => {
    const s1: INumbers = {};
    const s2 = Numbers.decode(Reader.create(PbNumbers.encode(PbNumbers.fromObject(s1)).finish()));
    expect(s2.double).toEqual(0);
    expect(s2.float).toEqual(0);
    expect(s2.int32).toEqual(0);
    expect(s2.int64).toEqual(0);
    expect(s2.uint32).toEqual(0);
    expect(s2.uint64).toEqual(0);
    expect(s2.sint32).toEqual(0);
    expect(s2.sint64).toEqual(0);
    expect(s2.fixed32).toEqual(0);
    expect(s2.fixed64).toEqual(0);
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
        "fixed64": 0,
        "float": 0,
        "int32": 0,
        "int64": 0,
        "sfixed32": 0,
        "sfixed64": 0,
        "sint32": 0,
        "sint64": 0,
        "uint32": 0,
        "uint64": 0,
      }
    `);
  });
});
