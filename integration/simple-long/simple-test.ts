import { SimpleWithMap } from "./simple";

describe("simple", () => {
  it("can use create with an empty value", () => {
    const s1 = SimpleWithMap.create();
    expect(s1).toMatchInlineSnapshot(`
      {
        "intLookup": {},
        "longLookup": {},
        "nameLookup": {},
      }
    `);
  });

  it("can use create with a partial value", () => {
    const s1 = SimpleWithMap.create({
      intLookup: { 1: 2, 2: 1 },
    });
    expect(s1).toMatchInlineSnapshot(`
      {
        "intLookup": {
          "1": 2,
          "2": 1,
        },
        "longLookup": {},
        "nameLookup": {},
      }
    `);
  });

  it("can fromPartial maps", () => {
    const s1 = SimpleWithMap.fromPartial({
      intLookup: { 1: 2, 2: 1 },
      longLookup: { "1": 2, "2": 1 },
    });
    expect(s1).toMatchInlineSnapshot(`
      {
        "intLookup": {
          "1": 2,
          "2": 1,
        },
        "longLookup": {
          "1": Long {
            "high": 0,
            "low": 2,
            "unsigned": false,
          },
          "2": Long {
            "high": 0,
            "low": 1,
            "unsigned": false,
          },
        },
        "nameLookup": {},
      }
    `);
  });

  it("can toJSON/fromJSON maps", () => {
    const s1 = SimpleWithMap.fromPartial({
      intLookup: { 1: 2, 2: 1 },
      longLookup: { "1": 2, "2": 1 },
    });

    const json = SimpleWithMap.toJSON(s1);
    expect(json).toMatchInlineSnapshot(`
      {
        "intLookup": {
          "1": 2,
          "2": 1,
        },
        "longLookup": {
          "1": "2",
          "2": "1",
        },
      }
    `);

    const s2 = SimpleWithMap.fromJSON(JSON.parse(JSON.stringify(json)));
    expect(s2).toMatchInlineSnapshot(`
      {
        "intLookup": {
          "1": 2,
          "2": 1,
        },
        "longLookup": {
          "1": Long {
            "high": 0,
            "low": 2,
            "unsigned": false,
          },
          "2": Long {
            "high": 0,
            "low": 1,
            "unsigned": false,
          },
        },
        "nameLookup": {},
      }
    `);
  });
});
