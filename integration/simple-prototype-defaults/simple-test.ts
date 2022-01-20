import { Child_Type, Simple, StateEnum } from './simple';

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = {
      birthday: undefined,
      blob: Buffer.from([]),
      blobs: [],
      name: 'asdf',
      age: 1,
      child: { name: 'child', type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [{ name: 'grand1', type: Child_Type.UNKNOWN }, { name: 'grand2', type: Child_Type.UNKNOWN }],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: [StateEnum.ON, StateEnum.OFF],
      createdAt: new Date('1970-01-01T00:00:00.000Z'),
      thing: undefined
    };
    expect(simple.name).toEqual('asdf');
  });
});
