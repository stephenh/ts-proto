import { Reader } from "protobufjs";
import {
  protobufPackage,
  Child_Type,
  Nested,
  Nested_InnerEnum,
  OneOfMessage,
  Simple,
  SimpleWithMap,
  StateEnum,
  SimpleWithMapOfEnums,
} from "./simple";
import { simple as pbjs, google } from "./pbjs";
import ISimple = pbjs.ISimple;
import PbChild = pbjs.Child;
import PbSimple = pbjs.Simple;
import PbSimpleWithMap = pbjs.SimpleWithMap;
import PbState = pbjs.StateEnum;
import PbNested = pbjs.Nested;
import PbNested_InnerMessage = pbjs.Nested.InnerMessage;
import PbNested_DeepMessage = pbjs.Nested.InnerMessage.DeepMessage;
import PbNested_InnerEnum = pbjs.Nested.InnerEnum;
import PbSimpleWithMapOfEnums = pbjs.SimpleWithMapOfEnums;
import INested = pbjs.INested;
import PbTimestamp = google.protobuf.Timestamp;

const jan1 = new Date("1970-01-01T00:00:00.000Z");

describe("simple", () => {
  it("generates types correctly", () => {
    const simple: Simple = {
      name: "asdf",
      age: 1,
      child: { name: "child", type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [
        { name: "grand1", type: Child_Type.UNKNOWN },
        { name: "grand2", type: Child_Type.UNKNOWN },
      ],
      coins: [2, 4, 6],
      snacks: ["a", "b"],
      oldStates: [StateEnum.ON, StateEnum.OFF],
      createdAt: jan1,
      thing: undefined,
      blobs: [],
      blob: new Uint8Array(0),
      birthday: undefined,
      enabled: true,
    };
    expect(simple.name).toEqual("asdf");
  });

  it("generates its protobuf package constant", () => {
    expect(protobufPackage).toEqual("simple");
  });

  it("can decode", () => {
    const s1: ISimple = {
      name: "asdf",
      age: 1,
      child: PbChild.fromObject({ name: "foo", type: Child_Type.UNKNOWN }),
      state: PbState.ON,
      grandChildren: [
        PbChild.fromObject({ name: "grand1", type: Child_Type.UNKNOWN }),
        PbChild.fromObject({ name: "grand2", type: Child_Type.UNKNOWN }),
      ],
      coins: [2, 4, 6],
      snacks: ["a", "b"],
      thing: undefined,
      oldStates: [PbState.ON, PbState.OFF],
      blobs: [],
      enabled: true,
    };
    const s2 = Simple.decode(Reader.create(PbSimple.encode(PbSimple.fromObject(s1)).finish()));
    expect(s2).toEqual({
      ...s1,
      blob: new Uint8Array(0),
    });
  });

  it("can encode", () => {
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
      createdAt: jan1,
      thing: undefined,
      blobs: [],
      blob: new Uint8Array(0),
      birthday: undefined,
      enabled: true,
    };
    const s2 = PbSimple.toObject(PbSimple.decode(Simple.encode(s1).finish()));

    delete (s1 as any).blob;
    delete (s1 as any).blobs;
    delete s1.birthday;
    delete s1.thing;
    expect(s2).toEqual({
      ...s1,
      child: { name: "foo" },
      grandChildren: [{ name: "grand1" }, { name: "grand2" }],
      createdAt: new PbTimestamp({}),
    });
  });

  it("can decode and fallback to default values", () => {
    const s1: ISimple = {};
    const s2 = Simple.decode(Reader.create(PbSimple.encode(PbSimple.fromObject(s1)).finish()));
    expect(s2.name).toEqual("");
    expect(s2.hasOwnProperty("name")).toEqual(true);
    expect(s2.age).toEqual(0);
    expect(s2.hasOwnProperty("age")).toEqual(true);
    expect(s2.state).toEqual(StateEnum.UNKNOWN);
    expect(s2.hasOwnProperty("state")).toEqual(true);
    expect(s2.grandChildren).toEqual([]);
    expect(s2.hasOwnProperty("grandChildren")).toEqual(true);
    expect(s2.coins).toEqual([]);
    expect(s2.snacks).toEqual([]);
    expect(s2.oldStates).toEqual([]);
    expect(Object.keys(s2)).toMatchInlineSnapshot(`
      [
        "name",
        "age",
        "createdAt",
        "child",
        "state",
        "grandChildren",
        "coins",
        "snacks",
        "oldStates",
        "thing",
        "blobs",
        "birthday",
        "blob",
        "enabled",
      ]
    `);
  });

  it("can encode inner types", () => {
    const s1: Nested = {
      name: "asdf",
      message: {
        name: "asdf",
        deep: { name: "asdf" },
      },
      state: Nested_InnerEnum.GOOD,
    };
    const s2 = PbNested.toObject(PbNested.decode(Nested.encode(s1).finish()));
    expect(s2).toEqual(s1);
  });

  it("can decode inner types", () => {
    const s1: INested = {
      name: "asdf",
      message: PbNested_InnerMessage.fromObject({
        name: "asdf",
        deep: PbNested_DeepMessage.fromObject({ name: "asdf" }),
      }),
      state: PbNested_InnerEnum.GOOD,
    };
    const s2 = Nested.decode(Reader.create(PbNested.encode(PbNested.fromObject(s1)).finish()));
    expect(s2).toEqual(s1);
  });

  it("observes how pbjs handles null", () => {
    // the ISimple types are in theory only useful for construction
    const s1 = PbSimple.fromObject({ name: null, age: 1 });
    // as after construction, they return the empty string
    expect(s1.name).toEqual("");
    const s2 = PbSimple.decode(PbSimple.encode(s1).finish());
    expect(s2.name).toEqual("");
  });

  it("observes how pbjs handles undefined", () => {
    const s1 = PbSimple.fromObject({});
    expect(s1.name).toEqual("");
    expect(s1.age).toEqual(0);
    const s2 = PbSimple.decode(PbSimple.encode(s1).finish());
    expect(s2.name).toEqual("");
    expect(s2.age).toEqual(0);
  });

  it("observes how pbjs handles collections of default values", () => {
    const s1 = PbSimple.create({
      coins: [0, 1, 2],
    });
    const s2 = PbSimple.decode(PbSimple.encode(s1).finish());
    expect(s2.coins).toEqual([0, 1, 2]);
  });

  it("can encode collections with default values", () => {
    const s1: Simple = {
      name: "asdf",
      age: 1,
      child: { name: "foo", type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [{ name: "grand2", type: Child_Type.UNKNOWN }],
      coins: [0, 4, 6],
      snacks: ["", "b"],
      oldStates: [StateEnum.UNKNOWN, StateEnum.OFF],
      createdAt: jan1,
      thing: undefined,
      blobs: [],
      blob: new Uint8Array(0),
      birthday: undefined,
      enabled: true,
    };
    const s2 = PbSimple.toObject(PbSimple.decode(Simple.encode(s1).finish()));
    delete (s1 as any).blob;
    delete (s1 as any).blobs;
    delete s1.birthday;
    expect(s2).toEqual({
      ...s1,
      child: { name: "foo" },
      grandChildren: [{ name: "grand2" }],
      createdAt: new PbTimestamp({}),
    });
  });

  it("can encode maps", () => {
    const s1: SimpleWithMap = {
      entitiesById: {
        1: { id: 1 },
        2: { id: 2 },
      },
      nameLookup: { foo: "bar" },
      // the code generated by pbjs doesn't handle "default values are not on the wire"
      // for maps, so for this test don't use 0 (see the next test where we round-trip
      // against our own decode that can handle this)
      intLookup: { 1: 2, 2: 1 },
      mapOfTimestamps: {},
      mapOfBytes: {},
      mapOfStringValues: { a: "1", b: "", c: undefined },
      longLookup: { 1: 2, 2: 1 },
      boolLookup: new Map([[true, 1]]),
    };
    // const s2 = PbSimpleWithMap.toObject(PbSimpleWithMap.decode(SimpleWithMap.encode(s1).finish()));
    const s2 = SimpleWithMap.decode(SimpleWithMap.encode(s1).finish());
    expect(s2).toMatchInlineSnapshot(`
      {
        "boolLookup": Map {
          true => 1,
        },
        "entitiesById": {
          "1": {
            "id": 1,
          },
          "2": {
            "id": 2,
          },
        },
        "intLookup": {
          "1": 2,
          "2": 1,
        },
        "longLookup": {
          "1": 2,
          "2": 1,
        },
        "mapOfBytes": {},
        "mapOfStringValues": {
          "a": "1",
          "b": "",
        },
        "mapOfTimestamps": {},
        "nameLookup": {
          "foo": "bar",
        },
      }
    `);
  });

  it("can encode maps with default values", () => {
    const s1: SimpleWithMap = {
      entitiesById: {},
      nameLookup: { foo: "" },
      intLookup: { 1: 0 },
      mapOfTimestamps: {},
      mapOfBytes: {},
      mapOfStringValues: { foo: "", bar: undefined },
      longLookup: { 1: 2, 2: 1 },
      boolLookup: new Map([[true, 1]]),
    };
    const s2 = SimpleWithMap.decode(SimpleWithMap.encode(s1).finish());
    expect(s2).toEqual(s1);
  });

  it("can decode maps", () => {
    const s1 = PbSimpleWithMap.fromObject({
      entitiesById: {
        1: { id: 1 },
        2: { id: 2 },
      },
      intLookup: { 1: 2, 2: 0 },
    });
    const s2 = SimpleWithMap.decode(new Reader(PbSimpleWithMap.encode(s1).finish()));
    expect(s2).toEqual({
      ...s1,
      nameLookup: {},
      mapOfTimestamps: {},
      mapOfBytes: {},
      mapOfStringValues: {},
      boolLookup: new Map(),
    });
  });

  it("has fromPartial", () => {
    const s1 = Simple.fromPartial({});
    expect(s1).toMatchInlineSnapshot(`
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

  it("has fromPartial uses exact types", () => {
    const s1 = Simple.fromPartial({
      // @ts-expect-error
      grandChildren: ["a", "b"].map((name) => ({ name, typ: null })),
    });
  });

  it("can fromPartial on maps with falsey values", () => {
    const s1 = SimpleWithMap.fromPartial({
      intLookup: { 1: 2, 2: 0 },
      mapOfStringValues: { a: "1", b: "", c: undefined },
      longLookup: { 1: 2, 2: 0 },
    });
    expect(s1).toMatchInlineSnapshot(`
      {
        "boolLookup": Map {},
        "entitiesById": {},
        "intLookup": {
          "1": 2,
          "2": 0,
        },
        "longLookup": {
          "1": 2,
          "2": 0,
        },
        "mapOfBytes": {},
        "mapOfStringValues": {
          "a": "1",
          "b": "",
        },
        "mapOfTimestamps": {},
        "nameLookup": {},
      }
    `);
  });

  it("can fromPartial on maps with timestamps", () => {
    const d1 = new Date();
    const s1 = SimpleWithMap.fromPartial({ mapOfTimestamps: { a: d1 } });
    expect(s1.mapOfTimestamps["a"]).toEqual(d1);
  });

  it("can fromPartial with oneofs of primitives", () => {
    expect(OneOfMessage.fromPartial({ first: "first" })).toMatchInlineSnapshot(`
      {
        "first": "first",
        "last": undefined,
      }
    `);
  });

  it("shows that enums are strongly typed", () => {
    function mustBeOn(a: typeof StateEnum.ON) {}
    // @ts-expect-error
    mustBeOn(StateEnum.OFF);
  });

  it("can decode from a pbjs encoding", () => {
    const message = {
      enumsById: {
        3: PbState.ON,
      },
    };

    const encoded = PbSimpleWithMapOfEnums.encode(PbSimpleWithMapOfEnums.create(message)).finish();
    const decoded = SimpleWithMapOfEnums.decode(encoded);

    expect(decoded).toBeTruthy();
    expect(decoded.enumsById).toBeTruthy();
    expect(decoded.enumsById[3]).toBe(PbState.ON);
  });

  it("can encode s.t. pbjs can decode", () => {
    const message = {
      enumsById: {
        2: PbState.OFF,
      },
    };

    const encoded = SimpleWithMapOfEnums.encode(message).finish();
    const decoded = PbSimpleWithMapOfEnums.decode(encoded);

    expect(decoded).toBeTruthy();
    expect(decoded.enumsById).toBeTruthy();
    expect(decoded.enumsById[2]).toBe(PbState.OFF);
  });
});
