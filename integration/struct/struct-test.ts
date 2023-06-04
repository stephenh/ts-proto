import { Reader } from "protobufjs";
import { StructMessage } from "./struct";

import { StructMessage as PbStructMessage } from "./pbjs";

let data = {
  value: {
    name: "john",
    pet: null,
    posts: [{ id: 1, title: "hello world", public: true }],
  },
};

describe("struct", () => {
  it("can encode objects", () => {
    const s1 = StructMessage.fromJSON(data);
    const s2 = PbStructMessage.decode(Reader.create(StructMessage.encode(s1).finish()));

    expect(s2).toMatchInlineSnapshot(`
      {
        "value": {
          "fields": {
            "name": {
              "stringValue": "john",
            },
            "pet": {
              "nullValue": "NULL_VALUE",
            },
            "posts": {
              "listValue": {
                "values": [
                  {
                    "structValue": {
                      "fields": {
                        "id": {
                          "numberValue": 1,
                        },
                        "public": {
                          "boolValue": true,
                        },
                        "title": {
                          "stringValue": "hello world",
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      }
    `);
  });

  it("can decode objects", () => {
    let message = StructMessage.fromJSON(data);
    let encodedValue = StructMessage.encode(message).finish();
    const decodedValue = StructMessage.decode(Reader.create(encodedValue));

    expect(StructMessage.toJSON(decodedValue)).toEqual(data);
  });
});
