import { CodeGeneratorRequest } from './google/protobuf/compiler/plugin';
import { promisify } from 'util';
import { readFile } from 'fs';

describe('unknown-fields', () => {
  it('decodes unknown fields', async () => {
    const stdin = await promisify(readFile)(__dirname + '/options.bin');
    const request = CodeGeneratorRequest.decode(stdin);
    expect(request.protoFile).toHaveLength(3);
    expect(request.protoFile[2].messageType).toMatchInlineSnapshot(`
      Array [
        Object {
          "_unknownFields": Object {},
          "enumType": Array [],
          "extension": Array [],
          "extensionRange": Array [],
          "field": Array [
            Object {
              "_unknownFields": Object {},
              "defaultValue": "",
              "extendee": "",
              "jsonName": "foo",
              "label": 1,
              "name": "foo",
              "number": 1,
              "oneofIndex": 1,
              "options": Object {
                "_unknownFields": Object {
                  "400021": Array [
                    Object {
                      "data": Array [
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
                "uninterpretedOption": Array [],
                "weak": false,
              },
              "proto3Optional": true,
              "type": 5,
              "typeName": "",
            },
            Object {
              "_unknownFields": Object {},
              "defaultValue": "",
              "extendee": "",
              "jsonName": "foo2",
              "label": 1,
              "name": "foo_2",
              "number": 2,
              "oneofIndex": 2,
              "options": Object {
                "_unknownFields": Object {
                  "8002": Array [
                    Object {
                      "data": Array [
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
                "uninterpretedOption": Array [],
                "weak": false,
              },
              "proto3Optional": true,
              "type": 5,
              "typeName": "",
            },
            Object {
              "_unknownFields": Object {},
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
            Object {
              "_unknownFields": Object {},
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
          "nestedType": Array [],
          "oneofDecl": Array [
            Object {
              "_unknownFields": Object {},
              "name": "qux",
              "options": Object {
                "_unknownFields": Object {
                  "400024": Array [
                    Object {
                      "data": Array [
                        42,
                      ],
                      "type": "Buffer",
                    },
                  ],
                },
                "uninterpretedOption": Array [],
              },
            },
            Object {
              "_unknownFields": Object {},
              "name": "_foo",
              "options": undefined,
            },
            Object {
              "_unknownFields": Object {},
              "name": "_foo_2",
              "options": undefined,
            },
            Object {
              "_unknownFields": Object {},
              "name": "_bar",
              "options": undefined,
            },
          ],
          "options": Object {
            "_unknownFields": Object {
              "400008": Array [
                Object {
                  "data": Array [
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
            "uninterpretedOption": Array [],
          },
          "reservedName": Array [],
          "reservedRange": Array [],
        },
        Object {
          "_unknownFields": Object {},
          "enumType": Array [],
          "extension": Array [],
          "extensionRange": Array [],
          "field": Array [],
          "name": "RequestType",
          "nestedType": Array [],
          "oneofDecl": Array [],
          "options": undefined,
          "reservedName": Array [],
          "reservedRange": Array [],
        },
        Object {
          "_unknownFields": Object {},
          "enumType": Array [],
          "extension": Array [],
          "extensionRange": Array [],
          "field": Array [],
          "name": "ResponseType",
          "nestedType": Array [],
          "oneofDecl": Array [],
          "options": undefined,
          "reservedName": Array [],
          "reservedRange": Array [],
        },
      ]
    `);
    expect(request.protoFile[2].enumType).toMatchInlineSnapshot(`
      Array [
        Object {
          "_unknownFields": Object {},
          "name": "MyEnum",
          "options": Object {
            "_unknownFields": Object {
              "400032": Array [
                Object {
                  "data": Array [
                    1,
                  ],
                  "type": "Buffer",
                },
              ],
            },
            "allowAlias": false,
            "deprecated": false,
            "uninterpretedOption": Array [],
          },
          "reservedName": Array [],
          "reservedRange": Array [],
          "value": Array [
            Object {
              "_unknownFields": Object {},
              "name": "FOO",
              "number": 0,
              "options": Object {
                "_unknownFields": Object {
                  "400040": Array [
                    Object {
                      "data": Array [
                        193,
                        2,
                      ],
                      "type": "Buffer",
                    },
                  ],
                },
                "deprecated": false,
                "uninterpretedOption": Array [],
              },
            },
            Object {
              "_unknownFields": Object {},
              "name": "BAR",
              "number": 1,
              "options": undefined,
            },
          ],
        },
      ]
    `);
    expect(request.protoFile[2].service).toMatchInlineSnapshot(`
      Array [
        Object {
          "_unknownFields": Object {},
          "method": Array [
            Object {
              "_unknownFields": Object {},
              "clientStreaming": false,
              "inputType": ".RequestType",
              "name": "MyMethod",
              "options": Object {
                "_unknownFields": Object {
                  "400058": Array [
                    Object {
                      "data": Array [
                        3,
                        8,
                        150,
                        1,
                      ],
                      "type": "Buffer",
                    },
                    Object {
                      "data": Array [
                        3,
                        16,
                        150,
                        1,
                      ],
                      "type": "Buffer",
                    },
                    Object {
                      "data": Array [
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
                    Object {
                      "data": Array [
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
                "uninterpretedOption": Array [],
              },
              "outputType": ".ResponseType",
              "serverStreaming": false,
            },
          ],
          "name": "MyService",
          "options": Object {
            "_unknownFields": Object {
              "400048": Array [
                Object {
                  "data": Array [
                    0,
                  ],
                  "type": "Buffer",
                },
              ],
            },
            "deprecated": false,
            "uninterpretedOption": Array [],
          },
        },
      ]
    `);
    expect(request.protoFile[2].options).toMatchInlineSnapshot(`
      Object {
        "_unknownFields": Object {
          "400002": Array [
            Object {
              "data": Array [
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
        "ccEnableArenas": false,
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
        "uninterpretedOption": Array [],
      }
    `);

    const encoded = CodeGeneratorRequest.encode(request).finish();
    const secondRequest = CodeGeneratorRequest.decode(encoded);

    expect(request).toStrictEqual(secondRequest);
  });
});
