import { Point } from './point';

describe('point', () => {
  it('can encode/decode bytes', () => {
    const p1: Point = { data: Buffer.from('testblob') };
    const data = Point.encode(p1).finish();
    const p2 = Point.decode(data);
    const b2: Buffer = p2.data;
    expect(b2.toString('hex')).toMatchInlineSnapshot(`"74657374626c6f62"`);
  });
});
