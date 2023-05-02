import Long = require('long');
import { MapBigInt } from './test'

describe('maps-test', () => {
  it('works with bigints', () => {
    const test = MapBigInt.fromJSON({
      map: {
        1: 2,
        3: 4
      }
    });

    expect(test).toEqual({
      map: new Map([
        [new Long(1, 0, false), new Long(2, 0, false)],
        [new Long(3, 0, false), new Long(4, 0, false)]
      ])
    });

    const data = MapBigInt.encode(test).finish();
    const result = MapBigInt.decode(data);

    expect(result).toEqual({
      map: new Map([
        [new Long(1, 0, true), new Long(2, 0, false)],
        [new Long(3, 0, true), new Long(4, 0, false)]
      ])
    });
  });
})
