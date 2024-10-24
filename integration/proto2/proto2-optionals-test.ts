import { OptionalsTest, OptionalsTest_TranslationsEntry } from "./simple";

describe("proto2-optionals", () => {
  it("it compiles", () => {
    require("./simple");
  });

  it("creates a message and correctly doesn't set optional fields", () => {
    const message = OptionalsTest.create();

    const encoded = OptionalsTest.encode(message).finish();
    const decoded = OptionalsTest.decode(encoded);

    expect(decoded).toEqual(message);
  });

  it("throws an error if fromJSON is called without providing all required fields", () => {
    expect(() => {
      OptionalsTest.fromJSON({});
    }).toThrow("Required field OptionalsTest.reqId is not set");
  });

  it("does not throw an error when using fromPartial and assigns the correct default value", () => {
    const message = OptionalsTest.fromPartial({});
    expect(message.reqId).toBe(0);
    expect(message.reqDefvalId).toBe(100);
  });

  it("assigns key-value pairs a defined default value even though technically they are optional", () => {
    const message = OptionalsTest_TranslationsEntry.create();
    expect(message).toEqual({ key: "", value: "" });
  });
});
