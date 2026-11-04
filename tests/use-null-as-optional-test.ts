import * as ts from "typescript";
import {
  CodeGeneratorRequest,
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FileDescriptorProto,
} from "ts-proto-descriptors";
import { createFileContext } from "../src/context";
import { generateFile, makeUtils } from "../src/main";
import { getTsPoetOpts, optionsFromParameter } from "../src/options";
import { createTypeMap } from "../src/types";

// message Data { optional string view = 1; }
// message Response { Data data = 1; }
const file = FileDescriptorProto.fromPartial({
  name: "nested.proto",
  package: "nested",
  syntax: "proto3",
  messageType: [
    {
      name: "Data",
      oneofDecl: [{ name: "_view" }],
      field: [
        {
          name: "view",
          jsonName: "view",
          number: 1,
          type: FieldDescriptorProto_Type.TYPE_STRING,
          label: FieldDescriptorProto_Label.LABEL_OPTIONAL,
          oneofIndex: 0,
          proto3Optional: true,
        },
      ],
    },
    {
      name: "Response",
      field: [
        {
          name: "data",
          jsonName: "data",
          number: 1,
          type: FieldDescriptorProto_Type.TYPE_MESSAGE,
          typeName: ".nested.Data",
          label: FieldDescriptorProto_Label.LABEL_OPTIONAL,
        },
      ],
    },
  ],
});

function generate(parameter: string): string {
  const options = optionsFromParameter(parameter);
  const request = CodeGeneratorRequest.fromPartial({ protoFile: [file], fileToGenerate: [file.name] });
  const typeMap = createTypeMap(request, options);
  const ctx = { typeMap, options, utils: makeUtils(options), currentFile: createFileContext(file) };
  const [path, code] = generateFile(ctx, file);
  return code.toString({ ...getTsPoetOpts(options, "", "", file.name), path });
}

function compileErrors(source: string): string[] {
  const fileName = "nested.ts";
  const compilerOptions: ts.CompilerOptions = {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    types: [],
  };
  const host = ts.createCompilerHost(compilerOptions);
  const { getSourceFile, fileExists, readFile } = host;
  host.getSourceFile = (name, languageVersion) =>
    name === fileName ? ts.createSourceFile(name, source, languageVersion) : getSourceFile(name, languageVersion);
  host.fileExists = (name) => name === fileName || fileExists(name);
  host.readFile = (name) => (name === fileName ? source : readFile(name));

  const program = ts.createProgram([fileName], compilerOptions, host);
  return ts.getPreEmitDiagnostics(program).map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
}

describe("useNullAsOptional", () => {
  it("generates a nested fromPartial that compiles when a nested message has an optional field", () => {
    const source = generate("useNullAsOptional=true");
    expect(source).toContain("Data.fromPartial(object.data)");
    expect(compileErrors(source)).toEqual([]);
  });

  it("accepts null for an optional field in fromPartial", () => {
    const source = generate("useNullAsOptional=true");
    const calls = "Data.fromPartial({ view: null });\nResponse.fromPartial({ data: { view: null } });";
    expect(compileErrors(`${source}\n${calls}`)).toEqual([]);
  });

  it("still rejects properties that are not on the message", () => {
    const source = generate("useNullAsOptional=true");
    const errors = compileErrors(`${source}\nData.fromPartial({ view: null, other: 1 });`);
    expect(errors.join("\n")).toContain("Type 'number' is not assignable to type 'never'");
  });
});
