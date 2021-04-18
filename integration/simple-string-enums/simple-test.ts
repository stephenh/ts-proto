import { Simple, StateEnum } from './simple';

describe('simple-string-enums', () => {
  it('encodes', () => {
    const s1: Simple = { name: 'a', state: StateEnum.ON, states: [StateEnum.ON, StateEnum.OFF] };
    const b = Simple.encode(s1).finish();
    const s2 = Simple.decode(b);
    expect(s2).toMatchInlineSnapshot(`
      Object {
        "name": "a",
        "state": "ON",
        "states": Array [
          "ON",
          "OFF",
        ],
      }
    `);
  });
});
