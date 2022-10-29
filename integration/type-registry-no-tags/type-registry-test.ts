import { Foo, Foo2 } from './foo';
import { Bar } from './bar/bar';
import { messageTypeRegistry } from './typeRegistry';

describe('type-registry-no-tags', () => {
  it('should not output $type field for every message', () => {
    expect(Foo.fromPartial({})).toMatchInlineSnapshot(`
      Object {
        "timestamp": undefined,
      }
    `);
    expect(Bar.fromPartial({})).toMatchInlineSnapshot(`
      Object {
        "foo": undefined,
      }
    `);
  });

  it('should register every type', () => {
    expect(messageTypeRegistry.get('foo.Foo')).toBe(Foo);
    expect(messageTypeRegistry.get('foo.bar.Bar')).toBe(Bar);
  });
});
