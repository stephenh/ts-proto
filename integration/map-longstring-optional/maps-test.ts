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
        ["1", "2"],
        ["3", "4"]
      ])
    })

    const data = MapBigInt.encode(test).finish();
    const result = MapBigInt.decode(data);

    expect(result).toEqual(test);
  });
})
