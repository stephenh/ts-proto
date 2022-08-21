import { Simple, StateEnum } from './simple';
import { NullValue } from './google/protobuf/struct';

describe('simple-string-enums', () => {
  it('encodes', () => {
    const s1: Simple = {
      name: 'a',
      state: StateEnum.ON,
      states: [StateEnum.ON, StateEnum.OFF],
      nullValue: undefined,
      stateMap: { on: StateEnum.ON },
    };
    const b = Simple.encode(s1).finish();
    const s2 = Simple.decode(b);
    expect(s2).toMatchInlineSnapshot(`
      Object {
        "name": "a",
        "nullValue": undefined,
        "state": 2,
        "stateMap": Object {
          "on": 2,
        },
        "states": Array [
          2,
          3,
        ],
      }
    `);
  });
});
