import { OptionalsTest } from "./simple";

describe("proto2-optionals", () => {
  it("it compiles", () => {
    require("./simple");
  });

  it("creates a message and correctly doesn't set optional fields", () => {
    const message = OptionalsTest.create();

    const encoded = OptionalsTest.encode(message).finish();
    const decoded = OptionalsTest.decode(encoded);

    // the float default is now on the wire, so it comes back with float32 precision
    expect(decoded).toEqual({ ...message, reqDefvalFloat: expect.closeTo(message.reqDefvalFloat, 5) });
  });
});
