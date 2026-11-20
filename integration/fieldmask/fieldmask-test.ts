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

  it("converts camelCase paths in canonical JSON to snake_case and back", () => {
    const decoded = FieldMaskMessage.fromJSON({ fieldMask: "fooBar,baz.quxQuux" });
    expect(decoded).toEqual({ fieldMask: ["foo_bar", "baz.qux_quux"] });

    const encoded = FieldMaskMessage.toJSON({ fieldMask: ["foo_bar", "baz.qux_quux"] });
    expect(encoded).toEqual({ fieldMask: "fooBar,baz.quxQuux" });
  });
});
