import { readFileSync } from "fs";
import { join } from "path";
import { String } from "./global-this-node";

describe("global-this-node", () => {
  it("only looks for the node globals", () => {
    const source = readFileSync(join(__dirname, "global-this-node.ts"), "utf8");
    expect(source).toContain("const gt: any");
    expect(source).not.toContain("window");
    expect(source).not.toContain("self");
  });

  it("uses the polyfill", () => {
    const message = String.fromJSON({ value: "test" });
    expect(message).toEqual({ value: "test" });
    expect(String.toJSON(message)).toEqual({ value: "test" });
  });
});
