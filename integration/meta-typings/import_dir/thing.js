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
exports.protoMetadata = exports.ImportedThing = exports.protobufPackage = void 0;
/* eslint-disable */
var ts_proto_descriptors_1 = require("ts-proto-descriptors");
var minimal_1 = require("protobufjs/minimal");
var Long = require("long");
var timestamp_1 = require("../google/protobuf/timestamp");
exports.protobufPackage = 'simple';
var baseImportedThing = {};
exports.ImportedThing = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.createdAt !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseImportedThing);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createdAt = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
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
        dependency: ['google/protobuf/timestamp.proto'],
        publicDependency: [],
        weakDependency: [],
        messageType: [
            {
                field: [
                    {
                        name: 'created_at',
                        number: 1,
                        label: 1,
                        type: 11,
                        typeName: '.google.protobuf.Timestamp',
                        jsonName: 'createdAt'
                    },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'ImportedThing'
            },
        ],
        enumType: [],
        service: [],
        extension: [],
        name: 'import_dir/thing.proto',
        package: 'simple',
        sourceCodeInfo: { location: [] },
        syntax: 'proto3'
    }),
    references: { '.simple.ImportedThing': exports.ImportedThing },
    dependencies: [timestamp_1.protoMetadata]
};
function toTimestamp(date) {
    var seconds = date.getTime() / 1000;
    var nanos = (date.getTime() % 1000) * 1000000;
    return { seconds: seconds, nanos: nanos };
}
function fromTimestamp(t) {
    var millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
