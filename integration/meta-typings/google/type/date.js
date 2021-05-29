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
exports.protoMetadata = exports.DateMessage = exports.protobufPackage = void 0;
/* eslint-disable */
var ts_proto_descriptors_1 = require("ts-proto-descriptors");
var minimal_1 = require("protobufjs/minimal");
var Long = require("long");
exports.protobufPackage = 'google.type';
var baseDateMessage = { year: 0, month: 0, day: 0 };
exports.DateMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.year !== 0) {
            writer.uint32(8).int32(message.year);
        }
        if (message.month !== 0) {
            writer.uint32(16).int32(message.month);
        }
        if (message.day !== 0) {
            writer.uint32(24).int32(message.day);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseDateMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.year = reader.int32();
                    break;
                case 2:
                    message.month = reader.int32();
                    break;
                case 3:
                    message.day = reader.int32();
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
                field: [
                    { name: 'year', number: 1, label: 1, type: 5, jsonName: 'year' },
                    { name: 'month', number: 2, label: 1, type: 5, jsonName: 'month' },
                    { name: 'day', number: 3, label: 1, type: 5, jsonName: 'day' },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Date'
            },
        ],
        enumType: [],
        service: [],
        extension: [],
        name: 'google/type/date.proto',
        package: 'google.type',
        options: {
            uninterpretedOption: [],
            javaPackage: 'com.google.type',
            javaOuterClassname: 'DateProto',
            javaMultipleFiles: true,
            goPackage: 'google.golang.org/genproto/googleapis/type/date;date',
            ccEnableArenas: true,
            objcClassPrefix: 'GTP'
        },
        sourceCodeInfo: {
            location: [
                {
                    path: [4, 0],
                    span: [36, 0, 49, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' Represents a whole or partial calendar date, e.g. a birthday. The time of day\n and time zone are either specified elsewhere or are not significant. The date\n is relative to the Proleptic Gregorian Calendar. This can represent:\n\n * A full date, with non-zero year, month and day values\n * A month and day value, with a zero year, e.g. an anniversary\n * A year on its own, with zero month and day values\n * A year and month value, with a zero day, e.g. a credit card expiration date\n\n Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and `google.protobuf.Timestamp`.\n'
                },
                {
                    path: [4, 0, 2, 0],
                    span: [39, 2, 17],
                    leadingDetachedComments: [],
                    leadingComments: ' Year of date. Must be from 1 to 9999, or 0 if specifying a date without\n a year.\n'
                },
                {
                    path: [4, 0, 2, 1],
                    span: [43, 2, 18],
                    leadingDetachedComments: [],
                    leadingComments: ' Month of year. Must be from 1 to 12, or 0 if specifying a year without a\n month and day.\n'
                },
                {
                    path: [4, 0, 2, 2],
                    span: [48, 2, 16],
                    leadingDetachedComments: [],
                    leadingComments: ' Day of month. Must be from 1 to 31 and valid for the year and month, or 0\n if specifying a year by itself or a year and month where the day is not\n significant.\n'
                },
            ]
        },
        syntax: 'proto3'
    }),
    references: { '.google.type.DateMessage': exports.DateMessage },
    dependencies: []
};
// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
