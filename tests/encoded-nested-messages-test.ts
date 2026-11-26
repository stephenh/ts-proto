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

// message StatusError { string message = 1; int32 code = 2; }
// message Envelope { repeated StatusError errors = 1; StatusError single = 2; }
const file = FileDescriptorProto.fromPartial({
  name: "encoded_nested.proto",
  package: "encoded_nested",
  syntax: "proto3",
  messageType: [
    {
      name: "StatusError",
      field: [
        {
          name: "message",
          jsonName: "message",
          number: 1,
          type: FieldDescriptorProto_Type.TYPE_STRING,
          label: FieldDescriptorProto_Label.LABEL_OPTIONAL,
        },
        {
          name: "code",
          jsonName: "code",
          number: 2,
          type: FieldDescriptorProto_Type.TYPE_INT32,
          label: FieldDescriptorProto_Label.LABEL_OPTIONAL,
        },
      ],
    },
    {
      name: "Envelope",
      field: [
        {
          name: "errors",
          jsonName: "errors",
          number: 1,
          type: FieldDescriptorProto_Type.TYPE_MESSAGE,
          typeName: ".encoded_nested.StatusError",
          label: FieldDescriptorProto_Label.LABEL_REPEATED,
        },
        {
          name: "single",
          jsonName: "single",
          number: 2,
          type: FieldDescriptorProto_Type.TYPE_MESSAGE,
          typeName: ".encoded_nested.StatusError",
          label: FieldDescriptorProto_Label.LABEL_OPTIONAL,
        },
      ],
    },
  ],
});

const genParams = "useEncodedNestedMessages=true,outputClientImpl=false,outputJsonMethods=false";

function generate(parameter: string): string {
  const options = optionsFromParameter(parameter);
  const request = CodeGeneratorRequest.fromPartial({ protoFile: [file], fileToGenerate: [file.name] });
  const typeMap = createTypeMap(request, options);
  const ctx = { typeMap, options, utils: makeUtils(options), currentFile: createFileContext(file) };
  const [, code] = generateFile(ctx, file);
  return code.toString({ ...getTsPoetOpts(options, "", "", file.name), path: file.name });
}

describe("useEncodedNestedMessages", () => {
  it("parses the option", () => {
    expect(optionsFromParameter("useEncodedNestedMessages=true").useEncodedNestedMessages).toBe(true);
    expect(optionsFromParameter("").useEncodedNestedMessages).toBe(false);
  });

  it("generates EncodedMessage, EncodeInput, encodeBytes, and Uint8Array checks", () => {
    const source = generate(genParams);
    expect(source).toContain("type EncodedMessage<T>");
    expect(source).toContain("type EncodeInput<T>");
    expect(source).toContain("encodeBytes(message: EncodeInput<StatusError>)");
    expect(source).toContain("instanceof Uint8Array");
    expect(source).toMatch(/writer\.uint32\(10\)\.bytes\(v/);
    expect(source).toContain("writer.uint32(18).bytes(message.single)");
  });

  it("does not emit the feature when the option is off", () => {
    const source = generate("outputClientImpl=false,outputJsonMethods=false");
    expect(source).not.toContain("EncodedMessage");
    expect(source).not.toContain("encodeBytes");
    expect(source).not.toContain("instanceof Uint8Array");
  });
});
