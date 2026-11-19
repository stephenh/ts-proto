import { Bar, Foo } from './';

describe('barrel-imports-with-context', () => {
  it('re-exports files that both have services with dataloaders', () => {
    expect(Foo.fromPartial({ name: 'foo' }).name).toBe('foo');
    expect(Bar.fromPartial({ name: 'bar' }).name).toBe('bar');
  });
});
