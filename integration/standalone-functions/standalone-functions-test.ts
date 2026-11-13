import {
  Parent,
  parentCreate,
  parentDecode,
  parentEncode,
  parentFromJSON,
  parentFromPartial,
  parentToJSON,
} from "./standalone-functions";

describe("standalone-functions", () => {
  const parent: Parent = {
    children: { first: { name: "c1" } },
    createdAt: new Date("2024-01-02T03:04:05.678Z"),
    mask: ["a", "b.c"],
  };

  it("round-trips through the binary format", () => {
    expect(parentDecode(parentEncode(parent).finish())).toEqual(parent);
  });

  it("round-trips through JSON", () => {
    expect(parentFromJSON(parentToJSON(parent))).toEqual(parent);
  });

  it("creates messages from partials", () => {
    expect(parentCreate()).toEqual({ children: {} });
    expect(parentFromPartial(parent)).toEqual(parent);
  });
});
