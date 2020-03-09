import { Child_Type, Simple, StateEnum } from './simple';

const jan1 = new Date('1970-01-01T00:00:00.000Z');

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = {
      name: 'asdf',
      age: 1,
      child: { name: 'child', type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grand_children: [{ name: 'grand1', type: Child_Type.UNKNOWN }, { name: 'grand2', type: Child_Type.UNKNOWN }],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      old_states: [StateEnum.ON, StateEnum.OFF],
      created_at: jan1,
      thing: undefined
    };
    expect(simple.name).toEqual('asdf');
  });
});
