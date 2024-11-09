import { readFile } from "fs";
import { promisify } from "util";
import { CodeGeneratorRequest } from "./google/protobuf/compiler/plugin";

describe("unknown-fields", () => {
  it("decodes unknown fields", async () => {
    const stdin = await promisify(readFile)(__dirname + "/options.bin");
    const request = CodeGeneratorRequest.decode(stdin);
    expect(request.protoFile).toHaveLength(3);
    expect(request.protoFile[2].messageType).toMatchInlineSnapshot(`
      [
        {
          "_unknownFields": {},
          "enumType": [],
          "extension": [],
          "extensionRange": [],
          "field": [
            {
              "_unknownFields": {},
              "defaultValue": undefined,
              "extendee": undefined,
              "jsonName": "foo",
              "label": 1,
              "name": "foo",
              "number": 1,
              "oneofIndex": 1,
              "options": {
                "_unknownFields": {
                  "400021": [
                    {
                      "data": [
                        0,
                        0,
                        144,
                        64,
                      ],
                      "type": "Buffer",
                    },
                  ],
                },
                "ctype": undefined,
                "deprecated": undefined,
                "jstype": undefined,
                "lazy": undefined,
                "packed": undefined,
                "uninterpretedOption": [],
                "weak": undefined,
              },
              "proto3Optional": true,
              "type": 5,
              "typeName": undefined,
            },
            {
              "_unknownFields": {},
              "defaultValue": undefined,
              "extendee": undefined,
              "jsonName": "foo2",
              "label": 1,
              "name": "foo_2",
              "number": 2,
              "oneofIndex": 2,
              "options": {
                "_unknownFields": {
                  "8002": [
                    {
                      "data": [
                        12,
                        10,
                        5,
                        119,
                        111,
                        114,
                        108,
                        100,
                        18,
                        3,
                        123,
                        217,
                        2,
                      ],
                      "type": "Buffer",
                    },
                  ],
                },
                "ctype": undefined,
                "deprecated": undefined,
                "jstype": undefined,
                "lazy": undefined,
                "packed": undefined,
                "uninterpretedOption": [],
                "weak": undefined,
              },
              "proto3Optional": true,
              "type": 5,
              "typeName": undefined,
            },
            {
              "_unknownFields": {},
              "defaultValue": undefined,
              "extendee": undefined,
              "jsonName": "bar",
              "label": 1,
              "name": "bar",
              "number": 3,
              "oneofIndex": 3,
              "options": undefined,
              "proto3Optional": true,
              "type": 9,
              "typeName": undefined,
            },
            {
              "_unknownFields": {},
              "defaultValue": undefined,
              "extendee": undefined,
              "jsonName": "quux",
              "label": 1,
              "name": "quux",
              "number": 4,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": undefined,
              "type": 9,
              "typeName": undefined,
            },
          ],
          "name": "MyMessage",
          "nestedType": [],
          "oneofDecl": [
            {
              "_unknownFields": {},
              "name": "qux",
              "options": {
                "_unknownFields": {
                  "400024": [
                    {
                      "data": [
                        42,
                      ],
                      "type": "Buffer",
                    },
                  ],
                },
                "uninterpretedOption": [],
              },
            },
            {
              "_unknownFields": {},
              "name": "_foo",
              "options": undefined,
            },
            {
              "_unknownFields": {},
              "name": "_foo_2",
              "options": undefined,
            },
            {
              "_unknownFields": {},
              "name": "_bar",
              "options": undefined,
            },
          ],
          "options": {
            "_unknownFields": {
              "400008": [
                {
                  "data": [
                    210,
                    9,
                  ],
                  "type": "Buffer",
                },
              ],
            },
            "deprecated": undefined,
            "mapEntry": undefined,
            "messageSetWireFormat": undefined,
            "noStandardDescriptorAccessor": undefined,
            "uninterpretedOption": [],
          },
          "reservedName": [],
          "reservedRange": [],
        },
        {
          "_unknownFields": {},
          "enumType": [],
          "extension": [],
          "extensionRange": [],
          "field": [],
          "name": "RequestType",
          "nestedType": [],
          "oneofDecl": [],
          "options": undefined,
          "reservedName": [],
          "reservedRange": [],
        },
        {
          "_unknownFields": {},
          "enumType": [],
          "extension": [],
          "extensionRange": [],
          "field": [],
          "name": "ResponseType",
          "nestedType": [],
          "oneofDecl": [],
          "options": undefined,
          "reservedName": [],
          "reservedRange": [],
        },
      ]
    `);
    expect(request.protoFile[2].enumType).toMatchInlineSnapshot(`
      [
        {
          "_unknownFields": {},
          "name": "MyEnum",
          "options": {
            "_unknownFields": {
              "400032": [
                {
                  "data": [
                    1,
                  ],
                  "type": "Buffer",
                },
              ],
            },
            "allowAlias": undefined,
            "deprecated": undefined,
            "uninterpretedOption": [],
          },
          "reservedName": [],
          "reservedRange": [],
          "value": [
            {
              "_unknownFields": {},
              "name": "FOO",
              "number": 0,
              "options": {
                "_unknownFields": {
                  "400040": [
                    {
                      "data": [
                        193,
                        2,
                      ],
                      "type": "Buffer",
                    },
                  ],
                },
                "deprecated": undefined,
                "uninterpretedOption": [],
              },
            },
            {
              "_unknownFields": {},
              "name": "BAR",
              "number": 1,
              "options": undefined,
            },
          ],
        },
      ]
    `);
    expect(request.protoFile[2].service).toMatchInlineSnapshot(`
      [
        {
          "_unknownFields": {},
          "method": [
            {
              "_unknownFields": {},
              "clientStreaming": undefined,
              "inputType": ".RequestType",
              "name": "MyMethod",
              "options": {
                "_unknownFields": {
                  "400058": [
                    {
                      "data": [
                        3,
                        8,
                        150,
                        1,
                      ],
                      "type": "Buffer",
                    },
                    {
                      "data": [
                        3,
                        16,
                        150,
                        1,
                      ],
                      "type": "Buffer",
                    },
                    {
                      "data": [
                        13,
                        26,
                        11,
                        83,
                        111,
                        109,
                        101,
                        32,
                        115,
                        116,
                        114,
                        105,
                        110,
                        103,
                      ],
                      "type": "Buffer",
                    },
                    {
                      "data": [
                        13,
                        34,
                        11,
                        83,
                        111,
                        109,
                        101,
                        32,
                        115,
                        116,
                        114,
                        105,
                        110,
                        103,
                      ],
                      "type": "Buffer",
                    },
                  ],
                },
                "deprecated": undefined,
                "idempotencyLevel": undefined,
                "uninterpretedOption": [],
              },
              "outputType": ".ResponseType",
              "serverStreaming": undefined,
            },
          ],
          "name": "MyService",
          "options": {
            "_unknownFields": {
              "400048": [
                {
                  "data": [
                    0,
                  ],
                  "type": "Buffer",
                },
              ],
            },
            "deprecated": undefined,
            "uninterpretedOption": [],
          },
        },
      ]
    `);
    expect(request.protoFile[2].options).toMatchInlineSnapshot(`
      {
        "_unknownFields": {
          "400002": [
            {
              "data": [
                12,
                72,
                101,
                108,
                108,
                111,
                32,
                119,
                111,
                114,
                108,
                100,
                33,
              ],
              "type": "Buffer",
            },
          ],
        },
        "ccEnableArenas": undefined,
        "ccGenericServices": undefined,
        "csharpNamespace": undefined,
        "deprecated": undefined,
        "goPackage": undefined,
        "javaGenerateEqualsAndHash": undefined,
        "javaGenericServices": undefined,
        "javaMultipleFiles": undefined,
        "javaOuterClassname": undefined,
        "javaPackage": undefined,
        "javaStringCheckUtf8": undefined,
        "objcClassPrefix": undefined,
        "optimizeFor": undefined,
        "phpClassPrefix": undefined,
        "phpGenericServices": undefined,
        "phpMetadataNamespace": undefined,
        "phpNamespace": undefined,
        "pyGenericServices": undefined,
        "rubyPackage": undefined,
        "swiftPrefix": undefined,
        "uninterpretedOption": [],
      }
    `);

    const encoded = CodeGeneratorRequest.encode(request).finish();
    // TODO remove Buffer.from after migrating to BinaryReader
    // Context:
    // - decode() with protobuf.js' Reader will populate unknown fields with Buffers when it's
    //   reading from a Buffer, and populate them with Uint8Arrays if it's reading from a Uint8Array.
    // - Before encode() was updated to use BinaryWriter, `encoded` was a Buffer, now it is a
    //   plain Uint8Array.
    // - This causes the comparison below to fail, because we're decoding the first request from
    //   stdin (a Buffer), and the second request from a Uint8Array.
    // To fix the broken test, we simply convert `encoded` to a Buffer. Migrating to BinaryReader
    // will always use Uint8Array for unknown fields.
    // const secondRequest = CodeGeneratorRequest.decode(encoded);
    const secondRequest = CodeGeneratorRequest.decode(Buffer.from(encoded));

    expect(request).toStrictEqual(secondRequest);
  });
});
