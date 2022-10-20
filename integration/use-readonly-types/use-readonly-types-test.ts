import { Entity } from "./use-readonly-types";

describe("use-readonly-types", () => {
  it("generates types correctly", () => {
    const m: Entity = {
      id: 42,
    };
    const jsonFromObject = Entity.toJSON(m);
    const entityFromJSON = Entity.fromJSON(jsonFromObject);
    expect(entityFromJSON).toEqual(m);
    const encoded = Entity.encode(m).finish();
    const decoded = Entity.decode(encoded);
    expect(decoded).toEqual({
      id: m.id,
    });
    const jsonFromDecoded = Entity.toJSON(decoded);
    expect(jsonFromDecoded).toEqual(jsonFromObject);
    const partial = Entity.fromPartial({
      id: m.id,
    });
    expect(partial).toEqual({
      id: m.id,
    });
  });
});
