import * as Index from '.';

describe('output-index', () => {
  it('generates index files correctly', () => {
    expect(Index).toMatchObject({
        base: {
            A: {
                encode: expect.any(Function),
                decode: expect.any(Function),
            },
        },
    });
  });
});
