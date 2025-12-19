import { Edition, FileDescriptorProto } from "ts-proto-descriptors";
import { createFileContext } from "../src/context";

function fileWithEdition(edition: Edition): FileDescriptorProto {
  return FileDescriptorProto.fromPartial({ syntax: "editions", edition });
}

describe("createFileContext", () => {
  it("treats proto3 syntax as proto3", () => {
    const file = FileDescriptorProto.fromPartial({ syntax: "proto3" });
    const ctx = createFileContext(file);
    expect(ctx.isProto3Syntax).toBe(true);
    expect(ctx.isEdition).toBe(false);
    expect(ctx.edition).toBeUndefined();
  });

  it("treats proto2 syntax as proto2", () => {
    const file = FileDescriptorProto.fromPartial({ syntax: "proto2" });
    const ctx = createFileContext(file);
    expect(ctx.isProto3Syntax).toBe(false);
    expect(ctx.isEdition).toBe(false);
    expect(ctx.edition).toBeUndefined();
  });

  it.each([Edition.EDITION_2023, Edition.EDITION_2024])("treats edition %s as proto3 syntax", (edition) => {
    const file = fileWithEdition(edition);
    const ctx = createFileContext(file);
    expect(ctx.isProto3Syntax).toBe(true);
    expect(ctx.isEdition).toBe(true);
    expect(ctx.edition).toBe(edition);
  });

  it("defaults to proto2 when syntax and edition are unset", () => {
    const file = FileDescriptorProto.fromPartial({ syntax: "" });
    const ctx = createFileContext(file);
    expect(ctx.isProto3Syntax).toBe(false);
    expect(ctx.isEdition).toBe(false);
    expect(ctx.edition).toBeUndefined();
  });
});
