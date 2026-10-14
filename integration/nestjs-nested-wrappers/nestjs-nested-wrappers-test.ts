import * as path from "path";
import * as ts from "typescript";
import { wrappers } from "protobufjs";

describe("nestjs-nested-wrappers-test", () => {
  it("registers wrappers for nested protobuf well-known types", () => {
    delete wrappers[".google.protobuf.Timestamp"];
    delete wrappers[".google.protobuf.Struct"];

    require("./hero");

    expect(wrappers[".google.protobuf.Timestamp"]).toBeDefined();
    expect(wrappers[".google.protobuf.Struct"]).toBeDefined();
  });

  it("does not generate unused code for the Struct wrappers", () => {
    const program = ts.createProgram([path.join(__dirname, "google/protobuf/struct.ts")], {
      noEmit: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      skipLibCheck: true,
      strict: true,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      types: [],
    });
    const diagnostics = ts
      .getPreEmitDiagnostics(program)
      .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));

    expect(diagnostics).toEqual([]);
  });
});
