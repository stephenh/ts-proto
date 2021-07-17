import { Simple } from './simple';

describe('simple', () => {
  it('generates field names correctly', () => {
    const simple: Simple = Simple.fromPartial({});
    expect(Object.prototype.hasOwnProperty.call(simple, 'other_name')).toBe(true);
  });
});
