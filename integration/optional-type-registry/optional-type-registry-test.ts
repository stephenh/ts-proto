import { Bar, Foo } from "./optional-type-registry";
import { messageTypeRegistry } from "./typeRegistry";

describe("outputTypeRegistry with outputTypeAnnotations=optional", () => {
  it("registers every message", () => {
    expect(messageTypeRegistry.get("demo.Foo")).toBe(Foo);
    expect(messageTypeRegistry.get("demo.Bar")).toBe(Bar);
  });

  it("encodes messages created without $type", () => {
    const foo: Foo = { name: "a", bar: { n: 1 } };
    const decoded = Foo.decode(Foo.encode(foo).finish());
    expect(decoded.name).toEqual("a");
    expect(decoded.bar?.n).toEqual(1);
  });

  it("round-trips through the registry", () => {
    const type = messageTypeRegistry.get("demo.Foo")!;
    const foo = Foo.fromPartial({ name: "b" });
    expect(type.decode(type.encode(foo).finish())).toEqual(foo);
  });
});
