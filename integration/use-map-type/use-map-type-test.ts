import { Maps } from "./use-map-type";
import { TextEncoder } from "util";

describe("use-map-type", () => {
  it("generates types correctly", () => {
    const now = new Date();
    const m: Maps = {
      strToEntity: new Map([["foo", { id: 42 }]]),
      int32ToInt32: new Map([[1, 2]]),
      stringToBytes: new Map([["bar", new TextEncoder().encode("buz")]]),
      int64ToInt64: new Map([[3, 4]]),
      mapOfTimestamps: new Map([["qux", now]]),
      struct: { foo: 1 },
    };

    const jsonFromObject = Maps.toJSON(m);
    const mapsFromJSON = Maps.fromJSON(jsonFromObject);
    expect(mapsFromJSON).toEqual(m);

    const encoded = Maps.encode(m).finish();
    const decoded = Maps.decode(encoded);
    expect(decoded).toEqual({
      strToEntity: m.strToEntity,
      int32ToInt32: m.int32ToInt32,
      stringToBytes: new Map([["bar", Buffer.from(new TextEncoder().encode("buz"))]]),
      int64ToInt64: m.int64ToInt64,
      mapOfTimestamps: m.mapOfTimestamps,
      struct: { foo: 1 },
    });
    const jsonFromDecoded = Maps.toJSON(decoded);
    expect(jsonFromDecoded).toEqual(jsonFromObject);

    const partial = Maps.fromPartial({
      strToEntity: m.strToEntity,
      int32ToInt32: m.int32ToInt32,
    });
    expect(partial).toEqual({
      strToEntity: m.strToEntity,
      int32ToInt32: m.int32ToInt32,
      stringToBytes: new Map(),
      int64ToInt64: new Map(),
      mapOfTimestamps: new Map(),
    });
  });
});
