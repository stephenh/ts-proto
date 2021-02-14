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
exports.CodeGeneratorResponse_File = exports.CodeGeneratorResponse = exports.CodeGeneratorRequest = exports.Version = exports.codeGeneratorResponse_FeatureToJSON = exports.codeGeneratorResponse_FeatureFromJSON = exports.CodeGeneratorResponse_Feature = exports.protobufPackage = void 0;
/* eslint-disable */
var Long = require("long");
var minimal_1 = require("protobufjs/minimal");
var descriptor_1 = require("../../../google/protobuf/descriptor");
exports.protobufPackage = 'google.protobuf.compiler';
/** Sync with code_generator.h. */
var CodeGeneratorResponse_Feature;
(function (CodeGeneratorResponse_Feature) {
    CodeGeneratorResponse_Feature[CodeGeneratorResponse_Feature["FEATURE_NONE"] = 0] = "FEATURE_NONE";
    CodeGeneratorResponse_Feature[CodeGeneratorResponse_Feature["FEATURE_PROTO3_OPTIONAL"] = 1] = "FEATURE_PROTO3_OPTIONAL";
    CodeGeneratorResponse_Feature[CodeGeneratorResponse_Feature["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(CodeGeneratorResponse_Feature = exports.CodeGeneratorResponse_Feature || (exports.CodeGeneratorResponse_Feature = {}));
function codeGeneratorResponse_FeatureFromJSON(object) {
    switch (object) {
        case 0:
        case 'FEATURE_NONE':
            return CodeGeneratorResponse_Feature.FEATURE_NONE;
        case 1:
        case 'FEATURE_PROTO3_OPTIONAL':
            return CodeGeneratorResponse_Feature.FEATURE_PROTO3_OPTIONAL;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return CodeGeneratorResponse_Feature.UNRECOGNIZED;
    }
}
exports.codeGeneratorResponse_FeatureFromJSON = codeGeneratorResponse_FeatureFromJSON;
function codeGeneratorResponse_FeatureToJSON(object) {
    switch (object) {
        case CodeGeneratorResponse_Feature.FEATURE_NONE:
            return 'FEATURE_NONE';
        case CodeGeneratorResponse_Feature.FEATURE_PROTO3_OPTIONAL:
            return 'FEATURE_PROTO3_OPTIONAL';
        default:
            return 'UNKNOWN';
    }
}
exports.codeGeneratorResponse_FeatureToJSON = codeGeneratorResponse_FeatureToJSON;
var baseVersion = { major: 0, minor: 0, patch: 0, suffix: '' };
exports.Version = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.major);
        writer.uint32(16).int32(message.minor);
        writer.uint32(24).int32(message.patch);
        writer.uint32(34).string(message.suffix);
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = Object.create(baseVersion);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.major = reader.int32();
                    break;
                case 2:
                    message.minor = reader.int32();
                    break;
                case 3:
                    message.patch = reader.int32();
                    break;
                case 4:
                    message.suffix = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = Object.create(baseVersion);
        if (object.major !== undefined && object.major !== null) {
            message.major = Number(object.major);
        }
        else {
            message.major = 0;
        }
        if (object.minor !== undefined && object.minor !== null) {
            message.minor = Number(object.minor);
        }
        else {
            message.minor = 0;
        }
        if (object.patch !== undefined && object.patch !== null) {
            message.patch = Number(object.patch);
        }
        else {
            message.patch = 0;
        }
        if (object.suffix !== undefined && object.suffix !== null) {
            message.suffix = String(object.suffix);
        }
        else {
            message.suffix = '';
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseVersion);
        if (object.major !== undefined && object.major !== null) {
            message.major = object.major;
        }
        else {
            message.major = 0;
        }
        if (object.minor !== undefined && object.minor !== null) {
            message.minor = object.minor;
        }
        else {
            message.minor = 0;
        }
        if (object.patch !== undefined && object.patch !== null) {
            message.patch = object.patch;
        }
        else {
            message.patch = 0;
        }
        if (object.suffix !== undefined && object.suffix !== null) {
            message.suffix = object.suffix;
        }
        else {
            message.suffix = '';
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.major !== undefined && (obj.major = message.major);
        message.minor !== undefined && (obj.minor = message.minor);
        message.patch !== undefined && (obj.patch = message.patch);
        message.suffix !== undefined && (obj.suffix = message.suffix);
        return obj;
    }
};
var baseCodeGeneratorRequest = { fileToGenerate: '', parameter: '' };
exports.CodeGeneratorRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        for (var _i = 0, _a = message.fileToGenerate; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(10).string(v);
        }
        writer.uint32(18).string(message.parameter);
        for (var _b = 0, _c = message.protoFile; _b < _c.length; _b++) {
            var v = _c[_b];
            descriptor_1.FileDescriptorProto.encode(v, writer.uint32(122).fork()).ldelim();
        }
        if (message.compilerVersion !== undefined) {
            exports.Version.encode(message.compilerVersion, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = Object.create(baseCodeGeneratorRequest);
        message.fileToGenerate = [];
        message.protoFile = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fileToGenerate.push(reader.string());
                    break;
                case 2:
                    message.parameter = reader.string();
                    break;
                case 15:
                    message.protoFile.push(descriptor_1.FileDescriptorProto.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.compilerVersion = exports.Version.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = Object.create(baseCodeGeneratorRequest);
        message.fileToGenerate = [];
        message.protoFile = [];
        if (object.fileToGenerate !== undefined && object.fileToGenerate !== null) {
            for (var _i = 0, _a = object.fileToGenerate; _i < _a.length; _i++) {
                var e = _a[_i];
                message.fileToGenerate.push(String(e));
            }
        }
        if (object.parameter !== undefined && object.parameter !== null) {
            message.parameter = String(object.parameter);
        }
        else {
            message.parameter = '';
        }
        if (object.protoFile !== undefined && object.protoFile !== null) {
            for (var _b = 0, _c = object.protoFile; _b < _c.length; _b++) {
                var e = _c[_b];
                message.protoFile.push(descriptor_1.FileDescriptorProto.fromJSON(e));
            }
        }
        if (object.compilerVersion !== undefined && object.compilerVersion !== null) {
            message.compilerVersion = exports.Version.fromJSON(object.compilerVersion);
        }
        else {
            message.compilerVersion = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseCodeGeneratorRequest);
        message.fileToGenerate = [];
        message.protoFile = [];
        if (object.fileToGenerate !== undefined && object.fileToGenerate !== null) {
            for (var _i = 0, _a = object.fileToGenerate; _i < _a.length; _i++) {
                var e = _a[_i];
                message.fileToGenerate.push(e);
            }
        }
        if (object.parameter !== undefined && object.parameter !== null) {
            message.parameter = object.parameter;
        }
        else {
            message.parameter = '';
        }
        if (object.protoFile !== undefined && object.protoFile !== null) {
            for (var _b = 0, _c = object.protoFile; _b < _c.length; _b++) {
                var e = _c[_b];
                message.protoFile.push(descriptor_1.FileDescriptorProto.fromPartial(e));
            }
        }
        if (object.compilerVersion !== undefined && object.compilerVersion !== null) {
            message.compilerVersion = exports.Version.fromPartial(object.compilerVersion);
        }
        else {
            message.compilerVersion = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.fileToGenerate) {
            obj.fileToGenerate = message.fileToGenerate.map(function (e) { return e; });
        }
        else {
            obj.fileToGenerate = [];
        }
        message.parameter !== undefined && (obj.parameter = message.parameter);
        if (message.protoFile) {
            obj.protoFile = message.protoFile.map(function (e) { return (e ? descriptor_1.FileDescriptorProto.toJSON(e) : undefined); });
        }
        else {
            obj.protoFile = [];
        }
        message.compilerVersion !== undefined &&
            (obj.compilerVersion = message.compilerVersion ? exports.Version.toJSON(message.compilerVersion) : undefined);
        return obj;
    }
};
var baseCodeGeneratorResponse = { error: '', supportedFeatures: 0 };
exports.CodeGeneratorResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(10).string(message.error);
        writer.uint32(16).uint64(message.supportedFeatures);
        for (var _i = 0, _a = message.file; _i < _a.length; _i++) {
            var v = _a[_i];
            exports.CodeGeneratorResponse_File.encode(v, writer.uint32(122).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = Object.create(baseCodeGeneratorResponse);
        message.file = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.error = reader.string();
                    break;
                case 2:
                    message.supportedFeatures = longToNumber(reader.uint64());
                    break;
                case 15:
                    message.file.push(exports.CodeGeneratorResponse_File.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = Object.create(baseCodeGeneratorResponse);
        message.file = [];
        if (object.error !== undefined && object.error !== null) {
            message.error = String(object.error);
        }
        else {
            message.error = '';
        }
        if (object.supportedFeatures !== undefined && object.supportedFeatures !== null) {
            message.supportedFeatures = Number(object.supportedFeatures);
        }
        else {
            message.supportedFeatures = 0;
        }
        if (object.file !== undefined && object.file !== null) {
            for (var _i = 0, _a = object.file; _i < _a.length; _i++) {
                var e = _a[_i];
                message.file.push(exports.CodeGeneratorResponse_File.fromJSON(e));
            }
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseCodeGeneratorResponse);
        message.file = [];
        if (object.error !== undefined && object.error !== null) {
            message.error = object.error;
        }
        else {
            message.error = '';
        }
        if (object.supportedFeatures !== undefined && object.supportedFeatures !== null) {
            message.supportedFeatures = object.supportedFeatures;
        }
        else {
            message.supportedFeatures = 0;
        }
        if (object.file !== undefined && object.file !== null) {
            for (var _i = 0, _a = object.file; _i < _a.length; _i++) {
                var e = _a[_i];
                message.file.push(exports.CodeGeneratorResponse_File.fromPartial(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.error !== undefined && (obj.error = message.error);
        message.supportedFeatures !== undefined && (obj.supportedFeatures = message.supportedFeatures);
        if (message.file) {
            obj.file = message.file.map(function (e) { return (e ? exports.CodeGeneratorResponse_File.toJSON(e) : undefined); });
        }
        else {
            obj.file = [];
        }
        return obj;
    }
};
var baseCodeGeneratorResponse_File = { name: '', insertionPoint: '', content: '' };
exports.CodeGeneratorResponse_File = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(10).string(message.name);
        writer.uint32(18).string(message.insertionPoint);
        writer.uint32(122).string(message.content);
        if (message.generatedCodeInfo !== undefined) {
            descriptor_1.GeneratedCodeInfo.encode(message.generatedCodeInfo, writer.uint32(130).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = Object.create(baseCodeGeneratorResponse_File);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.insertionPoint = reader.string();
                    break;
                case 15:
                    message.content = reader.string();
                    break;
                case 16:
                    message.generatedCodeInfo = descriptor_1.GeneratedCodeInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = Object.create(baseCodeGeneratorResponse_File);
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.insertionPoint !== undefined && object.insertionPoint !== null) {
            message.insertionPoint = String(object.insertionPoint);
        }
        else {
            message.insertionPoint = '';
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = String(object.content);
        }
        else {
            message.content = '';
        }
        if (object.generatedCodeInfo !== undefined && object.generatedCodeInfo !== null) {
            message.generatedCodeInfo = descriptor_1.GeneratedCodeInfo.fromJSON(object.generatedCodeInfo);
        }
        else {
            message.generatedCodeInfo = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseCodeGeneratorResponse_File);
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.insertionPoint !== undefined && object.insertionPoint !== null) {
            message.insertionPoint = object.insertionPoint;
        }
        else {
            message.insertionPoint = '';
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = object.content;
        }
        else {
            message.content = '';
        }
        if (object.generatedCodeInfo !== undefined && object.generatedCodeInfo !== null) {
            message.generatedCodeInfo = descriptor_1.GeneratedCodeInfo.fromPartial(object.generatedCodeInfo);
        }
        else {
            message.generatedCodeInfo = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.insertionPoint !== undefined && (obj.insertionPoint = message.insertionPoint);
        message.content !== undefined && (obj.content = message.content);
        message.generatedCodeInfo !== undefined &&
            (obj.generatedCodeInfo = message.generatedCodeInfo
                ? descriptor_1.GeneratedCodeInfo.toJSON(message.generatedCodeInfo)
                : undefined);
        return obj;
    }
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
    throw new Error('Unable to locate global object');
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
