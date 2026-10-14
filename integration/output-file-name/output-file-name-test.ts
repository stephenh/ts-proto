import { Outer, protobufFileName, protobufPackage } from "./file-name";
import { protobufFileName as innerFileName } from "./sub/other";

describe("outputFileName", () => {
  it("exports the source .proto path next to the package", () => {
    expect(protobufPackage).toBe("outputfilename");
    expect(protobufFileName).toBe("file-name.proto");
    expect(innerFileName).toBe("sub/other.proto");
  });

  it("still generates the messages", () => {
    const outer = Outer.fromPartial({ inner: { name: "a" } });
    expect(Outer.decode(Outer.encode(outer).finish())).toEqual(outer);
  });
});
