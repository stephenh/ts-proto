import { Point, PointMap } from './point';

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

  it('can encode/decode BytesValue map values as base64 json', () => {
    const pointMap: PointMap = { points: { a: Buffer.from('testblob') } };
    const json = PointMap.toJSON(pointMap);
    expect(json).toEqual({ points: { a: 'dGVzdGJsb2I=' } });
    const pointMapDecoded = PointMap.fromJSON(json);
    expect(Buffer.isBuffer(pointMapDecoded.points.a)).toBe(true);
    expect(pointMapDecoded.points.a?.toString('hex')).toEqual('74657374626c6f62');
  });

  it('keeps unset BytesValue map values through json', () => {
    const json = PointMap.toJSON({ points: { a: undefined } });
    expect(json).toEqual({ points: { a: undefined } });
    expect(PointMap.fromJSON(json)).toEqual({ points: { a: undefined } });
    expect(PointMap.fromJSON({ points: { a: null } })).toEqual({ points: { a: undefined } });
  });
});
