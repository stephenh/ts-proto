import { Point } from './point';

describe('point', () => {
  it('can encode/decode bytes', () => {
    const point: Point = {
      data: Buffer.from('testblob'),
      dataWrapped: Buffer.from('testblob')
    };
    const pointEncoded = Point.encode(point).finish();
    const pointDecoded = Point.decode(pointEncoded);
    const dataDecoded: Buffer = pointDecoded.data;
    const dataDecoded2: Buffer | undefined = pointDecoded.dataWrapped;
    expect(dataDecoded.toString('hex')).toMatchInlineSnapshot(`"74657374626c6f62"`);
    expect(dataDecoded2?.toString('hex')).toMatchInlineSnapshot(`"74657374626c6f62"`);
  });

  it('can encode/decode bytes as base64 json', () => {
    const point: Point = {
      data: Buffer.from('testblob'),
      dataWrapped: Buffer.from('testblob')
    };
    const json = Point.toJSON(point);
    expect(json).toEqual({ data: 'dGVzdGJsb2I=', dataWrapped: 'dGVzdGJsb2I=' });
    const pointDecoded = Point.fromJSON(json);
    expect(Buffer.isBuffer(pointDecoded.dataWrapped)).toBe(true);
    expect(pointDecoded.dataWrapped?.toString('hex')).toEqual('74657374626c6f62');
  });
});
