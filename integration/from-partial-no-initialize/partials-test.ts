import { TPartial } from './test'

describe('partials-test', () => {
  it('works with singular fields', () => {
    const test = {
      number: 2,
      string: 'hi',
      message: {
        field: 'hello'
      }
    };

    const result = TPartial.fromPartial(test);

    expect(result).toEqual(test);
  });

  it('works with repeated fields', () => {
    const test = {
      map: {
        a: 'b',
        c: 'd'
      },

      repeatedMessage: [
        {
          field: 'world'
        },
        {
          field: 'hello'
        }
      ],

      repeatedString: [
        'goodbye',
        'world'
      ],

      repeatedNumber: [
        1,
        2,
        3
      ]
    };

    const result = TPartial.fromPartial(test);

    expect(result).toEqual(test);
  });
})
