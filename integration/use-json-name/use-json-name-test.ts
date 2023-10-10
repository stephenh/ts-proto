import { JsonName } from "./use-json-name";

describe("useJsonName", () => {
  const obj = JsonName.create({
    other_name: "other_name",
    other_age: 100,
    createdAt: new Date("2023-10-10T18:21:39.798Z"),
    "hyphened-name": "hyphened-name",
    "name with spaces": "name with spaces",
    $dollar: "$dollar",
    dollar$: "dollar$",
    "hyphen-list": ["hyphen-list", "hyphen-list", "hyphen-list"],
    A: "A",
    b: "b",
    _C: "_C",
    d: { nestedOneOfField: "nestedOneOfField" },
    noJsonName: "noJsonName",
  });
  test("property names are supposed to be same after calling toJson", () => {
    expect(Object.keys(obj)).toStrictEqual(expect.arrayContaining(Object.keys(JsonName.fromJSON(obj))));
  });
  test("property names are supposed to be same after calling fromJSON", () => {
    const json = JsonName.toJSON(obj);
    expect(Object.keys(json as Record<string, unknown>)).toStrictEqual(
      expect.arrayContaining(Object.keys(JsonName.fromJSON(json))),
    );
  });
});
