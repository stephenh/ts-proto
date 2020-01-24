/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.simple = (function() {
    
        /**
         * Namespace simple.
         * @exports simple
         * @namespace
         */
        var simple = {};
    
        simple.Simple = (function() {
    
            /**
             * Properties of a Simple.
             * @memberof simple
             * @interface ISimple
             * @property {string|null} [name] Simple name
             * @property {number|null} [age] Simple age
             * @property {google.protobuf.Timestamp|null} [createdAt] Simple createdAt
             * @property {simple.Child|null} [child] Simple child
             * @property {simple.StateEnum|null} [state] Simple state
             * @property {Array.<simple.Child>|null} [grandChildren] Simple grandChildren
             * @property {Array.<number>|null} [coins] Simple coins
             * @property {Array.<string>|null} [snacks] Simple snacks
             * @property {Array.<simple.StateEnum>|null} [oldStates] Simple oldStates
             * @property {simple.ImportedThing|null} [thing] Simple thing
             */
    
            /**
             * Constructs a new Simple.
             * @memberof simple
             * @classdesc Represents a Simple.
             * @implements ISimple
             * @constructor
             * @param {simple.ISimple=} [properties] Properties to set
             */
            function Simple(properties) {
                this.grandChildren = [];
                this.coins = [];
                this.snacks = [];
                this.oldStates = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Simple name.
             * @member {string} name
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.name = "";
    
            /**
             * Simple age.
             * @member {number} age
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.age = 0;
    
            /**
             * Simple createdAt.
             * @member {google.protobuf.Timestamp|null|undefined} createdAt
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.createdAt = null;
    
            /**
             * Simple child.
             * @member {simple.Child|null|undefined} child
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.child = null;
    
            /**
             * Simple state.
             * @member {simple.StateEnum} state
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.state = 0;
    
            /**
             * Simple grandChildren.
             * @member {Array.<simple.Child>} grandChildren
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.grandChildren = $util.emptyArray;
    
            /**
             * Simple coins.
             * @member {Array.<number>} coins
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.coins = $util.emptyArray;
    
            /**
             * Simple snacks.
             * @member {Array.<string>} snacks
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.snacks = $util.emptyArray;
    
            /**
             * Simple oldStates.
             * @member {Array.<simple.StateEnum>} oldStates
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.oldStates = $util.emptyArray;
    
            /**
             * Simple thing.
             * @member {simple.ImportedThing|null|undefined} thing
             * @memberof simple.Simple
             * @instance
             */
            Simple.prototype.thing = null;
    
            /**
             * Creates a new Simple instance using the specified properties.
             * @function create
             * @memberof simple.Simple
             * @static
             * @param {simple.ISimple=} [properties] Properties to set
             * @returns {simple.Simple} Simple instance
             */
            Simple.create = function create(properties) {
                return new Simple(properties);
            };
    
            /**
             * Encodes the specified Simple message. Does not implicitly {@link simple.Simple.verify|verify} messages.
             * @function encode
             * @memberof simple.Simple
             * @static
             * @param {simple.Simple} message Simple message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.age != null && message.hasOwnProperty("age"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.age);
                if (message.child != null && message.hasOwnProperty("child"))
                    $root.simple.Child.encode(message.child, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.state);
                if (message.grandChildren != null && message.grandChildren.length)
                    for (var i = 0; i < message.grandChildren.length; ++i)
                        $root.simple.Child.encode(message.grandChildren[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.coins != null && message.coins.length) {
                    writer.uint32(/* id 6, wireType 2 =*/50).fork();
                    for (var i = 0; i < message.coins.length; ++i)
                        writer.int32(message.coins[i]);
                    writer.ldelim();
                }
                if (message.snacks != null && message.snacks.length)
                    for (var i = 0; i < message.snacks.length; ++i)
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.snacks[i]);
                if (message.oldStates != null && message.oldStates.length) {
                    writer.uint32(/* id 8, wireType 2 =*/66).fork();
                    for (var i = 0; i < message.oldStates.length; ++i)
                        writer.int32(message.oldStates[i]);
                    writer.ldelim();
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.thing != null && message.hasOwnProperty("thing"))
                    $root.simple.ImportedThing.encode(message.thing, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Simple message, length delimited. Does not implicitly {@link simple.Simple.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.Simple
             * @static
             * @param {simple.Simple} message Simple message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Simple message from the specified reader or buffer.
             * @function decode
             * @memberof simple.Simple
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.Simple} Simple
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Simple.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.Simple();
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
                        message.createdAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.child = $root.simple.Child.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.state = reader.int32();
                        break;
                    case 5:
                        if (!(message.grandChildren && message.grandChildren.length))
                            message.grandChildren = [];
                        message.grandChildren.push($root.simple.Child.decode(reader, reader.uint32()));
                        break;
                    case 6:
                        if (!(message.coins && message.coins.length))
                            message.coins = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.coins.push(reader.int32());
                        } else
                            message.coins.push(reader.int32());
                        break;
                    case 7:
                        if (!(message.snacks && message.snacks.length))
                            message.snacks = [];
                        message.snacks.push(reader.string());
                        break;
                    case 8:
                        if (!(message.oldStates && message.oldStates.length))
                            message.oldStates = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.oldStates.push(reader.int32());
                        } else
                            message.oldStates.push(reader.int32());
                        break;
                    case 10:
                        message.thing = $root.simple.ImportedThing.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Simple message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.Simple
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.Simple} Simple
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Simple.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Simple message.
             * @function verify
             * @memberof simple.Simple
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Simple.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.age != null && message.hasOwnProperty("age"))
                    if (!$util.isInteger(message.age))
                        return "age: integer expected";
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    var error = $root.google.protobuf.Timestamp.verify(message.createdAt);
                    if (error)
                        return "createdAt." + error;
                }
                if (message.child != null && message.hasOwnProperty("child")) {
                    var error = $root.simple.Child.verify(message.child);
                    if (error)
                        return "child." + error;
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.grandChildren != null && message.hasOwnProperty("grandChildren")) {
                    if (!Array.isArray(message.grandChildren))
                        return "grandChildren: array expected";
                    for (var i = 0; i < message.grandChildren.length; ++i) {
                        var error = $root.simple.Child.verify(message.grandChildren[i]);
                        if (error)
                            return "grandChildren." + error;
                    }
                }
                if (message.coins != null && message.hasOwnProperty("coins")) {
                    if (!Array.isArray(message.coins))
                        return "coins: array expected";
                    for (var i = 0; i < message.coins.length; ++i)
                        if (!$util.isInteger(message.coins[i]))
                            return "coins: integer[] expected";
                }
                if (message.snacks != null && message.hasOwnProperty("snacks")) {
                    if (!Array.isArray(message.snacks))
                        return "snacks: array expected";
                    for (var i = 0; i < message.snacks.length; ++i)
                        if (!$util.isString(message.snacks[i]))
                            return "snacks: string[] expected";
                }
                if (message.oldStates != null && message.hasOwnProperty("oldStates")) {
                    if (!Array.isArray(message.oldStates))
                        return "oldStates: array expected";
                    for (var i = 0; i < message.oldStates.length; ++i)
                        switch (message.oldStates[i]) {
                        default:
                            return "oldStates: enum value[] expected";
                        case 0:
                        case 2:
                        case 3:
                            break;
                        }
                }
                if (message.thing != null && message.hasOwnProperty("thing")) {
                    var error = $root.simple.ImportedThing.verify(message.thing);
                    if (error)
                        return "thing." + error;
                }
                return null;
            };
    
            /**
             * Creates a Simple message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.Simple
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.Simple} Simple
             */
            Simple.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.Simple)
                    return object;
                var message = new $root.simple.Simple();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.age != null)
                    message.age = object.age | 0;
                if (object.createdAt != null) {
                    if (typeof object.createdAt !== "object")
                        throw TypeError(".simple.Simple.createdAt: object expected");
                    message.createdAt = $root.google.protobuf.Timestamp.fromObject(object.createdAt);
                }
                if (object.child != null) {
                    if (typeof object.child !== "object")
                        throw TypeError(".simple.Simple.child: object expected");
                    message.child = $root.simple.Child.fromObject(object.child);
                }
                switch (object.state) {
                case "UNKNOWN":
                case 0:
                    message.state = 0;
                    break;
                case "ON":
                case 2:
                    message.state = 2;
                    break;
                case "OFF":
                case 3:
                    message.state = 3;
                    break;
                }
                if (object.grandChildren) {
                    if (!Array.isArray(object.grandChildren))
                        throw TypeError(".simple.Simple.grandChildren: array expected");
                    message.grandChildren = [];
                    for (var i = 0; i < object.grandChildren.length; ++i) {
                        if (typeof object.grandChildren[i] !== "object")
                            throw TypeError(".simple.Simple.grandChildren: object expected");
                        message.grandChildren[i] = $root.simple.Child.fromObject(object.grandChildren[i]);
                    }
                }
                if (object.coins) {
                    if (!Array.isArray(object.coins))
                        throw TypeError(".simple.Simple.coins: array expected");
                    message.coins = [];
                    for (var i = 0; i < object.coins.length; ++i)
                        message.coins[i] = object.coins[i] | 0;
                }
                if (object.snacks) {
                    if (!Array.isArray(object.snacks))
                        throw TypeError(".simple.Simple.snacks: array expected");
                    message.snacks = [];
                    for (var i = 0; i < object.snacks.length; ++i)
                        message.snacks[i] = String(object.snacks[i]);
                }
                if (object.oldStates) {
                    if (!Array.isArray(object.oldStates))
                        throw TypeError(".simple.Simple.oldStates: array expected");
                    message.oldStates = [];
                    for (var i = 0; i < object.oldStates.length; ++i)
                        switch (object.oldStates[i]) {
                        default:
                        case "UNKNOWN":
                        case 0:
                            message.oldStates[i] = 0;
                            break;
                        case "ON":
                        case 2:
                            message.oldStates[i] = 2;
                            break;
                        case "OFF":
                        case 3:
                            message.oldStates[i] = 3;
                            break;
                        }
                }
                if (object.thing != null) {
                    if (typeof object.thing !== "object")
                        throw TypeError(".simple.Simple.thing: object expected");
                    message.thing = $root.simple.ImportedThing.fromObject(object.thing);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Simple message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.Simple
             * @static
             * @param {simple.Simple} message Simple
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Simple.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.grandChildren = [];
                    object.coins = [];
                    object.snacks = [];
                    object.oldStates = [];
                }
                if (options.defaults) {
                    object.name = "";
                    object.age = 0;
                    object.child = null;
                    object.state = options.enums === String ? "UNKNOWN" : 0;
                    object.createdAt = null;
                    object.thing = null;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.age != null && message.hasOwnProperty("age"))
                    object.age = message.age;
                if (message.child != null && message.hasOwnProperty("child"))
                    object.child = $root.simple.Child.toObject(message.child, options);
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.simple.StateEnum[message.state] : message.state;
                if (message.grandChildren && message.grandChildren.length) {
                    object.grandChildren = [];
                    for (var j = 0; j < message.grandChildren.length; ++j)
                        object.grandChildren[j] = $root.simple.Child.toObject(message.grandChildren[j], options);
                }
                if (message.coins && message.coins.length) {
                    object.coins = [];
                    for (var j = 0; j < message.coins.length; ++j)
                        object.coins[j] = message.coins[j];
                }
                if (message.snacks && message.snacks.length) {
                    object.snacks = [];
                    for (var j = 0; j < message.snacks.length; ++j)
                        object.snacks[j] = message.snacks[j];
                }
                if (message.oldStates && message.oldStates.length) {
                    object.oldStates = [];
                    for (var j = 0; j < message.oldStates.length; ++j)
                        object.oldStates[j] = options.enums === String ? $root.simple.StateEnum[message.oldStates[j]] : message.oldStates[j];
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    object.createdAt = $root.google.protobuf.Timestamp.toObject(message.createdAt, options);
                if (message.thing != null && message.hasOwnProperty("thing"))
                    object.thing = $root.simple.ImportedThing.toObject(message.thing, options);
                return object;
            };
    
            /**
             * Converts this Simple to JSON.
             * @function toJSON
             * @memberof simple.Simple
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Simple.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Simple;
        })();
    
        simple.Child = (function() {
    
            /**
             * Properties of a Child.
             * @memberof simple
             * @interface IChild
             * @property {string|null} [name] Child name
             * @property {simple.Child.Type|null} [type] Child type
             */
    
            /**
             * Constructs a new Child.
             * @memberof simple
             * @classdesc Represents a Child.
             * @implements IChild
             * @constructor
             * @param {simple.IChild=} [properties] Properties to set
             */
            function Child(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Child name.
             * @member {string} name
             * @memberof simple.Child
             * @instance
             */
            Child.prototype.name = "";
    
            /**
             * Child type.
             * @member {simple.Child.Type} type
             * @memberof simple.Child
             * @instance
             */
            Child.prototype.type = 0;
    
            /**
             * Creates a new Child instance using the specified properties.
             * @function create
             * @memberof simple.Child
             * @static
             * @param {simple.IChild=} [properties] Properties to set
             * @returns {simple.Child} Child instance
             */
            Child.create = function create(properties) {
                return new Child(properties);
            };
    
            /**
             * Encodes the specified Child message. Does not implicitly {@link simple.Child.verify|verify} messages.
             * @function encode
             * @memberof simple.Child
             * @static
             * @param {simple.Child} message Child message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Child.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                return writer;
            };
    
            /**
             * Encodes the specified Child message, length delimited. Does not implicitly {@link simple.Child.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.Child
             * @static
             * @param {simple.Child} message Child message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Child.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Child message from the specified reader or buffer.
             * @function decode
             * @memberof simple.Child
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.Child} Child
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Child.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.Child();
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
            };
    
            /**
             * Decodes a Child message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.Child
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.Child} Child
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Child.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Child message.
             * @function verify
             * @memberof simple.Child
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Child.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a Child message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.Child
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.Child} Child
             */
            Child.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.Child)
                    return object;
                var message = new $root.simple.Child();
                if (object.name != null)
                    message.name = String(object.name);
                switch (object.type) {
                case "UNKNOWN":
                case 0:
                    message.type = 0;
                    break;
                case "GOOD":
                case 1:
                    message.type = 1;
                    break;
                case "BAD":
                case 2:
                    message.type = 2;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Child message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.Child
             * @static
             * @param {simple.Child} message Child
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Child.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.type = options.enums === String ? "UNKNOWN" : 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.simple.Child.Type[message.type] : message.type;
                return object;
            };
    
            /**
             * Converts this Child to JSON.
             * @function toJSON
             * @memberof simple.Child
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Child.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Type enum.
             * @name simple.Child.Type
             * @enum {string}
             * @property {number} UNKNOWN=0 UNKNOWN value
             * @property {number} GOOD=1 GOOD value
             * @property {number} BAD=2 BAD value
             */
            Child.Type = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "GOOD"] = 1;
                values[valuesById[2] = "BAD"] = 2;
                return values;
            })();
    
            return Child;
        })();
    
        /**
         * StateEnum enum.
         * @name simple.StateEnum
         * @enum {string}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} ON=2 ON value
         * @property {number} OFF=3 OFF value
         */
        simple.StateEnum = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[2] = "ON"] = 2;
            values[valuesById[3] = "OFF"] = 3;
            return values;
        })();
    
        simple.Nested = (function() {
    
            /**
             * Properties of a Nested.
             * @memberof simple
             * @interface INested
             * @property {string|null} [name] Nested name
             * @property {simple.Nested.InnerMessage|null} [message] Nested message
             * @property {simple.Nested.InnerEnum|null} [state] Nested state
             */
    
            /**
             * Constructs a new Nested.
             * @memberof simple
             * @classdesc Represents a Nested.
             * @implements INested
             * @constructor
             * @param {simple.INested=} [properties] Properties to set
             */
            function Nested(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Nested name.
             * @member {string} name
             * @memberof simple.Nested
             * @instance
             */
            Nested.prototype.name = "";
    
            /**
             * Nested message.
             * @member {simple.Nested.InnerMessage|null|undefined} message
             * @memberof simple.Nested
             * @instance
             */
            Nested.prototype.message = null;
    
            /**
             * Nested state.
             * @member {simple.Nested.InnerEnum} state
             * @memberof simple.Nested
             * @instance
             */
            Nested.prototype.state = 0;
    
            /**
             * Creates a new Nested instance using the specified properties.
             * @function create
             * @memberof simple.Nested
             * @static
             * @param {simple.INested=} [properties] Properties to set
             * @returns {simple.Nested} Nested instance
             */
            Nested.create = function create(properties) {
                return new Nested(properties);
            };
    
            /**
             * Encodes the specified Nested message. Does not implicitly {@link simple.Nested.verify|verify} messages.
             * @function encode
             * @memberof simple.Nested
             * @static
             * @param {simple.Nested} message Nested message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Nested.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.message != null && message.hasOwnProperty("message"))
                    $root.simple.Nested.InnerMessage.encode(message.message, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.state);
                return writer;
            };
    
            /**
             * Encodes the specified Nested message, length delimited. Does not implicitly {@link simple.Nested.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.Nested
             * @static
             * @param {simple.Nested} message Nested message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Nested.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Nested message from the specified reader or buffer.
             * @function decode
             * @memberof simple.Nested
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.Nested} Nested
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Nested.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.Nested();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.message = $root.simple.Nested.InnerMessage.decode(reader, reader.uint32());
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
            };
    
            /**
             * Decodes a Nested message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.Nested
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.Nested} Nested
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Nested.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Nested message.
             * @function verify
             * @memberof simple.Nested
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Nested.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.message != null && message.hasOwnProperty("message")) {
                    var error = $root.simple.Nested.InnerMessage.verify(message.message);
                    if (error)
                        return "message." + error;
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 100:
                    case 1000:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a Nested message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.Nested
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.Nested} Nested
             */
            Nested.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.Nested)
                    return object;
                var message = new $root.simple.Nested();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.message != null) {
                    if (typeof object.message !== "object")
                        throw TypeError(".simple.Nested.message: object expected");
                    message.message = $root.simple.Nested.InnerMessage.fromObject(object.message);
                }
                switch (object.state) {
                case "UNKNOWN_INNER":
                case 0:
                    message.state = 0;
                    break;
                case "GOOD":
                case 100:
                    message.state = 100;
                    break;
                case "BAD":
                case 1000:
                    message.state = 1000;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Nested message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.Nested
             * @static
             * @param {simple.Nested} message Nested
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Nested.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.message = null;
                    object.state = options.enums === String ? "UNKNOWN_INNER" : 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = $root.simple.Nested.InnerMessage.toObject(message.message, options);
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.simple.Nested.InnerEnum[message.state] : message.state;
                return object;
            };
    
            /**
             * Converts this Nested to JSON.
             * @function toJSON
             * @memberof simple.Nested
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Nested.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            Nested.InnerMessage = (function() {
    
                /**
                 * Properties of an InnerMessage.
                 * @memberof simple.Nested
                 * @interface IInnerMessage
                 * @property {string|null} [name] InnerMessage name
                 * @property {simple.Nested.InnerMessage.DeepMessage|null} [deep] InnerMessage deep
                 */
    
                /**
                 * Constructs a new InnerMessage.
                 * @memberof simple.Nested
                 * @classdesc Represents an InnerMessage.
                 * @implements IInnerMessage
                 * @constructor
                 * @param {simple.Nested.IInnerMessage=} [properties] Properties to set
                 */
                function InnerMessage(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * InnerMessage name.
                 * @member {string} name
                 * @memberof simple.Nested.InnerMessage
                 * @instance
                 */
                InnerMessage.prototype.name = "";
    
                /**
                 * InnerMessage deep.
                 * @member {simple.Nested.InnerMessage.DeepMessage|null|undefined} deep
                 * @memberof simple.Nested.InnerMessage
                 * @instance
                 */
                InnerMessage.prototype.deep = null;
    
                /**
                 * Creates a new InnerMessage instance using the specified properties.
                 * @function create
                 * @memberof simple.Nested.InnerMessage
                 * @static
                 * @param {simple.Nested.IInnerMessage=} [properties] Properties to set
                 * @returns {simple.Nested.InnerMessage} InnerMessage instance
                 */
                InnerMessage.create = function create(properties) {
                    return new InnerMessage(properties);
                };
    
                /**
                 * Encodes the specified InnerMessage message. Does not implicitly {@link simple.Nested.InnerMessage.verify|verify} messages.
                 * @function encode
                 * @memberof simple.Nested.InnerMessage
                 * @static
                 * @param {simple.Nested.InnerMessage} message InnerMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InnerMessage.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.deep != null && message.hasOwnProperty("deep"))
                        $root.simple.Nested.InnerMessage.DeepMessage.encode(message.deep, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified InnerMessage message, length delimited. Does not implicitly {@link simple.Nested.InnerMessage.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof simple.Nested.InnerMessage
                 * @static
                 * @param {simple.Nested.InnerMessage} message InnerMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InnerMessage.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an InnerMessage message from the specified reader or buffer.
                 * @function decode
                 * @memberof simple.Nested.InnerMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {simple.Nested.InnerMessage} InnerMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InnerMessage.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.Nested.InnerMessage();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            message.deep = $root.simple.Nested.InnerMessage.DeepMessage.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an InnerMessage message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof simple.Nested.InnerMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {simple.Nested.InnerMessage} InnerMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InnerMessage.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an InnerMessage message.
                 * @function verify
                 * @memberof simple.Nested.InnerMessage
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InnerMessage.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.deep != null && message.hasOwnProperty("deep")) {
                        var error = $root.simple.Nested.InnerMessage.DeepMessage.verify(message.deep);
                        if (error)
                            return "deep." + error;
                    }
                    return null;
                };
    
                /**
                 * Creates an InnerMessage message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof simple.Nested.InnerMessage
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {simple.Nested.InnerMessage} InnerMessage
                 */
                InnerMessage.fromObject = function fromObject(object) {
                    if (object instanceof $root.simple.Nested.InnerMessage)
                        return object;
                    var message = new $root.simple.Nested.InnerMessage();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.deep != null) {
                        if (typeof object.deep !== "object")
                            throw TypeError(".simple.Nested.InnerMessage.deep: object expected");
                        message.deep = $root.simple.Nested.InnerMessage.DeepMessage.fromObject(object.deep);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from an InnerMessage message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof simple.Nested.InnerMessage
                 * @static
                 * @param {simple.Nested.InnerMessage} message InnerMessage
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InnerMessage.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.deep = null;
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.deep != null && message.hasOwnProperty("deep"))
                        object.deep = $root.simple.Nested.InnerMessage.DeepMessage.toObject(message.deep, options);
                    return object;
                };
    
                /**
                 * Converts this InnerMessage to JSON.
                 * @function toJSON
                 * @memberof simple.Nested.InnerMessage
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InnerMessage.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                InnerMessage.DeepMessage = (function() {
    
                    /**
                     * Properties of a DeepMessage.
                     * @memberof simple.Nested.InnerMessage
                     * @interface IDeepMessage
                     * @property {string|null} [name] DeepMessage name
                     */
    
                    /**
                     * Constructs a new DeepMessage.
                     * @memberof simple.Nested.InnerMessage
                     * @classdesc Represents a DeepMessage.
                     * @implements IDeepMessage
                     * @constructor
                     * @param {simple.Nested.InnerMessage.IDeepMessage=} [properties] Properties to set
                     */
                    function DeepMessage(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * DeepMessage name.
                     * @member {string} name
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @instance
                     */
                    DeepMessage.prototype.name = "";
    
                    /**
                     * Creates a new DeepMessage instance using the specified properties.
                     * @function create
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @static
                     * @param {simple.Nested.InnerMessage.IDeepMessage=} [properties] Properties to set
                     * @returns {simple.Nested.InnerMessage.DeepMessage} DeepMessage instance
                     */
                    DeepMessage.create = function create(properties) {
                        return new DeepMessage(properties);
                    };
    
                    /**
                     * Encodes the specified DeepMessage message. Does not implicitly {@link simple.Nested.InnerMessage.DeepMessage.verify|verify} messages.
                     * @function encode
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @static
                     * @param {simple.Nested.InnerMessage.DeepMessage} message DeepMessage message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    DeepMessage.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.name != null && message.hasOwnProperty("name"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified DeepMessage message, length delimited. Does not implicitly {@link simple.Nested.InnerMessage.DeepMessage.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @static
                     * @param {simple.Nested.InnerMessage.DeepMessage} message DeepMessage message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    DeepMessage.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a DeepMessage message from the specified reader or buffer.
                     * @function decode
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {simple.Nested.InnerMessage.DeepMessage} DeepMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    DeepMessage.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.Nested.InnerMessage.DeepMessage();
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
                    };
    
                    /**
                     * Decodes a DeepMessage message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {simple.Nested.InnerMessage.DeepMessage} DeepMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    DeepMessage.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a DeepMessage message.
                     * @function verify
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    DeepMessage.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.name != null && message.hasOwnProperty("name"))
                            if (!$util.isString(message.name))
                                return "name: string expected";
                        return null;
                    };
    
                    /**
                     * Creates a DeepMessage message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {simple.Nested.InnerMessage.DeepMessage} DeepMessage
                     */
                    DeepMessage.fromObject = function fromObject(object) {
                        if (object instanceof $root.simple.Nested.InnerMessage.DeepMessage)
                            return object;
                        var message = new $root.simple.Nested.InnerMessage.DeepMessage();
                        if (object.name != null)
                            message.name = String(object.name);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a DeepMessage message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @static
                     * @param {simple.Nested.InnerMessage.DeepMessage} message DeepMessage
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    DeepMessage.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.name = "";
                        if (message.name != null && message.hasOwnProperty("name"))
                            object.name = message.name;
                        return object;
                    };
    
                    /**
                     * Converts this DeepMessage to JSON.
                     * @function toJSON
                     * @memberof simple.Nested.InnerMessage.DeepMessage
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    DeepMessage.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return DeepMessage;
                })();
    
                return InnerMessage;
            })();
    
            /**
             * InnerEnum enum.
             * @name simple.Nested.InnerEnum
             * @enum {string}
             * @property {number} UNKNOWN_INNER=0 UNKNOWN_INNER value
             * @property {number} GOOD=100 GOOD value
             * @property {number} BAD=1000 BAD value
             */
            Nested.InnerEnum = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN_INNER"] = 0;
                values[valuesById[100] = "GOOD"] = 100;
                values[valuesById[1000] = "BAD"] = 1000;
                return values;
            })();
    
            return Nested;
        })();
    
        simple.OneOfMessage = (function() {
    
            /**
             * Properties of an OneOfMessage.
             * @memberof simple
             * @interface IOneOfMessage
             * @property {string|null} [first] OneOfMessage first
             * @property {string|null} [last] OneOfMessage last
             */
    
            /**
             * Constructs a new OneOfMessage.
             * @memberof simple
             * @classdesc Represents an OneOfMessage.
             * @implements IOneOfMessage
             * @constructor
             * @param {simple.IOneOfMessage=} [properties] Properties to set
             */
            function OneOfMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * OneOfMessage first.
             * @member {string} first
             * @memberof simple.OneOfMessage
             * @instance
             */
            OneOfMessage.prototype.first = "";
    
            /**
             * OneOfMessage last.
             * @member {string} last
             * @memberof simple.OneOfMessage
             * @instance
             */
            OneOfMessage.prototype.last = "";
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * OneOfMessage nameFields.
             * @member {"first"|"last"|undefined} nameFields
             * @memberof simple.OneOfMessage
             * @instance
             */
            Object.defineProperty(OneOfMessage.prototype, "nameFields", {
                get: $util.oneOfGetter($oneOfFields = ["first", "last"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new OneOfMessage instance using the specified properties.
             * @function create
             * @memberof simple.OneOfMessage
             * @static
             * @param {simple.IOneOfMessage=} [properties] Properties to set
             * @returns {simple.OneOfMessage} OneOfMessage instance
             */
            OneOfMessage.create = function create(properties) {
                return new OneOfMessage(properties);
            };
    
            /**
             * Encodes the specified OneOfMessage message. Does not implicitly {@link simple.OneOfMessage.verify|verify} messages.
             * @function encode
             * @memberof simple.OneOfMessage
             * @static
             * @param {simple.OneOfMessage} message OneOfMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneOfMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.first != null && message.hasOwnProperty("first"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.first);
                if (message.last != null && message.hasOwnProperty("last"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.last);
                return writer;
            };
    
            /**
             * Encodes the specified OneOfMessage message, length delimited. Does not implicitly {@link simple.OneOfMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.OneOfMessage
             * @static
             * @param {simple.OneOfMessage} message OneOfMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneOfMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an OneOfMessage message from the specified reader or buffer.
             * @function decode
             * @memberof simple.OneOfMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.OneOfMessage} OneOfMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OneOfMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.OneOfMessage();
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
            };
    
            /**
             * Decodes an OneOfMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.OneOfMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.OneOfMessage} OneOfMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OneOfMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an OneOfMessage message.
             * @function verify
             * @memberof simple.OneOfMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OneOfMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.first != null && message.hasOwnProperty("first")) {
                    properties.nameFields = 1;
                    if (!$util.isString(message.first))
                        return "first: string expected";
                }
                if (message.last != null && message.hasOwnProperty("last")) {
                    if (properties.nameFields === 1)
                        return "nameFields: multiple values";
                    properties.nameFields = 1;
                    if (!$util.isString(message.last))
                        return "last: string expected";
                }
                return null;
            };
    
            /**
             * Creates an OneOfMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.OneOfMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.OneOfMessage} OneOfMessage
             */
            OneOfMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.OneOfMessage)
                    return object;
                var message = new $root.simple.OneOfMessage();
                if (object.first != null)
                    message.first = String(object.first);
                if (object.last != null)
                    message.last = String(object.last);
                return message;
            };
    
            /**
             * Creates a plain object from an OneOfMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.OneOfMessage
             * @static
             * @param {simple.OneOfMessage} message OneOfMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OneOfMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.first != null && message.hasOwnProperty("first")) {
                    object.first = message.first;
                    if (options.oneofs)
                        object.nameFields = "first";
                }
                if (message.last != null && message.hasOwnProperty("last")) {
                    object.last = message.last;
                    if (options.oneofs)
                        object.nameFields = "last";
                }
                return object;
            };
    
            /**
             * Converts this OneOfMessage to JSON.
             * @function toJSON
             * @memberof simple.OneOfMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OneOfMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return OneOfMessage;
        })();
    
        simple.SimpleWithWrappers = (function() {
    
            /**
             * Properties of a SimpleWithWrappers.
             * @memberof simple
             * @interface ISimpleWithWrappers
             * @property {google.protobuf.StringValue|null} [name] SimpleWithWrappers name
             * @property {google.protobuf.Int32Value|null} [age] SimpleWithWrappers age
             * @property {google.protobuf.BoolValue|null} [enabled] SimpleWithWrappers enabled
             * @property {Array.<google.protobuf.Int32Value>|null} [coins] SimpleWithWrappers coins
             * @property {Array.<google.protobuf.StringValue>|null} [snacks] SimpleWithWrappers snacks
             */
    
            /**
             * Constructs a new SimpleWithWrappers.
             * @memberof simple
             * @classdesc Represents a SimpleWithWrappers.
             * @implements ISimpleWithWrappers
             * @constructor
             * @param {simple.ISimpleWithWrappers=} [properties] Properties to set
             */
            function SimpleWithWrappers(properties) {
                this.coins = [];
                this.snacks = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SimpleWithWrappers name.
             * @member {google.protobuf.StringValue|null|undefined} name
             * @memberof simple.SimpleWithWrappers
             * @instance
             */
            SimpleWithWrappers.prototype.name = null;
    
            /**
             * SimpleWithWrappers age.
             * @member {google.protobuf.Int32Value|null|undefined} age
             * @memberof simple.SimpleWithWrappers
             * @instance
             */
            SimpleWithWrappers.prototype.age = null;
    
            /**
             * SimpleWithWrappers enabled.
             * @member {google.protobuf.BoolValue|null|undefined} enabled
             * @memberof simple.SimpleWithWrappers
             * @instance
             */
            SimpleWithWrappers.prototype.enabled = null;
    
            /**
             * SimpleWithWrappers coins.
             * @member {Array.<google.protobuf.Int32Value>} coins
             * @memberof simple.SimpleWithWrappers
             * @instance
             */
            SimpleWithWrappers.prototype.coins = $util.emptyArray;
    
            /**
             * SimpleWithWrappers snacks.
             * @member {Array.<google.protobuf.StringValue>} snacks
             * @memberof simple.SimpleWithWrappers
             * @instance
             */
            SimpleWithWrappers.prototype.snacks = $util.emptyArray;
    
            /**
             * Creates a new SimpleWithWrappers instance using the specified properties.
             * @function create
             * @memberof simple.SimpleWithWrappers
             * @static
             * @param {simple.ISimpleWithWrappers=} [properties] Properties to set
             * @returns {simple.SimpleWithWrappers} SimpleWithWrappers instance
             */
            SimpleWithWrappers.create = function create(properties) {
                return new SimpleWithWrappers(properties);
            };
    
            /**
             * Encodes the specified SimpleWithWrappers message. Does not implicitly {@link simple.SimpleWithWrappers.verify|verify} messages.
             * @function encode
             * @memberof simple.SimpleWithWrappers
             * @static
             * @param {simple.SimpleWithWrappers} message SimpleWithWrappers message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimpleWithWrappers.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    $root.google.protobuf.StringValue.encode(message.name, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.age != null && message.hasOwnProperty("age"))
                    $root.google.protobuf.Int32Value.encode(message.age, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    $root.google.protobuf.BoolValue.encode(message.enabled, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.coins != null && message.coins.length)
                    for (var i = 0; i < message.coins.length; ++i)
                        $root.google.protobuf.Int32Value.encode(message.coins[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.snacks != null && message.snacks.length)
                    for (var i = 0; i < message.snacks.length; ++i)
                        $root.google.protobuf.StringValue.encode(message.snacks[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified SimpleWithWrappers message, length delimited. Does not implicitly {@link simple.SimpleWithWrappers.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.SimpleWithWrappers
             * @static
             * @param {simple.SimpleWithWrappers} message SimpleWithWrappers message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimpleWithWrappers.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SimpleWithWrappers message from the specified reader or buffer.
             * @function decode
             * @memberof simple.SimpleWithWrappers
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.SimpleWithWrappers} SimpleWithWrappers
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimpleWithWrappers.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.SimpleWithWrappers();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = $root.google.protobuf.StringValue.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.age = $root.google.protobuf.Int32Value.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.enabled = $root.google.protobuf.BoolValue.decode(reader, reader.uint32());
                        break;
                    case 6:
                        if (!(message.coins && message.coins.length))
                            message.coins = [];
                        message.coins.push($root.google.protobuf.Int32Value.decode(reader, reader.uint32()));
                        break;
                    case 7:
                        if (!(message.snacks && message.snacks.length))
                            message.snacks = [];
                        message.snacks.push($root.google.protobuf.StringValue.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SimpleWithWrappers message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.SimpleWithWrappers
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.SimpleWithWrappers} SimpleWithWrappers
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimpleWithWrappers.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SimpleWithWrappers message.
             * @function verify
             * @memberof simple.SimpleWithWrappers
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SimpleWithWrappers.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name")) {
                    var error = $root.google.protobuf.StringValue.verify(message.name);
                    if (error)
                        return "name." + error;
                }
                if (message.age != null && message.hasOwnProperty("age")) {
                    var error = $root.google.protobuf.Int32Value.verify(message.age);
                    if (error)
                        return "age." + error;
                }
                if (message.enabled != null && message.hasOwnProperty("enabled")) {
                    var error = $root.google.protobuf.BoolValue.verify(message.enabled);
                    if (error)
                        return "enabled." + error;
                }
                if (message.coins != null && message.hasOwnProperty("coins")) {
                    if (!Array.isArray(message.coins))
                        return "coins: array expected";
                    for (var i = 0; i < message.coins.length; ++i) {
                        var error = $root.google.protobuf.Int32Value.verify(message.coins[i]);
                        if (error)
                            return "coins." + error;
                    }
                }
                if (message.snacks != null && message.hasOwnProperty("snacks")) {
                    if (!Array.isArray(message.snacks))
                        return "snacks: array expected";
                    for (var i = 0; i < message.snacks.length; ++i) {
                        var error = $root.google.protobuf.StringValue.verify(message.snacks[i]);
                        if (error)
                            return "snacks." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a SimpleWithWrappers message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.SimpleWithWrappers
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.SimpleWithWrappers} SimpleWithWrappers
             */
            SimpleWithWrappers.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.SimpleWithWrappers)
                    return object;
                var message = new $root.simple.SimpleWithWrappers();
                if (object.name != null) {
                    if (typeof object.name !== "object")
                        throw TypeError(".simple.SimpleWithWrappers.name: object expected");
                    message.name = $root.google.protobuf.StringValue.fromObject(object.name);
                }
                if (object.age != null) {
                    if (typeof object.age !== "object")
                        throw TypeError(".simple.SimpleWithWrappers.age: object expected");
                    message.age = $root.google.protobuf.Int32Value.fromObject(object.age);
                }
                if (object.enabled != null) {
                    if (typeof object.enabled !== "object")
                        throw TypeError(".simple.SimpleWithWrappers.enabled: object expected");
                    message.enabled = $root.google.protobuf.BoolValue.fromObject(object.enabled);
                }
                if (object.coins) {
                    if (!Array.isArray(object.coins))
                        throw TypeError(".simple.SimpleWithWrappers.coins: array expected");
                    message.coins = [];
                    for (var i = 0; i < object.coins.length; ++i) {
                        if (typeof object.coins[i] !== "object")
                            throw TypeError(".simple.SimpleWithWrappers.coins: object expected");
                        message.coins[i] = $root.google.protobuf.Int32Value.fromObject(object.coins[i]);
                    }
                }
                if (object.snacks) {
                    if (!Array.isArray(object.snacks))
                        throw TypeError(".simple.SimpleWithWrappers.snacks: array expected");
                    message.snacks = [];
                    for (var i = 0; i < object.snacks.length; ++i) {
                        if (typeof object.snacks[i] !== "object")
                            throw TypeError(".simple.SimpleWithWrappers.snacks: object expected");
                        message.snacks[i] = $root.google.protobuf.StringValue.fromObject(object.snacks[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a SimpleWithWrappers message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.SimpleWithWrappers
             * @static
             * @param {simple.SimpleWithWrappers} message SimpleWithWrappers
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SimpleWithWrappers.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.coins = [];
                    object.snacks = [];
                }
                if (options.defaults) {
                    object.name = null;
                    object.age = null;
                    object.enabled = null;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = $root.google.protobuf.StringValue.toObject(message.name, options);
                if (message.age != null && message.hasOwnProperty("age"))
                    object.age = $root.google.protobuf.Int32Value.toObject(message.age, options);
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    object.enabled = $root.google.protobuf.BoolValue.toObject(message.enabled, options);
                if (message.coins && message.coins.length) {
                    object.coins = [];
                    for (var j = 0; j < message.coins.length; ++j)
                        object.coins[j] = $root.google.protobuf.Int32Value.toObject(message.coins[j], options);
                }
                if (message.snacks && message.snacks.length) {
                    object.snacks = [];
                    for (var j = 0; j < message.snacks.length; ++j)
                        object.snacks[j] = $root.google.protobuf.StringValue.toObject(message.snacks[j], options);
                }
                return object;
            };
    
            /**
             * Converts this SimpleWithWrappers to JSON.
             * @function toJSON
             * @memberof simple.SimpleWithWrappers
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SimpleWithWrappers.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SimpleWithWrappers;
        })();
    
        simple.Entity = (function() {
    
            /**
             * Properties of an Entity.
             * @memberof simple
             * @interface IEntity
             * @property {number|null} [id] Entity id
             */
    
            /**
             * Constructs a new Entity.
             * @memberof simple
             * @classdesc Represents an Entity.
             * @implements IEntity
             * @constructor
             * @param {simple.IEntity=} [properties] Properties to set
             */
            function Entity(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Entity id.
             * @member {number} id
             * @memberof simple.Entity
             * @instance
             */
            Entity.prototype.id = 0;
    
            /**
             * Creates a new Entity instance using the specified properties.
             * @function create
             * @memberof simple.Entity
             * @static
             * @param {simple.IEntity=} [properties] Properties to set
             * @returns {simple.Entity} Entity instance
             */
            Entity.create = function create(properties) {
                return new Entity(properties);
            };
    
            /**
             * Encodes the specified Entity message. Does not implicitly {@link simple.Entity.verify|verify} messages.
             * @function encode
             * @memberof simple.Entity
             * @static
             * @param {simple.Entity} message Entity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Entity.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                return writer;
            };
    
            /**
             * Encodes the specified Entity message, length delimited. Does not implicitly {@link simple.Entity.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.Entity
             * @static
             * @param {simple.Entity} message Entity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Entity.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Entity message from the specified reader or buffer.
             * @function decode
             * @memberof simple.Entity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.Entity} Entity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Entity.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.Entity();
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
            };
    
            /**
             * Decodes an Entity message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.Entity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.Entity} Entity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Entity.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Entity message.
             * @function verify
             * @memberof simple.Entity
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Entity.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                return null;
            };
    
            /**
             * Creates an Entity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.Entity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.Entity} Entity
             */
            Entity.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.Entity)
                    return object;
                var message = new $root.simple.Entity();
                if (object.id != null)
                    message.id = object.id | 0;
                return message;
            };
    
            /**
             * Creates a plain object from an Entity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.Entity
             * @static
             * @param {simple.Entity} message Entity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Entity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                return object;
            };
    
            /**
             * Converts this Entity to JSON.
             * @function toJSON
             * @memberof simple.Entity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Entity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Entity;
        })();
    
        simple.SimpleWithMap = (function() {
    
            /**
             * Properties of a SimpleWithMap.
             * @memberof simple
             * @interface ISimpleWithMap
             * @property {Object.<string,simple.Entity>|null} [entitiesById] SimpleWithMap entitiesById
             * @property {Object.<string,string>|null} [nameLookup] SimpleWithMap nameLookup
             * @property {Object.<string,number>|null} [intLookup] SimpleWithMap intLookup
             */
    
            /**
             * Constructs a new SimpleWithMap.
             * @memberof simple
             * @classdesc Represents a SimpleWithMap.
             * @implements ISimpleWithMap
             * @constructor
             * @param {simple.ISimpleWithMap=} [properties] Properties to set
             */
            function SimpleWithMap(properties) {
                this.entitiesById = {};
                this.nameLookup = {};
                this.intLookup = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SimpleWithMap entitiesById.
             * @member {Object.<string,simple.Entity>} entitiesById
             * @memberof simple.SimpleWithMap
             * @instance
             */
            SimpleWithMap.prototype.entitiesById = $util.emptyObject;
    
            /**
             * SimpleWithMap nameLookup.
             * @member {Object.<string,string>} nameLookup
             * @memberof simple.SimpleWithMap
             * @instance
             */
            SimpleWithMap.prototype.nameLookup = $util.emptyObject;
    
            /**
             * SimpleWithMap intLookup.
             * @member {Object.<string,number>} intLookup
             * @memberof simple.SimpleWithMap
             * @instance
             */
            SimpleWithMap.prototype.intLookup = $util.emptyObject;
    
            /**
             * Creates a new SimpleWithMap instance using the specified properties.
             * @function create
             * @memberof simple.SimpleWithMap
             * @static
             * @param {simple.ISimpleWithMap=} [properties] Properties to set
             * @returns {simple.SimpleWithMap} SimpleWithMap instance
             */
            SimpleWithMap.create = function create(properties) {
                return new SimpleWithMap(properties);
            };
    
            /**
             * Encodes the specified SimpleWithMap message. Does not implicitly {@link simple.SimpleWithMap.verify|verify} messages.
             * @function encode
             * @memberof simple.SimpleWithMap
             * @static
             * @param {simple.SimpleWithMap} message SimpleWithMap message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimpleWithMap.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.entitiesById != null && message.hasOwnProperty("entitiesById"))
                    for (var keys = Object.keys(message.entitiesById), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]);
                        $root.simple.Entity.encode(message.entitiesById[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.nameLookup != null && message.hasOwnProperty("nameLookup"))
                    for (var keys = Object.keys(message.nameLookup), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.nameLookup[keys[i]]).ldelim();
                if (message.intLookup != null && message.hasOwnProperty("intLookup"))
                    for (var keys = Object.keys(message.intLookup), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.intLookup[keys[i]]).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified SimpleWithMap message, length delimited. Does not implicitly {@link simple.SimpleWithMap.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.SimpleWithMap
             * @static
             * @param {simple.SimpleWithMap} message SimpleWithMap message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimpleWithMap.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SimpleWithMap message from the specified reader or buffer.
             * @function decode
             * @memberof simple.SimpleWithMap
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.SimpleWithMap} SimpleWithMap
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimpleWithMap.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.SimpleWithMap(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.entitiesById === $util.emptyObject)
                            message.entitiesById = {};
                        key = reader.int32();
                        reader.pos++;
                        message.entitiesById[key] = $root.simple.Entity.decode(reader, reader.uint32());
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.nameLookup === $util.emptyObject)
                            message.nameLookup = {};
                        key = reader.string();
                        reader.pos++;
                        message.nameLookup[key] = reader.string();
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.intLookup === $util.emptyObject)
                            message.intLookup = {};
                        key = reader.int32();
                        reader.pos++;
                        message.intLookup[key] = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SimpleWithMap message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.SimpleWithMap
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.SimpleWithMap} SimpleWithMap
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimpleWithMap.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SimpleWithMap message.
             * @function verify
             * @memberof simple.SimpleWithMap
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SimpleWithMap.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.entitiesById != null && message.hasOwnProperty("entitiesById")) {
                    if (!$util.isObject(message.entitiesById))
                        return "entitiesById: object expected";
                    var key = Object.keys(message.entitiesById);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "entitiesById: integer key{k:int32} expected";
                        {
                            var error = $root.simple.Entity.verify(message.entitiesById[key[i]]);
                            if (error)
                                return "entitiesById." + error;
                        }
                    }
                }
                if (message.nameLookup != null && message.hasOwnProperty("nameLookup")) {
                    if (!$util.isObject(message.nameLookup))
                        return "nameLookup: object expected";
                    var key = Object.keys(message.nameLookup);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.nameLookup[key[i]]))
                            return "nameLookup: string{k:string} expected";
                }
                if (message.intLookup != null && message.hasOwnProperty("intLookup")) {
                    if (!$util.isObject(message.intLookup))
                        return "intLookup: object expected";
                    var key = Object.keys(message.intLookup);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "intLookup: integer key{k:int32} expected";
                        if (!$util.isInteger(message.intLookup[key[i]]))
                            return "intLookup: integer{k:int32} expected";
                    }
                }
                return null;
            };
    
            /**
             * Creates a SimpleWithMap message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.SimpleWithMap
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.SimpleWithMap} SimpleWithMap
             */
            SimpleWithMap.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.SimpleWithMap)
                    return object;
                var message = new $root.simple.SimpleWithMap();
                if (object.entitiesById) {
                    if (typeof object.entitiesById !== "object")
                        throw TypeError(".simple.SimpleWithMap.entitiesById: object expected");
                    message.entitiesById = {};
                    for (var keys = Object.keys(object.entitiesById), i = 0; i < keys.length; ++i) {
                        if (typeof object.entitiesById[keys[i]] !== "object")
                            throw TypeError(".simple.SimpleWithMap.entitiesById: object expected");
                        message.entitiesById[keys[i]] = $root.simple.Entity.fromObject(object.entitiesById[keys[i]]);
                    }
                }
                if (object.nameLookup) {
                    if (typeof object.nameLookup !== "object")
                        throw TypeError(".simple.SimpleWithMap.nameLookup: object expected");
                    message.nameLookup = {};
                    for (var keys = Object.keys(object.nameLookup), i = 0; i < keys.length; ++i)
                        message.nameLookup[keys[i]] = String(object.nameLookup[keys[i]]);
                }
                if (object.intLookup) {
                    if (typeof object.intLookup !== "object")
                        throw TypeError(".simple.SimpleWithMap.intLookup: object expected");
                    message.intLookup = {};
                    for (var keys = Object.keys(object.intLookup), i = 0; i < keys.length; ++i)
                        message.intLookup[keys[i]] = object.intLookup[keys[i]] | 0;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a SimpleWithMap message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.SimpleWithMap
             * @static
             * @param {simple.SimpleWithMap} message SimpleWithMap
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SimpleWithMap.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults) {
                    object.entitiesById = {};
                    object.nameLookup = {};
                    object.intLookup = {};
                }
                var keys2;
                if (message.entitiesById && (keys2 = Object.keys(message.entitiesById)).length) {
                    object.entitiesById = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.entitiesById[keys2[j]] = $root.simple.Entity.toObject(message.entitiesById[keys2[j]], options);
                }
                if (message.nameLookup && (keys2 = Object.keys(message.nameLookup)).length) {
                    object.nameLookup = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.nameLookup[keys2[j]] = message.nameLookup[keys2[j]];
                }
                if (message.intLookup && (keys2 = Object.keys(message.intLookup)).length) {
                    object.intLookup = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.intLookup[keys2[j]] = message.intLookup[keys2[j]];
                }
                return object;
            };
    
            /**
             * Converts this SimpleWithMap to JSON.
             * @function toJSON
             * @memberof simple.SimpleWithMap
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SimpleWithMap.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SimpleWithMap;
        })();
    
        simple.SimpleWithSnakeCaseMap = (function() {
    
            /**
             * Properties of a SimpleWithSnakeCaseMap.
             * @memberof simple
             * @interface ISimpleWithSnakeCaseMap
             * @property {Object.<string,simple.Entity>|null} [entitiesById] SimpleWithSnakeCaseMap entitiesById
             */
    
            /**
             * Constructs a new SimpleWithSnakeCaseMap.
             * @memberof simple
             * @classdesc Represents a SimpleWithSnakeCaseMap.
             * @implements ISimpleWithSnakeCaseMap
             * @constructor
             * @param {simple.ISimpleWithSnakeCaseMap=} [properties] Properties to set
             */
            function SimpleWithSnakeCaseMap(properties) {
                this.entitiesById = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SimpleWithSnakeCaseMap entitiesById.
             * @member {Object.<string,simple.Entity>} entitiesById
             * @memberof simple.SimpleWithSnakeCaseMap
             * @instance
             */
            SimpleWithSnakeCaseMap.prototype.entitiesById = $util.emptyObject;
    
            /**
             * Creates a new SimpleWithSnakeCaseMap instance using the specified properties.
             * @function create
             * @memberof simple.SimpleWithSnakeCaseMap
             * @static
             * @param {simple.ISimpleWithSnakeCaseMap=} [properties] Properties to set
             * @returns {simple.SimpleWithSnakeCaseMap} SimpleWithSnakeCaseMap instance
             */
            SimpleWithSnakeCaseMap.create = function create(properties) {
                return new SimpleWithSnakeCaseMap(properties);
            };
    
            /**
             * Encodes the specified SimpleWithSnakeCaseMap message. Does not implicitly {@link simple.SimpleWithSnakeCaseMap.verify|verify} messages.
             * @function encode
             * @memberof simple.SimpleWithSnakeCaseMap
             * @static
             * @param {simple.SimpleWithSnakeCaseMap} message SimpleWithSnakeCaseMap message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimpleWithSnakeCaseMap.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.entitiesById != null && message.hasOwnProperty("entitiesById"))
                    for (var keys = Object.keys(message.entitiesById), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]);
                        $root.simple.Entity.encode(message.entitiesById[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };
    
            /**
             * Encodes the specified SimpleWithSnakeCaseMap message, length delimited. Does not implicitly {@link simple.SimpleWithSnakeCaseMap.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.SimpleWithSnakeCaseMap
             * @static
             * @param {simple.SimpleWithSnakeCaseMap} message SimpleWithSnakeCaseMap message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimpleWithSnakeCaseMap.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SimpleWithSnakeCaseMap message from the specified reader or buffer.
             * @function decode
             * @memberof simple.SimpleWithSnakeCaseMap
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.SimpleWithSnakeCaseMap} SimpleWithSnakeCaseMap
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimpleWithSnakeCaseMap.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.SimpleWithSnakeCaseMap(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.entitiesById === $util.emptyObject)
                            message.entitiesById = {};
                        key = reader.int32();
                        reader.pos++;
                        message.entitiesById[key] = $root.simple.Entity.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SimpleWithSnakeCaseMap message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.SimpleWithSnakeCaseMap
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.SimpleWithSnakeCaseMap} SimpleWithSnakeCaseMap
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimpleWithSnakeCaseMap.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SimpleWithSnakeCaseMap message.
             * @function verify
             * @memberof simple.SimpleWithSnakeCaseMap
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SimpleWithSnakeCaseMap.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.entitiesById != null && message.hasOwnProperty("entitiesById")) {
                    if (!$util.isObject(message.entitiesById))
                        return "entitiesById: object expected";
                    var key = Object.keys(message.entitiesById);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "entitiesById: integer key{k:int32} expected";
                        {
                            var error = $root.simple.Entity.verify(message.entitiesById[key[i]]);
                            if (error)
                                return "entitiesById." + error;
                        }
                    }
                }
                return null;
            };
    
            /**
             * Creates a SimpleWithSnakeCaseMap message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.SimpleWithSnakeCaseMap
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.SimpleWithSnakeCaseMap} SimpleWithSnakeCaseMap
             */
            SimpleWithSnakeCaseMap.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.SimpleWithSnakeCaseMap)
                    return object;
                var message = new $root.simple.SimpleWithSnakeCaseMap();
                if (object.entitiesById) {
                    if (typeof object.entitiesById !== "object")
                        throw TypeError(".simple.SimpleWithSnakeCaseMap.entitiesById: object expected");
                    message.entitiesById = {};
                    for (var keys = Object.keys(object.entitiesById), i = 0; i < keys.length; ++i) {
                        if (typeof object.entitiesById[keys[i]] !== "object")
                            throw TypeError(".simple.SimpleWithSnakeCaseMap.entitiesById: object expected");
                        message.entitiesById[keys[i]] = $root.simple.Entity.fromObject(object.entitiesById[keys[i]]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a SimpleWithSnakeCaseMap message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.SimpleWithSnakeCaseMap
             * @static
             * @param {simple.SimpleWithSnakeCaseMap} message SimpleWithSnakeCaseMap
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SimpleWithSnakeCaseMap.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.entitiesById = {};
                var keys2;
                if (message.entitiesById && (keys2 = Object.keys(message.entitiesById)).length) {
                    object.entitiesById = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.entitiesById[keys2[j]] = $root.simple.Entity.toObject(message.entitiesById[keys2[j]], options);
                }
                return object;
            };
    
            /**
             * Converts this SimpleWithSnakeCaseMap to JSON.
             * @function toJSON
             * @memberof simple.SimpleWithSnakeCaseMap
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SimpleWithSnakeCaseMap.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SimpleWithSnakeCaseMap;
        })();
    
        simple.PingService = (function() {
    
            /**
             * Constructs a new PingService service.
             * @memberof simple
             * @classdesc Represents a PingService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function PingService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }
    
            (PingService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = PingService;
    
            /**
             * Creates new PingService service using the specified rpc implementation.
             * @function create
             * @memberof simple.PingService
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {PingService} RPC service. Useful where requests and/or responses are streamed.
             */
            PingService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                return new this(rpcImpl, requestDelimited, responseDelimited);
            };
    
            /**
             * Callback as used by {@link simple.PingService#ping}.
             * @memberof simple.PingService
             * @typedef pingCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {simple.PingResponse} [response] PingResponse
             */
    
            /**
             * Calls ping.
             * @function ping
             * @memberof simple.PingService
             * @instance
             * @param {simple.PingRequest} request PingRequest message or plain object
             * @param {simple.PingService.pingCallback} callback Node-style callback called with the error, if any, and PingResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(PingService.prototype.ping = function ping(request, callback) {
                return this.rpcCall(ping, $root.simple.PingRequest, $root.simple.PingResponse, request, callback);
            }, "name", { value: "ping" });
    
            /**
             * Calls ping.
             * @function ping
             * @memberof simple.PingService
             * @instance
             * @param {simple.PingRequest} request PingRequest message or plain object
             * @returns {Promise<simple.PingResponse>} Promise
             * @variation 2
             */
    
            return PingService;
        })();
    
        simple.PingRequest = (function() {
    
            /**
             * Properties of a PingRequest.
             * @memberof simple
             * @interface IPingRequest
             * @property {string|null} [input] PingRequest input
             */
    
            /**
             * Constructs a new PingRequest.
             * @memberof simple
             * @classdesc Represents a PingRequest.
             * @implements IPingRequest
             * @constructor
             * @param {simple.IPingRequest=} [properties] Properties to set
             */
            function PingRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * PingRequest input.
             * @member {string} input
             * @memberof simple.PingRequest
             * @instance
             */
            PingRequest.prototype.input = "";
    
            /**
             * Creates a new PingRequest instance using the specified properties.
             * @function create
             * @memberof simple.PingRequest
             * @static
             * @param {simple.IPingRequest=} [properties] Properties to set
             * @returns {simple.PingRequest} PingRequest instance
             */
            PingRequest.create = function create(properties) {
                return new PingRequest(properties);
            };
    
            /**
             * Encodes the specified PingRequest message. Does not implicitly {@link simple.PingRequest.verify|verify} messages.
             * @function encode
             * @memberof simple.PingRequest
             * @static
             * @param {simple.PingRequest} message PingRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PingRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.input != null && message.hasOwnProperty("input"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.input);
                return writer;
            };
    
            /**
             * Encodes the specified PingRequest message, length delimited. Does not implicitly {@link simple.PingRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.PingRequest
             * @static
             * @param {simple.PingRequest} message PingRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PingRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a PingRequest message from the specified reader or buffer.
             * @function decode
             * @memberof simple.PingRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.PingRequest} PingRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PingRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.PingRequest();
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
            };
    
            /**
             * Decodes a PingRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.PingRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.PingRequest} PingRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PingRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a PingRequest message.
             * @function verify
             * @memberof simple.PingRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PingRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.input != null && message.hasOwnProperty("input"))
                    if (!$util.isString(message.input))
                        return "input: string expected";
                return null;
            };
    
            /**
             * Creates a PingRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.PingRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.PingRequest} PingRequest
             */
            PingRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.PingRequest)
                    return object;
                var message = new $root.simple.PingRequest();
                if (object.input != null)
                    message.input = String(object.input);
                return message;
            };
    
            /**
             * Creates a plain object from a PingRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.PingRequest
             * @static
             * @param {simple.PingRequest} message PingRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PingRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.input = "";
                if (message.input != null && message.hasOwnProperty("input"))
                    object.input = message.input;
                return object;
            };
    
            /**
             * Converts this PingRequest to JSON.
             * @function toJSON
             * @memberof simple.PingRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PingRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return PingRequest;
        })();
    
        simple.PingResponse = (function() {
    
            /**
             * Properties of a PingResponse.
             * @memberof simple
             * @interface IPingResponse
             * @property {string|null} [output] PingResponse output
             */
    
            /**
             * Constructs a new PingResponse.
             * @memberof simple
             * @classdesc Represents a PingResponse.
             * @implements IPingResponse
             * @constructor
             * @param {simple.IPingResponse=} [properties] Properties to set
             */
            function PingResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * PingResponse output.
             * @member {string} output
             * @memberof simple.PingResponse
             * @instance
             */
            PingResponse.prototype.output = "";
    
            /**
             * Creates a new PingResponse instance using the specified properties.
             * @function create
             * @memberof simple.PingResponse
             * @static
             * @param {simple.IPingResponse=} [properties] Properties to set
             * @returns {simple.PingResponse} PingResponse instance
             */
            PingResponse.create = function create(properties) {
                return new PingResponse(properties);
            };
    
            /**
             * Encodes the specified PingResponse message. Does not implicitly {@link simple.PingResponse.verify|verify} messages.
             * @function encode
             * @memberof simple.PingResponse
             * @static
             * @param {simple.PingResponse} message PingResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PingResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.output != null && message.hasOwnProperty("output"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.output);
                return writer;
            };
    
            /**
             * Encodes the specified PingResponse message, length delimited. Does not implicitly {@link simple.PingResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.PingResponse
             * @static
             * @param {simple.PingResponse} message PingResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PingResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a PingResponse message from the specified reader or buffer.
             * @function decode
             * @memberof simple.PingResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.PingResponse} PingResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PingResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.PingResponse();
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
            };
    
            /**
             * Decodes a PingResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.PingResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.PingResponse} PingResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PingResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a PingResponse message.
             * @function verify
             * @memberof simple.PingResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PingResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.output != null && message.hasOwnProperty("output"))
                    if (!$util.isString(message.output))
                        return "output: string expected";
                return null;
            };
    
            /**
             * Creates a PingResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.PingResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.PingResponse} PingResponse
             */
            PingResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.PingResponse)
                    return object;
                var message = new $root.simple.PingResponse();
                if (object.output != null)
                    message.output = String(object.output);
                return message;
            };
    
            /**
             * Creates a plain object from a PingResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.PingResponse
             * @static
             * @param {simple.PingResponse} message PingResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PingResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.output = "";
                if (message.output != null && message.hasOwnProperty("output"))
                    object.output = message.output;
                return object;
            };
    
            /**
             * Converts this PingResponse to JSON.
             * @function toJSON
             * @memberof simple.PingResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PingResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return PingResponse;
        })();
    
        simple.Numbers = (function() {
    
            /**
             * Properties of a Numbers.
             * @memberof simple
             * @interface INumbers
             * @property {number|null} [double] Numbers double
             * @property {number|null} [float] Numbers float
             * @property {number|null} [int32] Numbers int32
             * @property {number|null} [int64] Numbers int64
             * @property {number|null} [uint32] Numbers uint32
             * @property {number|null} [uint64] Numbers uint64
             * @property {number|null} [sint32] Numbers sint32
             * @property {number|null} [sint64] Numbers sint64
             * @property {number|null} [fixed32] Numbers fixed32
             * @property {number|null} [fixed64] Numbers fixed64
             * @property {number|null} [sfixed32] Numbers sfixed32
             * @property {number|null} [sfixed64] Numbers sfixed64
             */
    
            /**
             * Constructs a new Numbers.
             * @memberof simple
             * @classdesc Represents a Numbers.
             * @implements INumbers
             * @constructor
             * @param {simple.INumbers=} [properties] Properties to set
             */
            function Numbers(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Numbers double.
             * @member {number} double
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.double = 0;
    
            /**
             * Numbers float.
             * @member {number} float
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.float = 0;
    
            /**
             * Numbers int32.
             * @member {number} int32
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.int32 = 0;
    
            /**
             * Numbers int64.
             * @member {number} int64
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.int64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Numbers uint32.
             * @member {number} uint32
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.uint32 = 0;
    
            /**
             * Numbers uint64.
             * @member {number} uint64
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.uint64 = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Numbers sint32.
             * @member {number} sint32
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.sint32 = 0;
    
            /**
             * Numbers sint64.
             * @member {number} sint64
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.sint64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Numbers fixed32.
             * @member {number} fixed32
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.fixed32 = 0;
    
            /**
             * Numbers fixed64.
             * @member {number} fixed64
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.fixed64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Numbers sfixed32.
             * @member {number} sfixed32
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.sfixed32 = 0;
    
            /**
             * Numbers sfixed64.
             * @member {number} sfixed64
             * @memberof simple.Numbers
             * @instance
             */
            Numbers.prototype.sfixed64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new Numbers instance using the specified properties.
             * @function create
             * @memberof simple.Numbers
             * @static
             * @param {simple.INumbers=} [properties] Properties to set
             * @returns {simple.Numbers} Numbers instance
             */
            Numbers.create = function create(properties) {
                return new Numbers(properties);
            };
    
            /**
             * Encodes the specified Numbers message. Does not implicitly {@link simple.Numbers.verify|verify} messages.
             * @function encode
             * @memberof simple.Numbers
             * @static
             * @param {simple.Numbers} message Numbers message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Numbers.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.double != null && message.hasOwnProperty("double"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.double);
                if (message.float != null && message.hasOwnProperty("float"))
                    writer.uint32(/* id 2, wireType 5 =*/21).float(message.float);
                if (message.int32 != null && message.hasOwnProperty("int32"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.int32);
                if (message.int64 != null && message.hasOwnProperty("int64"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.int64);
                if (message.uint32 != null && message.hasOwnProperty("uint32"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.uint32);
                if (message.uint64 != null && message.hasOwnProperty("uint64"))
                    writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.uint64);
                if (message.sint32 != null && message.hasOwnProperty("sint32"))
                    writer.uint32(/* id 7, wireType 0 =*/56).sint32(message.sint32);
                if (message.sint64 != null && message.hasOwnProperty("sint64"))
                    writer.uint32(/* id 8, wireType 0 =*/64).sint64(message.sint64);
                if (message.fixed32 != null && message.hasOwnProperty("fixed32"))
                    writer.uint32(/* id 9, wireType 5 =*/77).fixed32(message.fixed32);
                if (message.fixed64 != null && message.hasOwnProperty("fixed64"))
                    writer.uint32(/* id 10, wireType 1 =*/81).fixed64(message.fixed64);
                if (message.sfixed32 != null && message.hasOwnProperty("sfixed32"))
                    writer.uint32(/* id 11, wireType 5 =*/93).sfixed32(message.sfixed32);
                if (message.sfixed64 != null && message.hasOwnProperty("sfixed64"))
                    writer.uint32(/* id 12, wireType 1 =*/97).sfixed64(message.sfixed64);
                return writer;
            };
    
            /**
             * Encodes the specified Numbers message, length delimited. Does not implicitly {@link simple.Numbers.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.Numbers
             * @static
             * @param {simple.Numbers} message Numbers message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Numbers.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Numbers message from the specified reader or buffer.
             * @function decode
             * @memberof simple.Numbers
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.Numbers} Numbers
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Numbers.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.Numbers();
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
                        message.int64 = reader.int64();
                        break;
                    case 5:
                        message.uint32 = reader.uint32();
                        break;
                    case 6:
                        message.uint64 = reader.uint64();
                        break;
                    case 7:
                        message.sint32 = reader.sint32();
                        break;
                    case 8:
                        message.sint64 = reader.sint64();
                        break;
                    case 9:
                        message.fixed32 = reader.fixed32();
                        break;
                    case 10:
                        message.fixed64 = reader.fixed64();
                        break;
                    case 11:
                        message.sfixed32 = reader.sfixed32();
                        break;
                    case 12:
                        message.sfixed64 = reader.sfixed64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Numbers message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.Numbers
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.Numbers} Numbers
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Numbers.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Numbers message.
             * @function verify
             * @memberof simple.Numbers
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Numbers.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.double != null && message.hasOwnProperty("double"))
                    if (typeof message.double !== "number")
                        return "double: number expected";
                if (message.float != null && message.hasOwnProperty("float"))
                    if (typeof message.float !== "number")
                        return "float: number expected";
                if (message.int32 != null && message.hasOwnProperty("int32"))
                    if (!$util.isInteger(message.int32))
                        return "int32: integer expected";
                if (message.int64 != null && message.hasOwnProperty("int64"))
                    if (!$util.isInteger(message.int64) && !(message.int64 && $util.isInteger(message.int64.low) && $util.isInteger(message.int64.high)))
                        return "int64: integer|Long expected";
                if (message.uint32 != null && message.hasOwnProperty("uint32"))
                    if (!$util.isInteger(message.uint32))
                        return "uint32: integer expected";
                if (message.uint64 != null && message.hasOwnProperty("uint64"))
                    if (!$util.isInteger(message.uint64) && !(message.uint64 && $util.isInteger(message.uint64.low) && $util.isInteger(message.uint64.high)))
                        return "uint64: integer|Long expected";
                if (message.sint32 != null && message.hasOwnProperty("sint32"))
                    if (!$util.isInteger(message.sint32))
                        return "sint32: integer expected";
                if (message.sint64 != null && message.hasOwnProperty("sint64"))
                    if (!$util.isInteger(message.sint64) && !(message.sint64 && $util.isInteger(message.sint64.low) && $util.isInteger(message.sint64.high)))
                        return "sint64: integer|Long expected";
                if (message.fixed32 != null && message.hasOwnProperty("fixed32"))
                    if (!$util.isInteger(message.fixed32))
                        return "fixed32: integer expected";
                if (message.fixed64 != null && message.hasOwnProperty("fixed64"))
                    if (!$util.isInteger(message.fixed64) && !(message.fixed64 && $util.isInteger(message.fixed64.low) && $util.isInteger(message.fixed64.high)))
                        return "fixed64: integer|Long expected";
                if (message.sfixed32 != null && message.hasOwnProperty("sfixed32"))
                    if (!$util.isInteger(message.sfixed32))
                        return "sfixed32: integer expected";
                if (message.sfixed64 != null && message.hasOwnProperty("sfixed64"))
                    if (!$util.isInteger(message.sfixed64) && !(message.sfixed64 && $util.isInteger(message.sfixed64.low) && $util.isInteger(message.sfixed64.high)))
                        return "sfixed64: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a Numbers message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.Numbers
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.Numbers} Numbers
             */
            Numbers.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.Numbers)
                    return object;
                var message = new $root.simple.Numbers();
                if (object.double != null)
                    message.double = Number(object.double);
                if (object.float != null)
                    message.float = Number(object.float);
                if (object.int32 != null)
                    message.int32 = object.int32 | 0;
                if (object.int64 != null)
                    if ($util.Long)
                        (message.int64 = $util.Long.fromValue(object.int64)).unsigned = false;
                    else if (typeof object.int64 === "string")
                        message.int64 = parseInt(object.int64, 10);
                    else if (typeof object.int64 === "number")
                        message.int64 = object.int64;
                    else if (typeof object.int64 === "object")
                        message.int64 = new $util.LongBits(object.int64.low >>> 0, object.int64.high >>> 0).toNumber();
                if (object.uint32 != null)
                    message.uint32 = object.uint32 >>> 0;
                if (object.uint64 != null)
                    if ($util.Long)
                        (message.uint64 = $util.Long.fromValue(object.uint64)).unsigned = true;
                    else if (typeof object.uint64 === "string")
                        message.uint64 = parseInt(object.uint64, 10);
                    else if (typeof object.uint64 === "number")
                        message.uint64 = object.uint64;
                    else if (typeof object.uint64 === "object")
                        message.uint64 = new $util.LongBits(object.uint64.low >>> 0, object.uint64.high >>> 0).toNumber(true);
                if (object.sint32 != null)
                    message.sint32 = object.sint32 | 0;
                if (object.sint64 != null)
                    if ($util.Long)
                        (message.sint64 = $util.Long.fromValue(object.sint64)).unsigned = false;
                    else if (typeof object.sint64 === "string")
                        message.sint64 = parseInt(object.sint64, 10);
                    else if (typeof object.sint64 === "number")
                        message.sint64 = object.sint64;
                    else if (typeof object.sint64 === "object")
                        message.sint64 = new $util.LongBits(object.sint64.low >>> 0, object.sint64.high >>> 0).toNumber();
                if (object.fixed32 != null)
                    message.fixed32 = object.fixed32 >>> 0;
                if (object.fixed64 != null)
                    if ($util.Long)
                        (message.fixed64 = $util.Long.fromValue(object.fixed64)).unsigned = false;
                    else if (typeof object.fixed64 === "string")
                        message.fixed64 = parseInt(object.fixed64, 10);
                    else if (typeof object.fixed64 === "number")
                        message.fixed64 = object.fixed64;
                    else if (typeof object.fixed64 === "object")
                        message.fixed64 = new $util.LongBits(object.fixed64.low >>> 0, object.fixed64.high >>> 0).toNumber();
                if (object.sfixed32 != null)
                    message.sfixed32 = object.sfixed32 | 0;
                if (object.sfixed64 != null)
                    if ($util.Long)
                        (message.sfixed64 = $util.Long.fromValue(object.sfixed64)).unsigned = false;
                    else if (typeof object.sfixed64 === "string")
                        message.sfixed64 = parseInt(object.sfixed64, 10);
                    else if (typeof object.sfixed64 === "number")
                        message.sfixed64 = object.sfixed64;
                    else if (typeof object.sfixed64 === "object")
                        message.sfixed64 = new $util.LongBits(object.sfixed64.low >>> 0, object.sfixed64.high >>> 0).toNumber();
                return message;
            };
    
            /**
             * Creates a plain object from a Numbers message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.Numbers
             * @static
             * @param {simple.Numbers} message Numbers
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Numbers.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.double = 0;
                    object.float = 0;
                    object.int32 = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.int64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.int64 = options.longs === String ? "0" : 0;
                    object.uint32 = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.uint64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.uint64 = options.longs === String ? "0" : 0;
                    object.sint32 = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.sint64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sint64 = options.longs === String ? "0" : 0;
                    object.fixed32 = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.fixed64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.fixed64 = options.longs === String ? "0" : 0;
                    object.sfixed32 = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.sfixed64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sfixed64 = options.longs === String ? "0" : 0;
                }
                if (message.double != null && message.hasOwnProperty("double"))
                    object.double = options.json && !isFinite(message.double) ? String(message.double) : message.double;
                if (message.float != null && message.hasOwnProperty("float"))
                    object.float = options.json && !isFinite(message.float) ? String(message.float) : message.float;
                if (message.int32 != null && message.hasOwnProperty("int32"))
                    object.int32 = message.int32;
                if (message.int64 != null && message.hasOwnProperty("int64"))
                    if (typeof message.int64 === "number")
                        object.int64 = options.longs === String ? String(message.int64) : message.int64;
                    else
                        object.int64 = options.longs === String ? $util.Long.prototype.toString.call(message.int64) : options.longs === Number ? new $util.LongBits(message.int64.low >>> 0, message.int64.high >>> 0).toNumber() : message.int64;
                if (message.uint32 != null && message.hasOwnProperty("uint32"))
                    object.uint32 = message.uint32;
                if (message.uint64 != null && message.hasOwnProperty("uint64"))
                    if (typeof message.uint64 === "number")
                        object.uint64 = options.longs === String ? String(message.uint64) : message.uint64;
                    else
                        object.uint64 = options.longs === String ? $util.Long.prototype.toString.call(message.uint64) : options.longs === Number ? new $util.LongBits(message.uint64.low >>> 0, message.uint64.high >>> 0).toNumber(true) : message.uint64;
                if (message.sint32 != null && message.hasOwnProperty("sint32"))
                    object.sint32 = message.sint32;
                if (message.sint64 != null && message.hasOwnProperty("sint64"))
                    if (typeof message.sint64 === "number")
                        object.sint64 = options.longs === String ? String(message.sint64) : message.sint64;
                    else
                        object.sint64 = options.longs === String ? $util.Long.prototype.toString.call(message.sint64) : options.longs === Number ? new $util.LongBits(message.sint64.low >>> 0, message.sint64.high >>> 0).toNumber() : message.sint64;
                if (message.fixed32 != null && message.hasOwnProperty("fixed32"))
                    object.fixed32 = message.fixed32;
                if (message.fixed64 != null && message.hasOwnProperty("fixed64"))
                    if (typeof message.fixed64 === "number")
                        object.fixed64 = options.longs === String ? String(message.fixed64) : message.fixed64;
                    else
                        object.fixed64 = options.longs === String ? $util.Long.prototype.toString.call(message.fixed64) : options.longs === Number ? new $util.LongBits(message.fixed64.low >>> 0, message.fixed64.high >>> 0).toNumber() : message.fixed64;
                if (message.sfixed32 != null && message.hasOwnProperty("sfixed32"))
                    object.sfixed32 = message.sfixed32;
                if (message.sfixed64 != null && message.hasOwnProperty("sfixed64"))
                    if (typeof message.sfixed64 === "number")
                        object.sfixed64 = options.longs === String ? String(message.sfixed64) : message.sfixed64;
                    else
                        object.sfixed64 = options.longs === String ? $util.Long.prototype.toString.call(message.sfixed64) : options.longs === Number ? new $util.LongBits(message.sfixed64.low >>> 0, message.sfixed64.high >>> 0).toNumber() : message.sfixed64;
                return object;
            };
    
            /**
             * Converts this Numbers to JSON.
             * @function toJSON
             * @memberof simple.Numbers
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Numbers.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Numbers;
        })();
    
        simple.ImportedThing = (function() {
    
            /**
             * Properties of an ImportedThing.
             * @memberof simple
             * @interface IImportedThing
             * @property {google.protobuf.Timestamp|null} [createdAt] ImportedThing createdAt
             */
    
            /**
             * Constructs a new ImportedThing.
             * @memberof simple
             * @classdesc Represents an ImportedThing.
             * @implements IImportedThing
             * @constructor
             * @param {simple.IImportedThing=} [properties] Properties to set
             */
            function ImportedThing(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ImportedThing createdAt.
             * @member {google.protobuf.Timestamp|null|undefined} createdAt
             * @memberof simple.ImportedThing
             * @instance
             */
            ImportedThing.prototype.createdAt = null;
    
            /**
             * Creates a new ImportedThing instance using the specified properties.
             * @function create
             * @memberof simple.ImportedThing
             * @static
             * @param {simple.IImportedThing=} [properties] Properties to set
             * @returns {simple.ImportedThing} ImportedThing instance
             */
            ImportedThing.create = function create(properties) {
                return new ImportedThing(properties);
            };
    
            /**
             * Encodes the specified ImportedThing message. Does not implicitly {@link simple.ImportedThing.verify|verify} messages.
             * @function encode
             * @memberof simple.ImportedThing
             * @static
             * @param {simple.ImportedThing} message ImportedThing message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ImportedThing.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    $root.google.protobuf.Timestamp.encode(message.createdAt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ImportedThing message, length delimited. Does not implicitly {@link simple.ImportedThing.verify|verify} messages.
             * @function encodeDelimited
             * @memberof simple.ImportedThing
             * @static
             * @param {simple.ImportedThing} message ImportedThing message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ImportedThing.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an ImportedThing message from the specified reader or buffer.
             * @function decode
             * @memberof simple.ImportedThing
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {simple.ImportedThing} ImportedThing
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ImportedThing.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.simple.ImportedThing();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.createdAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an ImportedThing message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof simple.ImportedThing
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {simple.ImportedThing} ImportedThing
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ImportedThing.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an ImportedThing message.
             * @function verify
             * @memberof simple.ImportedThing
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ImportedThing.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    var error = $root.google.protobuf.Timestamp.verify(message.createdAt);
                    if (error)
                        return "createdAt." + error;
                }
                return null;
            };
    
            /**
             * Creates an ImportedThing message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof simple.ImportedThing
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {simple.ImportedThing} ImportedThing
             */
            ImportedThing.fromObject = function fromObject(object) {
                if (object instanceof $root.simple.ImportedThing)
                    return object;
                var message = new $root.simple.ImportedThing();
                if (object.createdAt != null) {
                    if (typeof object.createdAt !== "object")
                        throw TypeError(".simple.ImportedThing.createdAt: object expected");
                    message.createdAt = $root.google.protobuf.Timestamp.fromObject(object.createdAt);
                }
                return message;
            };
    
            /**
             * Creates a plain object from an ImportedThing message. Also converts values to other types if specified.
             * @function toObject
             * @memberof simple.ImportedThing
             * @static
             * @param {simple.ImportedThing} message ImportedThing
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ImportedThing.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.createdAt = null;
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    object.createdAt = $root.google.protobuf.Timestamp.toObject(message.createdAt, options);
                return object;
            };
    
            /**
             * Converts this ImportedThing to JSON.
             * @function toJSON
             * @memberof simple.ImportedThing
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ImportedThing.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ImportedThing;
        })();
    
        return simple;
    })();
    
    $root.google = (function() {
    
        /**
         * Namespace google.
         * @exports google
         * @namespace
         */
        var google = {};
    
        google.protobuf = (function() {
    
            /**
             * Namespace protobuf.
             * @memberof google
             * @namespace
             */
            var protobuf = {};
    
            protobuf.DoubleValue = (function() {
    
                /**
                 * Properties of a DoubleValue.
                 * @memberof google.protobuf
                 * @interface IDoubleValue
                 * @property {number|null} [value] DoubleValue value
                 */
    
                /**
                 * Constructs a new DoubleValue.
                 * @memberof google.protobuf
                 * @classdesc Represents a DoubleValue.
                 * @implements IDoubleValue
                 * @constructor
                 * @param {google.protobuf.IDoubleValue=} [properties] Properties to set
                 */
                function DoubleValue(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * DoubleValue value.
                 * @member {number} value
                 * @memberof google.protobuf.DoubleValue
                 * @instance
                 */
                DoubleValue.prototype.value = 0;
    
                /**
                 * Creates a new DoubleValue instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.DoubleValue
                 * @static
                 * @param {google.protobuf.IDoubleValue=} [properties] Properties to set
                 * @returns {google.protobuf.DoubleValue} DoubleValue instance
                 */
                DoubleValue.create = function create(properties) {
                    return new DoubleValue(properties);
                };
    
                /**
                 * Encodes the specified DoubleValue message. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.DoubleValue
                 * @static
                 * @param {google.protobuf.DoubleValue} message DoubleValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DoubleValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 1 =*/9).double(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified DoubleValue message, length delimited. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.DoubleValue
                 * @static
                 * @param {google.protobuf.DoubleValue} message DoubleValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DoubleValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a DoubleValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.DoubleValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DoubleValue} DoubleValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DoubleValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.DoubleValue();
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
                };
    
                /**
                 * Decodes a DoubleValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.DoubleValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.DoubleValue} DoubleValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DoubleValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a DoubleValue message.
                 * @function verify
                 * @memberof google.protobuf.DoubleValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DoubleValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (typeof message.value !== "number")
                            return "value: number expected";
                    return null;
                };
    
                /**
                 * Creates a DoubleValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.DoubleValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.DoubleValue} DoubleValue
                 */
                DoubleValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.DoubleValue)
                        return object;
                    var message = new $root.google.protobuf.DoubleValue();
                    if (object.value != null)
                        message.value = Number(object.value);
                    return message;
                };
    
                /**
                 * Creates a plain object from a DoubleValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.DoubleValue
                 * @static
                 * @param {google.protobuf.DoubleValue} message DoubleValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DoubleValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.value = 0;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                    return object;
                };
    
                /**
                 * Converts this DoubleValue to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.DoubleValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DoubleValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return DoubleValue;
            })();
    
            protobuf.FloatValue = (function() {
    
                /**
                 * Properties of a FloatValue.
                 * @memberof google.protobuf
                 * @interface IFloatValue
                 * @property {number|null} [value] FloatValue value
                 */
    
                /**
                 * Constructs a new FloatValue.
                 * @memberof google.protobuf
                 * @classdesc Represents a FloatValue.
                 * @implements IFloatValue
                 * @constructor
                 * @param {google.protobuf.IFloatValue=} [properties] Properties to set
                 */
                function FloatValue(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * FloatValue value.
                 * @member {number} value
                 * @memberof google.protobuf.FloatValue
                 * @instance
                 */
                FloatValue.prototype.value = 0;
    
                /**
                 * Creates a new FloatValue instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.FloatValue
                 * @static
                 * @param {google.protobuf.IFloatValue=} [properties] Properties to set
                 * @returns {google.protobuf.FloatValue} FloatValue instance
                 */
                FloatValue.create = function create(properties) {
                    return new FloatValue(properties);
                };
    
                /**
                 * Encodes the specified FloatValue message. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.FloatValue
                 * @static
                 * @param {google.protobuf.FloatValue} message FloatValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FloatValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 5 =*/13).float(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified FloatValue message, length delimited. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.FloatValue
                 * @static
                 * @param {google.protobuf.FloatValue} message FloatValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FloatValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a FloatValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.FloatValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.FloatValue} FloatValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FloatValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.FloatValue();
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
                };
    
                /**
                 * Decodes a FloatValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.FloatValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.FloatValue} FloatValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FloatValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a FloatValue message.
                 * @function verify
                 * @memberof google.protobuf.FloatValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FloatValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (typeof message.value !== "number")
                            return "value: number expected";
                    return null;
                };
    
                /**
                 * Creates a FloatValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.FloatValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.FloatValue} FloatValue
                 */
                FloatValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.FloatValue)
                        return object;
                    var message = new $root.google.protobuf.FloatValue();
                    if (object.value != null)
                        message.value = Number(object.value);
                    return message;
                };
    
                /**
                 * Creates a plain object from a FloatValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.FloatValue
                 * @static
                 * @param {google.protobuf.FloatValue} message FloatValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FloatValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.value = 0;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                    return object;
                };
    
                /**
                 * Converts this FloatValue to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.FloatValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FloatValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return FloatValue;
            })();
    
            protobuf.Int64Value = (function() {
    
                /**
                 * Properties of an Int64Value.
                 * @memberof google.protobuf
                 * @interface IInt64Value
                 * @property {number|null} [value] Int64Value value
                 */
    
                /**
                 * Constructs a new Int64Value.
                 * @memberof google.protobuf
                 * @classdesc Represents an Int64Value.
                 * @implements IInt64Value
                 * @constructor
                 * @param {google.protobuf.IInt64Value=} [properties] Properties to set
                 */
                function Int64Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Int64Value value.
                 * @member {number} value
                 * @memberof google.protobuf.Int64Value
                 * @instance
                 */
                Int64Value.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Creates a new Int64Value instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Int64Value
                 * @static
                 * @param {google.protobuf.IInt64Value=} [properties] Properties to set
                 * @returns {google.protobuf.Int64Value} Int64Value instance
                 */
                Int64Value.create = function create(properties) {
                    return new Int64Value(properties);
                };
    
                /**
                 * Encodes the specified Int64Value message. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.Int64Value
                 * @static
                 * @param {google.protobuf.Int64Value} message Int64Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Int64Value.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified Int64Value message, length delimited. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.Int64Value
                 * @static
                 * @param {google.protobuf.Int64Value} message Int64Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Int64Value.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an Int64Value message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Int64Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Int64Value} Int64Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Int64Value.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Int64Value();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.value = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Int64Value message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.Int64Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.Int64Value} Int64Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Int64Value.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an Int64Value message.
                 * @function verify
                 * @memberof google.protobuf.Int64Value
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Int64Value.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                            return "value: integer|Long expected";
                    return null;
                };
    
                /**
                 * Creates an Int64Value message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Int64Value
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Int64Value} Int64Value
                 */
                Int64Value.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Int64Value)
                        return object;
                    var message = new $root.google.protobuf.Int64Value();
                    if (object.value != null)
                        if ($util.Long)
                            (message.value = $util.Long.fromValue(object.value)).unsigned = false;
                        else if (typeof object.value === "string")
                            message.value = parseInt(object.value, 10);
                        else if (typeof object.value === "number")
                            message.value = object.value;
                        else if (typeof object.value === "object")
                            message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
                    return message;
                };
    
                /**
                 * Creates a plain object from an Int64Value message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Int64Value
                 * @static
                 * @param {google.protobuf.Int64Value} message Int64Value
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Int64Value.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.value = options.longs === String ? "0" : 0;
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (typeof message.value === "number")
                            object.value = options.longs === String ? String(message.value) : message.value;
                        else
                            object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
                    return object;
                };
    
                /**
                 * Converts this Int64Value to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Int64Value
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Int64Value.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Int64Value;
            })();
    
            protobuf.UInt64Value = (function() {
    
                /**
                 * Properties of a UInt64Value.
                 * @memberof google.protobuf
                 * @interface IUInt64Value
                 * @property {number|null} [value] UInt64Value value
                 */
    
                /**
                 * Constructs a new UInt64Value.
                 * @memberof google.protobuf
                 * @classdesc Represents a UInt64Value.
                 * @implements IUInt64Value
                 * @constructor
                 * @param {google.protobuf.IUInt64Value=} [properties] Properties to set
                 */
                function UInt64Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * UInt64Value value.
                 * @member {number} value
                 * @memberof google.protobuf.UInt64Value
                 * @instance
                 */
                UInt64Value.prototype.value = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
                /**
                 * Creates a new UInt64Value instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.UInt64Value
                 * @static
                 * @param {google.protobuf.IUInt64Value=} [properties] Properties to set
                 * @returns {google.protobuf.UInt64Value} UInt64Value instance
                 */
                UInt64Value.create = function create(properties) {
                    return new UInt64Value(properties);
                };
    
                /**
                 * Encodes the specified UInt64Value message. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.UInt64Value
                 * @static
                 * @param {google.protobuf.UInt64Value} message UInt64Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UInt64Value.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified UInt64Value message, length delimited. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.UInt64Value
                 * @static
                 * @param {google.protobuf.UInt64Value} message UInt64Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UInt64Value.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a UInt64Value message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.UInt64Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.UInt64Value} UInt64Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UInt64Value.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.UInt64Value();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.value = reader.uint64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a UInt64Value message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.UInt64Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.UInt64Value} UInt64Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UInt64Value.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a UInt64Value message.
                 * @function verify
                 * @memberof google.protobuf.UInt64Value
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UInt64Value.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                            return "value: integer|Long expected";
                    return null;
                };
    
                /**
                 * Creates a UInt64Value message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.UInt64Value
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.UInt64Value} UInt64Value
                 */
                UInt64Value.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.UInt64Value)
                        return object;
                    var message = new $root.google.protobuf.UInt64Value();
                    if (object.value != null)
                        if ($util.Long)
                            (message.value = $util.Long.fromValue(object.value)).unsigned = true;
                        else if (typeof object.value === "string")
                            message.value = parseInt(object.value, 10);
                        else if (typeof object.value === "number")
                            message.value = object.value;
                        else if (typeof object.value === "object")
                            message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber(true);
                    return message;
                };
    
                /**
                 * Creates a plain object from a UInt64Value message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.UInt64Value
                 * @static
                 * @param {google.protobuf.UInt64Value} message UInt64Value
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UInt64Value.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.value = options.longs === String ? "0" : 0;
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (typeof message.value === "number")
                            object.value = options.longs === String ? String(message.value) : message.value;
                        else
                            object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber(true) : message.value;
                    return object;
                };
    
                /**
                 * Converts this UInt64Value to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.UInt64Value
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UInt64Value.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return UInt64Value;
            })();
    
            protobuf.Int32Value = (function() {
    
                /**
                 * Properties of an Int32Value.
                 * @memberof google.protobuf
                 * @interface IInt32Value
                 * @property {number|null} [value] Int32Value value
                 */
    
                /**
                 * Constructs a new Int32Value.
                 * @memberof google.protobuf
                 * @classdesc Represents an Int32Value.
                 * @implements IInt32Value
                 * @constructor
                 * @param {google.protobuf.IInt32Value=} [properties] Properties to set
                 */
                function Int32Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Int32Value value.
                 * @member {number} value
                 * @memberof google.protobuf.Int32Value
                 * @instance
                 */
                Int32Value.prototype.value = 0;
    
                /**
                 * Creates a new Int32Value instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Int32Value
                 * @static
                 * @param {google.protobuf.IInt32Value=} [properties] Properties to set
                 * @returns {google.protobuf.Int32Value} Int32Value instance
                 */
                Int32Value.create = function create(properties) {
                    return new Int32Value(properties);
                };
    
                /**
                 * Encodes the specified Int32Value message. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.Int32Value
                 * @static
                 * @param {google.protobuf.Int32Value} message Int32Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Int32Value.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified Int32Value message, length delimited. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.Int32Value
                 * @static
                 * @param {google.protobuf.Int32Value} message Int32Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Int32Value.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an Int32Value message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Int32Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Int32Value} Int32Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Int32Value.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Int32Value();
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
                };
    
                /**
                 * Decodes an Int32Value message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.Int32Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.Int32Value} Int32Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Int32Value.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an Int32Value message.
                 * @function verify
                 * @memberof google.protobuf.Int32Value
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Int32Value.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isInteger(message.value))
                            return "value: integer expected";
                    return null;
                };
    
                /**
                 * Creates an Int32Value message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Int32Value
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Int32Value} Int32Value
                 */
                Int32Value.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Int32Value)
                        return object;
                    var message = new $root.google.protobuf.Int32Value();
                    if (object.value != null)
                        message.value = object.value | 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from an Int32Value message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Int32Value
                 * @static
                 * @param {google.protobuf.Int32Value} message Int32Value
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Int32Value.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.value = 0;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = message.value;
                    return object;
                };
    
                /**
                 * Converts this Int32Value to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Int32Value
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Int32Value.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Int32Value;
            })();
    
            protobuf.UInt32Value = (function() {
    
                /**
                 * Properties of a UInt32Value.
                 * @memberof google.protobuf
                 * @interface IUInt32Value
                 * @property {number|null} [value] UInt32Value value
                 */
    
                /**
                 * Constructs a new UInt32Value.
                 * @memberof google.protobuf
                 * @classdesc Represents a UInt32Value.
                 * @implements IUInt32Value
                 * @constructor
                 * @param {google.protobuf.IUInt32Value=} [properties] Properties to set
                 */
                function UInt32Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * UInt32Value value.
                 * @member {number} value
                 * @memberof google.protobuf.UInt32Value
                 * @instance
                 */
                UInt32Value.prototype.value = 0;
    
                /**
                 * Creates a new UInt32Value instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.UInt32Value
                 * @static
                 * @param {google.protobuf.IUInt32Value=} [properties] Properties to set
                 * @returns {google.protobuf.UInt32Value} UInt32Value instance
                 */
                UInt32Value.create = function create(properties) {
                    return new UInt32Value(properties);
                };
    
                /**
                 * Encodes the specified UInt32Value message. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.UInt32Value
                 * @static
                 * @param {google.protobuf.UInt32Value} message UInt32Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UInt32Value.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified UInt32Value message, length delimited. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.UInt32Value
                 * @static
                 * @param {google.protobuf.UInt32Value} message UInt32Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UInt32Value.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a UInt32Value message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.UInt32Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.UInt32Value} UInt32Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UInt32Value.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.UInt32Value();
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
                };
    
                /**
                 * Decodes a UInt32Value message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.UInt32Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.UInt32Value} UInt32Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UInt32Value.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a UInt32Value message.
                 * @function verify
                 * @memberof google.protobuf.UInt32Value
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UInt32Value.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isInteger(message.value))
                            return "value: integer expected";
                    return null;
                };
    
                /**
                 * Creates a UInt32Value message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.UInt32Value
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.UInt32Value} UInt32Value
                 */
                UInt32Value.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.UInt32Value)
                        return object;
                    var message = new $root.google.protobuf.UInt32Value();
                    if (object.value != null)
                        message.value = object.value >>> 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a UInt32Value message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.UInt32Value
                 * @static
                 * @param {google.protobuf.UInt32Value} message UInt32Value
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UInt32Value.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.value = 0;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = message.value;
                    return object;
                };
    
                /**
                 * Converts this UInt32Value to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.UInt32Value
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UInt32Value.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return UInt32Value;
            })();
    
            protobuf.BoolValue = (function() {
    
                /**
                 * Properties of a BoolValue.
                 * @memberof google.protobuf
                 * @interface IBoolValue
                 * @property {boolean|null} [value] BoolValue value
                 */
    
                /**
                 * Constructs a new BoolValue.
                 * @memberof google.protobuf
                 * @classdesc Represents a BoolValue.
                 * @implements IBoolValue
                 * @constructor
                 * @param {google.protobuf.IBoolValue=} [properties] Properties to set
                 */
                function BoolValue(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * BoolValue value.
                 * @member {boolean} value
                 * @memberof google.protobuf.BoolValue
                 * @instance
                 */
                BoolValue.prototype.value = false;
    
                /**
                 * Creates a new BoolValue instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.BoolValue
                 * @static
                 * @param {google.protobuf.IBoolValue=} [properties] Properties to set
                 * @returns {google.protobuf.BoolValue} BoolValue instance
                 */
                BoolValue.create = function create(properties) {
                    return new BoolValue(properties);
                };
    
                /**
                 * Encodes the specified BoolValue message. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.BoolValue
                 * @static
                 * @param {google.protobuf.BoolValue} message BoolValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BoolValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified BoolValue message, length delimited. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.BoolValue
                 * @static
                 * @param {google.protobuf.BoolValue} message BoolValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BoolValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a BoolValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.BoolValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.BoolValue} BoolValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BoolValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.BoolValue();
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
                };
    
                /**
                 * Decodes a BoolValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.BoolValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.BoolValue} BoolValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BoolValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a BoolValue message.
                 * @function verify
                 * @memberof google.protobuf.BoolValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                BoolValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (typeof message.value !== "boolean")
                            return "value: boolean expected";
                    return null;
                };
    
                /**
                 * Creates a BoolValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.BoolValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.BoolValue} BoolValue
                 */
                BoolValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.BoolValue)
                        return object;
                    var message = new $root.google.protobuf.BoolValue();
                    if (object.value != null)
                        message.value = Boolean(object.value);
                    return message;
                };
    
                /**
                 * Creates a plain object from a BoolValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.BoolValue
                 * @static
                 * @param {google.protobuf.BoolValue} message BoolValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                BoolValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.value = false;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = message.value;
                    return object;
                };
    
                /**
                 * Converts this BoolValue to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.BoolValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                BoolValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return BoolValue;
            })();
    
            protobuf.StringValue = (function() {
    
                /**
                 * Properties of a StringValue.
                 * @memberof google.protobuf
                 * @interface IStringValue
                 * @property {string|null} [value] StringValue value
                 */
    
                /**
                 * Constructs a new StringValue.
                 * @memberof google.protobuf
                 * @classdesc Represents a StringValue.
                 * @implements IStringValue
                 * @constructor
                 * @param {google.protobuf.IStringValue=} [properties] Properties to set
                 */
                function StringValue(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * StringValue value.
                 * @member {string} value
                 * @memberof google.protobuf.StringValue
                 * @instance
                 */
                StringValue.prototype.value = "";
    
                /**
                 * Creates a new StringValue instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.StringValue
                 * @static
                 * @param {google.protobuf.IStringValue=} [properties] Properties to set
                 * @returns {google.protobuf.StringValue} StringValue instance
                 */
                StringValue.create = function create(properties) {
                    return new StringValue(properties);
                };
    
                /**
                 * Encodes the specified StringValue message. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.StringValue
                 * @static
                 * @param {google.protobuf.StringValue} message StringValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StringValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified StringValue message, length delimited. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.StringValue
                 * @static
                 * @param {google.protobuf.StringValue} message StringValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StringValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a StringValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.StringValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.StringValue} StringValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StringValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.StringValue();
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
                };
    
                /**
                 * Decodes a StringValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.StringValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.StringValue} StringValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StringValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a StringValue message.
                 * @function verify
                 * @memberof google.protobuf.StringValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StringValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isString(message.value))
                            return "value: string expected";
                    return null;
                };
    
                /**
                 * Creates a StringValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.StringValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.StringValue} StringValue
                 */
                StringValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.StringValue)
                        return object;
                    var message = new $root.google.protobuf.StringValue();
                    if (object.value != null)
                        message.value = String(object.value);
                    return message;
                };
    
                /**
                 * Creates a plain object from a StringValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.StringValue
                 * @static
                 * @param {google.protobuf.StringValue} message StringValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StringValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.value = "";
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = message.value;
                    return object;
                };
    
                /**
                 * Converts this StringValue to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.StringValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StringValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return StringValue;
            })();
    
            protobuf.BytesValue = (function() {
    
                /**
                 * Properties of a BytesValue.
                 * @memberof google.protobuf
                 * @interface IBytesValue
                 * @property {Uint8Array|null} [value] BytesValue value
                 */
    
                /**
                 * Constructs a new BytesValue.
                 * @memberof google.protobuf
                 * @classdesc Represents a BytesValue.
                 * @implements IBytesValue
                 * @constructor
                 * @param {google.protobuf.IBytesValue=} [properties] Properties to set
                 */
                function BytesValue(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * BytesValue value.
                 * @member {Uint8Array} value
                 * @memberof google.protobuf.BytesValue
                 * @instance
                 */
                BytesValue.prototype.value = $util.newBuffer([]);
    
                /**
                 * Creates a new BytesValue instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.BytesValue
                 * @static
                 * @param {google.protobuf.IBytesValue=} [properties] Properties to set
                 * @returns {google.protobuf.BytesValue} BytesValue instance
                 */
                BytesValue.create = function create(properties) {
                    return new BytesValue(properties);
                };
    
                /**
                 * Encodes the specified BytesValue message. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.BytesValue
                 * @static
                 * @param {google.protobuf.BytesValue} message BytesValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BytesValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified BytesValue message, length delimited. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.BytesValue
                 * @static
                 * @param {google.protobuf.BytesValue} message BytesValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BytesValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a BytesValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.BytesValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.BytesValue} BytesValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BytesValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.BytesValue();
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
                };
    
                /**
                 * Decodes a BytesValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.BytesValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.BytesValue} BytesValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BytesValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a BytesValue message.
                 * @function verify
                 * @memberof google.protobuf.BytesValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                BytesValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                            return "value: buffer expected";
                    return null;
                };
    
                /**
                 * Creates a BytesValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.BytesValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.BytesValue} BytesValue
                 */
                BytesValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.BytesValue)
                        return object;
                    var message = new $root.google.protobuf.BytesValue();
                    if (object.value != null)
                        if (typeof object.value === "string")
                            $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                        else if (object.value.length)
                            message.value = object.value;
                    return message;
                };
    
                /**
                 * Creates a plain object from a BytesValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.BytesValue
                 * @static
                 * @param {google.protobuf.BytesValue} message BytesValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                BytesValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if (options.bytes === String)
                            object.value = "";
                        else {
                            object.value = [];
                            if (options.bytes !== Array)
                                object.value = $util.newBuffer(object.value);
                        }
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                    return object;
                };
    
                /**
                 * Converts this BytesValue to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.BytesValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                BytesValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return BytesValue;
            })();
    
            protobuf.Timestamp = (function() {
    
                /**
                 * Properties of a Timestamp.
                 * @memberof google.protobuf
                 * @interface ITimestamp
                 * @property {number|null} [seconds] Timestamp seconds
                 * @property {number|null} [nanos] Timestamp nanos
                 */
    
                /**
                 * Constructs a new Timestamp.
                 * @memberof google.protobuf
                 * @classdesc Represents a Timestamp.
                 * @implements ITimestamp
                 * @constructor
                 * @param {google.protobuf.ITimestamp=} [properties] Properties to set
                 */
                function Timestamp(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Timestamp seconds.
                 * @member {number} seconds
                 * @memberof google.protobuf.Timestamp
                 * @instance
                 */
                Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Timestamp nanos.
                 * @member {number} nanos
                 * @memberof google.protobuf.Timestamp
                 * @instance
                 */
                Timestamp.prototype.nanos = 0;
    
                /**
                 * Creates a new Timestamp instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {google.protobuf.ITimestamp=} [properties] Properties to set
                 * @returns {google.protobuf.Timestamp} Timestamp instance
                 */
                Timestamp.create = function create(properties) {
                    return new Timestamp(properties);
                };
    
                /**
                 * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {google.protobuf.Timestamp} message Timestamp message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Timestamp.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                    return writer;
                };
    
                /**
                 * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {google.protobuf.Timestamp} message Timestamp message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Timestamp message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Timestamp} Timestamp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Timestamp.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.seconds = reader.int64();
                            break;
                        case 2:
                            message.nanos = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Timestamp message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.Timestamp} Timestamp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Timestamp.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Timestamp message.
                 * @function verify
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Timestamp.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                            return "seconds: integer|Long expected";
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        if (!$util.isInteger(message.nanos))
                            return "nanos: integer expected";
                    return null;
                };
    
                /**
                 * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Timestamp} Timestamp
                 */
                Timestamp.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Timestamp)
                        return object;
                    var message = new $root.google.protobuf.Timestamp();
                    if (object.seconds != null)
                        if ($util.Long)
                            (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                        else if (typeof object.seconds === "string")
                            message.seconds = parseInt(object.seconds, 10);
                        else if (typeof object.seconds === "number")
                            message.seconds = object.seconds;
                        else if (typeof object.seconds === "object")
                            message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                    if (object.nanos != null)
                        message.nanos = object.nanos | 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {google.protobuf.Timestamp} message Timestamp
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Timestamp.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.seconds = options.longs === String ? "0" : 0;
                        object.nanos = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (typeof message.seconds === "number")
                            object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                        else
                            object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        object.nanos = message.nanos;
                    return object;
                };
    
                /**
                 * Converts this Timestamp to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Timestamp
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Timestamp.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Timestamp;
            })();
    
            return protobuf;
        })();
    
        return google;
    })();
    
    $root.vector_tile = (function() {
    
        /**
         * Namespace vector_tile.
         * @exports vector_tile
         * @namespace
         */
        var vector_tile = {};
    
        vector_tile.Tile = (function() {
    
            /**
             * Properties of a Tile.
             * @memberof vector_tile
             * @interface ITile
             * @property {Array.<vector_tile.Tile.Layer>|null} [layers] Tile layers
             */
    
            /**
             * Constructs a new Tile.
             * @memberof vector_tile
             * @classdesc Represents a Tile.
             * @implements ITile
             * @constructor
             * @param {vector_tile.ITile=} [properties] Properties to set
             */
            function Tile(properties) {
                this.layers = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Tile layers.
             * @member {Array.<vector_tile.Tile.Layer>} layers
             * @memberof vector_tile.Tile
             * @instance
             */
            Tile.prototype.layers = $util.emptyArray;
    
            /**
             * Creates a new Tile instance using the specified properties.
             * @function create
             * @memberof vector_tile.Tile
             * @static
             * @param {vector_tile.ITile=} [properties] Properties to set
             * @returns {vector_tile.Tile} Tile instance
             */
            Tile.create = function create(properties) {
                return new Tile(properties);
            };
    
            /**
             * Encodes the specified Tile message. Does not implicitly {@link vector_tile.Tile.verify|verify} messages.
             * @function encode
             * @memberof vector_tile.Tile
             * @static
             * @param {vector_tile.Tile} message Tile message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Tile.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.layers != null && message.layers.length)
                    for (var i = 0; i < message.layers.length; ++i)
                        $root.vector_tile.Tile.Layer.encode(message.layers[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Tile message, length delimited. Does not implicitly {@link vector_tile.Tile.verify|verify} messages.
             * @function encodeDelimited
             * @memberof vector_tile.Tile
             * @static
             * @param {vector_tile.Tile} message Tile message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Tile.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Tile message from the specified reader or buffer.
             * @function decode
             * @memberof vector_tile.Tile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile} Tile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Tile.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 3:
                        if (!(message.layers && message.layers.length))
                            message.layers = [];
                        message.layers.push($root.vector_tile.Tile.Layer.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Tile message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof vector_tile.Tile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {vector_tile.Tile} Tile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Tile.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Tile message.
             * @function verify
             * @memberof vector_tile.Tile
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Tile.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.layers != null && message.hasOwnProperty("layers")) {
                    if (!Array.isArray(message.layers))
                        return "layers: array expected";
                    for (var i = 0; i < message.layers.length; ++i) {
                        var error = $root.vector_tile.Tile.Layer.verify(message.layers[i]);
                        if (error)
                            return "layers." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a Tile message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof vector_tile.Tile
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {vector_tile.Tile} Tile
             */
            Tile.fromObject = function fromObject(object) {
                if (object instanceof $root.vector_tile.Tile)
                    return object;
                var message = new $root.vector_tile.Tile();
                if (object.layers) {
                    if (!Array.isArray(object.layers))
                        throw TypeError(".vector_tile.Tile.layers: array expected");
                    message.layers = [];
                    for (var i = 0; i < object.layers.length; ++i) {
                        if (typeof object.layers[i] !== "object")
                            throw TypeError(".vector_tile.Tile.layers: object expected");
                        message.layers[i] = $root.vector_tile.Tile.Layer.fromObject(object.layers[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Tile message. Also converts values to other types if specified.
             * @function toObject
             * @memberof vector_tile.Tile
             * @static
             * @param {vector_tile.Tile} message Tile
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Tile.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.layers = [];
                if (message.layers && message.layers.length) {
                    object.layers = [];
                    for (var j = 0; j < message.layers.length; ++j)
                        object.layers[j] = $root.vector_tile.Tile.Layer.toObject(message.layers[j], options);
                }
                return object;
            };
    
            /**
             * Converts this Tile to JSON.
             * @function toJSON
             * @memberof vector_tile.Tile
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Tile.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * GeomType enum.
             * @name vector_tile.Tile.GeomType
             * @enum {string}
             * @property {number} UNKNOWN=0 UNKNOWN value
             * @property {number} POINT=1 POINT value
             * @property {number} LINESTRING=2 LINESTRING value
             * @property {number} POLYGON=3 POLYGON value
             */
            Tile.GeomType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "POINT"] = 1;
                values[valuesById[2] = "LINESTRING"] = 2;
                values[valuesById[3] = "POLYGON"] = 3;
                return values;
            })();
    
            Tile.Value = (function() {
    
                /**
                 * Properties of a Value.
                 * @memberof vector_tile.Tile
                 * @interface IValue
                 * @property {string|null} [stringValue] Value stringValue
                 * @property {number|null} [floatValue] Value floatValue
                 * @property {number|null} [doubleValue] Value doubleValue
                 * @property {number|null} [intValue] Value intValue
                 * @property {number|null} [uintValue] Value uintValue
                 * @property {number|null} [sintValue] Value sintValue
                 * @property {boolean|null} [boolValue] Value boolValue
                 */
    
                /**
                 * Constructs a new Value.
                 * @memberof vector_tile.Tile
                 * @classdesc Represents a Value.
                 * @implements IValue
                 * @constructor
                 * @param {vector_tile.Tile.IValue=} [properties] Properties to set
                 */
                function Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Value stringValue.
                 * @member {string} stringValue
                 * @memberof vector_tile.Tile.Value
                 * @instance
                 */
                Value.prototype.stringValue = "";
    
                /**
                 * Value floatValue.
                 * @member {number} floatValue
                 * @memberof vector_tile.Tile.Value
                 * @instance
                 */
                Value.prototype.floatValue = 0;
    
                /**
                 * Value doubleValue.
                 * @member {number} doubleValue
                 * @memberof vector_tile.Tile.Value
                 * @instance
                 */
                Value.prototype.doubleValue = 0;
    
                /**
                 * Value intValue.
                 * @member {number} intValue
                 * @memberof vector_tile.Tile.Value
                 * @instance
                 */
                Value.prototype.intValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Value uintValue.
                 * @member {number} uintValue
                 * @memberof vector_tile.Tile.Value
                 * @instance
                 */
                Value.prototype.uintValue = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
                /**
                 * Value sintValue.
                 * @member {number} sintValue
                 * @memberof vector_tile.Tile.Value
                 * @instance
                 */
                Value.prototype.sintValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Value boolValue.
                 * @member {boolean} boolValue
                 * @memberof vector_tile.Tile.Value
                 * @instance
                 */
                Value.prototype.boolValue = false;
    
                /**
                 * Creates a new Value instance using the specified properties.
                 * @function create
                 * @memberof vector_tile.Tile.Value
                 * @static
                 * @param {vector_tile.Tile.IValue=} [properties] Properties to set
                 * @returns {vector_tile.Tile.Value} Value instance
                 */
                Value.create = function create(properties) {
                    return new Value(properties);
                };
    
                /**
                 * Encodes the specified Value message. Does not implicitly {@link vector_tile.Tile.Value.verify|verify} messages.
                 * @function encode
                 * @memberof vector_tile.Tile.Value
                 * @static
                 * @param {vector_tile.Tile.Value} message Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Value.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.stringValue != null && message.hasOwnProperty("stringValue"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringValue);
                    if (message.floatValue != null && message.hasOwnProperty("floatValue"))
                        writer.uint32(/* id 2, wireType 5 =*/21).float(message.floatValue);
                    if (message.doubleValue != null && message.hasOwnProperty("doubleValue"))
                        writer.uint32(/* id 3, wireType 1 =*/25).double(message.doubleValue);
                    if (message.intValue != null && message.hasOwnProperty("intValue"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int64(message.intValue);
                    if (message.uintValue != null && message.hasOwnProperty("uintValue"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.uintValue);
                    if (message.sintValue != null && message.hasOwnProperty("sintValue"))
                        writer.uint32(/* id 6, wireType 0 =*/48).sint64(message.sintValue);
                    if (message.boolValue != null && message.hasOwnProperty("boolValue"))
                        writer.uint32(/* id 7, wireType 0 =*/56).bool(message.boolValue);
                    return writer;
                };
    
                /**
                 * Encodes the specified Value message, length delimited. Does not implicitly {@link vector_tile.Tile.Value.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof vector_tile.Tile.Value
                 * @static
                 * @param {vector_tile.Tile.Value} message Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Value.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Value message from the specified reader or buffer.
                 * @function decode
                 * @memberof vector_tile.Tile.Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {vector_tile.Tile.Value} Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Value.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Value();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.stringValue = reader.string();
                            break;
                        case 2:
                            message.floatValue = reader.float();
                            break;
                        case 3:
                            message.doubleValue = reader.double();
                            break;
                        case 4:
                            message.intValue = reader.int64();
                            break;
                        case 5:
                            message.uintValue = reader.uint64();
                            break;
                        case 6:
                            message.sintValue = reader.sint64();
                            break;
                        case 7:
                            message.boolValue = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Value message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof vector_tile.Tile.Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {vector_tile.Tile.Value} Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Value.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Value message.
                 * @function verify
                 * @memberof vector_tile.Tile.Value
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Value.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.stringValue != null && message.hasOwnProperty("stringValue"))
                        if (!$util.isString(message.stringValue))
                            return "stringValue: string expected";
                    if (message.floatValue != null && message.hasOwnProperty("floatValue"))
                        if (typeof message.floatValue !== "number")
                            return "floatValue: number expected";
                    if (message.doubleValue != null && message.hasOwnProperty("doubleValue"))
                        if (typeof message.doubleValue !== "number")
                            return "doubleValue: number expected";
                    if (message.intValue != null && message.hasOwnProperty("intValue"))
                        if (!$util.isInteger(message.intValue) && !(message.intValue && $util.isInteger(message.intValue.low) && $util.isInteger(message.intValue.high)))
                            return "intValue: integer|Long expected";
                    if (message.uintValue != null && message.hasOwnProperty("uintValue"))
                        if (!$util.isInteger(message.uintValue) && !(message.uintValue && $util.isInteger(message.uintValue.low) && $util.isInteger(message.uintValue.high)))
                            return "uintValue: integer|Long expected";
                    if (message.sintValue != null && message.hasOwnProperty("sintValue"))
                        if (!$util.isInteger(message.sintValue) && !(message.sintValue && $util.isInteger(message.sintValue.low) && $util.isInteger(message.sintValue.high)))
                            return "sintValue: integer|Long expected";
                    if (message.boolValue != null && message.hasOwnProperty("boolValue"))
                        if (typeof message.boolValue !== "boolean")
                            return "boolValue: boolean expected";
                    return null;
                };
    
                /**
                 * Creates a Value message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof vector_tile.Tile.Value
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {vector_tile.Tile.Value} Value
                 */
                Value.fromObject = function fromObject(object) {
                    if (object instanceof $root.vector_tile.Tile.Value)
                        return object;
                    var message = new $root.vector_tile.Tile.Value();
                    if (object.stringValue != null)
                        message.stringValue = String(object.stringValue);
                    if (object.floatValue != null)
                        message.floatValue = Number(object.floatValue);
                    if (object.doubleValue != null)
                        message.doubleValue = Number(object.doubleValue);
                    if (object.intValue != null)
                        if ($util.Long)
                            (message.intValue = $util.Long.fromValue(object.intValue)).unsigned = false;
                        else if (typeof object.intValue === "string")
                            message.intValue = parseInt(object.intValue, 10);
                        else if (typeof object.intValue === "number")
                            message.intValue = object.intValue;
                        else if (typeof object.intValue === "object")
                            message.intValue = new $util.LongBits(object.intValue.low >>> 0, object.intValue.high >>> 0).toNumber();
                    if (object.uintValue != null)
                        if ($util.Long)
                            (message.uintValue = $util.Long.fromValue(object.uintValue)).unsigned = true;
                        else if (typeof object.uintValue === "string")
                            message.uintValue = parseInt(object.uintValue, 10);
                        else if (typeof object.uintValue === "number")
                            message.uintValue = object.uintValue;
                        else if (typeof object.uintValue === "object")
                            message.uintValue = new $util.LongBits(object.uintValue.low >>> 0, object.uintValue.high >>> 0).toNumber(true);
                    if (object.sintValue != null)
                        if ($util.Long)
                            (message.sintValue = $util.Long.fromValue(object.sintValue)).unsigned = false;
                        else if (typeof object.sintValue === "string")
                            message.sintValue = parseInt(object.sintValue, 10);
                        else if (typeof object.sintValue === "number")
                            message.sintValue = object.sintValue;
                        else if (typeof object.sintValue === "object")
                            message.sintValue = new $util.LongBits(object.sintValue.low >>> 0, object.sintValue.high >>> 0).toNumber();
                    if (object.boolValue != null)
                        message.boolValue = Boolean(object.boolValue);
                    return message;
                };
    
                /**
                 * Creates a plain object from a Value message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof vector_tile.Tile.Value
                 * @static
                 * @param {vector_tile.Tile.Value} message Value
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Value.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.stringValue = "";
                        object.floatValue = 0;
                        object.doubleValue = 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.intValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.intValue = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.uintValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.uintValue = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.sintValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.sintValue = options.longs === String ? "0" : 0;
                        object.boolValue = false;
                    }
                    if (message.stringValue != null && message.hasOwnProperty("stringValue"))
                        object.stringValue = message.stringValue;
                    if (message.floatValue != null && message.hasOwnProperty("floatValue"))
                        object.floatValue = options.json && !isFinite(message.floatValue) ? String(message.floatValue) : message.floatValue;
                    if (message.doubleValue != null && message.hasOwnProperty("doubleValue"))
                        object.doubleValue = options.json && !isFinite(message.doubleValue) ? String(message.doubleValue) : message.doubleValue;
                    if (message.intValue != null && message.hasOwnProperty("intValue"))
                        if (typeof message.intValue === "number")
                            object.intValue = options.longs === String ? String(message.intValue) : message.intValue;
                        else
                            object.intValue = options.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options.longs === Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                    if (message.uintValue != null && message.hasOwnProperty("uintValue"))
                        if (typeof message.uintValue === "number")
                            object.uintValue = options.longs === String ? String(message.uintValue) : message.uintValue;
                        else
                            object.uintValue = options.longs === String ? $util.Long.prototype.toString.call(message.uintValue) : options.longs === Number ? new $util.LongBits(message.uintValue.low >>> 0, message.uintValue.high >>> 0).toNumber(true) : message.uintValue;
                    if (message.sintValue != null && message.hasOwnProperty("sintValue"))
                        if (typeof message.sintValue === "number")
                            object.sintValue = options.longs === String ? String(message.sintValue) : message.sintValue;
                        else
                            object.sintValue = options.longs === String ? $util.Long.prototype.toString.call(message.sintValue) : options.longs === Number ? new $util.LongBits(message.sintValue.low >>> 0, message.sintValue.high >>> 0).toNumber() : message.sintValue;
                    if (message.boolValue != null && message.hasOwnProperty("boolValue"))
                        object.boolValue = message.boolValue;
                    return object;
                };
    
                /**
                 * Converts this Value to JSON.
                 * @function toJSON
                 * @memberof vector_tile.Tile.Value
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Value.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Value;
            })();
    
            Tile.Feature = (function() {
    
                /**
                 * Properties of a Feature.
                 * @memberof vector_tile.Tile
                 * @interface IFeature
                 * @property {number|null} [id] Feature id
                 * @property {Array.<number>|null} [tags] Feature tags
                 * @property {vector_tile.Tile.GeomType|null} [type] Feature type
                 * @property {Array.<number>|null} [geometry] Feature geometry
                 */
    
                /**
                 * Constructs a new Feature.
                 * @memberof vector_tile.Tile
                 * @classdesc Represents a Feature.
                 * @implements IFeature
                 * @constructor
                 * @param {vector_tile.Tile.IFeature=} [properties] Properties to set
                 */
                function Feature(properties) {
                    this.tags = [];
                    this.geometry = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Feature id.
                 * @member {number} id
                 * @memberof vector_tile.Tile.Feature
                 * @instance
                 */
                Feature.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
                /**
                 * Feature tags.
                 * @member {Array.<number>} tags
                 * @memberof vector_tile.Tile.Feature
                 * @instance
                 */
                Feature.prototype.tags = $util.emptyArray;
    
                /**
                 * Feature type.
                 * @member {vector_tile.Tile.GeomType} type
                 * @memberof vector_tile.Tile.Feature
                 * @instance
                 */
                Feature.prototype.type = 0;
    
                /**
                 * Feature geometry.
                 * @member {Array.<number>} geometry
                 * @memberof vector_tile.Tile.Feature
                 * @instance
                 */
                Feature.prototype.geometry = $util.emptyArray;
    
                /**
                 * Creates a new Feature instance using the specified properties.
                 * @function create
                 * @memberof vector_tile.Tile.Feature
                 * @static
                 * @param {vector_tile.Tile.IFeature=} [properties] Properties to set
                 * @returns {vector_tile.Tile.Feature} Feature instance
                 */
                Feature.create = function create(properties) {
                    return new Feature(properties);
                };
    
                /**
                 * Encodes the specified Feature message. Does not implicitly {@link vector_tile.Tile.Feature.verify|verify} messages.
                 * @function encode
                 * @memberof vector_tile.Tile.Feature
                 * @static
                 * @param {vector_tile.Tile.Feature} message Feature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Feature.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
                    if (message.tags != null && message.tags.length) {
                        writer.uint32(/* id 2, wireType 2 =*/18).fork();
                        for (var i = 0; i < message.tags.length; ++i)
                            writer.uint32(message.tags[i]);
                        writer.ldelim();
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
                    if (message.geometry != null && message.geometry.length) {
                        writer.uint32(/* id 4, wireType 2 =*/34).fork();
                        for (var i = 0; i < message.geometry.length; ++i)
                            writer.uint32(message.geometry[i]);
                        writer.ldelim();
                    }
                    return writer;
                };
    
                /**
                 * Encodes the specified Feature message, length delimited. Does not implicitly {@link vector_tile.Tile.Feature.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof vector_tile.Tile.Feature
                 * @static
                 * @param {vector_tile.Tile.Feature} message Feature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Feature.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Feature message from the specified reader or buffer.
                 * @function decode
                 * @memberof vector_tile.Tile.Feature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {vector_tile.Tile.Feature} Feature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Feature.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Feature();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.uint64();
                            break;
                        case 2:
                            if (!(message.tags && message.tags.length))
                                message.tags = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.tags.push(reader.uint32());
                            } else
                                message.tags.push(reader.uint32());
                            break;
                        case 3:
                            message.type = reader.int32();
                            break;
                        case 4:
                            if (!(message.geometry && message.geometry.length))
                                message.geometry = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.geometry.push(reader.uint32());
                            } else
                                message.geometry.push(reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Feature message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof vector_tile.Tile.Feature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {vector_tile.Tile.Feature} Feature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Feature.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Feature message.
                 * @function verify
                 * @memberof vector_tile.Tile.Feature
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Feature.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                            return "id: integer|Long expected";
                    if (message.tags != null && message.hasOwnProperty("tags")) {
                        if (!Array.isArray(message.tags))
                            return "tags: array expected";
                        for (var i = 0; i < message.tags.length; ++i)
                            if (!$util.isInteger(message.tags[i]))
                                return "tags: integer[] expected";
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    if (message.geometry != null && message.hasOwnProperty("geometry")) {
                        if (!Array.isArray(message.geometry))
                            return "geometry: array expected";
                        for (var i = 0; i < message.geometry.length; ++i)
                            if (!$util.isInteger(message.geometry[i]))
                                return "geometry: integer[] expected";
                    }
                    return null;
                };
    
                /**
                 * Creates a Feature message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof vector_tile.Tile.Feature
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {vector_tile.Tile.Feature} Feature
                 */
                Feature.fromObject = function fromObject(object) {
                    if (object instanceof $root.vector_tile.Tile.Feature)
                        return object;
                    var message = new $root.vector_tile.Tile.Feature();
                    if (object.id != null)
                        if ($util.Long)
                            (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                        else if (typeof object.id === "string")
                            message.id = parseInt(object.id, 10);
                        else if (typeof object.id === "number")
                            message.id = object.id;
                        else if (typeof object.id === "object")
                            message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
                    if (object.tags) {
                        if (!Array.isArray(object.tags))
                            throw TypeError(".vector_tile.Tile.Feature.tags: array expected");
                        message.tags = [];
                        for (var i = 0; i < object.tags.length; ++i)
                            message.tags[i] = object.tags[i] >>> 0;
                    }
                    switch (object.type) {
                    case "UNKNOWN":
                    case 0:
                        message.type = 0;
                        break;
                    case "POINT":
                    case 1:
                        message.type = 1;
                        break;
                    case "LINESTRING":
                    case 2:
                        message.type = 2;
                        break;
                    case "POLYGON":
                    case 3:
                        message.type = 3;
                        break;
                    }
                    if (object.geometry) {
                        if (!Array.isArray(object.geometry))
                            throw TypeError(".vector_tile.Tile.Feature.geometry: array expected");
                        message.geometry = [];
                        for (var i = 0; i < object.geometry.length; ++i)
                            message.geometry[i] = object.geometry[i] >>> 0;
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a Feature message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof vector_tile.Tile.Feature
                 * @static
                 * @param {vector_tile.Tile.Feature} message Feature
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Feature.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.tags = [];
                        object.geometry = [];
                    }
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.id = options.longs === String ? "0" : 0;
                        object.type = options.enums === String ? "UNKNOWN" : 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (typeof message.id === "number")
                            object.id = options.longs === String ? String(message.id) : message.id;
                        else
                            object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
                    if (message.tags && message.tags.length) {
                        object.tags = [];
                        for (var j = 0; j < message.tags.length; ++j)
                            object.tags[j] = message.tags[j];
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.vector_tile.Tile.GeomType[message.type] : message.type;
                    if (message.geometry && message.geometry.length) {
                        object.geometry = [];
                        for (var j = 0; j < message.geometry.length; ++j)
                            object.geometry[j] = message.geometry[j];
                    }
                    return object;
                };
    
                /**
                 * Converts this Feature to JSON.
                 * @function toJSON
                 * @memberof vector_tile.Tile.Feature
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Feature.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Feature;
            })();
    
            Tile.Layer = (function() {
    
                /**
                 * Properties of a Layer.
                 * @memberof vector_tile.Tile
                 * @interface ILayer
                 * @property {number} version Layer version
                 * @property {string} name Layer name
                 * @property {Array.<vector_tile.Tile.Feature>|null} [features] Layer features
                 * @property {Array.<string>|null} [keys] Layer keys
                 * @property {Array.<vector_tile.Tile.Value>|null} [values] Layer values
                 * @property {number|null} [extent] Layer extent
                 */
    
                /**
                 * Constructs a new Layer.
                 * @memberof vector_tile.Tile
                 * @classdesc Represents a Layer.
                 * @implements ILayer
                 * @constructor
                 * @param {vector_tile.Tile.ILayer=} [properties] Properties to set
                 */
                function Layer(properties) {
                    this.features = [];
                    this.keys = [];
                    this.values = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Layer version.
                 * @member {number} version
                 * @memberof vector_tile.Tile.Layer
                 * @instance
                 */
                Layer.prototype.version = 1;
    
                /**
                 * Layer name.
                 * @member {string} name
                 * @memberof vector_tile.Tile.Layer
                 * @instance
                 */
                Layer.prototype.name = "";
    
                /**
                 * Layer features.
                 * @member {Array.<vector_tile.Tile.Feature>} features
                 * @memberof vector_tile.Tile.Layer
                 * @instance
                 */
                Layer.prototype.features = $util.emptyArray;
    
                /**
                 * Layer keys.
                 * @member {Array.<string>} keys
                 * @memberof vector_tile.Tile.Layer
                 * @instance
                 */
                Layer.prototype.keys = $util.emptyArray;
    
                /**
                 * Layer values.
                 * @member {Array.<vector_tile.Tile.Value>} values
                 * @memberof vector_tile.Tile.Layer
                 * @instance
                 */
                Layer.prototype.values = $util.emptyArray;
    
                /**
                 * Layer extent.
                 * @member {number} extent
                 * @memberof vector_tile.Tile.Layer
                 * @instance
                 */
                Layer.prototype.extent = 4096;
    
                /**
                 * Creates a new Layer instance using the specified properties.
                 * @function create
                 * @memberof vector_tile.Tile.Layer
                 * @static
                 * @param {vector_tile.Tile.ILayer=} [properties] Properties to set
                 * @returns {vector_tile.Tile.Layer} Layer instance
                 */
                Layer.create = function create(properties) {
                    return new Layer(properties);
                };
    
                /**
                 * Encodes the specified Layer message. Does not implicitly {@link vector_tile.Tile.Layer.verify|verify} messages.
                 * @function encode
                 * @memberof vector_tile.Tile.Layer
                 * @static
                 * @param {vector_tile.Tile.Layer} message Layer message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Layer.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.features != null && message.features.length)
                        for (var i = 0; i < message.features.length; ++i)
                            $root.vector_tile.Tile.Feature.encode(message.features[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.keys != null && message.keys.length)
                        for (var i = 0; i < message.keys.length; ++i)
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.keys[i]);
                    if (message.values != null && message.values.length)
                        for (var i = 0; i < message.values.length; ++i)
                            $root.vector_tile.Tile.Value.encode(message.values[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.extent != null && message.hasOwnProperty("extent"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.extent);
                    writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.version);
                    return writer;
                };
    
                /**
                 * Encodes the specified Layer message, length delimited. Does not implicitly {@link vector_tile.Tile.Layer.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof vector_tile.Tile.Layer
                 * @static
                 * @param {vector_tile.Tile.Layer} message Layer message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Layer.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Layer message from the specified reader or buffer.
                 * @function decode
                 * @memberof vector_tile.Tile.Layer
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {vector_tile.Tile.Layer} Layer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Layer.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Layer();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 15:
                            message.version = reader.uint32();
                            break;
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            if (!(message.features && message.features.length))
                                message.features = [];
                            message.features.push($root.vector_tile.Tile.Feature.decode(reader, reader.uint32()));
                            break;
                        case 3:
                            if (!(message.keys && message.keys.length))
                                message.keys = [];
                            message.keys.push(reader.string());
                            break;
                        case 4:
                            if (!(message.values && message.values.length))
                                message.values = [];
                            message.values.push($root.vector_tile.Tile.Value.decode(reader, reader.uint32()));
                            break;
                        case 5:
                            message.extent = reader.uint32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    if (!message.hasOwnProperty("version"))
                        throw $util.ProtocolError("missing required 'version'", { instance: message });
                    if (!message.hasOwnProperty("name"))
                        throw $util.ProtocolError("missing required 'name'", { instance: message });
                    return message;
                };
    
                /**
                 * Decodes a Layer message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof vector_tile.Tile.Layer
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {vector_tile.Tile.Layer} Layer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Layer.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Layer message.
                 * @function verify
                 * @memberof vector_tile.Tile.Layer
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Layer.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (!$util.isInteger(message.version))
                        return "version: integer expected";
                    if (!$util.isString(message.name))
                        return "name: string expected";
                    if (message.features != null && message.hasOwnProperty("features")) {
                        if (!Array.isArray(message.features))
                            return "features: array expected";
                        for (var i = 0; i < message.features.length; ++i) {
                            var error = $root.vector_tile.Tile.Feature.verify(message.features[i]);
                            if (error)
                                return "features." + error;
                        }
                    }
                    if (message.keys != null && message.hasOwnProperty("keys")) {
                        if (!Array.isArray(message.keys))
                            return "keys: array expected";
                        for (var i = 0; i < message.keys.length; ++i)
                            if (!$util.isString(message.keys[i]))
                                return "keys: string[] expected";
                    }
                    if (message.values != null && message.hasOwnProperty("values")) {
                        if (!Array.isArray(message.values))
                            return "values: array expected";
                        for (var i = 0; i < message.values.length; ++i) {
                            var error = $root.vector_tile.Tile.Value.verify(message.values[i]);
                            if (error)
                                return "values." + error;
                        }
                    }
                    if (message.extent != null && message.hasOwnProperty("extent"))
                        if (!$util.isInteger(message.extent))
                            return "extent: integer expected";
                    return null;
                };
    
                /**
                 * Creates a Layer message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof vector_tile.Tile.Layer
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {vector_tile.Tile.Layer} Layer
                 */
                Layer.fromObject = function fromObject(object) {
                    if (object instanceof $root.vector_tile.Tile.Layer)
                        return object;
                    var message = new $root.vector_tile.Tile.Layer();
                    if (object.version != null)
                        message.version = object.version >>> 0;
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.features) {
                        if (!Array.isArray(object.features))
                            throw TypeError(".vector_tile.Tile.Layer.features: array expected");
                        message.features = [];
                        for (var i = 0; i < object.features.length; ++i) {
                            if (typeof object.features[i] !== "object")
                                throw TypeError(".vector_tile.Tile.Layer.features: object expected");
                            message.features[i] = $root.vector_tile.Tile.Feature.fromObject(object.features[i]);
                        }
                    }
                    if (object.keys) {
                        if (!Array.isArray(object.keys))
                            throw TypeError(".vector_tile.Tile.Layer.keys: array expected");
                        message.keys = [];
                        for (var i = 0; i < object.keys.length; ++i)
                            message.keys[i] = String(object.keys[i]);
                    }
                    if (object.values) {
                        if (!Array.isArray(object.values))
                            throw TypeError(".vector_tile.Tile.Layer.values: array expected");
                        message.values = [];
                        for (var i = 0; i < object.values.length; ++i) {
                            if (typeof object.values[i] !== "object")
                                throw TypeError(".vector_tile.Tile.Layer.values: object expected");
                            message.values[i] = $root.vector_tile.Tile.Value.fromObject(object.values[i]);
                        }
                    }
                    if (object.extent != null)
                        message.extent = object.extent >>> 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a Layer message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof vector_tile.Tile.Layer
                 * @static
                 * @param {vector_tile.Tile.Layer} message Layer
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Layer.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.features = [];
                        object.keys = [];
                        object.values = [];
                    }
                    if (options.defaults) {
                        object.name = "";
                        object.extent = 4096;
                        object.version = 1;
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.features && message.features.length) {
                        object.features = [];
                        for (var j = 0; j < message.features.length; ++j)
                            object.features[j] = $root.vector_tile.Tile.Feature.toObject(message.features[j], options);
                    }
                    if (message.keys && message.keys.length) {
                        object.keys = [];
                        for (var j = 0; j < message.keys.length; ++j)
                            object.keys[j] = message.keys[j];
                    }
                    if (message.values && message.values.length) {
                        object.values = [];
                        for (var j = 0; j < message.values.length; ++j)
                            object.values[j] = $root.vector_tile.Tile.Value.toObject(message.values[j], options);
                    }
                    if (message.extent != null && message.hasOwnProperty("extent"))
                        object.extent = message.extent;
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = message.version;
                    return object;
                };
    
                /**
                 * Converts this Layer to JSON.
                 * @function toJSON
                 * @memberof vector_tile.Tile.Layer
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Layer.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Layer;
            })();
    
            return Tile;
        })();
    
        return vector_tile;
    })();

    return $root;
});
