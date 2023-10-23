import { Object, Error, String, Boolean, Number, Array } from "./global-this";

describe("global-this", () => {
  it("generates types correctly", () => {
    Object.fromPartial({});
    Error.fromPartial({});
    String.fromPartial({});
    Boolean.fromPartial({});
    Number.fromPartial({});
    Array.fromPartial({});
  });
});
