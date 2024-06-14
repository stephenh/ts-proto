import { BinaryReader } from "@bufbuild/protobuf/wire";
import { SimpleWithWrappers } from "./simple";
import { google, simple as pbjs } from "./pbjs";
import PbSimpleWithWrappers = pbjs.SimpleWithWrappers;
import PbStringValue = google.protobuf.StringValue;
import PbInt32Value = google.protobuf.Int32Value;

describe("simple value types", () => {
  it("can encode value wrappers as proto", () => {
    const s1: SimpleWithWrappers = {
      name: "first",
      age: 1,
      enabled: true,
      coins: [1, 2],
      snacks: ["a", "b"],
      id: new Uint8Array([1, 2, 3, 4]),
    };
    const s2 = PbSimpleWithWrappers.decode(SimpleWithWrappers.encode(s1).finish());
    // pbjs toJSON still uses the wrapper objects, so we can't compare directly against s1
    expect(s2).toMatchInlineSnapshot(`
      {
        "age": {
          "value": 1,
        },
        "coins": [
          {
            "value": 1,
          },
          {
            "value": 2,
          },
        ],
        "enabled": {
          "value": true,
        },
        "id": {
          "value": "AQIDBA==",
        },
        "name": {
          "value": "first",
        },
        "snacks": [
          {
            "value": "a",
          },
          {
            "value": "b",
          },
        ],
      }
    `);
  });

  it("can encode null value wrappers as proto", () => {
    const s1: SimpleWithWrappers = {
      name: undefined,
      age: undefined,
      enabled: undefined,
      coins: [], // should be undefined
      snacks: [],
      id: undefined,
    };
    const s2 = PbSimpleWithWrappers.decode(SimpleWithWrappers.encode(s1).finish());
    // pbjs toJSON still uses the wrapper objects, so we can't compare directly against s1
    expect(s2).toMatchInlineSnapshot(`{}`);
  });

  it("can decode value wrappers as proto", () => {
    const s1 = PbSimpleWithWrappers.create({
      name: PbStringValue.create({ value: "asdf" }),
      age: PbInt32Value.create({ value: 1 }),
    });
    const s2 = SimpleWithWrappers.decode(new BinaryReader(PbSimpleWithWrappers.encode(s1).finish()));
    expect(s2).toMatchInlineSnapshot(`
      {
        "age": 1,
        "coins": [],
        "enabled": undefined,
        "id": undefined,
        "name": "asdf",
        "snacks": [],
      }
    `);
  });

  it("can decode null value wrappers as proto", () => {
    const s1 = PbSimpleWithWrappers.create({});
    const s2 = SimpleWithWrappers.decode(new BinaryReader(PbSimpleWithWrappers.encode(s1).finish()));
    expect(s2).toMatchInlineSnapshot(`
      {
        "age": undefined,
        "coins": [],
        "enabled": undefined,
        "id": undefined,
        "name": undefined,
        "snacks": [],
      }
    `);
  });

  it("observes how pbjs handles collections of default values", () => {
    const s1 = PbSimpleWithWrappers.create({
      coins: [PbInt32Value.create({ value: 1 })],
    });
    const s2 = PbSimpleWithWrappers.decode(PbSimpleWithWrappers.encode(s1).finish());
    expect(s2.coins.map((c) => c.value)).toEqual([1]);
  });
});
