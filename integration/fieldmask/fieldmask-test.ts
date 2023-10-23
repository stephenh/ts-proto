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
});
