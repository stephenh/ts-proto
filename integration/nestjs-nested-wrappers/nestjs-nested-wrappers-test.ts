import { wrappers } from "protobufjs";

describe("nestjs-nested-wrappers-test", () => {
  it("registers wrappers for nested protobuf well-known types", () => {
    delete wrappers[".google.protobuf.Timestamp"];
    delete wrappers[".google.protobuf.Struct"];

    require("./hero");

    expect(wrappers[".google.protobuf.Timestamp"]).toBeDefined();
    expect(wrappers[".google.protobuf.Struct"]).toBeDefined();
  });
});
