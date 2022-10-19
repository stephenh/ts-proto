import { Simple, StateEnum } from './simple';
import { NullValue } from './google/protobuf/struct';

describe('use-numeric-enum-json', () => {
  it('encodes', () => {
    const s: Simple = {
      name: 'a',
      state: StateEnum.ON,
      states: [StateEnum.ON, StateEnum.OFF],
      nullValue: NullValue.NULL_VALUE,
      stateMap: { on: StateEnum.ON },
    };

    const json = Simple.toJSON(s);

    // Make sure that enum values are encoded as integers.
    expect(json).toEqual({ name: 'a', nullValue: 0, state: 2, stateMap: { on: 2 }, states: [2, 3] });

    // Original object can be recovered from the json.
    expect(Simple.fromJSON(json)).toEqual(s);
  });
});
