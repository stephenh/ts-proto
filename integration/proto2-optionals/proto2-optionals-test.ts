import { Simple } from "./simple";

describe("proto2-optionals", () => {
  it("it compiles", () => {
    require("./simple");
  });

  it("creates a message and correctly doesn't set optional fields", () => {
    const message = Simple.create({
      name: "john",
    });

    const encoded = Simple.encode(message).finish();
    const decoded = Simple.decode(encoded);
  });
});
