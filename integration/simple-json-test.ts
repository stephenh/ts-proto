import { Child_Type, Simple, SimpleWithWrappers, StateEnum } from '../build/integration/simple';
import { google, simple as pbjs } from '../build/integration/pbjs';
import { Tile_Value } from '../build/integration/vector_tile';
import ISimple = pbjs.ISimple;
import PbChild = pbjs.Child;
import PbSimple = pbjs.Simple;
import PbState = pbjs.StateEnum;
import Timestamp = google.protobuf.Timestamp;

describe('simple json', () => {
  it('can decode json', () => {
    // given a pbjs object
    const s1: ISimple = {
      name: 'asdf',
      age: 1,
      child: PbChild.fromObject({ name: 'foo' }),
      state: PbState.ON,
      grandChildren: [PbChild.fromObject({ name: 'grand1' }), PbChild.fromObject({ name: 'grand2' })],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: [PbState.ON, PbState.OFF]
    };
    // when it goes to json and back to us
    const s2 = Simple.fromJSON(PbSimple.fromObject(s1).toJSON());
    // then it matches the original pbjs object
    // (even though its really our object/representation
    expect(s2).toEqual(s1);
  });

  it('can decode json with numeric enum values', () => {
    // given state is mapped as 2 instead of ON
    const s1 = { state: 2 };
    // when it goes to json and back to us
    const s2 = Simple.fromJSON(s1);
    expect(s2.state).toEqual(StateEnum.ON);
  });

  it('fails decode json with invalid numeric enum values', () => {
    // given state is mapped as 1, which is not a valid numeric value
    const s1 = { state: 1 };
    // then we fail fast
    expect(() => Simple.fromJSON(s1)).toThrow('Invalid value 1');
  });

  it('fails decode json with invalid string enum values', () => {
    // given state is mapped as an invalid string
    const s1 = { state: 'INVALID' };
    // then we fail fast
    expect(() => Simple.fromJSON(s1)).toThrow('Invalid value INVALID');
  });

  it('can decode nested enums', () => {
    const s1 = { child: { type: 'GOOD' } };
    const s2 = Simple.fromJSON(s1);
    expect(s2.child!.type).toEqual(Child_Type.GOOD);
  });

  it('decodes a null list as empty', () => {
    const s1 = { grandChildren: null };
    expect(Simple.fromJSON(s1).grandChildren).toEqual([]);
  });

  it('decodes numbers', () => {
    const tile = {
      intValue: 1,
      uintValue: 2,
      sintValue: -3,
      floatValue: 1.1,
      doubleValue: -2.2
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
Object {
  "doubleValue": -2.2,
  "floatValue": 1.1,
  "intValue": 1,
  "sintValue": -3,
  "uintValue": 2,
}
`);
  });

  it('decodes numbers that are strings', () => {
    const tile = {
      intValue: '1',
      uintValue: '2',
      sintValue: '-3',
      floatValue: '1.1',
      doubleValue: '-2.2'
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
Object {
  "doubleValue": -2.2,
  "floatValue": 1.1,
  "intValue": 1,
  "sintValue": -3,
  "uintValue": 2,
}
`);
  });

  it('decodes numbers that are weird', () => {
    const tile = {
      floatValue: 'NaN',
      doubleValue: 'Infinity'
    };
    expect(Tile_Value.fromJSON(tile)).toMatchInlineSnapshot(`
Object {
  "doubleValue": Infinity,
  "floatValue": NaN,
}
`);
  });

  it('can decode value wrappers as json', () => {
    const s1 = {
      name: 'first',
      age: 1,
      enabled: true,
      coins: [1, 2],
      snacks: ['a', 'b']
    };
    const s2 = SimpleWithWrappers.fromJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
Object {
  "age": 1,
  "coins": Array [
    1,
    2,
  ],
  "enabled": true,
  "name": "first",
  "snacks": Array [
    "a",
    "b",
  ],
}
`);
  });

  it('can decode json with null values', () => {
    const s1 = {
      name: null,
      age: null,
      child: null,
      state: null,
      grandChildren: null,
      coins: null,
      snacks: null,
      oldStates: null
    };
    const s2 = Simple.fromJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
Object {
  "coins": Array [],
  "grandChildren": Array [],
  "oldStates": Array [],
  "snacks": Array [],
}
`);
  });

  it('can decode dates that are canonical format', () => {
    const s1: ISimple = {
      createdAt: Timestamp.create({ seconds: 1_000 })
    };
    const json = PbSimple.fromObject(s1).toJSON();
    const s2 = Simple.fromJSON(json);
    expect(s2.createdAt).toMatchInlineSnapshot(`1970-01-01T00:16:40.000Z`);
  });

  it('can decode dates that are iso strings', () => {
    const d = new Date('1970-01-01T00:16:40.000Z');
    const s2 = Simple.fromJSON({ createdAt: d.toISOString() });
    expect(s2.createdAt).toEqual(d);
  });

  it('can decode dates that are already dates', () => {
    const d = new Date('1970-01-01T00:16:40.000Z');
    const s2 = Simple.fromJSON({ createdAt: d });
    expect(s2.createdAt).toEqual(d);
  });

  it('can encode json', () => {
    const s1: Simple = {
      name: 'asdf',
      age: 1,
      child: { name: 'foo', type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [{ name: 'grand1', type: Child_Type.UNKNOWN }, { name: 'grand2', type: Child_Type.UNKNOWN }],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: [StateEnum.ON, StateEnum.OFF],
      createdAt: new Date(1_000)
    };
    expect(Simple.toJSON(s1)).toMatchInlineSnapshot(`
Object {
  "age": 1,
  "child": Object {
    "name": "foo",
    "type": "UNKNOWN",
  },
  "coins": Array [
    2,
    4,
    6,
  ],
  "createdAt": "1970-01-01T00:00:01.000Z",
  "grandChildren": Array [
    Object {
      "name": "grand1",
      "type": "UNKNOWN",
    },
    Object {
      "name": "grand2",
      "type": "UNKNOWN",
    },
  ],
  "name": "asdf",
  "oldStates": Array [
    "ON",
    "OFF",
  ],
  "snacks": Array [
    "a",
    "b",
  ],
  "state": "ON",
}
`);
  });

  it('can encode empty objects', () => {
    expect(Simple.toJSON({} as Simple)).toMatchInlineSnapshot(`
Object {
  "age": 0,
  "child": undefined,
  "coins": Array [],
  "createdAt": null,
  "grandChildren": Array [],
  "name": "",
  "oldStates": Array [],
  "snacks": Array [],
  "state": "UNKNOWN",
}
`);
  });

  it('can encode nested enums', () => {
    const s1 = { child: { name: 'a', type: Child_Type.GOOD } } as Simple;
    const s2 = Simple.toJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
Object {
  "age": 0,
  "child": Object {
    "name": "a",
    "type": "GOOD",
  },
  "coins": Array [],
  "createdAt": null,
  "grandChildren": Array [],
  "name": "",
  "oldStates": Array [],
  "snacks": Array [],
  "state": "UNKNOWN",
}
`);
  });

  it('can encode value wrappers as json', () => {
    const s1: SimpleWithWrappers = {
      name: 'first',
      age: 1,
      enabled: true,
      coins: [1, 2],
      snacks: ['a', 'b']
    };
    const s2 = SimpleWithWrappers.toJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
Object {
  "age": 1,
  "coins": Array [
    1,
    2,
  ],
  "enabled": true,
  "name": "first",
  "snacks": Array [
    "a",
    "b",
  ],
}
`);
  });

  it('can encode null value wrappers', () => {
    const s1: SimpleWithWrappers = {
      name: undefined,
      age: undefined,
      enabled: undefined,
      coins: [], // should be undefined
      snacks: []
    };
    const s2 = SimpleWithWrappers.toJSON(s1);
    expect(s2).toMatchInlineSnapshot(`
Object {
  "age": undefined,
  "coins": Array [],
  "enabled": undefined,
  "name": undefined,
  "snacks": Array [],
}
`);
  });
});
