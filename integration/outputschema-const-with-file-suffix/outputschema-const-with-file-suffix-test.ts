import { protoMetadata as protoMetadataA } from "./a.server";
import { protoMetadata as protoMetadataB } from "./b.server";

describe("outputSchema=const with fileSuffix", () => {
  it("imports protoMetadata from correct file with suffix", () => {
    expect(protoMetadataA.dependencies).toBeDefined();
    expect(protoMetadataA.dependencies.length).toBe(1);

    expect(protoMetadataA.dependencies[0]).toBe(protoMetadataB);
  });

  it("generates correct references in protoMetadata", () => {
    expect(protoMetadataA.references).toBeDefined();
    expect(protoMetadataA.references[".test.TestMsg"]).toBeDefined();

    expect(protoMetadataB.references).toBeDefined();
    expect(protoMetadataB.references[".test.EnumTest"]).toBeDefined();
    expect(protoMetadataB.references[".test.MessageTest"]).toBeDefined();
  });

  it("generates const metadata with correct type", () => {
    const testMsgName: "TestMsg" = protoMetadataA.fileDescriptor.messageType[0].name;
    expect(testMsgName).toBe("TestMsg");

    const enumName: "EnumTest" = protoMetadataB.fileDescriptor.enumType[0].name;
    expect(enumName).toBe("EnumTest");
  });
});
