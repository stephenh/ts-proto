import { Simple } from './simple';

describe('simple', () => {
  it('generates json field names correctly', () => {
    const simple: Simple = Simple.fromPartial({ name: 'test' });
    const convertJsonObject: any = Simple.toJSON(simple);
    // Check if the generated json field name is correct
    expect(Object.prototype.hasOwnProperty.call(convertJsonObject, 'other_name')).toBe(true);

    if (typeof convertJsonObject?.other_name === 'string') {
      expect(convertJsonObject.other_name).toBe('test');
    }

    // Check if field names from parsed json are correct
    const jsonObject = {
      other_name: 'test',
      other_age: 10,
      createdAt: '2020-01-01T00:00:00.000Z',
    };
    const simple2: Simple = Simple.fromJSON(jsonObject);
    expect(simple2.name).toBe('test');
    expect(typeof simple2.age).toBe('number');
    expect(typeof simple2.createdAt).toBe(typeof new Date());
  });
});
