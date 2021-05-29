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
exports.protoMetadata = exports.PingServiceClientImpl = exports.Empty = exports.SimpleButOptional = exports.Numbers = exports.PingResponse = exports.PingRequest = exports.SimpleWithMapOfEnums_EnumsByIdEntry = exports.SimpleWithMapOfEnums = exports.SimpleWithSnakeCaseMap_EntitiesByIdEntry = exports.SimpleWithSnakeCaseMap = exports.SimpleWithMap_MapOfBytesEntry = exports.SimpleWithMap_MapOfTimestampsEntry = exports.SimpleWithMap_IntLookupEntry = exports.SimpleWithMap_NameLookupEntry = exports.SimpleWithMap_EntitiesByIdEntry = exports.SimpleWithMap = exports.Entity = exports.SimpleWithWrappers = exports.OneOfMessage = exports.Nested_InnerMessage_DeepMessage = exports.Nested_InnerMessage = exports.Nested = exports.Child = exports.Simple = exports.Nested_InnerEnum = exports.Child_Type = exports.StateEnum = exports.protobufPackage = void 0;
/* eslint-disable */
var ts_proto_descriptors_1 = require("ts-proto-descriptors");
var minimal_1 = require("protobufjs/minimal");
var Long = require("long");
var date_1 = require("./google/type/date");
var wrappers_1 = require("./google/protobuf/wrappers");
var timestamp_1 = require("./google/protobuf/timestamp");
var thing_1 = require("./import_dir/thing");
exports.protobufPackage = 'simple';
/**
 * Adding a comment to the syntax will become the first
 * comment in the output source file.
 */
var StateEnum;
(function (StateEnum) {
    StateEnum[StateEnum["UNKNOWN"] = 0] = "UNKNOWN";
    StateEnum[StateEnum["ON"] = 2] = "ON";
    StateEnum[StateEnum["OFF"] = 3] = "OFF";
    StateEnum[StateEnum["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(StateEnum = exports.StateEnum || (exports.StateEnum = {}));
var Child_Type;
(function (Child_Type) {
    Child_Type[Child_Type["UNKNOWN"] = 0] = "UNKNOWN";
    Child_Type[Child_Type["GOOD"] = 1] = "GOOD";
    Child_Type[Child_Type["BAD"] = 2] = "BAD";
    Child_Type[Child_Type["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Child_Type = exports.Child_Type || (exports.Child_Type = {}));
var Nested_InnerEnum;
(function (Nested_InnerEnum) {
    Nested_InnerEnum[Nested_InnerEnum["UNKNOWN_INNER"] = 0] = "UNKNOWN_INNER";
    Nested_InnerEnum[Nested_InnerEnum["GOOD"] = 100] = "GOOD";
    Nested_InnerEnum[Nested_InnerEnum["BAD"] = 1000] = "BAD";
    Nested_InnerEnum[Nested_InnerEnum["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Nested_InnerEnum = exports.Nested_InnerEnum || (exports.Nested_InnerEnum = {}));
var baseSimple = { name: '', age: 0, state: 0, coins: 0, snacks: '', oldStates: 0 };
exports.Simple = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        if (message.age !== 0) {
            writer.uint32(16).int32(message.age);
        }
        if (message.createdAt !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
        }
        if (message.child !== undefined) {
            exports.Child.encode(message.child, writer.uint32(26).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(32).int32(message.state);
        }
        for (var _i = 0, _a = message.grandChildren; _i < _a.length; _i++) {
            var v = _a[_i];
            exports.Child.encode(v, writer.uint32(42).fork()).ldelim();
        }
        writer.uint32(50).fork();
        for (var _b = 0, _c = message.coins; _b < _c.length; _b++) {
            var v = _c[_b];
            writer.int32(v);
        }
        writer.ldelim();
        for (var _d = 0, _e = message.snacks; _d < _e.length; _d++) {
            var v = _e[_d];
            writer.uint32(58).string(v);
        }
        writer.uint32(66).fork();
        for (var _f = 0, _g = message.oldStates; _f < _g.length; _f++) {
            var v = _g[_f];
            writer.int32(v);
        }
        writer.ldelim();
        if (message.thing !== undefined) {
            thing_1.ImportedThing.encode(message.thing, writer.uint32(82).fork()).ldelim();
        }
        for (var _h = 0, _j = message.blobs; _h < _j.length; _h++) {
            var v = _j[_h];
            writer.uint32(90).bytes(v);
        }
        if (message.birthday !== undefined) {
            date_1.DateMessage.encode(message.birthday, writer.uint32(98).fork()).ldelim();
        }
        if (message.blob.length !== 0) {
            writer.uint32(106).bytes(message.blob);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimple);
        message.grandChildren = [];
        message.coins = [];
        message.snacks = [];
        message.oldStates = [];
        message.blobs = [];
        message.blob = new Uint8Array();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.age = reader.int32();
                    break;
                case 9:
                    message.createdAt = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.child = exports.Child.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.state = reader.int32();
                    break;
                case 5:
                    message.grandChildren.push(exports.Child.decode(reader, reader.uint32()));
                    break;
                case 6:
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.coins.push(reader.int32());
                        }
                    }
                    else {
                        message.coins.push(reader.int32());
                    }
                    break;
                case 7:
                    message.snacks.push(reader.string());
                    break;
                case 8:
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.oldStates.push(reader.int32());
                        }
                    }
                    else {
                        message.oldStates.push(reader.int32());
                    }
                    break;
                case 10:
                    message.thing = thing_1.ImportedThing.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.blobs.push(reader.bytes());
                    break;
                case 12:
                    message.birthday = date_1.DateMessage.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.blob = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseChild = { name: '', type: 0 };
exports.Child = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseChild);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseNested = { name: '', state: 0 };
exports.Nested = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        if (message.message !== undefined) {
            exports.Nested_InnerMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(24).int32(message.state);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseNested);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.message = exports.Nested_InnerMessage.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseNested_InnerMessage = { name: '' };
exports.Nested_InnerMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        if (message.deep !== undefined) {
            exports.Nested_InnerMessage_DeepMessage.encode(message.deep, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseNested_InnerMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.deep = exports.Nested_InnerMessage_DeepMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseNested_InnerMessage_DeepMessage = { name: '' };
exports.Nested_InnerMessage_DeepMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseNested_InnerMessage_DeepMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseOneOfMessage = {};
exports.OneOfMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.first !== undefined) {
            writer.uint32(10).string(message.first);
        }
        if (message.last !== undefined) {
            writer.uint32(18).string(message.last);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseOneOfMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.first = reader.string();
                    break;
                case 2:
                    message.last = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleWithWrappers = {};
exports.SimpleWithWrappers = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.name !== undefined) {
            wrappers_1.StringValue.encode({ value: message.name }, writer.uint32(10).fork()).ldelim();
        }
        if (message.age !== undefined) {
            wrappers_1.Int32Value.encode({ value: message.age }, writer.uint32(18).fork()).ldelim();
        }
        if (message.enabled !== undefined) {
            wrappers_1.BoolValue.encode({ value: message.enabled }, writer.uint32(26).fork()).ldelim();
        }
        for (var _i = 0, _a = message.coins; _i < _a.length; _i++) {
            var v = _a[_i];
            wrappers_1.Int32Value.encode({ value: v }, writer.uint32(50).fork()).ldelim();
        }
        for (var _b = 0, _c = message.snacks; _b < _c.length; _b++) {
            var v = _c[_b];
            wrappers_1.StringValue.encode({ value: v }, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithWrappers);
        message.coins = [];
        message.snacks = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = wrappers_1.StringValue.decode(reader, reader.uint32()).value;
                    break;
                case 2:
                    message.age = wrappers_1.Int32Value.decode(reader, reader.uint32()).value;
                    break;
                case 3:
                    message.enabled = wrappers_1.BoolValue.decode(reader, reader.uint32()).value;
                    break;
                case 6:
                    message.coins.push(wrappers_1.Int32Value.decode(reader, reader.uint32()).value);
                    break;
                case 7:
                    message.snacks.push(wrappers_1.StringValue.decode(reader, reader.uint32()).value);
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseEntity = { id: 0 };
exports.Entity = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.id !== 0) {
            writer.uint32(8).int32(message.id);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseEntity);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleWithMap = {};
exports.SimpleWithMap = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        Object.entries(message.entitiesById).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.SimpleWithMap_EntitiesByIdEntry.encode({ key: key, value: value }, writer.uint32(10).fork()).ldelim();
        });
        Object.entries(message.nameLookup).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.SimpleWithMap_NameLookupEntry.encode({ key: key, value: value }, writer.uint32(18).fork()).ldelim();
        });
        Object.entries(message.intLookup).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.SimpleWithMap_IntLookupEntry.encode({ key: key, value: value }, writer.uint32(26).fork()).ldelim();
        });
        Object.entries(message.mapOfTimestamps).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.SimpleWithMap_MapOfTimestampsEntry.encode({ key: key, value: value }, writer.uint32(34).fork()).ldelim();
        });
        Object.entries(message.mapOfBytes).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.SimpleWithMap_MapOfBytesEntry.encode({ key: key, value: value }, writer.uint32(42).fork()).ldelim();
        });
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithMap);
        message.entitiesById = {};
        message.nameLookup = {};
        message.intLookup = {};
        message.mapOfTimestamps = {};
        message.mapOfBytes = {};
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    var entry1 = exports.SimpleWithMap_EntitiesByIdEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.entitiesById[entry1.key] = entry1.value;
                    }
                    break;
                case 2:
                    var entry2 = exports.SimpleWithMap_NameLookupEntry.decode(reader, reader.uint32());
                    if (entry2.value !== undefined) {
                        message.nameLookup[entry2.key] = entry2.value;
                    }
                    break;
                case 3:
                    var entry3 = exports.SimpleWithMap_IntLookupEntry.decode(reader, reader.uint32());
                    if (entry3.value !== undefined) {
                        message.intLookup[entry3.key] = entry3.value;
                    }
                    break;
                case 4:
                    var entry4 = exports.SimpleWithMap_MapOfTimestampsEntry.decode(reader, reader.uint32());
                    if (entry4.value !== undefined) {
                        message.mapOfTimestamps[entry4.key] = entry4.value;
                    }
                    break;
                case 5:
                    var entry5 = exports.SimpleWithMap_MapOfBytesEntry.decode(reader, reader.uint32());
                    if (entry5.value !== undefined) {
                        message.mapOfBytes[entry5.key] = entry5.value;
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleWithMap_EntitiesByIdEntry = { key: 0 };
exports.SimpleWithMap_EntitiesByIdEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.key !== 0) {
            writer.uint32(8).int32(message.key);
        }
        if (message.value !== undefined) {
            exports.Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithMap_EntitiesByIdEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.int32();
                    break;
                case 2:
                    message.value = exports.Entity.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleWithMap_NameLookupEntry = { key: '', value: '' };
exports.SimpleWithMap_NameLookupEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.key !== '') {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== '') {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithMap_NameLookupEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
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
var baseSimpleWithMap_IntLookupEntry = { key: 0, value: 0 };
exports.SimpleWithMap_IntLookupEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.key !== 0) {
            writer.uint32(8).int32(message.key);
        }
        if (message.value !== 0) {
            writer.uint32(16).int32(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithMap_IntLookupEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.int32();
                    break;
                case 2:
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
var baseSimpleWithMap_MapOfTimestampsEntry = { key: '' };
exports.SimpleWithMap_MapOfTimestampsEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.key !== '') {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithMap_MapOfTimestampsEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleWithMap_MapOfBytesEntry = { key: '' };
exports.SimpleWithMap_MapOfBytesEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.key !== '') {
            writer.uint32(10).string(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithMap_MapOfBytesEntry);
        message.value = new Uint8Array();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
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
var baseSimpleWithSnakeCaseMap = {};
exports.SimpleWithSnakeCaseMap = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        Object.entries(message.entitiesById).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.SimpleWithSnakeCaseMap_EntitiesByIdEntry.encode({ key: key, value: value }, writer.uint32(10).fork()).ldelim();
        });
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithSnakeCaseMap);
        message.entitiesById = {};
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    var entry1 = exports.SimpleWithSnakeCaseMap_EntitiesByIdEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.entitiesById[entry1.key] = entry1.value;
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleWithSnakeCaseMap_EntitiesByIdEntry = { key: 0 };
exports.SimpleWithSnakeCaseMap_EntitiesByIdEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.key !== 0) {
            writer.uint32(8).int32(message.key);
        }
        if (message.value !== undefined) {
            exports.Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithSnakeCaseMap_EntitiesByIdEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.int32();
                    break;
                case 2:
                    message.value = exports.Entity.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleWithMapOfEnums = {};
exports.SimpleWithMapOfEnums = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        Object.entries(message.enumsById).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.SimpleWithMapOfEnums_EnumsByIdEntry.encode({ key: key, value: value }, writer.uint32(10).fork()).ldelim();
        });
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithMapOfEnums);
        message.enumsById = {};
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    var entry1 = exports.SimpleWithMapOfEnums_EnumsByIdEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.enumsById[entry1.key] = entry1.value;
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleWithMapOfEnums_EnumsByIdEntry = { key: 0, value: 0 };
exports.SimpleWithMapOfEnums_EnumsByIdEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.key !== 0) {
            writer.uint32(8).int32(message.key);
        }
        if (message.value !== 0) {
            writer.uint32(16).int32(message.value);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleWithMapOfEnums_EnumsByIdEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.int32();
                    break;
                case 2:
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
var basePingRequest = { input: '' };
exports.PingRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.input !== '') {
            writer.uint32(10).string(message.input);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePingRequest);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.input = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var basePingResponse = { output: '' };
exports.PingResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.output !== '') {
            writer.uint32(10).string(message.output);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePingResponse);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.output = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseNumbers = {
    double: 0,
    float: 0,
    int32: 0,
    int64: 0,
    uint32: 0,
    uint64: 0,
    sint32: 0,
    sint64: 0,
    fixed32: 0,
    fixed64: 0,
    sfixed32: 0,
    sfixed64: 0
};
exports.Numbers = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.double !== 0) {
            writer.uint32(9).double(message.double);
        }
        if (message.float !== 0) {
            writer.uint32(21).float(message.float);
        }
        if (message.int32 !== 0) {
            writer.uint32(24).int32(message.int32);
        }
        if (message.int64 !== 0) {
            writer.uint32(32).int64(message.int64);
        }
        if (message.uint32 !== 0) {
            writer.uint32(40).uint32(message.uint32);
        }
        if (message.uint64 !== 0) {
            writer.uint32(48).uint64(message.uint64);
        }
        if (message.sint32 !== 0) {
            writer.uint32(56).sint32(message.sint32);
        }
        if (message.sint64 !== 0) {
            writer.uint32(64).sint64(message.sint64);
        }
        if (message.fixed32 !== 0) {
            writer.uint32(77).fixed32(message.fixed32);
        }
        if (message.fixed64 !== 0) {
            writer.uint32(81).fixed64(message.fixed64);
        }
        if (message.sfixed32 !== 0) {
            writer.uint32(93).sfixed32(message.sfixed32);
        }
        if (message.sfixed64 !== 0) {
            writer.uint32(97).sfixed64(message.sfixed64);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseNumbers);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.double = reader.double();
                    break;
                case 2:
                    message.float = reader.float();
                    break;
                case 3:
                    message.int32 = reader.int32();
                    break;
                case 4:
                    message.int64 = longToNumber(reader.int64());
                    break;
                case 5:
                    message.uint32 = reader.uint32();
                    break;
                case 6:
                    message.uint64 = longToNumber(reader.uint64());
                    break;
                case 7:
                    message.sint32 = reader.sint32();
                    break;
                case 8:
                    message.sint64 = longToNumber(reader.sint64());
                    break;
                case 9:
                    message.fixed32 = reader.fixed32();
                    break;
                case 10:
                    message.fixed64 = longToNumber(reader.fixed64());
                    break;
                case 11:
                    message.sfixed32 = reader.sfixed32();
                    break;
                case 12:
                    message.sfixed64 = longToNumber(reader.sfixed64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseSimpleButOptional = {};
exports.SimpleButOptional = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.name !== undefined) {
            writer.uint32(10).string(message.name);
        }
        if (message.age !== undefined) {
            writer.uint32(16).int32(message.age);
        }
        if (message.createdAt !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
        }
        if (message.child !== undefined) {
            exports.Child.encode(message.child, writer.uint32(26).fork()).ldelim();
        }
        if (message.state !== undefined) {
            writer.uint32(32).int32(message.state);
        }
        if (message.thing !== undefined) {
            thing_1.ImportedThing.encode(message.thing, writer.uint32(82).fork()).ldelim();
        }
        if (message.birthday !== undefined) {
            date_1.DateMessage.encode(message.birthday, writer.uint32(98).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSimpleButOptional);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.age = reader.int32();
                    break;
                case 9:
                    message.createdAt = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.child = exports.Child.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.state = reader.int32();
                    break;
                case 10:
                    message.thing = thing_1.ImportedThing.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.birthday = date_1.DateMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var baseEmpty = {};
exports.Empty = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseEmpty);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    }
};
var PingServiceClientImpl = /** @class */ (function () {
    function PingServiceClientImpl(rpc) {
        this.rpc = rpc;
        this.ping = this.ping.bind(this);
    }
    PingServiceClientImpl.prototype.ping = function (request) {
        var data = exports.PingRequest.encode(request).finish();
        var promise = this.rpc.request('simple.PingService', 'ping', data);
        return promise.then(function (data) { return exports.PingResponse.decode(new minimal_1.Reader(data)); });
    };
    return PingServiceClientImpl;
}());
exports.PingServiceClientImpl = PingServiceClientImpl;
exports.protoMetadata = {
    fileDescriptor: ts_proto_descriptors_1.FileDescriptorProto.fromPartial({
        dependency: [
            'google/type/date.proto',
            'google/protobuf/wrappers.proto',
            'google/protobuf/timestamp.proto',
            'import_dir/thing.proto',
        ],
        publicDependency: [],
        weakDependency: [],
        messageType: [
            {
                field: [
                    { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
                    { name: 'age', number: 2, label: 1, type: 5, jsonName: 'age' },
                    {
                        name: 'created_at',
                        number: 9,
                        label: 1,
                        type: 11,
                        typeName: '.google.protobuf.Timestamp',
                        jsonName: 'createdAt'
                    },
                    { name: 'child', number: 3, label: 1, type: 11, typeName: '.simple.Child', jsonName: 'child' },
                    { name: 'state', number: 4, label: 1, type: 14, typeName: '.simple.StateEnum', jsonName: 'state' },
                    {
                        name: 'grand_children',
                        number: 5,
                        label: 3,
                        type: 11,
                        typeName: '.simple.Child',
                        jsonName: 'grandChildren'
                    },
                    { name: 'coins', number: 6, label: 3, type: 5, jsonName: 'coins' },
                    { name: 'snacks', number: 7, label: 3, type: 9, jsonName: 'snacks' },
                    { name: 'old_states', number: 8, label: 3, type: 14, typeName: '.simple.StateEnum', jsonName: 'oldStates' },
                    { name: 'thing', number: 10, label: 1, type: 11, typeName: '.simple.ImportedThing', jsonName: 'thing' },
                    { name: 'blobs', number: 11, label: 3, type: 12, jsonName: 'blobs' },
                    { name: 'birthday', number: 12, label: 1, type: 11, typeName: '.google.type.Date', jsonName: 'birthday' },
                    { name: 'blob', number: 13, label: 1, type: 12, jsonName: 'blob' },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Simple'
            },
            {
                field: [
                    { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
                    { name: 'type', number: 2, label: 1, type: 14, typeName: '.simple.Child.Type', jsonName: 'type' },
                ],
                extension: [],
                nestedType: [],
                enumType: [
                    {
                        value: [
                            { name: 'UNKNOWN', number: 0 },
                            { name: 'GOOD', number: 1 },
                            { name: 'BAD', number: 2 },
                        ],
                        reservedRange: [],
                        reservedName: [],
                        name: 'Type'
                    },
                ],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Child'
            },
            {
                field: [
                    { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
                    {
                        name: 'message',
                        number: 2,
                        label: 1,
                        type: 11,
                        typeName: '.simple.Nested.InnerMessage',
                        jsonName: 'message'
                    },
                    { name: 'state', number: 3, label: 1, type: 14, typeName: '.simple.Nested.InnerEnum', jsonName: 'state' },
                ],
                extension: [],
                nestedType: [
                    {
                        field: [
                            { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
                            {
                                name: 'deep',
                                number: 2,
                                label: 1,
                                type: 11,
                                typeName: '.simple.Nested.InnerMessage.DeepMessage',
                                jsonName: 'deep'
                            },
                        ],
                        extension: [],
                        nestedType: [
                            {
                                field: [{ name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' }],
                                extension: [],
                                nestedType: [],
                                enumType: [],
                                extensionRange: [],
                                oneofDecl: [],
                                reservedRange: [],
                                reservedName: [],
                                name: 'DeepMessage'
                            },
                        ],
                        enumType: [],
                        extensionRange: [],
                        oneofDecl: [],
                        reservedRange: [],
                        reservedName: [],
                        name: 'InnerMessage'
                    },
                ],
                enumType: [
                    {
                        value: [
                            { name: 'UNKNOWN_INNER', number: 0 },
                            { name: 'GOOD', number: 100 },
                            { name: 'BAD', number: 1000 },
                        ],
                        reservedRange: [],
                        reservedName: [],
                        name: 'InnerEnum'
                    },
                ],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Nested'
            },
            {
                field: [
                    { name: 'first', number: 1, label: 1, type: 9, oneofIndex: 0, jsonName: 'first' },
                    { name: 'last', number: 2, label: 1, type: 9, oneofIndex: 0, jsonName: 'last' },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [{ name: 'name_fields' }],
                reservedRange: [],
                reservedName: [],
                name: 'OneOfMessage'
            },
            {
                field: [
                    { name: 'name', number: 1, label: 1, type: 11, typeName: '.google.protobuf.StringValue', jsonName: 'name' },
                    { name: 'age', number: 2, label: 1, type: 11, typeName: '.google.protobuf.Int32Value', jsonName: 'age' },
                    {
                        name: 'enabled',
                        number: 3,
                        label: 1,
                        type: 11,
                        typeName: '.google.protobuf.BoolValue',
                        jsonName: 'enabled'
                    },
                    { name: 'coins', number: 6, label: 3, type: 11, typeName: '.google.protobuf.Int32Value', jsonName: 'coins' },
                    {
                        name: 'snacks',
                        number: 7,
                        label: 3,
                        type: 11,
                        typeName: '.google.protobuf.StringValue',
                        jsonName: 'snacks'
                    },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'SimpleWithWrappers'
            },
            {
                field: [{ name: 'id', number: 1, label: 1, type: 5, jsonName: 'id' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Entity'
            },
            {
                field: [
                    {
                        name: 'entitiesById',
                        number: 1,
                        label: 3,
                        type: 11,
                        typeName: '.simple.SimpleWithMap.EntitiesByIdEntry',
                        jsonName: 'entitiesById'
                    },
                    {
                        name: 'nameLookup',
                        number: 2,
                        label: 3,
                        type: 11,
                        typeName: '.simple.SimpleWithMap.NameLookupEntry',
                        jsonName: 'nameLookup'
                    },
                    {
                        name: 'intLookup',
                        number: 3,
                        label: 3,
                        type: 11,
                        typeName: '.simple.SimpleWithMap.IntLookupEntry',
                        jsonName: 'intLookup'
                    },
                    {
                        name: 'mapOfTimestamps',
                        number: 4,
                        label: 3,
                        type: 11,
                        typeName: '.simple.SimpleWithMap.MapOfTimestampsEntry',
                        jsonName: 'mapOfTimestamps'
                    },
                    {
                        name: 'mapOfBytes',
                        number: 5,
                        label: 3,
                        type: 11,
                        typeName: '.simple.SimpleWithMap.MapOfBytesEntry',
                        jsonName: 'mapOfBytes'
                    },
                ],
                extension: [],
                nestedType: [
                    {
                        field: [
                            { name: 'key', number: 1, label: 1, type: 5, jsonName: 'key' },
                            { name: 'value', number: 2, label: 1, type: 11, typeName: '.simple.Entity', jsonName: 'value' },
                        ],
                        extension: [],
                        nestedType: [],
                        enumType: [],
                        extensionRange: [],
                        oneofDecl: [],
                        reservedRange: [],
                        reservedName: [],
                        name: 'EntitiesByIdEntry',
                        options: { uninterpretedOption: [], mapEntry: true }
                    },
                    {
                        field: [
                            { name: 'key', number: 1, label: 1, type: 9, jsonName: 'key' },
                            { name: 'value', number: 2, label: 1, type: 9, jsonName: 'value' },
                        ],
                        extension: [],
                        nestedType: [],
                        enumType: [],
                        extensionRange: [],
                        oneofDecl: [],
                        reservedRange: [],
                        reservedName: [],
                        name: 'NameLookupEntry',
                        options: { uninterpretedOption: [], mapEntry: true }
                    },
                    {
                        field: [
                            { name: 'key', number: 1, label: 1, type: 5, jsonName: 'key' },
                            { name: 'value', number: 2, label: 1, type: 5, jsonName: 'value' },
                        ],
                        extension: [],
                        nestedType: [],
                        enumType: [],
                        extensionRange: [],
                        oneofDecl: [],
                        reservedRange: [],
                        reservedName: [],
                        name: 'IntLookupEntry',
                        options: { uninterpretedOption: [], mapEntry: true }
                    },
                    {
                        field: [
                            { name: 'key', number: 1, label: 1, type: 9, jsonName: 'key' },
                            {
                                name: 'value',
                                number: 2,
                                label: 1,
                                type: 11,
                                typeName: '.google.protobuf.Timestamp',
                                jsonName: 'value'
                            },
                        ],
                        extension: [],
                        nestedType: [],
                        enumType: [],
                        extensionRange: [],
                        oneofDecl: [],
                        reservedRange: [],
                        reservedName: [],
                        name: 'MapOfTimestampsEntry',
                        options: { uninterpretedOption: [], mapEntry: true }
                    },
                    {
                        field: [
                            { name: 'key', number: 1, label: 1, type: 9, jsonName: 'key' },
                            { name: 'value', number: 2, label: 1, type: 12, jsonName: 'value' },
                        ],
                        extension: [],
                        nestedType: [],
                        enumType: [],
                        extensionRange: [],
                        oneofDecl: [],
                        reservedRange: [],
                        reservedName: [],
                        name: 'MapOfBytesEntry',
                        options: { uninterpretedOption: [], mapEntry: true }
                    },
                ],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'SimpleWithMap'
            },
            {
                field: [
                    {
                        name: 'entities_by_id',
                        number: 1,
                        label: 3,
                        type: 11,
                        typeName: '.simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry',
                        jsonName: 'entitiesById'
                    },
                ],
                extension: [],
                nestedType: [
                    {
                        field: [
                            { name: 'key', number: 1, label: 1, type: 5, jsonName: 'key' },
                            { name: 'value', number: 2, label: 1, type: 11, typeName: '.simple.Entity', jsonName: 'value' },
                        ],
                        extension: [],
                        nestedType: [],
                        enumType: [],
                        extensionRange: [],
                        oneofDecl: [],
                        reservedRange: [],
                        reservedName: [],
                        name: 'EntitiesByIdEntry',
                        options: { uninterpretedOption: [], mapEntry: true }
                    },
                ],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'SimpleWithSnakeCaseMap'
            },
            {
                field: [
                    {
                        name: 'enums_by_id',
                        number: 1,
                        label: 3,
                        type: 11,
                        typeName: '.simple.SimpleWithMapOfEnums.EnumsByIdEntry',
                        jsonName: 'enumsById'
                    },
                ],
                extension: [],
                nestedType: [
                    {
                        field: [
                            { name: 'key', number: 1, label: 1, type: 5, jsonName: 'key' },
                            { name: 'value', number: 2, label: 1, type: 14, typeName: '.simple.StateEnum', jsonName: 'value' },
                        ],
                        extension: [],
                        nestedType: [],
                        enumType: [],
                        extensionRange: [],
                        oneofDecl: [],
                        reservedRange: [],
                        reservedName: [],
                        name: 'EnumsByIdEntry',
                        options: { uninterpretedOption: [], mapEntry: true }
                    },
                ],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'SimpleWithMapOfEnums'
            },
            {
                field: [{ name: 'input', number: 1, label: 1, type: 9, jsonName: 'input' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'PingRequest'
            },
            {
                field: [{ name: 'output', number: 1, label: 1, type: 9, jsonName: 'output' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'PingResponse'
            },
            {
                field: [
                    { name: 'double', number: 1, label: 1, type: 1, jsonName: 'double' },
                    { name: 'float', number: 2, label: 1, type: 2, jsonName: 'float' },
                    { name: 'int32', number: 3, label: 1, type: 5, jsonName: 'int32' },
                    { name: 'int64', number: 4, label: 1, type: 3, jsonName: 'int64' },
                    { name: 'uint32', number: 5, label: 1, type: 13, jsonName: 'uint32' },
                    { name: 'uint64', number: 6, label: 1, type: 4, jsonName: 'uint64' },
                    { name: 'sint32', number: 7, label: 1, type: 17, jsonName: 'sint32' },
                    { name: 'sint64', number: 8, label: 1, type: 18, jsonName: 'sint64' },
                    { name: 'fixed32', number: 9, label: 1, type: 7, jsonName: 'fixed32' },
                    { name: 'fixed64', number: 10, label: 1, type: 6, jsonName: 'fixed64' },
                    { name: 'sfixed32', number: 11, label: 1, type: 15, jsonName: 'sfixed32' },
                    { name: 'sfixed64', number: 12, label: 1, type: 16, jsonName: 'sfixed64' },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Numbers'
            },
            {
                field: [
                    { name: 'name', number: 1, label: 1, type: 9, oneofIndex: 0, jsonName: 'name', proto3Optional: true },
                    { name: 'age', number: 2, label: 1, type: 5, oneofIndex: 1, jsonName: 'age', proto3Optional: true },
                    {
                        name: 'created_at',
                        number: 9,
                        label: 1,
                        type: 11,
                        typeName: '.google.protobuf.Timestamp',
                        oneofIndex: 2,
                        jsonName: 'createdAt',
                        proto3Optional: true
                    },
                    {
                        name: 'child',
                        number: 3,
                        label: 1,
                        type: 11,
                        typeName: '.simple.Child',
                        oneofIndex: 3,
                        jsonName: 'child',
                        proto3Optional: true
                    },
                    {
                        name: 'state',
                        number: 4,
                        label: 1,
                        type: 14,
                        typeName: '.simple.StateEnum',
                        oneofIndex: 4,
                        jsonName: 'state',
                        proto3Optional: true
                    },
                    {
                        name: 'thing',
                        number: 10,
                        label: 1,
                        type: 11,
                        typeName: '.simple.ImportedThing',
                        oneofIndex: 5,
                        jsonName: 'thing',
                        proto3Optional: true
                    },
                    {
                        name: 'birthday',
                        number: 12,
                        label: 1,
                        type: 11,
                        typeName: '.google.type.Date',
                        oneofIndex: 6,
                        jsonName: 'birthday',
                        proto3Optional: true
                    },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [
                    { name: '_name' },
                    { name: '_age' },
                    { name: '_created_at' },
                    { name: '_child' },
                    { name: '_state' },
                    { name: '_thing' },
                    { name: '_birthday' },
                ],
                reservedRange: [],
                reservedName: [],
                name: 'SimpleButOptional'
            },
            {
                field: [],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'Empty'
            },
        ],
        enumType: [
            {
                value: [
                    { name: 'UNKNOWN', number: 0 },
                    { name: 'ON', number: 2 },
                    { name: 'OFF', number: 3 },
                ],
                reservedRange: [],
                reservedName: [],
                name: 'StateEnum'
            },
        ],
        service: [
            {
                method: [{ name: 'ping', inputType: '.simple.PingRequest', outputType: '.simple.PingResponse' }],
                name: 'PingService'
            },
        ],
        extension: [],
        name: 'simple.proto',
        package: 'simple',
        sourceCodeInfo: {
            location: [
                {
                    path: [12],
                    span: [2, 0, 18],
                    leadingDetachedComments: [],
                    leadingComments: ' Adding a comment to the syntax will become the first\n comment in the output source file.\n'
                },
                {
                    path: [4, 0],
                    span: [13, 0, 30, 1],
                    leadingDetachedComments: [
                        ' This comment is seperated by a blank non-comment line, and will detatch from \n the following comment on the message Simple.\n',
                    ],
                    leadingComments: '* Example comment on the Simple message '
                },
                { path: [4, 0, 2, 0], span: [15, 2, 18], leadingDetachedComments: [], leadingComments: ' Name field\n' },
                { path: [4, 0, 2, 1], span: [17, 2, 16], leadingDetachedComments: [], leadingComments: ' Age ' },
                {
                    path: [4, 0, 2, 2],
                    span: [18, 2, 43],
                    leadingDetachedComments: [],
                    trailingComments: ' This comment will also attach\n'
                },
                {
                    path: [4, 0, 2, 9],
                    span: [26, 2, 27],
                    leadingDetachedComments: [],
                    leadingComments: ' A thing (imported from thing)\n'
                },
                {
                    path: [4, 2, 3, 0],
                    span: [54, 2, 61, 3],
                    leadingDetachedComments: [],
                    leadingComments: ' Comment for a nested message */\n'
                },
                {
                    path: [4, 12],
                    span: [133, 0, 144, 1],
                    leadingDetachedComments: [],
                    leadingComments: "* For testing proto3's field presence feature. "
                },
                { path: [4, 12, 2, 0], span: [135, 2, 27], leadingDetachedComments: [], leadingComments: ' Name field\n' },
                { path: [4, 12, 2, 1], span: [137, 2, 25], leadingDetachedComments: [], leadingComments: ' Age ' },
                {
                    path: [4, 12, 2, 2],
                    span: [138, 2, 52],
                    leadingDetachedComments: [],
                    trailingComments: ' This comment will also attach\n'
                },
                {
                    path: [4, 12, 2, 5],
                    span: [142, 2, 36],
                    leadingDetachedComments: [],
                    leadingComments: ' A thing (imported from thing)\n'
                },
            ]
        },
        syntax: 'proto3'
    }),
    references: {
        '.simple.StateEnum': StateEnum,
        '.simple.Simple': exports.Simple,
        '.simple.Child': exports.Child,
        '.simple.Child.Type': Child_Type,
        '.simple.Nested': exports.Nested,
        '.simple.Nested.InnerEnum': Nested_InnerEnum,
        '.simple.Nested.InnerMessage': exports.Nested_InnerMessage,
        '.simple.Nested.InnerMessage.DeepMessage': exports.Nested_InnerMessage_DeepMessage,
        '.simple.OneOfMessage': exports.OneOfMessage,
        '.simple.SimpleWithWrappers': exports.SimpleWithWrappers,
        '.simple.Entity': exports.Entity,
        '.simple.SimpleWithMap': exports.SimpleWithMap,
        '.simple.SimpleWithMap.EntitiesByIdEntry': exports.SimpleWithMap_EntitiesByIdEntry,
        '.simple.SimpleWithMap.NameLookupEntry': exports.SimpleWithMap_NameLookupEntry,
        '.simple.SimpleWithMap.IntLookupEntry': exports.SimpleWithMap_IntLookupEntry,
        '.simple.SimpleWithMap.MapOfTimestampsEntry': exports.SimpleWithMap_MapOfTimestampsEntry,
        '.simple.SimpleWithMap.MapOfBytesEntry': exports.SimpleWithMap_MapOfBytesEntry,
        '.simple.SimpleWithSnakeCaseMap': exports.SimpleWithSnakeCaseMap,
        '.simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry': exports.SimpleWithSnakeCaseMap_EntitiesByIdEntry,
        '.simple.SimpleWithMapOfEnums': exports.SimpleWithMapOfEnums,
        '.simple.SimpleWithMapOfEnums.EnumsByIdEntry': exports.SimpleWithMapOfEnums_EnumsByIdEntry,
        '.simple.PingRequest': exports.PingRequest,
        '.simple.PingResponse': exports.PingResponse,
        '.simple.Numbers': exports.Numbers,
        '.simple.SimpleButOptional': exports.SimpleButOptional,
        '.simple.Empty': exports.Empty,
        '.simple.PingService': PingServiceClientImpl
    },
    dependencies: [date_1.protoMetadata, wrappers_1.protoMetadata, timestamp_1.protoMetadata, thing_1.protoMetadata]
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
