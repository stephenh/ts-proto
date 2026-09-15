import { ListValue, Struct, Value } from "./google/protobuf/struct";
import { Holder } from "./use-json-name-struct";

describe("useJsonName struct wrappers", () => {
  test("Value.wrap assigns the camelCase fields the interface declares", () => {
    expect(Value.wrap(null).nullValue).not.toBeUndefined();
    expect(Value.wrap(true).boolValue).toBe(true);
    expect(Value.wrap(1.5).numberValue).toBe(1.5);
    expect(Value.wrap("hi").stringValue).toBe("hi");
    expect(Value.wrap({ a: 1 }).structValue).not.toBeUndefined();
    expect(Value.wrap([1, 2]).listValue).not.toBeUndefined();
  });

  test("Value round-trips through wrap/unwrap", () => {
    expect(Value.unwrap(Value.wrap(null))).toBeNull();
    expect(Value.unwrap(Value.wrap(true))).toBe(true);
    expect(Value.unwrap(Value.wrap(1.5))).toBe(1.5);
    expect(Value.unwrap(Value.wrap("hello"))).toBe("hello");
    expect(Value.unwrap(Value.wrap({ a: 1, b: "two" }))).toStrictEqual({ a: 1, b: "two" });
    expect(Value.unwrap(Value.wrap(["a", "b"]))).toStrictEqual(["a", "b"]);
  });

  test("Struct and ListValue round-trip", () => {
    expect(Struct.unwrap(Struct.wrap({ a: 1, b: "two" }))).toStrictEqual({ a: 1, b: "two" });
    expect(ListValue.unwrap(ListValue.wrap(["a", 1, true]))).toStrictEqual(["a", 1, true]);
  });

  test("Holder encodes/decodes struct values", () => {
    const holder = Holder.create({ value: "wrapped", struct: { k: "v" }, list: [1, 2, 3] });
    const decoded = Holder.decode(Holder.encode(holder).finish());
    expect(decoded.value).toBe("wrapped");
    expect(decoded.struct).toStrictEqual({ k: "v" });
    expect(decoded.list).toStrictEqual([1, 2, 3]);
  });
});
