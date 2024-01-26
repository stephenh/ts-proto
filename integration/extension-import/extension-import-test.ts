import * as path from "node:path";
import * as fs from "node:fs";
import * as ts from "typescript";

describe('extension-only-files', () => {
  it("generate as external module", () => {
    const generatedPath = path.join(__dirname, "extension.ts");
    const generatedCode = fs.readFileSync(generatedPath, "utf8");
    const source = ts.createSourceFile(generatedPath, generatedCode, ts.ScriptTarget.ES2018);

    expect(ts.isExternalModule(source)).toBe(true);
  })
});
