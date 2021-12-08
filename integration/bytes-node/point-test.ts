import { Point } from './point';

describe('point', () => {
  it('can encode/decode bytes', () => {
    const p1: Point = {
      data: Buffer.from('testblob'),
      dataWrapped: Buffer.from('testblob')
    };
    const pointEncoded = Point.encode(p1).finish();
    const pointDecoded = Point.decode(pointEncoded);
    const dataDecoded: Buffer = pointDecoded.data;
    const dataDecoded2: Buffer | undefined = pointDecoded.dataWrapped;
    expect(dataDecoded.toString('hex')).toMatchInlineSnapshot(`"74657374626c6f62"`);
    expect(dataDecoded2?.toString('hex')).toMatchInlineSnapshot(`"74657374626c6f62"`);
  });
});
