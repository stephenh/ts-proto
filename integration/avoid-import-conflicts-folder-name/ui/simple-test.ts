import { SimpleEnums } from "./simple";

describe("avoid-import-conflicts-folder-name", () => {
  it("compiles", () => {
    expect(SimpleEnums).not.toBeUndefined();
  });
});
