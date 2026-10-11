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

  it('writes 64-bit keys as decimal strings in toJSON', () => {
    // JSON object keys are strings, so 64-bit keys need their exact decimal form;
    // converting them to a JS number throws above Number.MAX_SAFE_INTEGER.
    const test: MapBigInt = {
      map: new Map([
        [Long.fromString('18446744073709551615', true), Long.fromNumber(5)],
        [Long.fromNumber(1, true), Long.fromNumber(2)]
      ])
    };

    expect(MapBigInt.toJSON(test)).toEqual({
      map: { '18446744073709551615': '5', '1': '2' }
    });
  });
})
