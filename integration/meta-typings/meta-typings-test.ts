import { protoMetadata } from './simple';

describe('simple', () => {
  it('generates types correctly', () => {
    expect(protoMetadata).toMatchInlineSnapshot();
  });
});
