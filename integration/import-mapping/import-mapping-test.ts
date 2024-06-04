import * as path from "node:path";
import * as fs from "node:fs";
import * as ts from "typescript";

describe("import-mapping", () => {
  it("generates imports correctly", () => {
    const generatedPath = path.join(__dirname, "mapping.ts");
    const generatedCode = fs.readFileSync(generatedPath, "utf8");
    const source = ts.createSourceFile(generatedPath, generatedCode, ts.ScriptTarget.ES2018);

    const actualImports = collectImports(source).map((imp) => imp.moduleSpecifier.getText(source).replace(/"/g, ""));
    const expectedImports = [
      "@google/protobuf/duration",
      "@google/protobuf/empty",
      "wkt/google/protobuf/struct",
      "./google/protobuf/timestamp",
      "protobufjs/minimal",
      "@bufbuild/protobuf/wire",
      "@myorg/proto-npm-package",
    ];
    expect(actualImports.sort()).toEqual(expectedImports.sort());

    expect(fs.existsSync(path.join("google", "protobuf", "duration.ts"))).toBeFalsy();
    expect(fs.existsSync(path.join("google", "protobuf", "empty.ts"))).toBeFalsy();
    expect(fs.existsSync(path.join("google", "protobuf", "struct.ts"))).toBeFalsy();
    expect(fs.existsSync(path.join("some", "internal", "repo", "very_private.ts"))).toBeFalsy();
  });
});

function collectImports(node: ts.Node) {
  let nodes: ts.ImportDeclaration[] = [];
  if (isImportDeclaration(node)) {
    nodes.push(node);
  } else {
    node.forEachChild((node) => {
      nodes = [...nodes, ...collectImports(node)];
    });
  }
  return nodes;
}

function isImportDeclaration(node: ts.Node): node is ts.ImportDeclaration {
  return node.kind === ts.SyntaxKind.ImportDeclaration;
}
