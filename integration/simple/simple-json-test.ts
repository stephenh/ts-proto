import { Child_Type, Simple, SimpleWithWrappers, StateEnum, SimpleWithMap, OneOfMessage, Numbers } from "./simple";
import { google, simple as pbjs } from "./pbjs";
import ISimple = pbjs.ISimple;
import PbChild = pbjs.Child;
import PbSimple = pbjs.Simple;
import PbState = pbjs.StateEnum;
import Timestamp = google.protobuf.Timestamp;
import { base64FromBytes } from "./utils";

describe("simple json", () => {
  it("can decode json", () => {
    // given a pbjs object
    const s1: ISimple = {
      name: "asdf",
      age: 1,
      child: PbChild.fromObject({ name: "foo", type: 0 }),
      state: PbState.ON,
      grandChildren: [PbChild.fromObject({ name: "grand1", type: 0 }), PbChild.fromObject({ name: "grand2", type: 0 })],
      coins: [2, 4, 6],
      snacks: ["a", "b"],
      oldStates: [PbState.ON, PbState.OFF],
      enabled: false,
    };
    // when it goes to json and back to us
    const s2 = Simple.fromJSON(PbSimple.fromObject(s1).toJSON());
    // then it matches the original pbjs object
    // (even though it's really our object/representation
    expect(s2).toEqual({
      ...s1,
      birthday: undefined,
      blobs: [],
      blob: new Uint8Array(0),
      createdAt: undefined,
      thing: undefined,
    });
  });

  it("can decode json with numeric enum values", () => {
    // given state is mapped as 2 instead of ON
    const s1 = { state: 2 };
    // when it goes to json and back to us
    const s2 = Simple.fromJSON(s1);
    expect(s2.state).toEqual(StateEnum.ON);
  });

  it("can decode json with unrecognized numeric enum values", () => {
    // given state is mapped as 1, which is not a valid numeric value
    const s1 = { state: 1 };
    // then we decode to UNRECOGNIZED
    expect(Simple.fromJSON(s1).state).toEqual(StateEnum.UNRECOGNIZED);
  });

  it("can decode json with unrecognized string enum values", () => {
    // given state is mapped as an invalid string
    const s1 = { state: "INVALID" };
    // then we fail fast
    expect(Simple.fromJSON(s1).state).toEqual(StateEnum.UNRECOGNIZED);
  });

  it("can decode nested enums", () => {
    const s1 = { child: { type: "GOOD" } };
    const s2 = Simple.fromJSON(s1);
    expect(s2.child!.type).toEqual(Child_Type.GOOD);
  });

  it("decodes a null list as empty", () => {
    const s1 = { grandChildren: null };
    expect(Simple.fromJSON(s1).grandChildren).toEqual([]);
  });

  it("can decode value wrappers as json", () => {
    const s1 = {
      name: "first",
      age: 1,
      enabled: true,
      coins: [1, 2],
      snacks: ["a", "b"],
      id: new Uint8Array([1, 2, 3, 4]),
    };
    const s2 = SimpleWithWrappers.fromJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
      {
        "age": 1,
        "coins": [
          1,
          2,
        ],
        "enabled": true,
        "id": Uint8Array [
          1,
          2,
          3,
          4,
        ],
        "name": "first",
        "snacks": [
          "a",
          "b",
        ],
      }
    `);
  });

  it("can decode json with null values", () => {
    const s1 = {
      name: null,
      age: null,
      child: null,
      state: null,
      grandChildren: null,
      coins: null,
      snacks: null,
      oldStates: null,
      id: null,
      enabled: null,
    };
    const s2 = Simple.fromJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
      {
        "age": 0,
        "birthday": undefined,
        "blob": Uint8Array [],
        "blobs": [],
        "child": undefined,
        "coins": [],
        "createdAt": undefined,
        "enabled": false,
        "grandChildren": [],
        "name": "",
        "oldStates": [],
        "snacks": [],
        "state": 0,
        "thing": undefined,
      }
    `);
  });

  it("can decode json with no values", () => {
    const s1 = {};
    const s2 = Simple.fromJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
      {
        "age": 0,
        "birthday": undefined,
        "blob": Uint8Array [],
        "blobs": [],
        "child": undefined,
        "coins": [],
        "createdAt": undefined,
        "enabled": false,
        "grandChildren": [],
        "name": "",
        "oldStates": [],
        "snacks": [],
        "state": 0,
        "thing": undefined,
      }
    `);
  });

  it("can decode dates that are canonical format", () => {
    const s1: ISimple = {
      createdAt: Timestamp.create({ seconds: 1_000 }),
    };
    const json = PbSimple.fromObject(s1).toJSON();
    const s2 = Simple.fromJSON(json);
    expect(s2.createdAt).toMatchInlineSnapshot(`1970-01-01T00:16:40.000Z`);
  });

  it("can decode dates that are iso strings", () => {
    const d = new Date("1970-01-01T00:16:40.000Z");
    const s2 = Simple.fromJSON({ createdAt: d.toISOString() });
    expect(s2.createdAt).toEqual(d);
  });

  it("can decode dates that are already dates", () => {
    const d = new Date("1970-01-01T00:16:40.000Z");
    const s2 = Simple.fromJSON({ createdAt: d });
    expect(s2.createdAt).toEqual(d);
  });

  it("decodes maps", () => {
    const s1 = {
      entitiesById: { "1": { id: "1" } },
      intLookup: { 1: 0 },
      boolLookup: { true: 0 },
    };
    expect(SimpleWithMap.fromJSON(s1)).toMatchInlineSnapshot(`
      {
        "boolLookup": Map {
          true => 0,
        },
        "entitiesById": {
          "1": {
            "id": 1,
          },
        },
        "intLookup": {
          "1": 0,
        },
        "longLookup": {},
        "mapOfBytes": {},
        "mapOfStringValues": {},
        "mapOfTimestamps": {},
        "nameLookup": {},
      }
    `);
    // Ensure lookups by the id as a number work
    expect(SimpleWithMap.fromJSON(s1).entitiesById[1].id).toEqual(1);
  });

  it("decodes maps of timestamps", () => {
    const json = {
      mapOfTimestamps: {
        a: "1970-01-01T00:16:40.000Z",
        b: { seconds: 2000 },
      },
    };
    const s1 = SimpleWithMap.fromJSON(json);
    expect(s1).toMatchInlineSnapshot(`
      {
        "boolLookup": Map {},
        "entitiesById": {},
        "intLookup": {},
        "longLookup": {},
        "mapOfBytes": {},
        "mapOfStringValues": {},
        "mapOfTimestamps": {
          "a": 1970-01-01T00:16:40.000Z,
          "b": 1970-01-01T00:33:20.000Z,
        },
        "nameLookup": {},
      }
    `);
    expect(s1.mapOfTimestamps["a"]).toBeInstanceOf(Date);
    expect(s1.mapOfTimestamps["b"]).toBeInstanceOf(Date);
  });

  it("encodes maps", () => {
    const s1: SimpleWithMap = {
      entitiesById: {},
      intLookup: {},
      nameLookup: {},
      mapOfTimestamps: {},
      mapOfBytes: {
        a: new Uint8Array([1, 2]),
        b: new Uint8Array([1, 2, 3]),
      },
      mapOfStringValues: {},
      longLookup: {},
      boolLookup: new Map([[true, 1]]),
    };
    const json = SimpleWithMap.toJSON(s1);
    expect(json).toMatchInlineSnapshot(`
      {
        "boolLookup": {
          "true": 1,
        },
        "mapOfBytes": {
          "a": "AQI=",
          "b": "AQID",
        },
      }
    `);
  });

  it("decodes maps of bytes", () => {
    const json = {
      mapOfBytes: {
        a: base64FromBytes(new Uint8Array([1, 2])),
        b: base64FromBytes(new Uint8Array([1, 2, 3])),
      },
    };
    const s1 = SimpleWithMap.fromJSON(json);
    expect(s1).toMatchInlineSnapshot(`
      {
        "boolLookup": Map {},
        "entitiesById": {},
        "intLookup": {},
        "longLookup": {},
        "mapOfBytes": {
          "a": Uint8Array [
            1,
            2,
          ],
          "b": Uint8Array [
            1,
            2,
            3,
          ],
        },
        "mapOfStringValues": {},
        "mapOfTimestamps": {},
        "nameLookup": {},
      }
    `);
  });

  it("can encode json", () => {
    const s1: Simple = {
      name: "asdf",
      age: 1,
      child: { name: "foo", type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [
        { name: "grand1", type: Child_Type.UNKNOWN },
        { name: "grand2", type: Child_Type.UNKNOWN },
      ],
      coins: [2, 4, 6],
      snacks: ["a", "b"],
      oldStates: [StateEnum.ON, StateEnum.OFF],
      createdAt: new Date(1_000),
      thing: undefined,
      blobs: [],
      blob: new Uint8Array(0),
      birthday: undefined,
      enabled: true,
    };
    expect(Simple.toJSON(s1)).toMatchInlineSnapshot(`
      {
        "age": 1,
        "child": {
          "name": "foo",
        },
        "coins": [
          2,
          4,
          6,
        ],
        "createdAt": "1970-01-01T00:00:01.000Z",
        "enabled": true,
        "grandChildren": [
          {
            "name": "grand1",
          },
          {
            "name": "grand2",
          },
        ],
        "name": "asdf",
        "oldStates": [
          "ON",
          "OFF",
        ],
        "snacks": [
          "a",
          "b",
        ],
        "state": "ON",
      }
    `);
  });

  it("can encode nested enums", () => {
    const s1 = Simple.fromPartial({ child: { name: "a", type: Child_Type.GOOD } });
    const s2 = Simple.toJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
      {
        "child": {
          "name": "a",
          "type": "GOOD",
        },
      }
    `);
  });

  it("can encode value wrappers as json", () => {
    const s1: SimpleWithWrappers = {
      name: "first",
      age: 1,
      enabled: true,
      coins: [1, 2],
      snacks: ["a", "b"],
      id: new Uint8Array([1, 2, 3, 4]),
    };
    const s2 = SimpleWithWrappers.toJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
      {
        "age": 1,
        "coins": [
          1,
          2,
        ],
        "enabled": true,
        "id": Uint8Array [
          1,
          2,
          3,
          4,
        ],
        "name": "first",
        "snacks": [
          "a",
          "b",
        ],
      }
    `);
  });

  it("can encode null value wrappers", () => {
    const s1: SimpleWithWrappers = {
      name: undefined,
      age: undefined,
      enabled: undefined,
      coins: [], // should be undefined
      snacks: [],
      id: undefined,
    };
    const s2 = SimpleWithWrappers.toJSON(s1);
    expect(s2).toMatchInlineSnapshot(`{}`);
  });

  it("can decode enum falsey values", () => {
    const s1: Partial<Simple> = { state: StateEnum.UNKNOWN };
    const s2 = Simple.fromJSON(s1);
    expect(s2.state).toEqual(StateEnum.UNKNOWN);
  });

  it("can encode oneofs of primitives", () => {
    const s1: OneOfMessage = { first: "first", last: undefined };
    expect(OneOfMessage.toJSON(s1)).toMatchInlineSnapshot(`
      {
        "first": "first",
      }
    `);
  });

  it("rounds numbers", () => {
    const n1: Numbers = {
      double: 1.1,
      fixed32: 1.1,
      fixed64: 1.1,
      float: 1.1,
      int32: 1.1,
      int64: 1.1,
      sfixed32: 1.1,
      sfixed64: 1.1,
      sint32: 1.1,
      sint64: 1.1,
      uint32: 1.1,
      uint64: 1.1,
    };
    expect(Numbers.toJSON(n1)).toMatchInlineSnapshot(`
      {
        "double": 1.1,
        "fixed32": 1,
        "fixed64": 1,
        "float": 1.1,
        "int32": 1,
        "int64": 1,
        "sfixed32": 1,
        "sfixed64": 1,
        "sint32": 1,
        "sint64": 1,
        "uint32": 1,
        "uint64": 1,
      }
    `);
  });
});
