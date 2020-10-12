import { Child_Type, Simple, StateEnum, stateEnumFromJSON } from './simple';

const jan1 = new Date('1970-01-01T00:00:00.000Z');

describe('unrecognized enum', () => {
  it('does not add unrecognized to enum', () => {
    const simple: Simple = {
      name: 'asdf',
      age: 1,
      child: { name: 'child', type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [{ name: 'grand1', type: Child_Type.UNKNOWN }, { name: 'grand2', type: Child_Type.UNKNOWN }],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: [StateEnum.ON, StateEnum.OFF],
      createdAt: jan1,
      thing: undefined
    };
    expect(StateEnum[-1]).not.toBeTruthy();
  });
  it('generates an error throw for unrecognized enum values', () => {
    const unrecognizedValue = 'UnrecognizedValue' as any;
    expect(() => {
      stateEnumFromJSON(unrecognizedValue);
    }).toThrow('Unrecognized enum value ' + unrecognizedValue + ' for enum StateEnum');
  });
});
