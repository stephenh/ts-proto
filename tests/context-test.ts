import { FileDescriptorProto } from "ts-proto-descriptors";
import { createFileContext } from "../src/context";

const EDITION_FIELD_TAG = 14 << 3;
const EDITION_2023 = 1000;
const EDITION_2024 = 1001;

function encodeVarint(value: number): Uint8Array {
  const bytes: number[] = [];
  let remaining = value;
  while (remaining > 0x7f) {
    bytes.push((remaining & 0x7f) | 0x80);
    remaining = Math.floor(remaining / 128);
  }
  bytes.push(remaining);
  return Uint8Array.from(bytes);
}

function fileWithEdition(edition: number): FileDescriptorProto {
  const file = FileDescriptorProto.fromPartial({ syntax: "" });
  file._unknownFields = {
    [EDITION_FIELD_TAG]: [encodeVarint(edition)],
  };
  return file;
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

  it.each([EDITION_2023, EDITION_2024])("treats edition %s as proto3 syntax", (edition) => {
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
