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

  it("makes callers narrow the value before using it", () => {
    const message = ValueMessage.fromPartial({ value: "Hello" });

    // @ts-expect-error `value` is unknown, so it has to be narrowed first.
    expect(() => message.value.toUpperCase()).not.toThrow();

    if (typeof message.value === "string") {
      expect(message.value.toUpperCase()).toBe("HELLO");
    }
  });
});
