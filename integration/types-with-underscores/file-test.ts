import { Baz, FooBar } from './file';

describe('file', () => {
  it('compiles', () => {
    const fooBar: FooBar = {};
    const baz: Baz = { foo: fooBar };
    expect(baz).not.toBeUndefined();
  });
});
