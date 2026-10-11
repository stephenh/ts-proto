import Long = require("long");
import { Wrappers } from "./wrapper-long-json";

const wrappers: Wrappers = {
  int64: Long.fromString("-123"),
  uint64: Long.fromString("18446744073709551615", true),
  int64Map: { a: Long.fromString("-5") },
  uint64Map: { a: Long.fromString("18446744073709551615", true) },
};

describe("64-bit wrapper types with forceLong=long", () => {
  it("writes them as decimal strings in toJSON", () => {
    expect(Wrappers.toJSON(wrappers)).toEqual({
      int64: "-123",
      uint64: "18446744073709551615",
      int64Map: { a: "-5" },
      uint64Map: { a: "18446744073709551615" },
    });
  });

  it("reads map values from decimal strings in fromJSON", () => {
    const message = Wrappers.fromJSON({ int64Map: { a: "-5" }, uint64Map: { a: "9007199254740993" } });
    expect(message.int64Map.a).toBeInstanceOf(Long);
    expect(message.int64Map.a?.toString()).toEqual("-5");
    expect(message.uint64Map.a).toBeInstanceOf(Long);
    expect(message.uint64Map.a?.toString()).toEqual("9007199254740993");
  });

  it("round-trips through JSON.stringify and the binary format", () => {
    const json = { int64: "-123", int64Map: { a: "-5" }, uint64Map: { a: "9007199254740993" } };
    const message = Wrappers.fromJSON(JSON.parse(JSON.stringify(json)));
    expect(Wrappers.toJSON(message)).toEqual(json);
    expect(Wrappers.toJSON(Wrappers.decode(Wrappers.encode(message).finish()))).toEqual(json);
  });
});
