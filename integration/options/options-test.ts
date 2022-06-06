import { protoMetadata } from './options';

describe('options', () => {
  it('generates types correctly', () => {
    expect(protoMetadata).toMatchSnapshot();
  });
});
