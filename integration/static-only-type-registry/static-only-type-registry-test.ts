import { Foo, Foo2 } from "./foo";
import { Bar } from "./bar/bar";
import { messageTypeRegistry } from "./typeRegistry";

describe("type-annotations", () => {
  it("should not output $type field", () => {
    expect(Foo.fromPartial({})).toMatchInlineSnapshot(`
      {
        "timestamp": undefined,
      }
    `);
    expect(Bar.fromPartial({})).toMatchInlineSnapshot(`
      {
        "foo": undefined,
      }
    `);
  });

  it("should have a $type field on the static definition", () => {
    expect(Foo.$type).toMatchInlineSnapshot(`"foo.Foo"`);
  });

  it("should ignore $type field when creating from partial", () => {
    const foo2 = Foo2.fromPartial({});
    expect(foo2).toMatchInlineSnapshot(`
      {
        "timestamp": undefined,
      }
    `);
    expect(Foo.fromPartial(foo2)).toMatchInlineSnapshot(`
      {
        "timestamp": undefined,
      }
    `);
  });

  it("should register every type", () => {
    expect(messageTypeRegistry.get("foo.Foo")).toBe(Foo);
    expect(messageTypeRegistry.get("foo.bar.Bar")).toBe(Bar);
  });
});
