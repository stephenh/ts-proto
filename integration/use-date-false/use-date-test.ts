import { Metadata } from './metadata';

describe('useDate=false', () => {
  it('generates types that compile and encode', () => {
    const output = Metadata.encode({
        lastEdited: {
            seconds: 123456789,
            nanos: 234567890,
        }
    }).finish();
    expect(output.length).toBeGreaterThan(8);
  });
});