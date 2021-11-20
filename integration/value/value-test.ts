import { Reader } from 'protobufjs';
import {ValueMessage} from "./value";

import { ValueMessage as PbValueMessage } from './pbjs';


describe('values', () => {
  it('json value', () => {
    const s1 = ValueMessage.fromJSON({
      value: "Hello",
      anyList: [1, "foo", true],
      repeatedAny: [2, "bar", false],
    });

    const s2 = PbValueMessage.decode(Reader.create(ValueMessage.encode(s1).finish()));

    expect(s2).toMatchInlineSnapshot(`
      Object {
        "anyList": Object {
          "values": Array [
            Object {
              "numberValue": 1,
            },
            Object {
              "stringValue": "foo",
            },
            Object {
              "boolValue": true,
            },
          ],
        },
        "value": Object {
          "stringValue": "Hello",
        },
      }
    `);
  });

  it('decodes lists of any types correctly', () => {
    const s1 = ValueMessage.fromJSON({
      anyList: [1, "foo", true],
      repeatedAny: [2, "bar", false],
    });
    expect(s1).toEqual({anyList: [1, "foo", true],  repeatedAny: [2, "bar", false]});
  })

  it('toJson', () => {
    const s1 = ValueMessage.fromPartial({
      anyList: [1],
      repeatedAny: [2],
    });
    expect(s1).toEqual({anyList: [1], repeatedAny: [2]});
  })
});
