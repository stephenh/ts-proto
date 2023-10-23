import { Foo, Foo2 } from "./foo";
import { Bar } from "./bar/bar";

describe("type-annotations", () => {
  it("should output $type field for every message", () => {
    expect(Foo.fromPartial({})).toMatchInlineSnapshot(`
      {
        "$type": "foo.Foo",
        "timestamp": undefined,
      }
    `);
    expect(Bar.fromPartial({})).toMatchInlineSnapshot(`
      {
        "$type": "foo.bar.Bar",
        "foo": undefined,
      }
    `);
  });

  it("should ignore $type field when creating from partial", () => {
    const foo2 = Foo2.fromPartial({});
    expect(foo2).toMatchInlineSnapshot(`
      {
        "$type": "foo.Foo2",
        "timestamp": undefined,
      }
    `);
    expect(Foo.fromPartial(foo2)).toMatchInlineSnapshot(`
      {
        "$type": "foo.Foo",
        "timestamp": undefined,
      }
    `);
  });
});
