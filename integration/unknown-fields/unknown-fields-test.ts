import { CodeGeneratorRequest } from "./google/protobuf/compiler/plugin";
import { promisify } from "util";
import { readFile } from "fs";

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
              "defaultValue": "",
              "extendee": "",
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
                "ctype": 0,
                "deprecated": false,
                "jstype": 0,
                "lazy": false,
                "packed": false,
                "uninterpretedOption": [],
                "weak": false,
              },
              "proto3Optional": true,
              "type": 5,
              "typeName": "",
            },
            {
              "_unknownFields": {},
              "defaultValue": "",
              "extendee": "",
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
                "ctype": 0,
                "deprecated": false,
                "jstype": 0,
                "lazy": false,
                "packed": false,
                "uninterpretedOption": [],
                "weak": false,
              },
              "proto3Optional": true,
              "type": 5,
              "typeName": "",
            },
            {
              "_unknownFields": {},
              "defaultValue": "",
              "extendee": "",
              "jsonName": "bar",
              "label": 1,
              "name": "bar",
              "number": 3,
              "oneofIndex": 3,
              "options": undefined,
              "proto3Optional": true,
              "type": 9,
              "typeName": "",
            },
            {
              "_unknownFields": {},
              "defaultValue": "",
              "extendee": "",
              "jsonName": "quux",
              "label": 1,
              "name": "quux",
              "number": 4,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": false,
              "type": 9,
              "typeName": "",
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
            "deprecated": false,
            "mapEntry": false,
            "messageSetWireFormat": false,
            "noStandardDescriptorAccessor": false,
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
            "allowAlias": false,
            "deprecated": false,
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
                "deprecated": false,
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
              "clientStreaming": false,
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
                "deprecated": false,
                "idempotencyLevel": 0,
                "uninterpretedOption": [],
              },
              "outputType": ".ResponseType",
              "serverStreaming": false,
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
            "deprecated": false,
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
        "ccEnableArenas": true,
        "ccGenericServices": false,
        "csharpNamespace": "",
        "deprecated": false,
        "goPackage": "",
        "javaGenerateEqualsAndHash": false,
        "javaGenericServices": false,
        "javaMultipleFiles": false,
        "javaOuterClassname": "",
        "javaPackage": "",
        "javaStringCheckUtf8": false,
        "objcClassPrefix": "",
        "optimizeFor": 1,
        "phpClassPrefix": "",
        "phpGenericServices": false,
        "phpMetadataNamespace": "",
        "phpNamespace": "",
        "pyGenericServices": false,
        "rubyPackage": "",
        "swiftPrefix": "",
        "uninterpretedOption": [],
      }
    `);

    const encoded = CodeGeneratorRequest.encode(request).finish();
    const secondRequest = CodeGeneratorRequest.decode(encoded);

    expect(request).toStrictEqual(secondRequest);
  });
});
