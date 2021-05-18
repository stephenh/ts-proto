import { Simple } from './simple';

describe('Simple', () => {
  it('type checking works correctly', () => {
    const simple: Simple = {
      name: 'foo',
      otherSimple: {
        simple2Name: 'bar',
        simple2Age: 1,
      },
    }
  });
})
