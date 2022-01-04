import { Simple } from './delimited-methods';

describe('delimited-methods', () => {
  const message: Simple = {
    age: 42,
    name: 'John Doe',
    children: ['Jane', 'Jack', 'Joe'],
  };

  it('encodes with a length delimiter', () => {
    const encoded = Simple.encodeDelimited(message).finish();

    // -1 for the length delimiter
    const length = encoded.length - 1;
    const delimiter = encoded[0];

    expect(length).toEqual(delimiter);
  });

  it('decodes length-delimited messages', () => {
    const encoded = Simple.encodeDelimited(message).finish();
    const decoded = Simple.decodeDelimited(encoded);

    expect(decoded).toEqual(message);
  });
});
