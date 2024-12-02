import { ValueMessage } from "./value";

import { ValueMessage as PbValueMessage } from "./pbjs";

describe("values", () => {
  it("json value", () => {
    const s1 = ValueMessage.fromJSON({
      value: "Hello",
      anyList: [1, "foo", true],
      repeatedAny: [2, "bar", false],
      nullValue: null,
    });

    const s2 = PbValueMessage.decode(ValueMessage.encode(s1).finish());

    expect(s2).toMatchInlineSnapshot(`
      {
        "anyList": {
          "values": [
            {
              "numberValue": 1,
            },
            {
              "stringValue": "foo",
            },
            {
              "boolValue": true,
            },
          ],
        },
        "repeatedAny": [
          {
            "numberValue": 2,
          },
          {
            "stringValue": "bar",
          },
          {
            "boolValue": false,
          },
        ],
        "value": {
          "stringValue": "Hello",
        },
      }
    `);
  });

  it("decodes lists of any types correctly", () => {
    const s1 = ValueMessage.fromJSON({
      anyList: [1, "foo", true],
      repeatedAny: [2, "bar", false, { key: "value" }],
    });
    expect(s1).toEqual({
      anyList: [1, "foo", true],
      repeatedAny: [2, "bar", false, { key: "value" }],
      repeatedStrings: [],
    });
  });

  it("toJson", () => {
    const s1 = ValueMessage.fromPartial({
      anyList: [1],
      repeatedAny: [2],
    });
    expect(s1).toEqual({ anyList: [1], repeatedAny: [2], repeatedStrings: [] });
  });
});
