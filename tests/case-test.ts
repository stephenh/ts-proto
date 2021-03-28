import { maybeSnakeToCamel } from '../src/case';

describe('case', () => {
  it('converts snake to camel by default', () => {
    expect(maybeSnakeToCamel('foo_bar', { snakeToCamel: true })).toEqual('fooBar');
  });

  it('leaves as-is if snakeToCamel is false', () => {
    expect(maybeSnakeToCamel('foo_bar', { snakeToCamel: false })).toEqual('foo_bar');
  });

  it('de-upper cases', () => {
    expect(maybeSnakeToCamel('FOO_BAR', { snakeToCamel: true })).toEqual('FooBar');
  });

  it('leaves the first character as it was', () => {
    expect(maybeSnakeToCamel('Foo_Bar', { snakeToCamel: true })).toEqual('FooBar');
  });

  it('does nothing is already camel', () => {
    expect(maybeSnakeToCamel('FooBar', { snakeToCamel: true })).toEqual('FooBar');
  });
});
