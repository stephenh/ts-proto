import { protoMetadata } from "./const-enum";

describe("schema-no-file-descriptor", () => {
  test("the property doesn't exist", () => {
    expect(protoMetadata).not.toHaveProperty("fileDescriptor");
    expect(protoMetadata).toHaveProperty("references");
  });
});
