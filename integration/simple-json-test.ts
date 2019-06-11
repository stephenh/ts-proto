import { Simple, StateEnum } from '../build/integration/simple';
import { SimpleWithWrappers } from '../build/integration/simple';
import { simple as pbjs } from '../build/integration/pbjs';
import { Tile_Value } from '../build/integration/vector_tile';
import ISimple = pbjs.ISimple;
import PbChild = pbjs.Child;
import PbSimple = pbjs.Simple;
import PbState = pbjs.StateEnum;

describe('simple', () => {
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
});
