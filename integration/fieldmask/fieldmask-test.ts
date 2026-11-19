import { FieldMaskMessage } from "./fieldmask";

let data = {
  fieldMask: "a,b,c.d",
};

describe("fieldmask", () => {
  it("can decode canonical JSON", () => {
    const f = FieldMaskMessage.fromJSON(data);
    expect(f).toMatchInlineSnapshot(`
      {
        "fieldMask": [
          "a",
          "b",
          "c.d",
        ],
      }
    `);
  });

  it("can decode non-canonical JSON", () => {
    const f = FieldMaskMessage.fromJSON({
      fieldMask: {
        paths: ["a", "b", "c.d"],
      },
    });
    expect(f).toMatchInlineSnapshot(`
      {
        "fieldMask": [
          "a",
          "b",
          "c.d",
        ],
      }
    `);
  });

  it("can encode JSON", () => {
    const f = FieldMaskMessage.toJSON({ fieldMask: ["a", "b", "c.d"] });
    expect(f).toEqual(data);
  });

  it("converts paths to lowerCamelCase in JSON", () => {
    const f = FieldMaskMessage.toJSON({ fieldMask: ["foo_bar", "baz.qux_quux", "a"] });
    expect(f).toEqual({ fieldMask: "fooBar,baz.quxQuux,a" });
  });

  it("converts lowerCamelCase paths in JSON back to the field names", () => {
    const f = FieldMaskMessage.fromJSON({ fieldMask: "fooBar,baz.quxQuux,a" });
    expect(f).toEqual({ fieldMask: ["foo_bar", "baz.qux_quux", "a"] });
  });

  it("still accepts snake_case paths in JSON", () => {
    const f = FieldMaskMessage.fromJSON({ fieldMask: "foo_bar,baz.qux_quux" });
    expect(f).toEqual({ fieldMask: ["foo_bar", "baz.qux_quux"] });
  });

  it("keeps the paths of non-canonical JSON as they are", () => {
    const f = FieldMaskMessage.fromJSON({ fieldMask: { paths: ["foo_bar", "baz.qux_quux"] } });
    expect(f).toEqual({ fieldMask: ["foo_bar", "baz.qux_quux"] });
  });

  it("skips empty paths", () => {
    const f = FieldMaskMessage.fromJSON({ fieldMask: "a,,c.d" });
    expect(f).toMatchInlineSnapshot(`
      {
        "fieldMask": [
          "a",
          "c.d",
        ],
      }
    `);
  });
});
