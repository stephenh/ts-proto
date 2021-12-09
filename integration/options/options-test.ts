import { protoMetadata } from './options';

describe('options', () => {
  it('generates types correctly', () => {
    expect(protoMetadata).toMatchInlineSnapshot(`
      Object {
        "dependencies": Array [
          Object {
            "dependencies": Array [],
            "fileDescriptor": Object {
              "dependency": Array [],
              "enumType": Array [],
              "extension": Array [],
              "messageType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "file",
                      "label": 3,
                      "name": "file",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.FileDescriptorProto",
                    },
                  ],
                  "name": "FileDescriptorSet",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "package",
                      "label": 1,
                      "name": "package",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "dependency",
                      "label": 3,
                      "name": "dependency",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "publicDependency",
                      "label": 3,
                      "name": "public_dependency",
                      "number": 10,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "weakDependency",
                      "label": 3,
                      "name": "weak_dependency",
                      "number": 11,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "messageType",
                      "label": 3,
                      "name": "message_type",
                      "number": 4,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.DescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "enumType",
                      "label": 3,
                      "name": "enum_type",
                      "number": 5,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.EnumDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "service",
                      "label": 3,
                      "name": "service",
                      "number": 6,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.ServiceDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "extension",
                      "label": 3,
                      "name": "extension",
                      "number": 7,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.FieldDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "options",
                      "label": 1,
                      "name": "options",
                      "number": 8,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.FileOptions",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "sourceCodeInfo",
                      "label": 1,
                      "name": "source_code_info",
                      "number": 9,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.SourceCodeInfo",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "syntax",
                      "label": 1,
                      "name": "syntax",
                      "number": 12,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                  ],
                  "name": "FileDescriptorProto",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "field",
                      "label": 3,
                      "name": "field",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.FieldDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "extension",
                      "label": 3,
                      "name": "extension",
                      "number": 6,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.FieldDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "nestedType",
                      "label": 3,
                      "name": "nested_type",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.DescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "enumType",
                      "label": 3,
                      "name": "enum_type",
                      "number": 4,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.EnumDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "extensionRange",
                      "label": 3,
                      "name": "extension_range",
                      "number": 5,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.DescriptorProto.ExtensionRange",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "oneofDecl",
                      "label": 3,
                      "name": "oneof_decl",
                      "number": 8,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.OneofDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "options",
                      "label": 1,
                      "name": "options",
                      "number": 7,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.MessageOptions",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "reservedRange",
                      "label": 3,
                      "name": "reserved_range",
                      "number": 9,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.DescriptorProto.ReservedRange",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "reservedName",
                      "label": 3,
                      "name": "reserved_name",
                      "number": 10,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                  ],
                  "name": "DescriptorProto",
                  "nestedType": Array [
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "start",
                          "label": 1,
                          "name": "start",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "end",
                          "label": 1,
                          "name": "end",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.ExtensionRangeOptions",
                        },
                      ],
                      "name": "ExtensionRange",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "start",
                          "label": 1,
                          "name": "start",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "end",
                          "label": 1,
                          "name": "end",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                      ],
                      "name": "ReservedRange",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                  ],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "ExtensionRangeOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [
                    Object {
                      "name": "Type",
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                      "value": Array [
                        Object {
                          "name": "TYPE_DOUBLE",
                          "number": 1,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_FLOAT",
                          "number": 2,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_INT64",
                          "number": 3,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_UINT64",
                          "number": 4,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_INT32",
                          "number": 5,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_FIXED64",
                          "number": 6,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_FIXED32",
                          "number": 7,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_BOOL",
                          "number": 8,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_STRING",
                          "number": 9,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_GROUP",
                          "number": 10,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_MESSAGE",
                          "number": 11,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_BYTES",
                          "number": 12,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_UINT32",
                          "number": 13,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_ENUM",
                          "number": 14,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_SFIXED32",
                          "number": 15,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_SFIXED64",
                          "number": 16,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_SINT32",
                          "number": 17,
                          "options": undefined,
                        },
                        Object {
                          "name": "TYPE_SINT64",
                          "number": 18,
                          "options": undefined,
                        },
                      ],
                    },
                    Object {
                      "name": "Label",
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                      "value": Array [
                        Object {
                          "name": "LABEL_OPTIONAL",
                          "number": 1,
                          "options": undefined,
                        },
                        Object {
                          "name": "LABEL_REQUIRED",
                          "number": 2,
                          "options": undefined,
                        },
                        Object {
                          "name": "LABEL_REPEATED",
                          "number": 3,
                          "options": undefined,
                        },
                      ],
                    },
                  ],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "number",
                      "label": 1,
                      "name": "number",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "label",
                      "label": 1,
                      "name": "label",
                      "number": 4,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 14,
                      "typeName": ".google.protobuf.FieldDescriptorProto.Label",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "type",
                      "label": 1,
                      "name": "type",
                      "number": 5,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 14,
                      "typeName": ".google.protobuf.FieldDescriptorProto.Type",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "typeName",
                      "label": 1,
                      "name": "type_name",
                      "number": 6,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "extendee",
                      "label": 1,
                      "name": "extendee",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "defaultValue",
                      "label": 1,
                      "name": "default_value",
                      "number": 7,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "oneofIndex",
                      "label": 1,
                      "name": "oneof_index",
                      "number": 9,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "jsonName",
                      "label": 1,
                      "name": "json_name",
                      "number": 10,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "options",
                      "label": 1,
                      "name": "options",
                      "number": 8,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.FieldOptions",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "proto3Optional",
                      "label": 1,
                      "name": "proto3_optional",
                      "number": 17,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                  ],
                  "name": "FieldDescriptorProto",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "options",
                      "label": 1,
                      "name": "options",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.OneofOptions",
                    },
                  ],
                  "name": "OneofDescriptorProto",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "value",
                      "label": 3,
                      "name": "value",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.EnumValueDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "options",
                      "label": 1,
                      "name": "options",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.EnumOptions",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "reservedRange",
                      "label": 3,
                      "name": "reserved_range",
                      "number": 4,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "reservedName",
                      "label": 3,
                      "name": "reserved_name",
                      "number": 5,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                  ],
                  "name": "EnumDescriptorProto",
                  "nestedType": Array [
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "start",
                          "label": 1,
                          "name": "start",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "end",
                          "label": 1,
                          "name": "end",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                      ],
                      "name": "EnumReservedRange",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                  ],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "number",
                      "label": 1,
                      "name": "number",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "options",
                      "label": 1,
                      "name": "options",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.EnumValueOptions",
                    },
                  ],
                  "name": "EnumValueDescriptorProto",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "method",
                      "label": 3,
                      "name": "method",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.MethodDescriptorProto",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "options",
                      "label": 1,
                      "name": "options",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.ServiceOptions",
                    },
                  ],
                  "name": "ServiceDescriptorProto",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 1,
                      "name": "name",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "inputType",
                      "label": 1,
                      "name": "input_type",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "outputType",
                      "label": 1,
                      "name": "output_type",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "options",
                      "label": 1,
                      "name": "options",
                      "number": 4,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.MethodOptions",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "clientStreaming",
                      "label": 1,
                      "name": "client_streaming",
                      "number": 5,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "serverStreaming",
                      "label": 1,
                      "name": "server_streaming",
                      "number": 6,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                  ],
                  "name": "MethodDescriptorProto",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [
                    Object {
                      "name": "OptimizeMode",
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                      "value": Array [
                        Object {
                          "name": "SPEED",
                          "number": 1,
                          "options": undefined,
                        },
                        Object {
                          "name": "CODE_SIZE",
                          "number": 2,
                          "options": undefined,
                        },
                        Object {
                          "name": "LITE_RUNTIME",
                          "number": 3,
                          "options": undefined,
                        },
                      ],
                    },
                  ],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "javaPackage",
                      "label": 1,
                      "name": "java_package",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "javaOuterClassname",
                      "label": 1,
                      "name": "java_outer_classname",
                      "number": 8,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "javaMultipleFiles",
                      "label": 1,
                      "name": "java_multiple_files",
                      "number": 10,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "javaGenerateEqualsAndHash",
                      "label": 1,
                      "name": "java_generate_equals_and_hash",
                      "number": 20,
                      "oneofIndex": 0,
                      "options": Object {
                        "ctype": 0,
                        "deprecated": true,
                        "jstype": 0,
                        "lazy": false,
                        "packed": false,
                        "uninterpretedOption": Array [],
                        "weak": false,
                      },
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "javaStringCheckUtf8",
                      "label": 1,
                      "name": "java_string_check_utf8",
                      "number": 27,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "SPEED",
                      "extendee": "",
                      "jsonName": "optimizeFor",
                      "label": 1,
                      "name": "optimize_for",
                      "number": 9,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 14,
                      "typeName": ".google.protobuf.FileOptions.OptimizeMode",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "goPackage",
                      "label": 1,
                      "name": "go_package",
                      "number": 11,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "ccGenericServices",
                      "label": 1,
                      "name": "cc_generic_services",
                      "number": 16,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "javaGenericServices",
                      "label": 1,
                      "name": "java_generic_services",
                      "number": 17,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "pyGenericServices",
                      "label": 1,
                      "name": "py_generic_services",
                      "number": 18,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "phpGenericServices",
                      "label": 1,
                      "name": "php_generic_services",
                      "number": 42,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "deprecated",
                      "label": 1,
                      "name": "deprecated",
                      "number": 23,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "true",
                      "extendee": "",
                      "jsonName": "ccEnableArenas",
                      "label": 1,
                      "name": "cc_enable_arenas",
                      "number": 31,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "objcClassPrefix",
                      "label": 1,
                      "name": "objc_class_prefix",
                      "number": 36,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "csharpNamespace",
                      "label": 1,
                      "name": "csharp_namespace",
                      "number": 37,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "swiftPrefix",
                      "label": 1,
                      "name": "swift_prefix",
                      "number": 39,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "phpClassPrefix",
                      "label": 1,
                      "name": "php_class_prefix",
                      "number": 40,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "phpNamespace",
                      "label": 1,
                      "name": "php_namespace",
                      "number": 41,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "phpMetadataNamespace",
                      "label": 1,
                      "name": "php_metadata_namespace",
                      "number": 44,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "rubyPackage",
                      "label": 1,
                      "name": "ruby_package",
                      "number": 45,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "FileOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [
                    Object {
                      "end": 39,
                      "start": 38,
                    },
                  ],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "messageSetWireFormat",
                      "label": 1,
                      "name": "message_set_wire_format",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "noStandardDescriptorAccessor",
                      "label": 1,
                      "name": "no_standard_descriptor_accessor",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "deprecated",
                      "label": 1,
                      "name": "deprecated",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "mapEntry",
                      "label": 1,
                      "name": "map_entry",
                      "number": 7,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "MessageOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [
                    Object {
                      "end": 5,
                      "start": 4,
                    },
                    Object {
                      "end": 6,
                      "start": 5,
                    },
                    Object {
                      "end": 7,
                      "start": 6,
                    },
                    Object {
                      "end": 9,
                      "start": 8,
                    },
                    Object {
                      "end": 10,
                      "start": 9,
                    },
                  ],
                },
                Object {
                  "enumType": Array [
                    Object {
                      "name": "CType",
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                      "value": Array [
                        Object {
                          "name": "STRING",
                          "number": 0,
                          "options": undefined,
                        },
                        Object {
                          "name": "CORD",
                          "number": 1,
                          "options": undefined,
                        },
                        Object {
                          "name": "STRING_PIECE",
                          "number": 2,
                          "options": undefined,
                        },
                      ],
                    },
                    Object {
                      "name": "JSType",
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                      "value": Array [
                        Object {
                          "name": "JS_NORMAL",
                          "number": 0,
                          "options": undefined,
                        },
                        Object {
                          "name": "JS_STRING",
                          "number": 1,
                          "options": undefined,
                        },
                        Object {
                          "name": "JS_NUMBER",
                          "number": 2,
                          "options": undefined,
                        },
                      ],
                    },
                  ],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "STRING",
                      "extendee": "",
                      "jsonName": "ctype",
                      "label": 1,
                      "name": "ctype",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 14,
                      "typeName": ".google.protobuf.FieldOptions.CType",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "packed",
                      "label": 1,
                      "name": "packed",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "JS_NORMAL",
                      "extendee": "",
                      "jsonName": "jstype",
                      "label": 1,
                      "name": "jstype",
                      "number": 6,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 14,
                      "typeName": ".google.protobuf.FieldOptions.JSType",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "lazy",
                      "label": 1,
                      "name": "lazy",
                      "number": 5,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "deprecated",
                      "label": 1,
                      "name": "deprecated",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "weak",
                      "label": 1,
                      "name": "weak",
                      "number": 10,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "FieldOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [
                    Object {
                      "end": 5,
                      "start": 4,
                    },
                  ],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "OneofOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "allowAlias",
                      "label": 1,
                      "name": "allow_alias",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "deprecated",
                      "label": 1,
                      "name": "deprecated",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "EnumOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [
                    Object {
                      "end": 6,
                      "start": 5,
                    },
                  ],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "deprecated",
                      "label": 1,
                      "name": "deprecated",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "EnumValueOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "deprecated",
                      "label": 1,
                      "name": "deprecated",
                      "number": 33,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "ServiceOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [
                    Object {
                      "name": "IdempotencyLevel",
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                      "value": Array [
                        Object {
                          "name": "IDEMPOTENCY_UNKNOWN",
                          "number": 0,
                          "options": undefined,
                        },
                        Object {
                          "name": "NO_SIDE_EFFECTS",
                          "number": 1,
                          "options": undefined,
                        },
                        Object {
                          "name": "IDEMPOTENT",
                          "number": 2,
                          "options": undefined,
                        },
                      ],
                    },
                  ],
                  "extension": Array [],
                  "extensionRange": Array [
                    Object {
                      "end": 536870912,
                      "options": undefined,
                      "start": 1000,
                    },
                  ],
                  "field": Array [
                    Object {
                      "defaultValue": "false",
                      "extendee": "",
                      "jsonName": "deprecated",
                      "label": 1,
                      "name": "deprecated",
                      "number": 33,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 8,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "IDEMPOTENCY_UNKNOWN",
                      "extendee": "",
                      "jsonName": "idempotencyLevel",
                      "label": 1,
                      "name": "idempotency_level",
                      "number": 34,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 14,
                      "typeName": ".google.protobuf.MethodOptions.IdempotencyLevel",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "uninterpretedOption",
                      "label": 3,
                      "name": "uninterpreted_option",
                      "number": 999,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption",
                    },
                  ],
                  "name": "MethodOptions",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "name",
                      "label": 3,
                      "name": "name",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.UninterpretedOption.NamePart",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "identifierValue",
                      "label": 1,
                      "name": "identifier_value",
                      "number": 3,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "positiveIntValue",
                      "label": 1,
                      "name": "positive_int_value",
                      "number": 4,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 4,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "negativeIntValue",
                      "label": 1,
                      "name": "negative_int_value",
                      "number": 5,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 3,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "doubleValue",
                      "label": 1,
                      "name": "double_value",
                      "number": 6,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 1,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "stringValue",
                      "label": 1,
                      "name": "string_value",
                      "number": 7,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 12,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "aggregateValue",
                      "label": 1,
                      "name": "aggregate_value",
                      "number": 8,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                  ],
                  "name": "UninterpretedOption",
                  "nestedType": Array [
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "namePart",
                          "label": 2,
                          "name": "name_part",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "isExtension",
                          "label": 2,
                          "name": "is_extension",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                      ],
                      "name": "NamePart",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                  ],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "location",
                      "label": 3,
                      "name": "location",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.SourceCodeInfo.Location",
                    },
                  ],
                  "name": "SourceCodeInfo",
                  "nestedType": Array [
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "path",
                          "label": 3,
                          "name": "path",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": Object {
                            "ctype": 0,
                            "deprecated": false,
                            "jstype": 0,
                            "lazy": false,
                            "packed": true,
                            "uninterpretedOption": Array [],
                            "weak": false,
                          },
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "span",
                          "label": 3,
                          "name": "span",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": Object {
                            "ctype": 0,
                            "deprecated": false,
                            "jstype": 0,
                            "lazy": false,
                            "packed": true,
                            "uninterpretedOption": Array [],
                            "weak": false,
                          },
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "leadingComments",
                          "label": 1,
                          "name": "leading_comments",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "trailingComments",
                          "label": 1,
                          "name": "trailing_comments",
                          "number": 4,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "leadingDetachedComments",
                          "label": 3,
                          "name": "leading_detached_comments",
                          "number": 6,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                      ],
                      "name": "Location",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                  ],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "annotation",
                      "label": 3,
                      "name": "annotation",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 11,
                      "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation",
                    },
                  ],
                  "name": "GeneratedCodeInfo",
                  "nestedType": Array [
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "path",
                          "label": 3,
                          "name": "path",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": Object {
                            "ctype": 0,
                            "deprecated": false,
                            "jstype": 0,
                            "lazy": false,
                            "packed": true,
                            "uninterpretedOption": Array [],
                            "weak": false,
                          },
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "sourceFile",
                          "label": 1,
                          "name": "source_file",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "begin",
                          "label": 1,
                          "name": "begin",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "end",
                          "label": 1,
                          "name": "end",
                          "number": 4,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                      ],
                      "name": "Annotation",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                  ],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "name": "google/protobuf/descriptor.proto",
              "options": Object {
                "ccEnableArenas": true,
                "ccGenericServices": false,
                "csharpNamespace": "Google.Protobuf.Reflection",
                "deprecated": false,
                "goPackage": "google.golang.org/protobuf/types/descriptorpb",
                "javaGenerateEqualsAndHash": false,
                "javaGenericServices": false,
                "javaMultipleFiles": false,
                "javaOuterClassname": "DescriptorProtos",
                "javaPackage": "com.google.protobuf",
                "javaStringCheckUtf8": false,
                "objcClassPrefix": "GPB",
                "optimizeFor": 1,
                "phpClassPrefix": "",
                "phpGenericServices": false,
                "phpMetadataNamespace": "",
                "phpNamespace": "",
                "pyGenericServices": false,
                "rubyPackage": "",
                "swiftPrefix": "",
                "uninterpretedOption": Array [],
              },
              "package": "google.protobuf",
              "publicDependency": Array [],
              "service": Array [],
              "sourceCodeInfo": Object {
                "location": Array [
                  Object {
                    "leadingComments": " descriptor.proto must be optimized for speed because reflection-based
       algorithms don't work during bootstrapping.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      8,
                      9,
                    ],
                    "span": Array [
                      52,
                      0,
                      28,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The protocol compiler can output a FileDescriptorSet containing the .proto
       files it parses.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      0,
                    ],
                    "span": Array [
                      56,
                      0,
                      58,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes a complete .proto file.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                    ],
                    "span": Array [
                      61,
                      0,
                      90,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      0,
                    ],
                    "span": Array [
                      62,
                      2,
                      27,
                    ],
                    "trailingComments": " file name, relative to root of source tree
      ",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      1,
                    ],
                    "span": Array [
                      63,
                      2,
                      30,
                    ],
                    "trailingComments": " e.g. \\"foo\\", \\"foo.bar\\", etc.
      ",
                  },
                  Object {
                    "leadingComments": " Names of files imported by this file.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      2,
                    ],
                    "span": Array [
                      66,
                      2,
                      33,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Indexes of the public imported files in the dependency list above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      3,
                    ],
                    "span": Array [
                      68,
                      2,
                      40,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Indexes of the weak imported files in the dependency list.
       For Google-internal migration only. Do not use.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      4,
                    ],
                    "span": Array [
                      71,
                      2,
                      38,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " All top-level definitions in this file.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      5,
                    ],
                    "span": Array [
                      74,
                      2,
                      44,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " This field contains optional information about the original source code.
       You may safely remove this entire field without harming runtime
       functionality of the descriptors -- the information is needed only by
       development tools.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      10,
                    ],
                    "span": Array [
                      85,
                      2,
                      47,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The syntax of the proto file.
       The supported values are \\"proto2\\" and \\"proto3\\".
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      1,
                      2,
                      11,
                    ],
                    "span": Array [
                      89,
                      2,
                      30,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes a message type.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                    ],
                    "span": Array [
                      93,
                      0,
                      125,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                      3,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      103,
                      4,
                      29,
                    ],
                    "trailingComments": " Inclusive.
      ",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                      3,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      104,
                      4,
                      27,
                    ],
                    "trailingComments": " Exclusive.
      ",
                  },
                  Object {
                    "leadingComments": " Range of reserved tag numbers. Reserved tag numbers may not be used by
       fields or extension ranges in the same message. Reserved ranges may
       not overlap.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                      3,
                      1,
                    ],
                    "span": Array [
                      117,
                      2,
                      120,
                      3,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                      3,
                      1,
                      2,
                      0,
                    ],
                    "span": Array [
                      118,
                      4,
                      29,
                    ],
                    "trailingComments": " Inclusive.
      ",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                      3,
                      1,
                      2,
                      1,
                    ],
                    "span": Array [
                      119,
                      4,
                      27,
                    ],
                    "trailingComments": " Exclusive.
      ",
                  },
                  Object {
                    "leadingComments": " Reserved field names, which may not be used by fields in the same message.
       A given name may only be reserved once.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      2,
                      2,
                      9,
                    ],
                    "span": Array [
                      124,
                      2,
                      37,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      3,
                      2,
                      0,
                    ],
                    "span": Array [
                      129,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      3,
                      5,
                    ],
                    "span": Array [
                      133,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes a field within a message.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                    ],
                    "span": Array [
                      137,
                      0,
                      238,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " 0 is reserved for errors.
       Order is weird for historical reasons.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      141,
                      4,
                      20,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
       negative values are likely.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      0,
                      2,
                      2,
                    ],
                    "span": Array [
                      145,
                      4,
                      19,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
       negative values are likely.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      0,
                      2,
                      4,
                    ],
                    "span": Array [
                      149,
                      4,
                      19,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Tag-delimited aggregate.
       Group type is deprecated and not supported in proto3. However, Proto3
       implementations should still be able to parse the group wire format and
       treat group fields as unknown fields.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      0,
                      2,
                      9,
                    ],
                    "span": Array [
                      158,
                      4,
                      20,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      0,
                      2,
                      10,
                    ],
                    "span": Array [
                      159,
                      4,
                      22,
                    ],
                    "trailingComments": " Length-delimited aggregate.
      ",
                  },
                  Object {
                    "leadingComments": " New in version 2.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      0,
                      2,
                      11,
                    ],
                    "span": Array [
                      162,
                      4,
                      20,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      0,
                      2,
                      16,
                    ],
                    "span": Array [
                      167,
                      4,
                      21,
                    ],
                    "trailingComments": " Uses ZigZag encoding.
      ",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      0,
                      2,
                      17,
                    ],
                    "span": Array [
                      168,
                      4,
                      21,
                    ],
                    "trailingComments": " Uses ZigZag encoding.
      ",
                  },
                  Object {
                    "leadingComments": " 0 is reserved for errors
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      4,
                      1,
                      2,
                      0,
                    ],
                    "span": Array [
                      173,
                      4,
                      23,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " If type_name is set, this need not be set.  If both this and type_name
       are set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      2,
                      3,
                    ],
                    "span": Array [
                      184,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " For message and enum types, this is the name of the type.  If the name
       starts with a '.', it is fully-qualified.  Otherwise, C++-like scoping
       rules are used to find the type (i.e. first the nested types within this
       message are searched, then within the parent, on up to the root
       namespace).
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      2,
                      4,
                    ],
                    "span": Array [
                      191,
                      2,
                      32,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " For extensions, this is the name of the type being extended.  It is
       resolved in the same manner as type_name.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      2,
                      5,
                    ],
                    "span": Array [
                      195,
                      2,
                      31,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " For numeric types, contains the original text representation of the value.
       For booleans, \\"true\\" or \\"false\\".
       For strings, contains the default text contents (not escaped in any way).
       For bytes, contains the C escaped value.  All bytes >= 128 are escaped.
       TODO(kenton):  Base-64 encode?
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      2,
                      6,
                    ],
                    "span": Array [
                      202,
                      2,
                      36,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " If set, gives the index of a oneof in the containing type's oneof_decl
       list.  This field is a member of that oneof.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      2,
                      7,
                    ],
                    "span": Array [
                      206,
                      2,
                      33,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " JSON name of this field. The value is set by protocol compiler. If the
       user has set a \\"json_name\\" option on this field, that option's value
       will be used. Otherwise, it's deduced from the field's name by converting
       it to camelCase.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      2,
                      8,
                    ],
                    "span": Array [
                      212,
                      2,
                      33,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " If true, this is a proto3 \\"optional\\". When a proto3 field is optional, it
       tracks presence regardless of field type.

       When proto3_optional is true, this field must be belong to a oneof to
       signal to old proto3 clients that presence is tracked for this field. This
       oneof is known as a \\"synthetic\\" oneof, and this field must be its sole
       member (each proto3 optional field gets its own synthetic oneof). Synthetic
       oneofs exist in the descriptor only, and do not generate any API. Synthetic
       oneofs must be ordered after all \\"real\\" oneofs.

       For message fields, proto3_optional doesn't create any semantic change,
       since non-repeated message fields always track presence. However it still
       indicates the semantic detail of whether the user wrote \\"optional\\" or not.
       This can be useful for round-tripping the .proto file. For consistency we
       give message fields a synthetic oneof also, even though it is not required
       to track presence. This is especially important because the parser can't
       tell if a field is a message or an enum, so it must always create a
       synthetic oneof.

       Proto2 optional fields do not set this flag, because they already indicate
       optional with \`LABEL_OPTIONAL\`.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      4,
                      2,
                      10,
                    ],
                    "span": Array [
                      237,
                      2,
                      37,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes a oneof.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      5,
                    ],
                    "span": Array [
                      241,
                      0,
                      244,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes an enum type.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      6,
                    ],
                    "span": Array [
                      247,
                      0,
                      273,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Range of reserved numeric values. Reserved values may not be used by
       entries in the same enum. Reserved ranges may not overlap.

       Note that this is distinct from DescriptorProto.ReservedRange in that it
       is inclusive such that it can appropriately represent the entire int32
       domain.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      6,
                      3,
                      0,
                    ],
                    "span": Array [
                      260,
                      2,
                      263,
                      3,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      6,
                      3,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      261,
                      4,
                      29,
                    ],
                    "trailingComments": " Inclusive.
      ",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      6,
                      3,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      262,
                      4,
                      27,
                    ],
                    "trailingComments": " Inclusive.
      ",
                  },
                  Object {
                    "leadingComments": " Range of reserved numeric values. Reserved numeric values may not be used
       by enum values in the same enum declaration. Reserved ranges may not
       overlap.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      6,
                      2,
                      3,
                    ],
                    "span": Array [
                      268,
                      2,
                      48,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Reserved enum value names, which may not be reused. A given name may only
       be reserved once.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      6,
                      2,
                      4,
                    ],
                    "span": Array [
                      272,
                      2,
                      36,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes a value within an enum.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      7,
                    ],
                    "span": Array [
                      276,
                      0,
                      281,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes a service.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      8,
                    ],
                    "span": Array [
                      284,
                      0,
                      289,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes a method of a service.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      9,
                    ],
                    "span": Array [
                      292,
                      0,
                      306,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Input and output type names.  These are resolved in the same way as
       FieldDescriptorProto.type_name, but must refer to a message type.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      9,
                      2,
                      1,
                    ],
                    "span": Array [
                      297,
                      2,
                      33,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Identifies if client streams multiple client messages
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      9,
                      2,
                      4,
                    ],
                    "span": Array [
                      303,
                      2,
                      55,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Identifies if server streams multiple server messages
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      9,
                      2,
                      5,
                    ],
                    "span": Array [
                      305,
                      2,
                      55,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Sets the Java package where classes generated from this .proto will be
       placed.  By default, the proto package is used, but this is often
       inappropriate because proto packages do not normally start with backwards
       domain names.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      0,
                    ],
                    "span": Array [
                      347,
                      2,
                      35,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Controls the name of the wrapper Java class generated for the .proto file.
       That class will always contain the .proto file's getDescriptor() method as
       well as any top-level extensions defined in the .proto file.
       If java_multiple_files is disabled, then all the other classes from the
       .proto file will be nested inside the single wrapper outer class.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      1,
                    ],
                    "span": Array [
                      355,
                      2,
                      43,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " If enabled, then the Java code generator will generate a separate .java
       file for each top-level message, enum, and service defined in the .proto
       file.  Thus, these types will *not* be nested inside the wrapper class
       named by java_outer_classname.  However, the wrapper class will still be
       generated to contain the file's getDescriptor() method as well as any
       top-level extensions defined in the file.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      2,
                    ],
                    "span": Array [
                      363,
                      2,
                      59,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " This option does nothing.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      3,
                    ],
                    "span": Array [
                      366,
                      2,
                      69,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " If set true, then the Java2 code generator will generate code that
       throws an exception whenever an attempt is made to assign a non-UTF-8
       byte sequence to a string field.
       Message reflection will do the same.
       However, an extension field still accepts non-UTF-8 byte sequences.
       This option has no effect on when used with the lite runtime.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      4,
                    ],
                    "span": Array [
                      374,
                      2,
                      62,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Generated classes can be optimized for speed or code size.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      4,
                      0,
                    ],
                    "span": Array [
                      378,
                      2,
                      383,
                      3,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      4,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      379,
                      4,
                      14,
                    ],
                    "trailingComments": " Generate complete code for parsing, serialization,
      ",
                  },
                  Object {
                    "leadingComments": " etc.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      4,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      381,
                      4,
                      18,
                    ],
                    "trailingComments": " Use ReflectionOps to implement these methods.
      ",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      4,
                      0,
                      2,
                      2,
                    ],
                    "span": Array [
                      382,
                      4,
                      21,
                    ],
                    "trailingComments": " Generate code using MessageLite and the lite runtime.
      ",
                  },
                  Object {
                    "leadingComments": " Sets the Go package where structs generated from this .proto will be
       placed. If omitted, the Go package will be derived from the following:
         - The basename of the package import path, if provided.
         - Otherwise, the package statement in the .proto file, if present.
         - Otherwise, the basename of the .proto file, without extension.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      6,
                    ],
                    "span": Array [
                      391,
                      2,
                      34,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Should generic services be generated in each language?  \\"Generic\\" services
       are not specific to any particular RPC system.  They are generated by the
       main code generators in each language (without additional plugins).
       Generic services were the only kind of service generation supported by
       early versions of google.protobuf.

       Generic services are now considered deprecated in favor of using plugins
       that generate code specific to your particular RPC system.  Therefore,
       these default to false.  Old code which depends on generic services should
       explicitly set them to true.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      7,
                    ],
                    "span": Array [
                      406,
                      2,
                      59,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Is this file deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for everything in the file, or it will be completely ignored; in the very
       least, this is a formalization for deprecating files.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      11,
                    ],
                    "span": Array [
                      415,
                      2,
                      50,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Enables the use of arenas for the proto messages in this file. This applies
       only to generated classes for C++.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      12,
                    ],
                    "span": Array [
                      419,
                      2,
                      55,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Sets the objective c class prefix which is prepended to all objective c
       generated classes from this .proto. There is no default.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      13,
                    ],
                    "span": Array [
                      424,
                      2,
                      41,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Namespace for generated classes; defaults to the package.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      14,
                    ],
                    "span": Array [
                      427,
                      2,
                      40,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " By default Swift generators will take the proto package and CamelCase it
       replacing '.' with underscore and use that to prefix the types/symbols
       defined. When this options is provided, they will use this value instead
       to prefix the types/symbols defined.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      15,
                    ],
                    "span": Array [
                      433,
                      2,
                      36,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Sets the php class prefix which is prepended to all php generated classes
       from this .proto. Default is empty.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      16,
                    ],
                    "span": Array [
                      437,
                      2,
                      40,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Use this option to change the namespace of php generated classes. Default
       is empty. When this option is empty, the package name will be used for
       determining the namespace.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      17,
                    ],
                    "span": Array [
                      442,
                      2,
                      37,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Use this option to change the namespace of php generated metadata classes.
       Default is empty. When this option is empty, the proto file name will be
       used for determining the namespace.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      18,
                    ],
                    "span": Array [
                      447,
                      2,
                      46,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Use this option to change the package of ruby generated classes. Default
       is empty. When this option is not set, the package name will be used for
       determining the ruby package.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      19,
                    ],
                    "span": Array [
                      452,
                      2,
                      36,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here.
       See the documentation for the \\"Options\\" section above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      2,
                      20,
                    ],
                    "span": Array [
                      457,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message.
       See the documentation for the \\"Options\\" section above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      10,
                      5,
                    ],
                    "span": Array [
                      461,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Set true to use the old proto1 MessageSet wire format for extensions.
       This is provided for backwards-compatibility with the MessageSet wire
       format.  You should not use this for any other reason:  It's less
       efficient, has fewer features, and is more complicated.

       The message must be defined exactly as follows:
         message Foo {
           option message_set_wire_format = true;
           extensions 4 to max;
         }
       Note that the message cannot have any defined fields; MessageSets only
       have extensions.

       All extensions of your type must be singular messages; e.g. they cannot
       be int32s, enums, or repeated messages.

       Because this is an option, the above two restrictions are not enforced by
       the protocol compiler.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      11,
                      2,
                      0,
                    ],
                    "span": Array [
                      485,
                      2,
                      62,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Disables the generation of the standard \\"descriptor()\\" accessor, which can
       conflict with a field of the same name.  This is meant to make migration
       from proto1 easier; new code should avoid fields named \\"descriptor\\".
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      11,
                      2,
                      1,
                    ],
                    "span": Array [
                      490,
                      2,
                      70,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Is this message deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the message, or it will be completely ignored; in the very least,
       this is a formalization for deprecating messages.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      11,
                      2,
                      2,
                    ],
                    "span": Array [
                      496,
                      2,
                      49,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Whether the message is an automatically generated map entry type for the
       maps field.

       For maps fields:
           map<KeyType, ValueType> map_field = 1;
       The parsed descriptor looks like:
           message MapFieldEntry {
               option map_entry = true;
               optional KeyType key = 1;
               optional ValueType value = 2;
           }
           repeated MapFieldEntry map_field = 1;

       Implementations may choose not to generate the map_entry=true message, but
       use a native map in the target language to hold the keys and values.
       The reflection APIs in such implementations still need to work as
       if the field is a repeated message field.

       NOTE: Do not set the option in .proto files. Always use the maps syntax
       instead. The option should only be implicitly set by the proto compiler
       parser.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      11,
                      2,
                      3,
                    ],
                    "span": Array [
                      521,
                      2,
                      30,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      11,
                      9,
                    ],
                    "span": Array [
                      523,
                      2,
                      13,
                    ],
                    "trailingComments": " javalite_serializable
      ",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      11,
                      9,
                    ],
                    "span": Array [
                      524,
                      2,
                      13,
                    ],
                    "trailingComments": " javanano_as_lite
      ",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      11,
                      2,
                      4,
                    ],
                    "span": Array [
                      528,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      11,
                      5,
                    ],
                    "span": Array [
                      531,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The ctype option instructs the C++ code generator to use a different
       representation of the field than it normally would.  See the specific
       options below.  This option is not yet implemented in the open source
       release -- sorry, we'll try to include it in a future version!
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      2,
                      0,
                    ],
                    "span": Array [
                      539,
                      2,
                      46,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Default mode.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      4,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      542,
                      4,
                      15,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The packed option can be enabled for repeated primitive fields to enable
       a more efficient representation on the wire. Rather than repeatedly
       writing the tag and type for each element, the entire array is encoded as
       a single length-delimited blob. In proto3, only explicit setting it to
       false will avoid using packed encoding.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      2,
                      1,
                    ],
                    "span": Array [
                      553,
                      2,
                      27,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The jstype option determines the JavaScript type used for values of the
       field.  The option is permitted only for 64 bit integral and fixed types
       (int64, uint64, sint64, fixed64, sfixed64).  A field with jstype JS_STRING
       is represented as JavaScript string, which avoids loss of precision that
       can happen when a large value is converted to a floating point JavaScript.
       Specifying JS_NUMBER for the jstype causes the generated JavaScript code to
       use the JavaScript \\"number\\" type.  The behavior of the default option
       JS_NORMAL is implementation dependent.

       This option is an enum to permit additional types to be added, e.g.
       goog.math.Integer.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      2,
                      2,
                    ],
                    "span": Array [
                      566,
                      2,
                      51,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Use the default type.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      4,
                      1,
                      2,
                      0,
                    ],
                    "span": Array [
                      569,
                      4,
                      18,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Use JavaScript strings.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      4,
                      1,
                      2,
                      1,
                    ],
                    "span": Array [
                      572,
                      4,
                      18,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Use JavaScript numbers.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      4,
                      1,
                      2,
                      2,
                    ],
                    "span": Array [
                      575,
                      4,
                      18,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Should this field be parsed lazily?  Lazy applies only to message-type
       fields.  It means that when the outer message is initially parsed, the
       inner message's contents will not be parsed but instead stored in encoded
       form.  The inner message will actually be parsed when it is first accessed.

       This is only a hint.  Implementations are free to choose whether to use
       eager or lazy parsing regardless of the value of this option.  However,
       setting this option true suggests that the protocol author believes that
       using lazy parsing on this field is worth the additional bookkeeping
       overhead typically needed to implement it.

       This option does not affect the public interface of any generated code;
       all method signatures remain the same.  Furthermore, thread-safety of the
       interface is not affected by this option; const methods remain safe to
       call from multiple threads concurrently, while non-const methods continue
       to require exclusive access.


       Note that implementations may choose not to check required fields within
       a lazy sub-message.  That is, calling IsInitialized() on the outer message
       may return true even if the inner message has missing required fields.
       This is necessary because otherwise the inner message would have to be
       parsed in order to perform the check, defeating the purpose of lazy
       parsing.  An implementation which chooses not to check required fields
       must be consistent about it.  That is, for any particular sub-message, the
       implementation must either *always* check its required fields, or *never*
       check its required fields, regardless of whether or not the message has
       been parsed.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      2,
                      3,
                    ],
                    "span": Array [
                      606,
                      2,
                      43,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Is this field deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for accessors, or it will be completely ignored; in the very least, this
       is a formalization for deprecating fields.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      2,
                      4,
                    ],
                    "span": Array [
                      612,
                      2,
                      49,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " For Google-internal migration only. Do not use.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      2,
                      5,
                    ],
                    "span": Array [
                      615,
                      2,
                      44,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      2,
                      6,
                    ],
                    "span": Array [
                      619,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      5,
                    ],
                    "span": Array [
                      622,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      12,
                      9,
                    ],
                    "span": Array [
                      624,
                      2,
                      13,
                    ],
                    "trailingComments": " removed jtype
      ",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      13,
                      2,
                      0,
                    ],
                    "span": Array [
                      629,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      13,
                      5,
                    ],
                    "span": Array [
                      632,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Set this option to true to allow mapping different tag names to the same
       value.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      14,
                      2,
                      0,
                    ],
                    "span": Array [
                      639,
                      2,
                      32,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Is this enum deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the enum, or it will be completely ignored; in the very least, this
       is a formalization for deprecating enums.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      14,
                      2,
                      1,
                    ],
                    "span": Array [
                      645,
                      2,
                      49,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      14,
                      9,
                    ],
                    "span": Array [
                      647,
                      2,
                      13,
                    ],
                    "trailingComments": " javanano_as_lite
      ",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      14,
                      2,
                      2,
                    ],
                    "span": Array [
                      650,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      14,
                      5,
                    ],
                    "span": Array [
                      653,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Is this enum value deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the enum value, or it will be completely ignored; in the very least,
       this is a formalization for deprecating enum values.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      15,
                      2,
                      0,
                    ],
                    "span": Array [
                      661,
                      2,
                      49,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      15,
                      2,
                      1,
                    ],
                    "span": Array [
                      664,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      15,
                      5,
                    ],
                    "span": Array [
                      667,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Is this service deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the service, or it will be completely ignored; in the very least,
       this is a formalization for deprecating services.
      ",
                    "leadingDetachedComments": Array [
                      " Note:  Field numbers 1 through 32 are reserved for Google's internal RPC
         framework.  We apologize for hoarding these numbers to ourselves, but
         we were already using them long before we decided to release Protocol
         Buffers.
      ",
                    ],
                    "path": Array [
                      4,
                      16,
                      2,
                      0,
                    ],
                    "span": Array [
                      681,
                      2,
                      50,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      16,
                      2,
                      1,
                    ],
                    "span": Array [
                      684,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      16,
                      5,
                    ],
                    "span": Array [
                      687,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Is this method deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the method, or it will be completely ignored; in the very least,
       this is a formalization for deprecating methods.
      ",
                    "leadingDetachedComments": Array [
                      " Note:  Field numbers 1 through 32 are reserved for Google's internal RPC
         framework.  We apologize for hoarding these numbers to ourselves, but
         we were already using them long before we decided to release Protocol
         Buffers.
      ",
                    ],
                    "path": Array [
                      4,
                      17,
                      2,
                      0,
                    ],
                    "span": Array [
                      701,
                      2,
                      50,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
       or neither? HTTP based RPC implementation may choose GET verb for safe
       methods, and PUT verb for idempotent methods instead of the default POST.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      17,
                      4,
                      0,
                    ],
                    "span": Array [
                      706,
                      2,
                      710,
                      3,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      17,
                      4,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      708,
                      4,
                      24,
                    ],
                    "trailingComments": " implies idempotent
      ",
                  },
                  Object {
                    "leadingComments": "",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      17,
                      4,
                      0,
                      2,
                      2,
                    ],
                    "span": Array [
                      709,
                      4,
                      19,
                    ],
                    "trailingComments": " idempotent, but may have side effects
      ",
                  },
                  Object {
                    "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      17,
                      2,
                      2,
                    ],
                    "span": Array [
                      715,
                      2,
                      58,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      17,
                      5,
                    ],
                    "span": Array [
                      718,
                      2,
                      25,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " A message representing a option the parser does not recognize. This only
       appears in options protos created by the compiler::Parser class.
       DescriptorPool resolves these when building Descriptor objects. Therefore,
       options protos in descriptor objects (e.g. returned by Descriptor::options(),
       or produced by Descriptor::CopyTo()) will never have UninterpretedOptions
       in them.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      18,
                    ],
                    "span": Array [
                      728,
                      0,
                      748,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The name of the uninterpreted option.  Each string represents a segment in
       a dot-separated name.  is_extension is true iff a segment represents an
       extension (denoted with parentheses in options specs in .proto files).
       E.g.,{ [\\"foo\\", false], [\\"bar.baz\\", true], [\\"qux\\", false] } represents
       \\"foo.(bar.baz).qux\\".
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      18,
                      3,
                      0,
                    ],
                    "span": Array [
                      734,
                      2,
                      737,
                      3,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " The value of the uninterpreted option, in whatever type the tokenizer
       identified it as during parsing. Exactly one of these should be set.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      18,
                      2,
                      1,
                    ],
                    "span": Array [
                      742,
                      2,
                      39,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Encapsulates information about the original source file from which a
       FileDescriptorProto was generated.
      ",
                    "leadingDetachedComments": Array [
                      " ===================================================================
       Optional source code info
      ",
                    ],
                    "path": Array [
                      4,
                      19,
                    ],
                    "span": Array [
                      755,
                      0,
                      884,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " A Location identifies a piece of source code in a .proto file which
       corresponds to a particular definition.  This information is intended
       to be useful to IDEs, code indexers, documentation generators, and similar
       tools.

       For example, say we have a file like:
         message Foo {
           optional string foo = 1;
         }
       Let's look at just the field definition:
         optional string foo = 1;
         ^       ^^     ^^  ^  ^^^
         a       bc     de  f  ghi
       We have the following locations:
         span   path               represents
         [a,i)  [ 4, 0, 2, 0 ]     The whole field definition.
         [a,b)  [ 4, 0, 2, 0, 4 ]  The label (optional).
         [c,d)  [ 4, 0, 2, 0, 5 ]  The type (string).
         [e,f)  [ 4, 0, 2, 0, 1 ]  The name (foo).
         [g,h)  [ 4, 0, 2, 0, 3 ]  The number (1).

       Notes:
       - A location may refer to a repeated field itself (i.e. not to any
         particular index within it).  This is used whenever a set of elements are
         logically enclosed in a single code segment.  For example, an entire
         extend block (possibly containing multiple extension definitions) will
         have an outer location whose path refers to the \\"extensions\\" repeated
         field without an index.
       - Multiple locations may have the same path.  This happens when a single
         logical declaration is spread out across multiple places.  The most
         obvious example is the \\"extend\\" block again -- there may be multiple
         extend blocks in the same scope, each of which will have the same path.
       - A location's span is not always a subset of its parent's span.  For
         example, the \\"extendee\\" of an extension declaration appears at the
         beginning of the \\"extend\\" block and is shared by all extensions within
         the block.
       - Just because a location's span is a subset of some other location's span
         does not mean that it is a descendant.  For example, a \\"group\\" defines
         both a type and a field in a single declaration.  Thus, the locations
         corresponding to the type and field and their components will overlap.
       - Code which tries to interpret locations should probably be designed to
         ignore those that it doesn't understand, as more types of locations could
         be recorded in the future.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      19,
                      2,
                      0,
                    ],
                    "span": Array [
                      799,
                      2,
                      33,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Identifies which part of the FileDescriptorProto was defined at this
       location.

       Each element is a field number or an index.  They form a path from
       the root FileDescriptorProto to the place where the definition.  For
       example, this path:
         [ 4, 3, 2, 7, 1 ]
       refers to:
         file.message_type(3)  // 4, 3
             .field(7)         // 2, 7
             .name()           // 1
       This is because FileDescriptorProto.message_type has field number 4:
         repeated DescriptorProto message_type = 4;
       and DescriptorProto.field has field number 2:
         repeated FieldDescriptorProto field = 2;
       and FieldDescriptorProto.name has field number 1:
         optional string name = 1;

       Thus, the above path gives the location of a field name.  If we removed
       the last element:
         [ 4, 3, 2, 7 ]
       this path refers to the whole field declaration (from the beginning
       of the label to the terminating semicolon).
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      19,
                      3,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      824,
                      4,
                      44,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Always has exactly three or four elements: start line, start column,
       end line (optional, otherwise assumed same as start line), end column.
       These are packed into a single field for efficiency.  Note that line
       and column numbers are zero-based -- typically you will want to add
       1 to each before displaying to a user.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      19,
                      3,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      831,
                      4,
                      44,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " If this SourceCodeInfo represents a complete declaration, these are any
       comments appearing before and after the declaration which appear to be
       attached to the declaration.

       A series of line comments appearing on consecutive lines, with no other
       tokens appearing on those lines, will be treated as a single comment.

       leading_detached_comments will keep paragraphs of comments that appear
       before (but not connected to) the current element. Each paragraph,
       separated by empty lines, will be one comment element in the repeated
       field.

       Only the comment content is provided; comment markers (e.g. //) are
       stripped out.  For block comments, leading whitespace and an asterisk
       will be stripped from the beginning of each line other than the first.
       Newlines are included in the output.

       Examples:

         optional int32 foo = 1;  // Comment attached to foo.
         // Comment attached to bar.
         optional int32 bar = 2;

         optional string baz = 3;
         // Comment attached to baz.
         // Another line attached to baz.

         // Comment attached to qux.
         //
         // Another line attached to qux.
         optional double qux = 4;

         // Detached comment for corge. This is not leading or trailing comments
         // to qux or corge because there are blank lines separating it from
         // both.

         // Detached comment for corge paragraph 2.

         optional string corge = 5;
         /* Block comment attached
          * to corge.  Leading asterisks
          * will be removed. */
         /* Block comment attached to
          * grault. */
         optional int32 grault = 6;

         // ignored detached comments.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      19,
                      3,
                      0,
                      2,
                      2,
                    ],
                    "span": Array [
                      880,
                      4,
                      41,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Describes the relationship between generated code and its original source
       file. A GeneratedCodeInfo message is associated with only one generated
       source file, but may contain references to different source .proto files.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      20,
                    ],
                    "span": Array [
                      889,
                      0,
                      910,
                      1,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " An Annotation connects some span of text in generated code to an element
       of its generating .proto file.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      20,
                      2,
                      0,
                    ],
                    "span": Array [
                      892,
                      2,
                      37,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Identifies the element in the original source .proto file. This field
       is formatted the same as SourceCodeInfo.Location.path.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      20,
                      3,
                      0,
                      2,
                      0,
                    ],
                    "span": Array [
                      896,
                      4,
                      44,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Identifies the filesystem path to the original source .proto.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      20,
                      3,
                      0,
                      2,
                      1,
                    ],
                    "span": Array [
                      899,
                      4,
                      36,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Identifies the starting offset in bytes in the generated code
       that relates to the identified object.
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      20,
                      3,
                      0,
                      2,
                      2,
                    ],
                    "span": Array [
                      903,
                      4,
                      29,
                    ],
                    "trailingComments": "",
                  },
                  Object {
                    "leadingComments": " Identifies the ending offset in bytes in the generated code that
       relates to the identified offset. The end offset should be one past
       the last relevant byte (so the length of the text = end - begin).
      ",
                    "leadingDetachedComments": Array [],
                    "path": Array [
                      4,
                      20,
                      3,
                      0,
                      2,
                      3,
                    ],
                    "span": Array [
                      908,
                      4,
                      27,
                    ],
                    "trailingComments": "",
                  },
                ],
              },
              "syntax": "",
              "weakDependency": Array [],
            },
            "references": Object {
              ".google.protobuf.DescriptorProto": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.DescriptorProto.ExtensionRange": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.DescriptorProto.ReservedRange": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.EnumDescriptorProto": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.EnumDescriptorProto.EnumReservedRange": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.EnumOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.EnumValueDescriptorProto": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.EnumValueOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.ExtensionRangeOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.FieldDescriptorProto": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.FieldDescriptorProto.Label": Object {
                "-1": "UNRECOGNIZED",
                "1": "LABEL_OPTIONAL",
                "2": "LABEL_REQUIRED",
                "3": "LABEL_REPEATED",
                "LABEL_OPTIONAL": 1,
                "LABEL_REPEATED": 3,
                "LABEL_REQUIRED": 2,
                "UNRECOGNIZED": -1,
              },
              ".google.protobuf.FieldDescriptorProto.Type": Object {
                "-1": "UNRECOGNIZED",
                "1": "TYPE_DOUBLE",
                "10": "TYPE_GROUP",
                "11": "TYPE_MESSAGE",
                "12": "TYPE_BYTES",
                "13": "TYPE_UINT32",
                "14": "TYPE_ENUM",
                "15": "TYPE_SFIXED32",
                "16": "TYPE_SFIXED64",
                "17": "TYPE_SINT32",
                "18": "TYPE_SINT64",
                "2": "TYPE_FLOAT",
                "3": "TYPE_INT64",
                "4": "TYPE_UINT64",
                "5": "TYPE_INT32",
                "6": "TYPE_FIXED64",
                "7": "TYPE_FIXED32",
                "8": "TYPE_BOOL",
                "9": "TYPE_STRING",
                "TYPE_BOOL": 8,
                "TYPE_BYTES": 12,
                "TYPE_DOUBLE": 1,
                "TYPE_ENUM": 14,
                "TYPE_FIXED32": 7,
                "TYPE_FIXED64": 6,
                "TYPE_FLOAT": 2,
                "TYPE_GROUP": 10,
                "TYPE_INT32": 5,
                "TYPE_INT64": 3,
                "TYPE_MESSAGE": 11,
                "TYPE_SFIXED32": 15,
                "TYPE_SFIXED64": 16,
                "TYPE_SINT32": 17,
                "TYPE_SINT64": 18,
                "TYPE_STRING": 9,
                "TYPE_UINT32": 13,
                "TYPE_UINT64": 4,
                "UNRECOGNIZED": -1,
              },
              ".google.protobuf.FieldOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.FieldOptions.CType": Object {
                "-1": "UNRECOGNIZED",
                "0": "STRING",
                "1": "CORD",
                "2": "STRING_PIECE",
                "CORD": 1,
                "STRING": 0,
                "STRING_PIECE": 2,
                "UNRECOGNIZED": -1,
              },
              ".google.protobuf.FieldOptions.JSType": Object {
                "-1": "UNRECOGNIZED",
                "0": "JS_NORMAL",
                "1": "JS_STRING",
                "2": "JS_NUMBER",
                "JS_NORMAL": 0,
                "JS_NUMBER": 2,
                "JS_STRING": 1,
                "UNRECOGNIZED": -1,
              },
              ".google.protobuf.FileDescriptorProto": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.FileDescriptorSet": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.FileOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.FileOptions.OptimizeMode": Object {
                "-1": "UNRECOGNIZED",
                "1": "SPEED",
                "2": "CODE_SIZE",
                "3": "LITE_RUNTIME",
                "CODE_SIZE": 2,
                "LITE_RUNTIME": 3,
                "SPEED": 1,
                "UNRECOGNIZED": -1,
              },
              ".google.protobuf.GeneratedCodeInfo": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.GeneratedCodeInfo.Annotation": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.MessageOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.MethodDescriptorProto": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.MethodOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.MethodOptions.IdempotencyLevel": Object {
                "-1": "UNRECOGNIZED",
                "0": "IDEMPOTENCY_UNKNOWN",
                "1": "NO_SIDE_EFFECTS",
                "2": "IDEMPOTENT",
                "IDEMPOTENCY_UNKNOWN": 0,
                "IDEMPOTENT": 2,
                "NO_SIDE_EFFECTS": 1,
                "UNRECOGNIZED": -1,
              },
              ".google.protobuf.OneofDescriptorProto": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.OneofOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.ServiceDescriptorProto": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.ServiceOptions": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.SourceCodeInfo": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.SourceCodeInfo.Location": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.UninterpretedOption": Object {
                "decode": [Function],
                "encode": [Function],
              },
              ".google.protobuf.UninterpretedOption.NamePart": Object {
                "decode": [Function],
                "encode": [Function],
              },
            },
          },
          Object {
            "dependencies": Array [
              Object {
                "dependencies": Array [],
                "fileDescriptor": Object {
                  "dependency": Array [],
                  "enumType": Array [],
                  "extension": Array [],
                  "messageType": Array [
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "file",
                          "label": 3,
                          "name": "file",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.FileDescriptorProto",
                        },
                      ],
                      "name": "FileDescriptorSet",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "package",
                          "label": 1,
                          "name": "package",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "dependency",
                          "label": 3,
                          "name": "dependency",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "publicDependency",
                          "label": 3,
                          "name": "public_dependency",
                          "number": 10,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "weakDependency",
                          "label": 3,
                          "name": "weak_dependency",
                          "number": 11,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "messageType",
                          "label": 3,
                          "name": "message_type",
                          "number": 4,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.DescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "enumType",
                          "label": 3,
                          "name": "enum_type",
                          "number": 5,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.EnumDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "service",
                          "label": 3,
                          "name": "service",
                          "number": 6,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.ServiceDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "extension",
                          "label": 3,
                          "name": "extension",
                          "number": 7,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.FieldDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 8,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.FileOptions",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "sourceCodeInfo",
                          "label": 1,
                          "name": "source_code_info",
                          "number": 9,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.SourceCodeInfo",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "syntax",
                          "label": 1,
                          "name": "syntax",
                          "number": 12,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                      ],
                      "name": "FileDescriptorProto",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "field",
                          "label": 3,
                          "name": "field",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.FieldDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "extension",
                          "label": 3,
                          "name": "extension",
                          "number": 6,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.FieldDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "nestedType",
                          "label": 3,
                          "name": "nested_type",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.DescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "enumType",
                          "label": 3,
                          "name": "enum_type",
                          "number": 4,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.EnumDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "extensionRange",
                          "label": 3,
                          "name": "extension_range",
                          "number": 5,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.DescriptorProto.ExtensionRange",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "oneofDecl",
                          "label": 3,
                          "name": "oneof_decl",
                          "number": 8,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.OneofDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 7,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.MessageOptions",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "reservedRange",
                          "label": 3,
                          "name": "reserved_range",
                          "number": 9,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.DescriptorProto.ReservedRange",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "reservedName",
                          "label": 3,
                          "name": "reserved_name",
                          "number": 10,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                      ],
                      "name": "DescriptorProto",
                      "nestedType": Array [
                        Object {
                          "enumType": Array [],
                          "extension": Array [],
                          "extensionRange": Array [],
                          "field": Array [
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "start",
                              "label": 1,
                              "name": "start",
                              "number": 1,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "end",
                              "label": 1,
                              "name": "end",
                              "number": 2,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "options",
                              "label": 1,
                              "name": "options",
                              "number": 3,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 11,
                              "typeName": ".google.protobuf.ExtensionRangeOptions",
                            },
                          ],
                          "name": "ExtensionRange",
                          "nestedType": Array [],
                          "oneofDecl": Array [],
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                        },
                        Object {
                          "enumType": Array [],
                          "extension": Array [],
                          "extensionRange": Array [],
                          "field": Array [
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "start",
                              "label": 1,
                              "name": "start",
                              "number": 1,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "end",
                              "label": 1,
                              "name": "end",
                              "number": 2,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                          ],
                          "name": "ReservedRange",
                          "nestedType": Array [],
                          "oneofDecl": Array [],
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                        },
                      ],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "ExtensionRangeOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [
                        Object {
                          "name": "Type",
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                          "value": Array [
                            Object {
                              "name": "TYPE_DOUBLE",
                              "number": 1,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_FLOAT",
                              "number": 2,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_INT64",
                              "number": 3,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_UINT64",
                              "number": 4,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_INT32",
                              "number": 5,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_FIXED64",
                              "number": 6,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_FIXED32",
                              "number": 7,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_BOOL",
                              "number": 8,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_STRING",
                              "number": 9,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_GROUP",
                              "number": 10,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_MESSAGE",
                              "number": 11,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_BYTES",
                              "number": 12,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_UINT32",
                              "number": 13,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_ENUM",
                              "number": 14,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_SFIXED32",
                              "number": 15,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_SFIXED64",
                              "number": 16,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_SINT32",
                              "number": 17,
                              "options": undefined,
                            },
                            Object {
                              "name": "TYPE_SINT64",
                              "number": 18,
                              "options": undefined,
                            },
                          ],
                        },
                        Object {
                          "name": "Label",
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                          "value": Array [
                            Object {
                              "name": "LABEL_OPTIONAL",
                              "number": 1,
                              "options": undefined,
                            },
                            Object {
                              "name": "LABEL_REQUIRED",
                              "number": 2,
                              "options": undefined,
                            },
                            Object {
                              "name": "LABEL_REPEATED",
                              "number": 3,
                              "options": undefined,
                            },
                          ],
                        },
                      ],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "number",
                          "label": 1,
                          "name": "number",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "label",
                          "label": 1,
                          "name": "label",
                          "number": 4,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 14,
                          "typeName": ".google.protobuf.FieldDescriptorProto.Label",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "type",
                          "label": 1,
                          "name": "type",
                          "number": 5,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 14,
                          "typeName": ".google.protobuf.FieldDescriptorProto.Type",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "typeName",
                          "label": 1,
                          "name": "type_name",
                          "number": 6,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "extendee",
                          "label": 1,
                          "name": "extendee",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "defaultValue",
                          "label": 1,
                          "name": "default_value",
                          "number": 7,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "oneofIndex",
                          "label": 1,
                          "name": "oneof_index",
                          "number": 9,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "jsonName",
                          "label": 1,
                          "name": "json_name",
                          "number": 10,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 8,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.FieldOptions",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "proto3Optional",
                          "label": 1,
                          "name": "proto3_optional",
                          "number": 17,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                      ],
                      "name": "FieldDescriptorProto",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.OneofOptions",
                        },
                      ],
                      "name": "OneofDescriptorProto",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "value",
                          "label": 3,
                          "name": "value",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.EnumValueDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.EnumOptions",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "reservedRange",
                          "label": 3,
                          "name": "reserved_range",
                          "number": 4,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "reservedName",
                          "label": 3,
                          "name": "reserved_name",
                          "number": 5,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                      ],
                      "name": "EnumDescriptorProto",
                      "nestedType": Array [
                        Object {
                          "enumType": Array [],
                          "extension": Array [],
                          "extensionRange": Array [],
                          "field": Array [
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "start",
                              "label": 1,
                              "name": "start",
                              "number": 1,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "end",
                              "label": 1,
                              "name": "end",
                              "number": 2,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                          ],
                          "name": "EnumReservedRange",
                          "nestedType": Array [],
                          "oneofDecl": Array [],
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                        },
                      ],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "number",
                          "label": 1,
                          "name": "number",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 5,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.EnumValueOptions",
                        },
                      ],
                      "name": "EnumValueDescriptorProto",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "method",
                          "label": 3,
                          "name": "method",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.MethodDescriptorProto",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.ServiceOptions",
                        },
                      ],
                      "name": "ServiceDescriptorProto",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 1,
                          "name": "name",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "inputType",
                          "label": 1,
                          "name": "input_type",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "outputType",
                          "label": 1,
                          "name": "output_type",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "options",
                          "label": 1,
                          "name": "options",
                          "number": 4,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.MethodOptions",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "clientStreaming",
                          "label": 1,
                          "name": "client_streaming",
                          "number": 5,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "serverStreaming",
                          "label": 1,
                          "name": "server_streaming",
                          "number": 6,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                      ],
                      "name": "MethodDescriptorProto",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [
                        Object {
                          "name": "OptimizeMode",
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                          "value": Array [
                            Object {
                              "name": "SPEED",
                              "number": 1,
                              "options": undefined,
                            },
                            Object {
                              "name": "CODE_SIZE",
                              "number": 2,
                              "options": undefined,
                            },
                            Object {
                              "name": "LITE_RUNTIME",
                              "number": 3,
                              "options": undefined,
                            },
                          ],
                        },
                      ],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "javaPackage",
                          "label": 1,
                          "name": "java_package",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "javaOuterClassname",
                          "label": 1,
                          "name": "java_outer_classname",
                          "number": 8,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "javaMultipleFiles",
                          "label": 1,
                          "name": "java_multiple_files",
                          "number": 10,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "javaGenerateEqualsAndHash",
                          "label": 1,
                          "name": "java_generate_equals_and_hash",
                          "number": 20,
                          "oneofIndex": 0,
                          "options": Object {
                            "ctype": 0,
                            "deprecated": true,
                            "jstype": 0,
                            "lazy": false,
                            "packed": false,
                            "uninterpretedOption": Array [],
                            "weak": false,
                          },
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "javaStringCheckUtf8",
                          "label": 1,
                          "name": "java_string_check_utf8",
                          "number": 27,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "SPEED",
                          "extendee": "",
                          "jsonName": "optimizeFor",
                          "label": 1,
                          "name": "optimize_for",
                          "number": 9,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 14,
                          "typeName": ".google.protobuf.FileOptions.OptimizeMode",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "goPackage",
                          "label": 1,
                          "name": "go_package",
                          "number": 11,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "ccGenericServices",
                          "label": 1,
                          "name": "cc_generic_services",
                          "number": 16,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "javaGenericServices",
                          "label": 1,
                          "name": "java_generic_services",
                          "number": 17,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "pyGenericServices",
                          "label": 1,
                          "name": "py_generic_services",
                          "number": 18,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "phpGenericServices",
                          "label": 1,
                          "name": "php_generic_services",
                          "number": 42,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "deprecated",
                          "label": 1,
                          "name": "deprecated",
                          "number": 23,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "true",
                          "extendee": "",
                          "jsonName": "ccEnableArenas",
                          "label": 1,
                          "name": "cc_enable_arenas",
                          "number": 31,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "objcClassPrefix",
                          "label": 1,
                          "name": "objc_class_prefix",
                          "number": 36,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "csharpNamespace",
                          "label": 1,
                          "name": "csharp_namespace",
                          "number": 37,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "swiftPrefix",
                          "label": 1,
                          "name": "swift_prefix",
                          "number": 39,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "phpClassPrefix",
                          "label": 1,
                          "name": "php_class_prefix",
                          "number": 40,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "phpNamespace",
                          "label": 1,
                          "name": "php_namespace",
                          "number": 41,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "phpMetadataNamespace",
                          "label": 1,
                          "name": "php_metadata_namespace",
                          "number": 44,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "rubyPackage",
                          "label": 1,
                          "name": "ruby_package",
                          "number": 45,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "FileOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [
                        Object {
                          "end": 39,
                          "start": 38,
                        },
                      ],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "messageSetWireFormat",
                          "label": 1,
                          "name": "message_set_wire_format",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "noStandardDescriptorAccessor",
                          "label": 1,
                          "name": "no_standard_descriptor_accessor",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "deprecated",
                          "label": 1,
                          "name": "deprecated",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "mapEntry",
                          "label": 1,
                          "name": "map_entry",
                          "number": 7,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "MessageOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [
                        Object {
                          "end": 5,
                          "start": 4,
                        },
                        Object {
                          "end": 6,
                          "start": 5,
                        },
                        Object {
                          "end": 7,
                          "start": 6,
                        },
                        Object {
                          "end": 9,
                          "start": 8,
                        },
                        Object {
                          "end": 10,
                          "start": 9,
                        },
                      ],
                    },
                    Object {
                      "enumType": Array [
                        Object {
                          "name": "CType",
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                          "value": Array [
                            Object {
                              "name": "STRING",
                              "number": 0,
                              "options": undefined,
                            },
                            Object {
                              "name": "CORD",
                              "number": 1,
                              "options": undefined,
                            },
                            Object {
                              "name": "STRING_PIECE",
                              "number": 2,
                              "options": undefined,
                            },
                          ],
                        },
                        Object {
                          "name": "JSType",
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                          "value": Array [
                            Object {
                              "name": "JS_NORMAL",
                              "number": 0,
                              "options": undefined,
                            },
                            Object {
                              "name": "JS_STRING",
                              "number": 1,
                              "options": undefined,
                            },
                            Object {
                              "name": "JS_NUMBER",
                              "number": 2,
                              "options": undefined,
                            },
                          ],
                        },
                      ],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "STRING",
                          "extendee": "",
                          "jsonName": "ctype",
                          "label": 1,
                          "name": "ctype",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 14,
                          "typeName": ".google.protobuf.FieldOptions.CType",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "packed",
                          "label": 1,
                          "name": "packed",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "JS_NORMAL",
                          "extendee": "",
                          "jsonName": "jstype",
                          "label": 1,
                          "name": "jstype",
                          "number": 6,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 14,
                          "typeName": ".google.protobuf.FieldOptions.JSType",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "lazy",
                          "label": 1,
                          "name": "lazy",
                          "number": 5,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "deprecated",
                          "label": 1,
                          "name": "deprecated",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "weak",
                          "label": 1,
                          "name": "weak",
                          "number": 10,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "FieldOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [
                        Object {
                          "end": 5,
                          "start": 4,
                        },
                      ],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "OneofOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "allowAlias",
                          "label": 1,
                          "name": "allow_alias",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "deprecated",
                          "label": 1,
                          "name": "deprecated",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "EnumOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [
                        Object {
                          "end": 6,
                          "start": 5,
                        },
                      ],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "deprecated",
                          "label": 1,
                          "name": "deprecated",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "EnumValueOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "deprecated",
                          "label": 1,
                          "name": "deprecated",
                          "number": 33,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "ServiceOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [
                        Object {
                          "name": "IdempotencyLevel",
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                          "value": Array [
                            Object {
                              "name": "IDEMPOTENCY_UNKNOWN",
                              "number": 0,
                              "options": undefined,
                            },
                            Object {
                              "name": "NO_SIDE_EFFECTS",
                              "number": 1,
                              "options": undefined,
                            },
                            Object {
                              "name": "IDEMPOTENT",
                              "number": 2,
                              "options": undefined,
                            },
                          ],
                        },
                      ],
                      "extension": Array [],
                      "extensionRange": Array [
                        Object {
                          "end": 536870912,
                          "options": undefined,
                          "start": 1000,
                        },
                      ],
                      "field": Array [
                        Object {
                          "defaultValue": "false",
                          "extendee": "",
                          "jsonName": "deprecated",
                          "label": 1,
                          "name": "deprecated",
                          "number": 33,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 8,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "IDEMPOTENCY_UNKNOWN",
                          "extendee": "",
                          "jsonName": "idempotencyLevel",
                          "label": 1,
                          "name": "idempotency_level",
                          "number": 34,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 14,
                          "typeName": ".google.protobuf.MethodOptions.IdempotencyLevel",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "uninterpretedOption",
                          "label": 3,
                          "name": "uninterpreted_option",
                          "number": 999,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption",
                        },
                      ],
                      "name": "MethodOptions",
                      "nestedType": Array [],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "name",
                          "label": 3,
                          "name": "name",
                          "number": 2,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.UninterpretedOption.NamePart",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "identifierValue",
                          "label": 1,
                          "name": "identifier_value",
                          "number": 3,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "positiveIntValue",
                          "label": 1,
                          "name": "positive_int_value",
                          "number": 4,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 4,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "negativeIntValue",
                          "label": 1,
                          "name": "negative_int_value",
                          "number": 5,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 3,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "doubleValue",
                          "label": 1,
                          "name": "double_value",
                          "number": 6,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 1,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "stringValue",
                          "label": 1,
                          "name": "string_value",
                          "number": 7,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 12,
                          "typeName": "",
                        },
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "aggregateValue",
                          "label": 1,
                          "name": "aggregate_value",
                          "number": 8,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 9,
                          "typeName": "",
                        },
                      ],
                      "name": "UninterpretedOption",
                      "nestedType": Array [
                        Object {
                          "enumType": Array [],
                          "extension": Array [],
                          "extensionRange": Array [],
                          "field": Array [
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "namePart",
                              "label": 2,
                              "name": "name_part",
                              "number": 1,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 9,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "isExtension",
                              "label": 2,
                              "name": "is_extension",
                              "number": 2,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 8,
                              "typeName": "",
                            },
                          ],
                          "name": "NamePart",
                          "nestedType": Array [],
                          "oneofDecl": Array [],
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                        },
                      ],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "location",
                          "label": 3,
                          "name": "location",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.SourceCodeInfo.Location",
                        },
                      ],
                      "name": "SourceCodeInfo",
                      "nestedType": Array [
                        Object {
                          "enumType": Array [],
                          "extension": Array [],
                          "extensionRange": Array [],
                          "field": Array [
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "path",
                              "label": 3,
                              "name": "path",
                              "number": 1,
                              "oneofIndex": 0,
                              "options": Object {
                                "ctype": 0,
                                "deprecated": false,
                                "jstype": 0,
                                "lazy": false,
                                "packed": true,
                                "uninterpretedOption": Array [],
                                "weak": false,
                              },
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "span",
                              "label": 3,
                              "name": "span",
                              "number": 2,
                              "oneofIndex": 0,
                              "options": Object {
                                "ctype": 0,
                                "deprecated": false,
                                "jstype": 0,
                                "lazy": false,
                                "packed": true,
                                "uninterpretedOption": Array [],
                                "weak": false,
                              },
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "leadingComments",
                              "label": 1,
                              "name": "leading_comments",
                              "number": 3,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 9,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "trailingComments",
                              "label": 1,
                              "name": "trailing_comments",
                              "number": 4,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 9,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "leadingDetachedComments",
                              "label": 3,
                              "name": "leading_detached_comments",
                              "number": 6,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 9,
                              "typeName": "",
                            },
                          ],
                          "name": "Location",
                          "nestedType": Array [],
                          "oneofDecl": Array [],
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                        },
                      ],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                    Object {
                      "enumType": Array [],
                      "extension": Array [],
                      "extensionRange": Array [],
                      "field": Array [
                        Object {
                          "defaultValue": "",
                          "extendee": "",
                          "jsonName": "annotation",
                          "label": 3,
                          "name": "annotation",
                          "number": 1,
                          "oneofIndex": 0,
                          "options": undefined,
                          "proto3Optional": false,
                          "type": 11,
                          "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation",
                        },
                      ],
                      "name": "GeneratedCodeInfo",
                      "nestedType": Array [
                        Object {
                          "enumType": Array [],
                          "extension": Array [],
                          "extensionRange": Array [],
                          "field": Array [
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "path",
                              "label": 3,
                              "name": "path",
                              "number": 1,
                              "oneofIndex": 0,
                              "options": Object {
                                "ctype": 0,
                                "deprecated": false,
                                "jstype": 0,
                                "lazy": false,
                                "packed": true,
                                "uninterpretedOption": Array [],
                                "weak": false,
                              },
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "sourceFile",
                              "label": 1,
                              "name": "source_file",
                              "number": 2,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 9,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "begin",
                              "label": 1,
                              "name": "begin",
                              "number": 3,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                            Object {
                              "defaultValue": "",
                              "extendee": "",
                              "jsonName": "end",
                              "label": 1,
                              "name": "end",
                              "number": 4,
                              "oneofIndex": 0,
                              "options": undefined,
                              "proto3Optional": false,
                              "type": 5,
                              "typeName": "",
                            },
                          ],
                          "name": "Annotation",
                          "nestedType": Array [],
                          "oneofDecl": Array [],
                          "options": undefined,
                          "reservedName": Array [],
                          "reservedRange": Array [],
                        },
                      ],
                      "oneofDecl": Array [],
                      "options": undefined,
                      "reservedName": Array [],
                      "reservedRange": Array [],
                    },
                  ],
                  "name": "google/protobuf/descriptor.proto",
                  "options": Object {
                    "ccEnableArenas": true,
                    "ccGenericServices": false,
                    "csharpNamespace": "Google.Protobuf.Reflection",
                    "deprecated": false,
                    "goPackage": "google.golang.org/protobuf/types/descriptorpb",
                    "javaGenerateEqualsAndHash": false,
                    "javaGenericServices": false,
                    "javaMultipleFiles": false,
                    "javaOuterClassname": "DescriptorProtos",
                    "javaPackage": "com.google.protobuf",
                    "javaStringCheckUtf8": false,
                    "objcClassPrefix": "GPB",
                    "optimizeFor": 1,
                    "phpClassPrefix": "",
                    "phpGenericServices": false,
                    "phpMetadataNamespace": "",
                    "phpNamespace": "",
                    "pyGenericServices": false,
                    "rubyPackage": "",
                    "swiftPrefix": "",
                    "uninterpretedOption": Array [],
                  },
                  "package": "google.protobuf",
                  "publicDependency": Array [],
                  "service": Array [],
                  "sourceCodeInfo": Object {
                    "location": Array [
                      Object {
                        "leadingComments": " descriptor.proto must be optimized for speed because reflection-based
       algorithms don't work during bootstrapping.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          8,
                          9,
                        ],
                        "span": Array [
                          52,
                          0,
                          28,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The protocol compiler can output a FileDescriptorSet containing the .proto
       files it parses.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          0,
                        ],
                        "span": Array [
                          56,
                          0,
                          58,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes a complete .proto file.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                        ],
                        "span": Array [
                          61,
                          0,
                          90,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                          2,
                          0,
                        ],
                        "span": Array [
                          62,
                          2,
                          27,
                        ],
                        "trailingComments": " file name, relative to root of source tree
      ",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                          2,
                          1,
                        ],
                        "span": Array [
                          63,
                          2,
                          30,
                        ],
                        "trailingComments": " e.g. \\"foo\\", \\"foo.bar\\", etc.
      ",
                      },
                      Object {
                        "leadingComments": " Names of files imported by this file.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                          2,
                          2,
                        ],
                        "span": Array [
                          66,
                          2,
                          33,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Indexes of the public imported files in the dependency list above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                          2,
                          3,
                        ],
                        "span": Array [
                          68,
                          2,
                          40,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Indexes of the weak imported files in the dependency list.
       For Google-internal migration only. Do not use.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                          2,
                          4,
                        ],
                        "span": Array [
                          71,
                          2,
                          38,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " All top-level definitions in this file.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                          2,
                          5,
                        ],
                        "span": Array [
                          74,
                          2,
                          44,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " This field contains optional information about the original source code.
       You may safely remove this entire field without harming runtime
       functionality of the descriptors -- the information is needed only by
       development tools.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                          2,
                          10,
                        ],
                        "span": Array [
                          85,
                          2,
                          47,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The syntax of the proto file.
       The supported values are \\"proto2\\" and \\"proto3\\".
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          1,
                          2,
                          11,
                        ],
                        "span": Array [
                          89,
                          2,
                          30,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes a message type.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          2,
                        ],
                        "span": Array [
                          93,
                          0,
                          125,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          2,
                          3,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          103,
                          4,
                          29,
                        ],
                        "trailingComments": " Inclusive.
      ",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          2,
                          3,
                          0,
                          2,
                          1,
                        ],
                        "span": Array [
                          104,
                          4,
                          27,
                        ],
                        "trailingComments": " Exclusive.
      ",
                      },
                      Object {
                        "leadingComments": " Range of reserved tag numbers. Reserved tag numbers may not be used by
       fields or extension ranges in the same message. Reserved ranges may
       not overlap.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          2,
                          3,
                          1,
                        ],
                        "span": Array [
                          117,
                          2,
                          120,
                          3,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          2,
                          3,
                          1,
                          2,
                          0,
                        ],
                        "span": Array [
                          118,
                          4,
                          29,
                        ],
                        "trailingComments": " Inclusive.
      ",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          2,
                          3,
                          1,
                          2,
                          1,
                        ],
                        "span": Array [
                          119,
                          4,
                          27,
                        ],
                        "trailingComments": " Exclusive.
      ",
                      },
                      Object {
                        "leadingComments": " Reserved field names, which may not be used by fields in the same message.
       A given name may only be reserved once.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          2,
                          2,
                          9,
                        ],
                        "span": Array [
                          124,
                          2,
                          37,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          3,
                          2,
                          0,
                        ],
                        "span": Array [
                          129,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          3,
                          5,
                        ],
                        "span": Array [
                          133,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes a field within a message.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                        ],
                        "span": Array [
                          137,
                          0,
                          238,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " 0 is reserved for errors.
       Order is weird for historical reasons.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          141,
                          4,
                          20,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
       negative values are likely.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          0,
                          2,
                          2,
                        ],
                        "span": Array [
                          145,
                          4,
                          19,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
       negative values are likely.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          0,
                          2,
                          4,
                        ],
                        "span": Array [
                          149,
                          4,
                          19,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Tag-delimited aggregate.
       Group type is deprecated and not supported in proto3. However, Proto3
       implementations should still be able to parse the group wire format and
       treat group fields as unknown fields.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          0,
                          2,
                          9,
                        ],
                        "span": Array [
                          158,
                          4,
                          20,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          0,
                          2,
                          10,
                        ],
                        "span": Array [
                          159,
                          4,
                          22,
                        ],
                        "trailingComments": " Length-delimited aggregate.
      ",
                      },
                      Object {
                        "leadingComments": " New in version 2.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          0,
                          2,
                          11,
                        ],
                        "span": Array [
                          162,
                          4,
                          20,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          0,
                          2,
                          16,
                        ],
                        "span": Array [
                          167,
                          4,
                          21,
                        ],
                        "trailingComments": " Uses ZigZag encoding.
      ",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          0,
                          2,
                          17,
                        ],
                        "span": Array [
                          168,
                          4,
                          21,
                        ],
                        "trailingComments": " Uses ZigZag encoding.
      ",
                      },
                      Object {
                        "leadingComments": " 0 is reserved for errors
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          4,
                          1,
                          2,
                          0,
                        ],
                        "span": Array [
                          173,
                          4,
                          23,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " If type_name is set, this need not be set.  If both this and type_name
       are set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          2,
                          3,
                        ],
                        "span": Array [
                          184,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " For message and enum types, this is the name of the type.  If the name
       starts with a '.', it is fully-qualified.  Otherwise, C++-like scoping
       rules are used to find the type (i.e. first the nested types within this
       message are searched, then within the parent, on up to the root
       namespace).
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          2,
                          4,
                        ],
                        "span": Array [
                          191,
                          2,
                          32,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " For extensions, this is the name of the type being extended.  It is
       resolved in the same manner as type_name.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          2,
                          5,
                        ],
                        "span": Array [
                          195,
                          2,
                          31,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " For numeric types, contains the original text representation of the value.
       For booleans, \\"true\\" or \\"false\\".
       For strings, contains the default text contents (not escaped in any way).
       For bytes, contains the C escaped value.  All bytes >= 128 are escaped.
       TODO(kenton):  Base-64 encode?
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          2,
                          6,
                        ],
                        "span": Array [
                          202,
                          2,
                          36,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " If set, gives the index of a oneof in the containing type's oneof_decl
       list.  This field is a member of that oneof.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          2,
                          7,
                        ],
                        "span": Array [
                          206,
                          2,
                          33,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " JSON name of this field. The value is set by protocol compiler. If the
       user has set a \\"json_name\\" option on this field, that option's value
       will be used. Otherwise, it's deduced from the field's name by converting
       it to camelCase.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          2,
                          8,
                        ],
                        "span": Array [
                          212,
                          2,
                          33,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " If true, this is a proto3 \\"optional\\". When a proto3 field is optional, it
       tracks presence regardless of field type.

       When proto3_optional is true, this field must be belong to a oneof to
       signal to old proto3 clients that presence is tracked for this field. This
       oneof is known as a \\"synthetic\\" oneof, and this field must be its sole
       member (each proto3 optional field gets its own synthetic oneof). Synthetic
       oneofs exist in the descriptor only, and do not generate any API. Synthetic
       oneofs must be ordered after all \\"real\\" oneofs.

       For message fields, proto3_optional doesn't create any semantic change,
       since non-repeated message fields always track presence. However it still
       indicates the semantic detail of whether the user wrote \\"optional\\" or not.
       This can be useful for round-tripping the .proto file. For consistency we
       give message fields a synthetic oneof also, even though it is not required
       to track presence. This is especially important because the parser can't
       tell if a field is a message or an enum, so it must always create a
       synthetic oneof.

       Proto2 optional fields do not set this flag, because they already indicate
       optional with \`LABEL_OPTIONAL\`.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          4,
                          2,
                          10,
                        ],
                        "span": Array [
                          237,
                          2,
                          37,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes a oneof.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          5,
                        ],
                        "span": Array [
                          241,
                          0,
                          244,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes an enum type.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          6,
                        ],
                        "span": Array [
                          247,
                          0,
                          273,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Range of reserved numeric values. Reserved values may not be used by
       entries in the same enum. Reserved ranges may not overlap.

       Note that this is distinct from DescriptorProto.ReservedRange in that it
       is inclusive such that it can appropriately represent the entire int32
       domain.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          6,
                          3,
                          0,
                        ],
                        "span": Array [
                          260,
                          2,
                          263,
                          3,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          6,
                          3,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          261,
                          4,
                          29,
                        ],
                        "trailingComments": " Inclusive.
      ",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          6,
                          3,
                          0,
                          2,
                          1,
                        ],
                        "span": Array [
                          262,
                          4,
                          27,
                        ],
                        "trailingComments": " Inclusive.
      ",
                      },
                      Object {
                        "leadingComments": " Range of reserved numeric values. Reserved numeric values may not be used
       by enum values in the same enum declaration. Reserved ranges may not
       overlap.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          6,
                          2,
                          3,
                        ],
                        "span": Array [
                          268,
                          2,
                          48,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Reserved enum value names, which may not be reused. A given name may only
       be reserved once.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          6,
                          2,
                          4,
                        ],
                        "span": Array [
                          272,
                          2,
                          36,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes a value within an enum.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          7,
                        ],
                        "span": Array [
                          276,
                          0,
                          281,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes a service.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          8,
                        ],
                        "span": Array [
                          284,
                          0,
                          289,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes a method of a service.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          9,
                        ],
                        "span": Array [
                          292,
                          0,
                          306,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Input and output type names.  These are resolved in the same way as
       FieldDescriptorProto.type_name, but must refer to a message type.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          9,
                          2,
                          1,
                        ],
                        "span": Array [
                          297,
                          2,
                          33,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Identifies if client streams multiple client messages
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          9,
                          2,
                          4,
                        ],
                        "span": Array [
                          303,
                          2,
                          55,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Identifies if server streams multiple server messages
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          9,
                          2,
                          5,
                        ],
                        "span": Array [
                          305,
                          2,
                          55,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Sets the Java package where classes generated from this .proto will be
       placed.  By default, the proto package is used, but this is often
       inappropriate because proto packages do not normally start with backwards
       domain names.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          0,
                        ],
                        "span": Array [
                          347,
                          2,
                          35,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Controls the name of the wrapper Java class generated for the .proto file.
       That class will always contain the .proto file's getDescriptor() method as
       well as any top-level extensions defined in the .proto file.
       If java_multiple_files is disabled, then all the other classes from the
       .proto file will be nested inside the single wrapper outer class.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          1,
                        ],
                        "span": Array [
                          355,
                          2,
                          43,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " If enabled, then the Java code generator will generate a separate .java
       file for each top-level message, enum, and service defined in the .proto
       file.  Thus, these types will *not* be nested inside the wrapper class
       named by java_outer_classname.  However, the wrapper class will still be
       generated to contain the file's getDescriptor() method as well as any
       top-level extensions defined in the file.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          2,
                        ],
                        "span": Array [
                          363,
                          2,
                          59,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " This option does nothing.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          3,
                        ],
                        "span": Array [
                          366,
                          2,
                          69,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " If set true, then the Java2 code generator will generate code that
       throws an exception whenever an attempt is made to assign a non-UTF-8
       byte sequence to a string field.
       Message reflection will do the same.
       However, an extension field still accepts non-UTF-8 byte sequences.
       This option has no effect on when used with the lite runtime.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          4,
                        ],
                        "span": Array [
                          374,
                          2,
                          62,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Generated classes can be optimized for speed or code size.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          4,
                          0,
                        ],
                        "span": Array [
                          378,
                          2,
                          383,
                          3,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          4,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          379,
                          4,
                          14,
                        ],
                        "trailingComments": " Generate complete code for parsing, serialization,
      ",
                      },
                      Object {
                        "leadingComments": " etc.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          4,
                          0,
                          2,
                          1,
                        ],
                        "span": Array [
                          381,
                          4,
                          18,
                        ],
                        "trailingComments": " Use ReflectionOps to implement these methods.
      ",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          4,
                          0,
                          2,
                          2,
                        ],
                        "span": Array [
                          382,
                          4,
                          21,
                        ],
                        "trailingComments": " Generate code using MessageLite and the lite runtime.
      ",
                      },
                      Object {
                        "leadingComments": " Sets the Go package where structs generated from this .proto will be
       placed. If omitted, the Go package will be derived from the following:
         - The basename of the package import path, if provided.
         - Otherwise, the package statement in the .proto file, if present.
         - Otherwise, the basename of the .proto file, without extension.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          6,
                        ],
                        "span": Array [
                          391,
                          2,
                          34,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Should generic services be generated in each language?  \\"Generic\\" services
       are not specific to any particular RPC system.  They are generated by the
       main code generators in each language (without additional plugins).
       Generic services were the only kind of service generation supported by
       early versions of google.protobuf.

       Generic services are now considered deprecated in favor of using plugins
       that generate code specific to your particular RPC system.  Therefore,
       these default to false.  Old code which depends on generic services should
       explicitly set them to true.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          7,
                        ],
                        "span": Array [
                          406,
                          2,
                          59,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Is this file deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for everything in the file, or it will be completely ignored; in the very
       least, this is a formalization for deprecating files.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          11,
                        ],
                        "span": Array [
                          415,
                          2,
                          50,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Enables the use of arenas for the proto messages in this file. This applies
       only to generated classes for C++.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          12,
                        ],
                        "span": Array [
                          419,
                          2,
                          55,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Sets the objective c class prefix which is prepended to all objective c
       generated classes from this .proto. There is no default.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          13,
                        ],
                        "span": Array [
                          424,
                          2,
                          41,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Namespace for generated classes; defaults to the package.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          14,
                        ],
                        "span": Array [
                          427,
                          2,
                          40,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " By default Swift generators will take the proto package and CamelCase it
       replacing '.' with underscore and use that to prefix the types/symbols
       defined. When this options is provided, they will use this value instead
       to prefix the types/symbols defined.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          15,
                        ],
                        "span": Array [
                          433,
                          2,
                          36,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Sets the php class prefix which is prepended to all php generated classes
       from this .proto. Default is empty.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          16,
                        ],
                        "span": Array [
                          437,
                          2,
                          40,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Use this option to change the namespace of php generated classes. Default
       is empty. When this option is empty, the package name will be used for
       determining the namespace.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          17,
                        ],
                        "span": Array [
                          442,
                          2,
                          37,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Use this option to change the namespace of php generated metadata classes.
       Default is empty. When this option is empty, the proto file name will be
       used for determining the namespace.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          18,
                        ],
                        "span": Array [
                          447,
                          2,
                          46,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Use this option to change the package of ruby generated classes. Default
       is empty. When this option is not set, the package name will be used for
       determining the ruby package.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          19,
                        ],
                        "span": Array [
                          452,
                          2,
                          36,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here.
       See the documentation for the \\"Options\\" section above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          2,
                          20,
                        ],
                        "span": Array [
                          457,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message.
       See the documentation for the \\"Options\\" section above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          10,
                          5,
                        ],
                        "span": Array [
                          461,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Set true to use the old proto1 MessageSet wire format for extensions.
       This is provided for backwards-compatibility with the MessageSet wire
       format.  You should not use this for any other reason:  It's less
       efficient, has fewer features, and is more complicated.

       The message must be defined exactly as follows:
         message Foo {
           option message_set_wire_format = true;
           extensions 4 to max;
         }
       Note that the message cannot have any defined fields; MessageSets only
       have extensions.

       All extensions of your type must be singular messages; e.g. they cannot
       be int32s, enums, or repeated messages.

       Because this is an option, the above two restrictions are not enforced by
       the protocol compiler.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          11,
                          2,
                          0,
                        ],
                        "span": Array [
                          485,
                          2,
                          62,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Disables the generation of the standard \\"descriptor()\\" accessor, which can
       conflict with a field of the same name.  This is meant to make migration
       from proto1 easier; new code should avoid fields named \\"descriptor\\".
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          11,
                          2,
                          1,
                        ],
                        "span": Array [
                          490,
                          2,
                          70,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Is this message deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the message, or it will be completely ignored; in the very least,
       this is a formalization for deprecating messages.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          11,
                          2,
                          2,
                        ],
                        "span": Array [
                          496,
                          2,
                          49,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Whether the message is an automatically generated map entry type for the
       maps field.

       For maps fields:
           map<KeyType, ValueType> map_field = 1;
       The parsed descriptor looks like:
           message MapFieldEntry {
               option map_entry = true;
               optional KeyType key = 1;
               optional ValueType value = 2;
           }
           repeated MapFieldEntry map_field = 1;

       Implementations may choose not to generate the map_entry=true message, but
       use a native map in the target language to hold the keys and values.
       The reflection APIs in such implementations still need to work as
       if the field is a repeated message field.

       NOTE: Do not set the option in .proto files. Always use the maps syntax
       instead. The option should only be implicitly set by the proto compiler
       parser.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          11,
                          2,
                          3,
                        ],
                        "span": Array [
                          521,
                          2,
                          30,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          11,
                          9,
                        ],
                        "span": Array [
                          523,
                          2,
                          13,
                        ],
                        "trailingComments": " javalite_serializable
      ",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          11,
                          9,
                        ],
                        "span": Array [
                          524,
                          2,
                          13,
                        ],
                        "trailingComments": " javanano_as_lite
      ",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          11,
                          2,
                          4,
                        ],
                        "span": Array [
                          528,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          11,
                          5,
                        ],
                        "span": Array [
                          531,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The ctype option instructs the C++ code generator to use a different
       representation of the field than it normally would.  See the specific
       options below.  This option is not yet implemented in the open source
       release -- sorry, we'll try to include it in a future version!
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          2,
                          0,
                        ],
                        "span": Array [
                          539,
                          2,
                          46,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Default mode.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          4,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          542,
                          4,
                          15,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The packed option can be enabled for repeated primitive fields to enable
       a more efficient representation on the wire. Rather than repeatedly
       writing the tag and type for each element, the entire array is encoded as
       a single length-delimited blob. In proto3, only explicit setting it to
       false will avoid using packed encoding.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          2,
                          1,
                        ],
                        "span": Array [
                          553,
                          2,
                          27,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The jstype option determines the JavaScript type used for values of the
       field.  The option is permitted only for 64 bit integral and fixed types
       (int64, uint64, sint64, fixed64, sfixed64).  A field with jstype JS_STRING
       is represented as JavaScript string, which avoids loss of precision that
       can happen when a large value is converted to a floating point JavaScript.
       Specifying JS_NUMBER for the jstype causes the generated JavaScript code to
       use the JavaScript \\"number\\" type.  The behavior of the default option
       JS_NORMAL is implementation dependent.

       This option is an enum to permit additional types to be added, e.g.
       goog.math.Integer.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          2,
                          2,
                        ],
                        "span": Array [
                          566,
                          2,
                          51,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Use the default type.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          4,
                          1,
                          2,
                          0,
                        ],
                        "span": Array [
                          569,
                          4,
                          18,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Use JavaScript strings.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          4,
                          1,
                          2,
                          1,
                        ],
                        "span": Array [
                          572,
                          4,
                          18,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Use JavaScript numbers.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          4,
                          1,
                          2,
                          2,
                        ],
                        "span": Array [
                          575,
                          4,
                          18,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Should this field be parsed lazily?  Lazy applies only to message-type
       fields.  It means that when the outer message is initially parsed, the
       inner message's contents will not be parsed but instead stored in encoded
       form.  The inner message will actually be parsed when it is first accessed.

       This is only a hint.  Implementations are free to choose whether to use
       eager or lazy parsing regardless of the value of this option.  However,
       setting this option true suggests that the protocol author believes that
       using lazy parsing on this field is worth the additional bookkeeping
       overhead typically needed to implement it.

       This option does not affect the public interface of any generated code;
       all method signatures remain the same.  Furthermore, thread-safety of the
       interface is not affected by this option; const methods remain safe to
       call from multiple threads concurrently, while non-const methods continue
       to require exclusive access.


       Note that implementations may choose not to check required fields within
       a lazy sub-message.  That is, calling IsInitialized() on the outer message
       may return true even if the inner message has missing required fields.
       This is necessary because otherwise the inner message would have to be
       parsed in order to perform the check, defeating the purpose of lazy
       parsing.  An implementation which chooses not to check required fields
       must be consistent about it.  That is, for any particular sub-message, the
       implementation must either *always* check its required fields, or *never*
       check its required fields, regardless of whether or not the message has
       been parsed.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          2,
                          3,
                        ],
                        "span": Array [
                          606,
                          2,
                          43,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Is this field deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for accessors, or it will be completely ignored; in the very least, this
       is a formalization for deprecating fields.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          2,
                          4,
                        ],
                        "span": Array [
                          612,
                          2,
                          49,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " For Google-internal migration only. Do not use.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          2,
                          5,
                        ],
                        "span": Array [
                          615,
                          2,
                          44,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          2,
                          6,
                        ],
                        "span": Array [
                          619,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          5,
                        ],
                        "span": Array [
                          622,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          12,
                          9,
                        ],
                        "span": Array [
                          624,
                          2,
                          13,
                        ],
                        "trailingComments": " removed jtype
      ",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          13,
                          2,
                          0,
                        ],
                        "span": Array [
                          629,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          13,
                          5,
                        ],
                        "span": Array [
                          632,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Set this option to true to allow mapping different tag names to the same
       value.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          14,
                          2,
                          0,
                        ],
                        "span": Array [
                          639,
                          2,
                          32,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Is this enum deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the enum, or it will be completely ignored; in the very least, this
       is a formalization for deprecating enums.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          14,
                          2,
                          1,
                        ],
                        "span": Array [
                          645,
                          2,
                          49,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          14,
                          9,
                        ],
                        "span": Array [
                          647,
                          2,
                          13,
                        ],
                        "trailingComments": " javanano_as_lite
      ",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          14,
                          2,
                          2,
                        ],
                        "span": Array [
                          650,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          14,
                          5,
                        ],
                        "span": Array [
                          653,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Is this enum value deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the enum value, or it will be completely ignored; in the very least,
       this is a formalization for deprecating enum values.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          15,
                          2,
                          0,
                        ],
                        "span": Array [
                          661,
                          2,
                          49,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          15,
                          2,
                          1,
                        ],
                        "span": Array [
                          664,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          15,
                          5,
                        ],
                        "span": Array [
                          667,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Is this service deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the service, or it will be completely ignored; in the very least,
       this is a formalization for deprecating services.
      ",
                        "leadingDetachedComments": Array [
                          " Note:  Field numbers 1 through 32 are reserved for Google's internal RPC
         framework.  We apologize for hoarding these numbers to ourselves, but
         we were already using them long before we decided to release Protocol
         Buffers.
      ",
                        ],
                        "path": Array [
                          4,
                          16,
                          2,
                          0,
                        ],
                        "span": Array [
                          681,
                          2,
                          50,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          16,
                          2,
                          1,
                        ],
                        "span": Array [
                          684,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          16,
                          5,
                        ],
                        "span": Array [
                          687,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Is this method deprecated?
       Depending on the target platform, this can emit Deprecated annotations
       for the method, or it will be completely ignored; in the very least,
       this is a formalization for deprecating methods.
      ",
                        "leadingDetachedComments": Array [
                          " Note:  Field numbers 1 through 32 are reserved for Google's internal RPC
         framework.  We apologize for hoarding these numbers to ourselves, but
         we were already using them long before we decided to release Protocol
         Buffers.
      ",
                        ],
                        "path": Array [
                          4,
                          17,
                          2,
                          0,
                        ],
                        "span": Array [
                          701,
                          2,
                          50,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
       or neither? HTTP based RPC implementation may choose GET verb for safe
       methods, and PUT verb for idempotent methods instead of the default POST.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          17,
                          4,
                          0,
                        ],
                        "span": Array [
                          706,
                          2,
                          710,
                          3,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          17,
                          4,
                          0,
                          2,
                          1,
                        ],
                        "span": Array [
                          708,
                          4,
                          24,
                        ],
                        "trailingComments": " implies idempotent
      ",
                      },
                      Object {
                        "leadingComments": "",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          17,
                          4,
                          0,
                          2,
                          2,
                        ],
                        "span": Array [
                          709,
                          4,
                          19,
                        ],
                        "trailingComments": " idempotent, but may have side effects
      ",
                      },
                      Object {
                        "leadingComments": " The parser stores options it doesn't recognize here. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          17,
                          2,
                          2,
                        ],
                        "span": Array [
                          715,
                          2,
                          58,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Clients can define custom options in extensions of this message. See above.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          17,
                          5,
                        ],
                        "span": Array [
                          718,
                          2,
                          25,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " A message representing a option the parser does not recognize. This only
       appears in options protos created by the compiler::Parser class.
       DescriptorPool resolves these when building Descriptor objects. Therefore,
       options protos in descriptor objects (e.g. returned by Descriptor::options(),
       or produced by Descriptor::CopyTo()) will never have UninterpretedOptions
       in them.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          18,
                        ],
                        "span": Array [
                          728,
                          0,
                          748,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The name of the uninterpreted option.  Each string represents a segment in
       a dot-separated name.  is_extension is true iff a segment represents an
       extension (denoted with parentheses in options specs in .proto files).
       E.g.,{ [\\"foo\\", false], [\\"bar.baz\\", true], [\\"qux\\", false] } represents
       \\"foo.(bar.baz).qux\\".
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          18,
                          3,
                          0,
                        ],
                        "span": Array [
                          734,
                          2,
                          737,
                          3,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " The value of the uninterpreted option, in whatever type the tokenizer
       identified it as during parsing. Exactly one of these should be set.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          18,
                          2,
                          1,
                        ],
                        "span": Array [
                          742,
                          2,
                          39,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Encapsulates information about the original source file from which a
       FileDescriptorProto was generated.
      ",
                        "leadingDetachedComments": Array [
                          " ===================================================================
       Optional source code info
      ",
                        ],
                        "path": Array [
                          4,
                          19,
                        ],
                        "span": Array [
                          755,
                          0,
                          884,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " A Location identifies a piece of source code in a .proto file which
       corresponds to a particular definition.  This information is intended
       to be useful to IDEs, code indexers, documentation generators, and similar
       tools.

       For example, say we have a file like:
         message Foo {
           optional string foo = 1;
         }
       Let's look at just the field definition:
         optional string foo = 1;
         ^       ^^     ^^  ^  ^^^
         a       bc     de  f  ghi
       We have the following locations:
         span   path               represents
         [a,i)  [ 4, 0, 2, 0 ]     The whole field definition.
         [a,b)  [ 4, 0, 2, 0, 4 ]  The label (optional).
         [c,d)  [ 4, 0, 2, 0, 5 ]  The type (string).
         [e,f)  [ 4, 0, 2, 0, 1 ]  The name (foo).
         [g,h)  [ 4, 0, 2, 0, 3 ]  The number (1).

       Notes:
       - A location may refer to a repeated field itself (i.e. not to any
         particular index within it).  This is used whenever a set of elements are
         logically enclosed in a single code segment.  For example, an entire
         extend block (possibly containing multiple extension definitions) will
         have an outer location whose path refers to the \\"extensions\\" repeated
         field without an index.
       - Multiple locations may have the same path.  This happens when a single
         logical declaration is spread out across multiple places.  The most
         obvious example is the \\"extend\\" block again -- there may be multiple
         extend blocks in the same scope, each of which will have the same path.
       - A location's span is not always a subset of its parent's span.  For
         example, the \\"extendee\\" of an extension declaration appears at the
         beginning of the \\"extend\\" block and is shared by all extensions within
         the block.
       - Just because a location's span is a subset of some other location's span
         does not mean that it is a descendant.  For example, a \\"group\\" defines
         both a type and a field in a single declaration.  Thus, the locations
         corresponding to the type and field and their components will overlap.
       - Code which tries to interpret locations should probably be designed to
         ignore those that it doesn't understand, as more types of locations could
         be recorded in the future.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          19,
                          2,
                          0,
                        ],
                        "span": Array [
                          799,
                          2,
                          33,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Identifies which part of the FileDescriptorProto was defined at this
       location.

       Each element is a field number or an index.  They form a path from
       the root FileDescriptorProto to the place where the definition.  For
       example, this path:
         [ 4, 3, 2, 7, 1 ]
       refers to:
         file.message_type(3)  // 4, 3
             .field(7)         // 2, 7
             .name()           // 1
       This is because FileDescriptorProto.message_type has field number 4:
         repeated DescriptorProto message_type = 4;
       and DescriptorProto.field has field number 2:
         repeated FieldDescriptorProto field = 2;
       and FieldDescriptorProto.name has field number 1:
         optional string name = 1;

       Thus, the above path gives the location of a field name.  If we removed
       the last element:
         [ 4, 3, 2, 7 ]
       this path refers to the whole field declaration (from the beginning
       of the label to the terminating semicolon).
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          19,
                          3,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          824,
                          4,
                          44,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Always has exactly three or four elements: start line, start column,
       end line (optional, otherwise assumed same as start line), end column.
       These are packed into a single field for efficiency.  Note that line
       and column numbers are zero-based -- typically you will want to add
       1 to each before displaying to a user.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          19,
                          3,
                          0,
                          2,
                          1,
                        ],
                        "span": Array [
                          831,
                          4,
                          44,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " If this SourceCodeInfo represents a complete declaration, these are any
       comments appearing before and after the declaration which appear to be
       attached to the declaration.

       A series of line comments appearing on consecutive lines, with no other
       tokens appearing on those lines, will be treated as a single comment.

       leading_detached_comments will keep paragraphs of comments that appear
       before (but not connected to) the current element. Each paragraph,
       separated by empty lines, will be one comment element in the repeated
       field.

       Only the comment content is provided; comment markers (e.g. //) are
       stripped out.  For block comments, leading whitespace and an asterisk
       will be stripped from the beginning of each line other than the first.
       Newlines are included in the output.

       Examples:

         optional int32 foo = 1;  // Comment attached to foo.
         // Comment attached to bar.
         optional int32 bar = 2;

         optional string baz = 3;
         // Comment attached to baz.
         // Another line attached to baz.

         // Comment attached to qux.
         //
         // Another line attached to qux.
         optional double qux = 4;

         // Detached comment for corge. This is not leading or trailing comments
         // to qux or corge because there are blank lines separating it from
         // both.

         // Detached comment for corge paragraph 2.

         optional string corge = 5;
         /* Block comment attached
          * to corge.  Leading asterisks
          * will be removed. */
         /* Block comment attached to
          * grault. */
         optional int32 grault = 6;

         // ignored detached comments.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          19,
                          3,
                          0,
                          2,
                          2,
                        ],
                        "span": Array [
                          880,
                          4,
                          41,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Describes the relationship between generated code and its original source
       file. A GeneratedCodeInfo message is associated with only one generated
       source file, but may contain references to different source .proto files.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          20,
                        ],
                        "span": Array [
                          889,
                          0,
                          910,
                          1,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " An Annotation connects some span of text in generated code to an element
       of its generating .proto file.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          20,
                          2,
                          0,
                        ],
                        "span": Array [
                          892,
                          2,
                          37,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Identifies the element in the original source .proto file. This field
       is formatted the same as SourceCodeInfo.Location.path.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          20,
                          3,
                          0,
                          2,
                          0,
                        ],
                        "span": Array [
                          896,
                          4,
                          44,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Identifies the filesystem path to the original source .proto.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          20,
                          3,
                          0,
                          2,
                          1,
                        ],
                        "span": Array [
                          899,
                          4,
                          36,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Identifies the starting offset in bytes in the generated code
       that relates to the identified object.
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          20,
                          3,
                          0,
                          2,
                          2,
                        ],
                        "span": Array [
                          903,
                          4,
                          29,
                        ],
                        "trailingComments": "",
                      },
                      Object {
                        "leadingComments": " Identifies the ending offset in bytes in the generated code that
       relates to the identified offset. The end offset should be one past
       the last relevant byte (so the length of the text = end - begin).
      ",
                        "leadingDetachedComments": Array [],
                        "path": Array [
                          4,
                          20,
                          3,
                          0,
                          2,
                          3,
                        ],
                        "span": Array [
                          908,
                          4,
                          27,
                        ],
                        "trailingComments": "",
                      },
                    ],
                  },
                  "syntax": "",
                  "weakDependency": Array [],
                },
                "references": Object {
                  ".google.protobuf.DescriptorProto": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.DescriptorProto.ExtensionRange": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.DescriptorProto.ReservedRange": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.EnumDescriptorProto": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.EnumDescriptorProto.EnumReservedRange": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.EnumOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.EnumValueDescriptorProto": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.EnumValueOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.ExtensionRangeOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.FieldDescriptorProto": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.FieldDescriptorProto.Label": Object {
                    "-1": "UNRECOGNIZED",
                    "1": "LABEL_OPTIONAL",
                    "2": "LABEL_REQUIRED",
                    "3": "LABEL_REPEATED",
                    "LABEL_OPTIONAL": 1,
                    "LABEL_REPEATED": 3,
                    "LABEL_REQUIRED": 2,
                    "UNRECOGNIZED": -1,
                  },
                  ".google.protobuf.FieldDescriptorProto.Type": Object {
                    "-1": "UNRECOGNIZED",
                    "1": "TYPE_DOUBLE",
                    "10": "TYPE_GROUP",
                    "11": "TYPE_MESSAGE",
                    "12": "TYPE_BYTES",
                    "13": "TYPE_UINT32",
                    "14": "TYPE_ENUM",
                    "15": "TYPE_SFIXED32",
                    "16": "TYPE_SFIXED64",
                    "17": "TYPE_SINT32",
                    "18": "TYPE_SINT64",
                    "2": "TYPE_FLOAT",
                    "3": "TYPE_INT64",
                    "4": "TYPE_UINT64",
                    "5": "TYPE_INT32",
                    "6": "TYPE_FIXED64",
                    "7": "TYPE_FIXED32",
                    "8": "TYPE_BOOL",
                    "9": "TYPE_STRING",
                    "TYPE_BOOL": 8,
                    "TYPE_BYTES": 12,
                    "TYPE_DOUBLE": 1,
                    "TYPE_ENUM": 14,
                    "TYPE_FIXED32": 7,
                    "TYPE_FIXED64": 6,
                    "TYPE_FLOAT": 2,
                    "TYPE_GROUP": 10,
                    "TYPE_INT32": 5,
                    "TYPE_INT64": 3,
                    "TYPE_MESSAGE": 11,
                    "TYPE_SFIXED32": 15,
                    "TYPE_SFIXED64": 16,
                    "TYPE_SINT32": 17,
                    "TYPE_SINT64": 18,
                    "TYPE_STRING": 9,
                    "TYPE_UINT32": 13,
                    "TYPE_UINT64": 4,
                    "UNRECOGNIZED": -1,
                  },
                  ".google.protobuf.FieldOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.FieldOptions.CType": Object {
                    "-1": "UNRECOGNIZED",
                    "0": "STRING",
                    "1": "CORD",
                    "2": "STRING_PIECE",
                    "CORD": 1,
                    "STRING": 0,
                    "STRING_PIECE": 2,
                    "UNRECOGNIZED": -1,
                  },
                  ".google.protobuf.FieldOptions.JSType": Object {
                    "-1": "UNRECOGNIZED",
                    "0": "JS_NORMAL",
                    "1": "JS_STRING",
                    "2": "JS_NUMBER",
                    "JS_NORMAL": 0,
                    "JS_NUMBER": 2,
                    "JS_STRING": 1,
                    "UNRECOGNIZED": -1,
                  },
                  ".google.protobuf.FileDescriptorProto": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.FileDescriptorSet": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.FileOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.FileOptions.OptimizeMode": Object {
                    "-1": "UNRECOGNIZED",
                    "1": "SPEED",
                    "2": "CODE_SIZE",
                    "3": "LITE_RUNTIME",
                    "CODE_SIZE": 2,
                    "LITE_RUNTIME": 3,
                    "SPEED": 1,
                    "UNRECOGNIZED": -1,
                  },
                  ".google.protobuf.GeneratedCodeInfo": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.GeneratedCodeInfo.Annotation": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.MessageOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.MethodDescriptorProto": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.MethodOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.MethodOptions.IdempotencyLevel": Object {
                    "-1": "UNRECOGNIZED",
                    "0": "IDEMPOTENCY_UNKNOWN",
                    "1": "NO_SIDE_EFFECTS",
                    "2": "IDEMPOTENT",
                    "IDEMPOTENCY_UNKNOWN": 0,
                    "IDEMPOTENT": 2,
                    "NO_SIDE_EFFECTS": 1,
                    "UNRECOGNIZED": -1,
                  },
                  ".google.protobuf.OneofDescriptorProto": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.OneofOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.ServiceDescriptorProto": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.ServiceOptions": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.SourceCodeInfo": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.SourceCodeInfo.Location": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.UninterpretedOption": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                  ".google.protobuf.UninterpretedOption.NamePart": Object {
                    "decode": [Function],
                    "encode": [Function],
                  },
                },
              },
            ],
            "fileDescriptor": Object {
              "dependency": Array [
                "google/protobuf/descriptor.proto",
              ],
              "enumType": Array [],
              "extension": Array [
                Object {
                  "defaultValue": "",
                  "extendee": ".google.protobuf.FieldOptions",
                  "jsonName": "something",
                  "label": 1,
                  "name": "something",
                  "number": 1000,
                  "oneofIndex": 0,
                  "options": undefined,
                  "proto3Optional": true,
                  "type": 11,
                  "typeName": ".something.Something",
                },
              ],
              "messageType": Array [
                Object {
                  "enumType": Array [],
                  "extension": Array [],
                  "extensionRange": Array [],
                  "field": Array [
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "hello",
                      "label": 1,
                      "name": "hello",
                      "number": 1,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 9,
                      "typeName": "",
                    },
                    Object {
                      "defaultValue": "",
                      "extendee": "",
                      "jsonName": "foo",
                      "label": 3,
                      "name": "foo",
                      "number": 2,
                      "oneofIndex": 0,
                      "options": undefined,
                      "proto3Optional": false,
                      "type": 5,
                      "typeName": "",
                    },
                  ],
                  "name": "Something",
                  "nestedType": Array [],
                  "oneofDecl": Array [],
                  "options": undefined,
                  "reservedName": Array [],
                  "reservedRange": Array [],
                },
              ],
              "name": "something/something.proto",
              "options": undefined,
              "package": "something",
              "publicDependency": Array [],
              "service": Array [],
              "sourceCodeInfo": Object {
                "location": Array [],
              },
              "syntax": "proto3",
              "weakDependency": Array [],
            },
            "references": Object {
              ".something.Something": Object {
                "decode": [Function],
                "encode": [Function],
              },
            },
          },
        ],
        "fileDescriptor": Object {
          "dependency": Array [
            "google/protobuf/descriptor.proto",
            "something/something.proto",
          ],
          "enumType": Array [
            Object {
              "name": "MyEnum",
              "options": Object {
                "allowAlias": false,
                "deprecated": false,
                "uninterpretedOption": Array [],
              },
              "reservedName": Array [],
              "reservedRange": Array [],
              "value": Array [
                Object {
                  "name": "FOO",
                  "number": 0,
                  "options": Object {
                    "deprecated": false,
                    "uninterpretedOption": Array [],
                  },
                },
                Object {
                  "name": "BAR",
                  "number": 1,
                  "options": undefined,
                },
              ],
            },
          ],
          "extension": Array [
            Object {
              "defaultValue": "",
              "extendee": ".google.protobuf.FileOptions",
              "jsonName": "myFileOption",
              "label": 1,
              "name": "my_file_option",
              "number": 50000,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": true,
              "type": 9,
              "typeName": "",
            },
            Object {
              "defaultValue": "",
              "extendee": ".google.protobuf.MessageOptions",
              "jsonName": "myMessageOption",
              "label": 1,
              "name": "my_message_option",
              "number": 50001,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": true,
              "type": 5,
              "typeName": "",
            },
            Object {
              "defaultValue": "",
              "extendee": ".google.protobuf.FieldOptions",
              "jsonName": "myFieldOption",
              "label": 1,
              "name": "my_field_option",
              "number": 50002,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": true,
              "type": 2,
              "typeName": "",
            },
            Object {
              "defaultValue": "",
              "extendee": ".google.protobuf.OneofOptions",
              "jsonName": "myOneofOption",
              "label": 1,
              "name": "my_oneof_option",
              "number": 50003,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": true,
              "type": 3,
              "typeName": "",
            },
            Object {
              "defaultValue": "",
              "extendee": ".google.protobuf.EnumOptions",
              "jsonName": "myEnumOption",
              "label": 1,
              "name": "my_enum_option",
              "number": 50004,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": true,
              "type": 8,
              "typeName": "",
            },
            Object {
              "defaultValue": "",
              "extendee": ".google.protobuf.EnumValueOptions",
              "jsonName": "myEnumValueOption",
              "label": 1,
              "name": "my_enum_value_option",
              "number": 50005,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": true,
              "type": 13,
              "typeName": "",
            },
            Object {
              "defaultValue": "",
              "extendee": ".google.protobuf.ServiceOptions",
              "jsonName": "myServiceOption",
              "label": 1,
              "name": "my_service_option",
              "number": 50006,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": true,
              "type": 14,
              "typeName": ".MyEnum",
            },
            Object {
              "defaultValue": "",
              "extendee": ".google.protobuf.MethodOptions",
              "jsonName": "myMethodOption",
              "label": 1,
              "name": "my_method_option",
              "number": 50007,
              "oneofIndex": 0,
              "options": undefined,
              "proto3Optional": true,
              "type": 11,
              "typeName": ".MyMessage",
            },
          ],
          "messageType": Array [
            Object {
              "enumType": Array [],
              "extension": Array [],
              "extensionRange": Array [],
              "field": Array [
                Object {
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "foo",
                  "label": 1,
                  "name": "foo",
                  "number": 1,
                  "oneofIndex": 1,
                  "options": Object {
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
                  "defaultValue": "",
                  "extendee": "",
                  "jsonName": "foo2",
                  "label": 1,
                  "name": "foo_2",
                  "number": 2,
                  "oneofIndex": 2,
                  "options": Object {
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
                  "name": "qux",
                  "options": Object {
                    "uninterpretedOption": Array [],
                  },
                },
                Object {
                  "name": "_foo",
                  "options": undefined,
                },
                Object {
                  "name": "_foo_2",
                  "options": undefined,
                },
                Object {
                  "name": "_bar",
                  "options": undefined,
                },
              ],
              "options": Object {
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
          ],
          "name": "options.proto",
          "options": Object {
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
          },
          "package": "",
          "publicDependency": Array [],
          "service": Array [
            Object {
              "method": Array [
                Object {
                  "clientStreaming": false,
                  "inputType": ".RequestType",
                  "name": "MyMethod",
                  "options": Object {
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
                "deprecated": false,
                "uninterpretedOption": Array [],
              },
            },
          ],
          "sourceCodeInfo": Object {
            "location": Array [],
          },
          "syntax": "proto3",
          "weakDependency": Array [],
        },
        "options": Object {
          "enums": Object {
            "MyEnum": Object {
              "options": Object {
                "my_enum_option": true,
              },
              "values": Object {
                "FOO": Object {
                  "my_enum_value_option": 321,
                },
              },
            },
          },
          "messages": Object {
            "MyMessage": Object {
              "fields": Object {
                "foo": Object {
                  "my_field_option": 4.5,
                },
                "foo_2": Object {
                  "something": Object {
                    "foo": Array [
                      123,
                      345,
                    ],
                    "hello": "world",
                  },
                },
              },
              "oneof": Object {
                "qux": Object {
                  "my_oneof_option": 42,
                },
              },
              "options": Object {
                "my_message_option": 1234,
              },
            },
          },
          "options": Object {
            "my_file_option": "Hello world!",
          },
          "services": Object {
            "MyService": Object {
              "methods": Object {
                "MyMethod": Object {
                  "my_method_option": Object {
                    "bar": "Some string",
                    "foo": 150,
                    "foo2": 150,
                    "quux": "Some string",
                  },
                },
              },
              "options": Object {
                "my_service_option": 0,
              },
            },
          },
        },
        "references": Object {
          ".MyEnum": Object {
            "-1": "UNRECOGNIZED",
            "0": "FOO",
            "1": "BAR",
            "BAR": 1,
            "FOO": 0,
            "UNRECOGNIZED": -1,
          },
          ".MyMessage": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".MyService": [Function],
          ".RequestType": Object {
            "decode": [Function],
            "encode": [Function],
          },
          ".ResponseType": Object {
            "decode": [Function],
            "encode": [Function],
          },
        },
      }
    `);
  });
});
