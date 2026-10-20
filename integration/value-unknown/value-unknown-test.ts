import { ValueMessage } from "./value";

describe("useUnknownForValue", () => {
  it("round-trips values typed as unknown", () => {
    const message = ValueMessage.fromJSON({
      value: "Hello",
      anyList: [1, "foo", true],
      repeatedAny: [2, "bar", false],
      structValue: { a: 1, b: [null, "x"] },
    });

    const decoded = ValueMessage.decode(ValueMessage.encode(message).finish());

    expect(decoded).toEqual({
      value: "Hello",
      anyList: [1, "foo", true],
      repeatedAny: [2, "bar", false],
      repeatedStrings: [],
      structValue: { a: 1, b: [null, "x"] },
    });
  });

  it("rejects unknown properties in fromPartial but keeps unknown fields open", () => {
    // Not a fresh literal, so only the `Exact` type can reject the extra key.
    const extra = { value: "Hello", nope: 1 };
    // @ts-expect-error unknown top-level property
    ValueMessage.fromPartial(extra);

    const message = ValueMessage.fromPartial({
      value: { anything: ["goes", 1, null] },
      anyList: [{ a: 1 }, "b"],
      structValue: { c: { d: true } },
    });
    expect(message.value).toEqual({ anything: ["goes", 1, null] });
    expect(message.anyList).toEqual([{ a: 1 }, "b"]);
    expect(message.structValue).toEqual({ c: { d: true } });
  });

  it("makes callers narrow the value before using it", () => {
    const message = ValueMessage.fromPartial({ value: "Hello" });

    // @ts-expect-error `value` is unknown, so it has to be narrowed first.
    expect(() => message.value.toUpperCase()).not.toThrow();

    if (typeof message.value === "string") {
      expect(message.value.toUpperCase()).toBe("HELLO");
    }
  });
});
