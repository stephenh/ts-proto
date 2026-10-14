import { Wrappers } from "./wrapper-bigint-json";

const wrappers: Wrappers = {
  int64: BigInt("-123"),
  uint64: BigInt("18446744073709551615"),
  int64Map: { a: BigInt("-5") },
  uint64Map: { a: BigInt("18446744073709551615") },
};

const json = {
  int64: "-123",
  uint64: "18446744073709551615",
  int64Map: { a: "-5" },
  uint64Map: { a: "18446744073709551615" },
};

describe("64-bit wrapper types with forceLong=bigint", () => {
  it("writes them as decimal strings in toJSON", () => {
    expect(Wrappers.toJSON(wrappers)).toEqual(json);
  });

  it("reads map values from decimal strings in fromJSON", () => {
    const message = Wrappers.fromJSON(json);
    expect(typeof message.int64Map.a).toEqual("bigint");
    expect(message).toEqual(wrappers);
  });

  it("round-trips through JSON.stringify and the binary format", () => {
    const message = Wrappers.fromJSON(JSON.parse(JSON.stringify(Wrappers.toJSON(wrappers))));
    expect(message).toEqual(wrappers);
    expect(Wrappers.decode(Wrappers.encode(message).finish())).toEqual(wrappers);
  });
});
