import { Reader } from 'protobufjs';
import { FieldMaskMessage } from './fieldmask';

import { FieldMaskMessage as PbFieldMaskMessage } from './pbjs';

let data = {
  fieldMask: "a,b,c.d",
};

describe('fieldmask', () => {
  it('can encode objects', () => {
    const s1 = FieldMaskMessage.fromJSON(data);
    const s2 = PbFieldMaskMessage.decode(Reader.create(FieldMaskMessage.encode(s1).finish()));

    expect(s2).toMatchInlineSnapshot(`
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

  it('can decode objects', () => {
    let message = FieldMaskMessage.fromJSON(data);
    let encodedValue = FieldMaskMessage.encode(message).finish();
    const decodedValue = FieldMaskMessage.decode(Reader.create(encodedValue));

    expect(FieldMaskMessage.toJSON(decodedValue)).toEqual(data);
  });
});
