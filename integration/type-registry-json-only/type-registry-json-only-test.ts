import { Foo } from "./foo";
import { messageTypeRegistry } from "./typeRegistry";

describe("type-registry-json-only", () => {
  it("only declares the methods that are generated on the messages", () => {
    // The generated code only compiles if the registry's `MessageType` does not require
    // `decode` or `fromJSON`, which messages do not have with `encode-only` and `to-only`.
    expect(messageTypeRegistry.get("foo.Foo")).toBe(Foo);
    expect(messageTypeRegistry.get("google.protobuf.Timestamp")).toBeDefined();
  });

  it("can encode and convert to JSON through the registry", () => {
    const type = messageTypeRegistry.get("foo.Foo")!;
    const foo = Foo.fromPartial({ name: "a", timestamp: new Date(0) });
    expect(type.toJSON(foo)).toEqual({ name: "a", timestamp: "1970-01-01T00:00:00.000Z" });
    expect(type.encode(foo).finish().length).toBeGreaterThan(0);
  });
});
