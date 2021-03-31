import { Foo } from './foo';
import { Bar } from './bar/bar';
import { messageTypeRegistry } from './typeRegistry';

describe('type-registry', () => {
  it('should output $type field for every message', () => {
    expect(Foo.fromPartial({})).toMatchInlineSnapshot(`
      Object {
        "$type": "foo.Foo",
        "timestamp": undefined,
      }
    `);
    expect(Bar.fromPartial({})).toMatchInlineSnapshot(`
      Object {
        "$type": "foo.bar.Bar",
        "foo": undefined,
      }
    `);
  });

  it('should register every type', () => {
    expect(messageTypeRegistry.get('foo.Foo')).toBe(Foo);
    expect(messageTypeRegistry.get('foo.bar.Bar')).toBe(Bar);
  });
});
