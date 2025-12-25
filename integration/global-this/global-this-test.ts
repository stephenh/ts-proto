import { Object, Error, String, Boolean, Number, Array } from "./global-this";

describe("global-this", () => {
  it("generates types correctly", () => {
    Object.fromPartial({});
    Error.fromPartial({});
    String.fromPartial({});
    Boolean.fromPartial({});
    Number.fromPartial({});
    Array.fromPartial({});
  });

  it("handles map fields in Object message correctly", () => {
    // Test fromPartial with map
    const obj = Object.fromPartial({
      name: "test",
      metadata: { key1: "value1", key2: "value2" },
    });
    expect(obj.name).toBe("test");
    expect(obj.metadata).toEqual({ key1: "value1", key2: "value2" });

    // Test fromJSON with map
    const fromJson = Object.fromJSON({
      name: "json-test",
      metadata: { foo: "bar" },
    });
    expect(fromJson.name).toBe("json-test");
    expect(fromJson.metadata).toEqual({ foo: "bar" });

    // Test toJSON with map
    const json = Object.toJSON(obj);
    expect(json).toEqual({
      name: "test",
      metadata: { key1: "value1", key2: "value2" },
    });

    // Test encode/decode roundtrip
    const encoded = Object.encode(obj).finish();
    const decoded = Object.decode(encoded);
    expect(decoded.name).toBe("test");
    expect(decoded.metadata).toEqual({ key1: "value1", key2: "value2" });
  });
});
