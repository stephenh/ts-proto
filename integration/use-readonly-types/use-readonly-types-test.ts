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
      fieldMask: ["the", "mask"],
      listValue: ["the", "list"],
      structValue: { the: "struct" },
      oneOfValue: { $case: "theStringValue", theStringValue: "theString" },
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
      fieldMask: m.fieldMask,
      listValue: m.listValue,
      structValue: m.structValue,
      oneOfValue: m.oneOfValue,
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
      fieldMask: m.fieldMask,
      listValue: m.listValue,
      structValue: m.structValue,
    });
    expect(partial).toEqual({
      intVal: m.intVal,
      intArray: m.intArray,
      stringVal: m.stringVal,
      stringArray: m.stringArray,
      subEntity: m.subEntity,
      subEntityArray: m.subEntityArray,
      fieldMask: m.fieldMask,
      listValue: m.listValue,
      structValue: m.structValue,
    });
  });
});
