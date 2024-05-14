import { protoMetadata } from "./options";

describe("options", () => {
  it("compiles", () => {
    expect(protoMetadata).not.toBeUndefined();
  });

  it("has the right options", () => {
    expect(protoMetadata.options?.messages?.["MyMessage"]?.options?.["my_message_option"]).toBe(1234);
  });
});
