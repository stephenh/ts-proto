import { Entity } from "./use-readonly-types";

describe("use-readonly-types", () => {
  it("generates types correctly", () => {
    const m: Entity = {
      intVal: 42,
      intArray: [42, 43],
      stringVal: "hello",
      stringArray: ["hello", "world"],
      subEntity: { subVal: 42 },
      subEntityArray: [{ subVal: 42 }, { subVal: 43 }],
    };
    const jsonFromObject = Entity.toJSON(m);
    const entityFromJSON = Entity.fromJSON(jsonFromObject);
    expect(entityFromJSON).toEqual(m);
    const encoded = Entity.encode(m).finish();
    const decoded = Entity.decode(encoded);
    expect(decoded).toEqual({
      intVal: m.intVal,
      intArray: m.intArray,
      stringVal: m.stringVal,
      stringArray: m.stringArray,
      subEntity: m.subEntity,
      subEntityArray: m.subEntityArray,
    });
    const jsonFromDecoded = Entity.toJSON(decoded);
    expect(jsonFromDecoded).toEqual(jsonFromObject);
    const partial = Entity.fromPartial({
      intVal: m.intVal,
      intArray: m.intArray,
      stringVal: m.stringVal,
      stringArray: m.stringArray,
      subEntity: m.subEntity,
      subEntityArray: m.subEntityArray,
    });
    expect(partial).toEqual({
      intVal: m.intVal,
      intArray: m.intArray,
      stringVal: m.stringVal,
      stringArray: m.stringArray,
      subEntity: m.subEntity,
      subEntityArray: m.subEntityArray,
    });
  });
});
