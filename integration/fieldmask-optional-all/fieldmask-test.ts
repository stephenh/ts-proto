import { Example } from "./fieldmask-optional";

let data = {
  mask: "a,b,c.d",
};

describe("fieldmask-optional-all", () => {
  it("can decode canonical JSON", () => {
    const f = Example.fromJSON(data);
    expect(f).toMatchInlineSnapshot(`
      {
        "mask": [
          "a",
          "b",
          "c.d",
        ],
      }
    `);
  });

  it("can decode non-canonical JSON", () => {
    const f = Example.fromJSON({
      mask: {
        paths: ["a", "b", "c.d"],
      },
    });
    expect(f).toMatchInlineSnapshot(`
      {
        "mask": [
          "a",
          "b",
          "c.d",
        ],
      }
    `);
  });

  it("can encode JSON", () => {
    const f = Example.toJSON({ mask: ["a", "b", "c.d"] });
    expect(f).toEqual(data);
  });
  
  it("can encode JSON with undefined input", () => {
    const f = Example.toJSON({ mask: undefined });
    expect(f).toEqual({ mask: undefined });
  });

  it("skips empty paths", () => {
    const f = Example.fromJSON({ mask: "a,,c.d" });
    expect(f).toMatchInlineSnapshot(`
      {
        "mask": [
          "a",
          "c.d",
        ],
      }
    `);
  });
});
