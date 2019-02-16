import { Reader } from 'protobufjs';
import { SimpleWithWrappers } from '../build/simple';
import { google, simple as pbjs } from '../build/pbjs';
import PbSimpleWithWrappers = pbjs.SimpleWithWrappers;
import PbStringValue = google.protobuf.StringValue;
import PbInt32Value = google.protobuf.Int32Value;

describe('simple value types', () => {
  it('can encode value wrappers as proto', () => {
    const s1: SimpleWithWrappers = {
      name: 'first',
      age: 1,
      enabled: true,
      coins: [1, 2],
      snacks: ['a', 'b']
    };
    const s2 = PbSimpleWithWrappers.decode(Reader.create(SimpleWithWrappers.encode(s1).finish()));
    // pbjs toJSON still uses the wrapper objects, so we can't compare directly against s1
    expect(s2).toMatchInlineSnapshot(`
Object {
  "age": Object {
    "value": 1,
  },
  "coins": Array [
    Object {
      "value": 1,
    },
    Object {
      "value": 2,
    },
  ],
  "enabled": Object {
    "value": true,
  },
  "name": Object {
    "value": "first",
  },
  "snacks": Array [
    Object {
      "value": "a",
    },
    Object {
      "value": "b",
    },
  ],
}
`);
  });

  it('can encode null value wrappers as proto', () => {
    const s1: SimpleWithWrappers = {
      name: undefined,
      age: undefined,
      enabled: undefined,
      coins: [], // should be undefined
      snacks: []
    };
    const s2 = PbSimpleWithWrappers.decode(Reader.create(SimpleWithWrappers.encode(s1).finish()));
    // pbjs toJSON still uses the wrapper objects, so we can't compare directly against s1
    expect(s2).toMatchInlineSnapshot(`Object {}`);
  });

  it('can decode value wrappers as proto', () => {
    const s1 = PbSimpleWithWrappers.create({
      name: PbStringValue.create({ value: 'asdf' }),
      age: PbInt32Value.create({ value: 1 })
    });
    const s2 = SimpleWithWrappers.decode(Reader.create(PbSimpleWithWrappers.encode(s1).finish()));
    expect(s2).toMatchInlineSnapshot(`
Object {
  "age": 1,
  "coins": Array [],
  "name": "asdf",
  "snacks": Array [],
}
`);
  });

  it('can decode null value wrappers as proto', () => {
    const s1 = PbSimpleWithWrappers.create({});
    const s2 = SimpleWithWrappers.decode(Reader.create(PbSimpleWithWrappers.encode(s1).finish()));
    expect(s2).toMatchInlineSnapshot(`
Object {
  "coins": Array [],
  "snacks": Array [],
}
`);
  });

  it('observes how pbjs handles collections of default values', () => {
    const s1 = PbSimpleWithWrappers.create({
      coins: [PbInt32Value.create({ value: 1 })]
    });
    const s2 = PbSimpleWithWrappers.decode(PbSimpleWithWrappers.encode(s1).finish());
    expect(s2.coins.map(c => c.value)).toEqual([1]);
  });
});
