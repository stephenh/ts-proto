import { Simple, StateEnum } from './simple';
import { NullValue } from "./google/protobuf/struct";

describe('simple-string-enums', () => {
  it('encodes', () => {
    const s1: Simple = { name: 'a', state: StateEnum.ON, states: [StateEnum.ON, StateEnum.OFF], nullValue: NullValue.NULL_VALUE };
    const b = Simple.encode(s1).finish();
    const s2 = Simple.decode(b);
    expect(s2).toMatchInlineSnapshot(`
      Object {
        "name": "a",
        "nullValue": "NULL_VALUE",
        "state": "ON",
        "states": Array [
          "ON",
          "OFF",
        ],
      }
    `);
  });
});
