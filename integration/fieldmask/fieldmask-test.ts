import { FieldMaskMessage } from './fieldmask';

let data = {
  fieldMask: 'a,b,c.d',
};

describe('fieldmask', () => {
  it('can decode JSON', () => {
    const f = FieldMaskMessage.fromJSON(data);
    expect(f).toMatchInlineSnapshot(`
      Object {
        "fieldMask": Object {
          "paths": Array [
            "a",
            "b",
            "c.d",
          ],
        },
      }
    `);
  });

  it('can encode JSON', () => {
    const f = FieldMaskMessage.toJSON({ fieldMask: { paths: ['a', 'b', 'c.d'] } });
    expect(f).toEqual(data);
  });
});
