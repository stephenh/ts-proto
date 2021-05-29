"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.protoMetadata = exports.BytesValue = exports.StringValue = exports.BoolValue = exports.UInt32Value = exports.Int32Value = exports.UInt64Value = exports.Int64Value = exports.FloatValue = exports.DoubleValue = exports.protobufPackage = void 0;
/* eslint-disable */
var ts_proto_descriptors_1 = require("ts-proto-descriptors");
var minimal_1 = require("protobufjs/minimal");
var Long = require("long");
exports.protobufPackage = 'google.protobuf';
var baseDoubleValue = { value: 0 };
exports.DoubleValue = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value !== 0) {
            writer.uint32(9).double(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseDoubleValue);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseFloatValue = { value: 0 };
exports.FloatValue = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value !== 0) {
            writer.uint32(13).float(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseFloatValue);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseInt64Value = { value: 0 };
exports.Int64Value = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value !== 0) {
            writer.uint32(8).int64(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseInt64Value);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseUInt64Value = { value: 0 };
exports.UInt64Value = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value !== 0) {
            writer.uint32(8).uint64(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseUInt64Value);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseInt32Value = { value: 0 };
exports.Int32Value = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value !== 0) {
            writer.uint32(8).int32(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseInt32Value);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseUInt32Value = { value: 0 };
exports.UInt32Value = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value !== 0) {
            writer.uint32(8).uint32(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseUInt32Value);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseBoolValue = { value: false };
exports.BoolValue = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value === true) {
            writer.uint32(8).bool(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseBoolValue);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseStringValue = { value: '' };
exports.StringValue = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value !== '') {
            writer.uint32(10).string(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseStringValue);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseBytesValue = {};
exports.BytesValue = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.value.length !== 0) {
            writer.uint32(10).bytes(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseBytesValue);
        message.value = new Uint8Array();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
exports.protoMetadata = {
    fileDescriptor: ts_proto_descriptors_1.FileDescriptorProto.fromPartial({
        dependency: [],
        publicDependency: [],
        weakDependency: [],
        messageType: [
            {
                field: [{ name: 'value', number: 1, label: 1, type: 1, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'DoubleValue'
            },
            {
                field: [{ name: 'value', number: 1, label: 1, type: 2, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'FloatValue'
            },
            {
                field: [{ name: 'value', number: 1, label: 1, type: 3, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Int64Value'
            },
            {
                field: [{ name: 'value', number: 1, label: 1, type: 4, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'UInt64Value'
            },
            {
                field: [{ name: 'value', number: 1, label: 1, type: 5, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Int32Value'
            },
            {
                field: [{ name: 'value', number: 1, label: 1, type: 13, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'UInt32Value'
            },
            {
                field: [{ name: 'value', number: 1, label: 1, type: 8, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'BoolValue'
            },
            {
                field: [{ name: 'value', number: 1, label: 1, type: 9, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'StringValue'
            },
            {
                field: [{ name: 'value', number: 1, label: 1, type: 12, jsonName: 'value' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'BytesValue'
            },
        ],
        enumType: [],
        service: [],
        extension: [],
        name: 'google/protobuf/wrappers.proto',
        package: 'google.protobuf',
        options: {
            uninterpretedOption: [],
            javaPackage: 'com.google.protobuf',
            javaOuterClassname: 'WrappersProto',
            javaMultipleFiles: true,
            goPackage: 'github.com/golang/protobuf/ptypes/wrappers',
            ccEnableArenas: true,
            objcClassPrefix: 'GPB',
            csharpNamespace: 'Google.Protobuf.WellKnownTypes'
        },
        sourceCodeInfo: {
            location: [
                {
                    path: [4, 0],
                    span: [50, 0, 53, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `double`.\n\n The JSON representation for `DoubleValue` is JSON number.\n'
                },
                { path: [4, 0, 2, 0], span: [52, 2, 19], leadingDetachedComments: [], leadingComments: ' The double value.\n' },
                {
                    path: [4, 1],
                    span: [58, 0, 61, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `float`.\n\n The JSON representation for `FloatValue` is JSON number.\n'
                },
                { path: [4, 1, 2, 0], span: [60, 2, 18], leadingDetachedComments: [], leadingComments: ' The float value.\n' },
                {
                    path: [4, 2],
                    span: [66, 0, 69, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `int64`.\n\n The JSON representation for `Int64Value` is JSON string.\n'
                },
                { path: [4, 2, 2, 0], span: [68, 2, 18], leadingDetachedComments: [], leadingComments: ' The int64 value.\n' },
                {
                    path: [4, 3],
                    span: [74, 0, 77, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `uint64`.\n\n The JSON representation for `UInt64Value` is JSON string.\n'
                },
                { path: [4, 3, 2, 0], span: [76, 2, 19], leadingDetachedComments: [], leadingComments: ' The uint64 value.\n' },
                {
                    path: [4, 4],
                    span: [82, 0, 85, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `int32`.\n\n The JSON representation for `Int32Value` is JSON number.\n'
                },
                { path: [4, 4, 2, 0], span: [84, 2, 18], leadingDetachedComments: [], leadingComments: ' The int32 value.\n' },
                {
                    path: [4, 5],
                    span: [90, 0, 93, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `uint32`.\n\n The JSON representation for `UInt32Value` is JSON number.\n'
                },
                { path: [4, 5, 2, 0], span: [92, 2, 19], leadingDetachedComments: [], leadingComments: ' The uint32 value.\n' },
                {
                    path: [4, 6],
                    span: [98, 0, 101, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `bool`.\n\n The JSON representation for `BoolValue` is JSON `true` and `false`.\n'
                },
                { path: [4, 6, 2, 0], span: [100, 2, 17], leadingDetachedComments: [], leadingComments: ' The bool value.\n' },
                {
                    path: [4, 7],
                    span: [106, 0, 109, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `string`.\n\n The JSON representation for `StringValue` is JSON string.\n'
                },
                {
                    path: [4, 7, 2, 0],
                    span: [108, 2, 19],
                    leadingDetachedComments: [],
                    leadingComments: ' The string value.\n'
                },
                {
                    path: [4, 8],
                    span: [114, 0, 117, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Wrapper message for `bytes`.\n\n The JSON representation for `BytesValue` is JSON string.\n'
                },
                { path: [4, 8, 2, 0], span: [116, 2, 18], leadingDetachedComments: [], leadingComments: ' The bytes value.\n' },
            ]
        },
        syntax: 'proto3'
    }),
    references: {
        '.google.protobuf.DoubleValue': exports.DoubleValue,
        '.google.protobuf.FloatValue': exports.FloatValue,
        '.google.protobuf.Int64Value': exports.Int64Value,
        '.google.protobuf.UInt64Value': exports.UInt64Value,
        '.google.protobuf.Int32Value': exports.Int32Value,
        '.google.protobuf.UInt32Value': exports.UInt32Value,
        '.google.protobuf.BoolValue': exports.BoolValue,
        '.google.protobuf.StringValue': exports.StringValue,
        '.google.protobuf.BytesValue': exports.BytesValue
    },
    dependencies: []
};
var globalThis = (function () {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
