import { metadata } from './simple';

describe('simple', () => {
  it('generates types correctly', () => {
    expect(metadata).toMatchInlineSnapshot(`
      Object {
        "Child": Array [
          "message",
          ".simple.Child",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "name": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
            "type": Object {
              "kind": "object",
              "name": "Child_Type",
              "type": ".simple.Child.Type",
            },
          },
        ],
        "Child_Type": Array [
          "enum",
          ".simple.Child.Type",
          Object {
            "-1": "UNRECOGNIZED",
            "0": "UNKNOWN",
            "1": "GOOD",
            "2": "BAD",
            "BAD": 2,
            "GOOD": 1,
            "UNKNOWN": 0,
            "UNRECOGNIZED": -1,
          },
          undefined,
        ],
        "Empty": Array [
          "message",
          ".simple.Empty",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {},
        ],
        "Entity": Array [
          "message",
          ".simple.Entity",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "id": Object {
              "kind": "builtin",
              "original": "int32",
              "type": "number",
            },
          },
        ],
        "Nested": Array [
          "message",
          ".simple.Nested",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "message": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "Nested_InnerMessage",
                  "type": ".simple.Nested.InnerMessage",
                },
              ],
              "kind": "union",
            },
            "name": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
            "state": Object {
              "kind": "object",
              "name": "Nested_InnerEnum",
              "type": ".simple.Nested.InnerEnum",
            },
          },
        ],
        "Nested_InnerEnum": Array [
          "enum",
          ".simple.Nested.InnerEnum",
          Object {
            "-1": "UNRECOGNIZED",
            "0": "UNKNOWN_INNER",
            "100": "GOOD",
            "1000": "BAD",
            "BAD": 1000,
            "GOOD": 100,
            "UNKNOWN_INNER": 0,
            "UNRECOGNIZED": -1,
          },
          undefined,
        ],
        "Nested_InnerMessage": Array [
          "message",
          ".simple.Nested.InnerMessage",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "deep": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "Nested_InnerMessage_DeepMessage",
                  "type": ".simple.Nested.InnerMessage.DeepMessage",
                },
              ],
              "kind": "union",
            },
            "name": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
          },
        ],
        "Nested_InnerMessage_DeepMessage": Array [
          "message",
          ".simple.Nested.InnerMessage.DeepMessage",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "name": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
          },
        ],
        "Numbers": Array [
          "message",
          ".simple.Numbers",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "double": Object {
              "kind": "builtin",
              "original": "double",
              "type": "number",
            },
            "fixed32": Object {
              "kind": "builtin",
              "original": "fixed32",
              "type": "number",
            },
            "fixed64": Object {
              "kind": "builtin",
              "original": "fixed64",
              "type": "number",
            },
            "float": Object {
              "kind": "builtin",
              "original": "float",
              "type": "number",
            },
            "int32": Object {
              "kind": "builtin",
              "original": "int32",
              "type": "number",
            },
            "int64": Object {
              "kind": "builtin",
              "original": "int64",
              "type": "number",
            },
            "sfixed32": Object {
              "kind": "builtin",
              "original": "sfixed32",
              "type": "number",
            },
            "sfixed64": Object {
              "kind": "builtin",
              "original": "sfixed64",
              "type": "number",
            },
            "sint32": Object {
              "kind": "builtin",
              "original": "sint32",
              "type": "number",
            },
            "sint64": Object {
              "kind": "builtin",
              "original": "sint64",
              "type": "number",
            },
            "uint32": Object {
              "kind": "builtin",
              "original": "uint32",
              "type": "number",
            },
            "uint64": Object {
              "kind": "builtin",
              "original": "uint64",
              "type": "number",
            },
          },
        ],
        "OneOfMessage": Array [
          "message",
          ".simple.OneOfMessage",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "first": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "builtin",
                  "original": "string",
                  "type": "string",
                },
              ],
              "kind": "union",
            },
            "last": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "builtin",
                  "original": "string",
                  "type": "string",
                },
              ],
              "kind": "union",
            },
          },
        ],
        "PingRequest": Array [
          "message",
          ".simple.PingRequest",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "input": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
          },
        ],
        "PingResponse": Array [
          "message",
          ".simple.PingResponse",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "output": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
          },
        ],
        "PingService": Array [
          "service",
          ".simple.PingService",
          undefined,
          Object {
            "ping": Object {
              "clientStreaming": false,
              "decodeResponse": [Function],
              "encodeRequest": [Function],
              "request": Object {
                "kind": "object",
                "name": "PingRequest",
                "type": ".simple.PingRequest",
              },
              "response": Object {
                "kind": "object",
                "name": "PingResponse",
                "type": ".simple.PingResponse",
              },
              "serverStreaming": false,
            },
          },
        ],
        "Simple": Array [
          "message",
          ".simple.Simple",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "age": Object {
              "kind": "builtin",
              "original": "int32",
              "type": "number",
            },
            "birthday": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "DateMessage",
                  "type": ".google.type.Date",
                },
              ],
              "kind": "union",
            },
            "blob": Object {
              "kind": "builtin",
              "original": "bytes",
              "type": "Uint8Array",
            },
            "blobs": Object {
              "kind": "array",
              "type": Object {
                "kind": "builtin",
                "original": "bytes",
                "type": "Uint8Array",
              },
            },
            "child": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "Child",
                  "type": ".simple.Child",
                },
              ],
              "kind": "union",
            },
            "coins": Object {
              "kind": "array",
              "type": Object {
                "kind": "builtin",
                "original": "int32",
                "type": "number",
              },
            },
            "createdAt": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "builtin",
                  "original": ".google.protobuf.Timestamp",
                  "type": "Date",
                },
              ],
              "kind": "union",
            },
            "grandChildren": Object {
              "kind": "array",
              "type": Object {
                "kind": "object",
                "name": "Child",
                "type": ".simple.Child",
              },
            },
            "name": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
            "oldStates": Object {
              "kind": "array",
              "type": Object {
                "kind": "object",
                "name": "StateEnum",
                "type": ".simple.StateEnum",
              },
            },
            "snacks": Object {
              "kind": "array",
              "type": Object {
                "kind": "builtin",
                "original": "string",
                "type": "string",
              },
            },
            "state": Object {
              "kind": "object",
              "name": "StateEnum",
              "type": ".simple.StateEnum",
            },
            "thing": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "ImportedThing",
                  "type": ".simple.ImportedThing",
                },
              ],
              "kind": "union",
            },
          },
        ],
        "SimpleButOptional": Array [
          "message",
          ".simple.SimpleButOptional",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "age": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "builtin",
                  "original": "int32",
                  "type": "number",
                },
              ],
              "kind": "union",
            },
            "birthday": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "DateMessage",
                  "type": ".google.type.Date",
                },
              ],
              "kind": "union",
            },
            "child": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "Child",
                  "type": ".simple.Child",
                },
              ],
              "kind": "union",
            },
            "createdAt": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "builtin",
                  "original": ".google.protobuf.Timestamp",
                  "type": "Date",
                },
              ],
              "kind": "union",
            },
            "name": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "builtin",
                  "original": "string",
                  "type": "string",
                },
              ],
              "kind": "union",
            },
            "state": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "StateEnum",
                  "type": ".simple.StateEnum",
                },
              ],
              "kind": "union",
            },
            "thing": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "ImportedThing",
                  "type": ".simple.ImportedThing",
                },
              ],
              "kind": "union",
            },
          },
        ],
        "SimpleWithMap": Array [
          "message",
          ".simple.SimpleWithMap",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "entitiesById": Object {
              "key": "number",
              "kind": "map",
              "value": Object {
                "kind": "object",
                "name": "Entity",
                "type": ".simple.Entity",
              },
            },
            "intLookup": Object {
              "key": "number",
              "kind": "map",
              "value": Object {
                "kind": "builtin",
                "original": "int32",
                "type": "number",
              },
            },
            "mapOfBytes": Object {
              "key": "string",
              "kind": "map",
              "value": Object {
                "kind": "builtin",
                "original": "bytes",
                "type": "Uint8Array",
              },
            },
            "mapOfTimestamps": Object {
              "key": "string",
              "kind": "map",
              "value": Object {
                "kind": "builtin",
                "original": ".google.protobuf.Timestamp",
                "type": "Date",
              },
            },
            "nameLookup": Object {
              "key": "string",
              "kind": "map",
              "value": Object {
                "kind": "builtin",
                "original": "string",
                "type": "string",
              },
            },
          },
        ],
        "SimpleWithMapOfEnums": Array [
          "message",
          ".simple.SimpleWithMapOfEnums",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "enumsById": Object {
              "key": "number",
              "kind": "map",
              "value": Object {
                "kind": "object",
                "name": "StateEnum",
                "type": ".simple.StateEnum",
              },
            },
          },
        ],
        "SimpleWithMapOfEnums_EnumsByIdEntry": Array [
          "message",
          ".simple.SimpleWithMapOfEnums.EnumsByIdEntry",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "key": Object {
              "kind": "builtin",
              "original": "int32",
              "type": "number",
            },
            "value": Object {
              "kind": "object",
              "name": "StateEnum",
              "type": ".simple.StateEnum",
            },
          },
        ],
        "SimpleWithMap_EntitiesByIdEntry": Array [
          "message",
          ".simple.SimpleWithMap.EntitiesByIdEntry",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "key": Object {
              "kind": "builtin",
              "original": "int32",
              "type": "number",
            },
            "value": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "Entity",
                  "type": ".simple.Entity",
                },
              ],
              "kind": "union",
            },
          },
        ],
        "SimpleWithMap_IntLookupEntry": Array [
          "message",
          ".simple.SimpleWithMap.IntLookupEntry",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "key": Object {
              "kind": "builtin",
              "original": "int32",
              "type": "number",
            },
            "value": Object {
              "kind": "builtin",
              "original": "int32",
              "type": "number",
            },
          },
        ],
        "SimpleWithMap_MapOfBytesEntry": Array [
          "message",
          ".simple.SimpleWithMap.MapOfBytesEntry",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "key": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
            "value": Object {
              "kind": "builtin",
              "original": "bytes",
              "type": "Uint8Array",
            },
          },
        ],
        "SimpleWithMap_MapOfTimestampsEntry": Array [
          "message",
          ".simple.SimpleWithMap.MapOfTimestampsEntry",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "key": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
            "value": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "builtin",
                  "original": ".google.protobuf.Timestamp",
                  "type": "Date",
                },
              ],
              "kind": "union",
            },
          },
        ],
        "SimpleWithMap_NameLookupEntry": Array [
          "message",
          ".simple.SimpleWithMap.NameLookupEntry",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "key": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
            "value": Object {
              "kind": "builtin",
              "original": "string",
              "type": "string",
            },
          },
        ],
        "SimpleWithSnakeCaseMap": Array [
          "message",
          ".simple.SimpleWithSnakeCaseMap",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "entitiesById": Object {
              "key": "number",
              "kind": "map",
              "value": Object {
                "kind": "object",
                "name": "Entity",
                "type": ".simple.Entity",
              },
            },
          },
        ],
        "SimpleWithSnakeCaseMap_EntitiesByIdEntry": Array [
          "message",
          ".simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "key": Object {
              "kind": "builtin",
              "original": "int32",
              "type": "number",
            },
            "value": Object {
              "choices": Array [
                undefined,
                Object {
                  "kind": "object",
                  "name": "Entity",
                  "type": ".simple.Entity",
                },
              ],
              "kind": "union",
            },
          },
        ],
        "SimpleWithWrappers": Array [
          "message",
          ".simple.SimpleWithWrappers",
          Object {
            "decode": [Function],
            "encode": [Function],
          },
          Object {
            "age": Object {
              "choices": Array [
                undefined,
                Object {
                  "choices": Array [
                    "number",
                    "undefined",
                  ],
                  "kind": "union",
                },
              ],
              "kind": "union",
            },
            "coins": Object {
              "kind": "array",
              "type": Object {
                "kind": "builtin",
                "original": ".google.protobuf.Int32Value",
                "type": "number",
              },
            },
            "enabled": Object {
              "choices": Array [
                undefined,
                Object {
                  "choices": Array [
                    "boolean",
                    "undefined",
                  ],
                  "kind": "union",
                },
              ],
              "kind": "union",
            },
            "name": Object {
              "choices": Array [
                undefined,
                Object {
                  "choices": Array [
                    "string",
                    "undefined",
                  ],
                  "kind": "union",
                },
              ],
              "kind": "union",
            },
            "snacks": Object {
              "kind": "array",
              "type": Object {
                "kind": "builtin",
                "original": ".google.protobuf.StringValue",
                "type": "string",
              },
            },
          },
        ],
        "StateEnum": Array [
          "enum",
          ".simple.StateEnum",
          Object {
            "-1": "UNRECOGNIZED",
            "0": "UNKNOWN",
            "2": "ON",
            "3": "OFF",
            "OFF": 3,
            "ON": 2,
            "UNKNOWN": 0,
            "UNRECOGNIZED": -1,
          },
          undefined,
        ],
      }
    `);
  });
});
