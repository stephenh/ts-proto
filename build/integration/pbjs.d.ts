import * as $protobuf from "protobufjs";
export namespace simple {

    interface ISimple {
        name?: (string|null);
        age?: (number|null);
        createdAt?: (google.protobuf.Timestamp|null);
        child?: (simple.Child|null);
        state?: (simple.StateEnum|null);
        grandChildren?: (simple.Child[]|null);
        coins?: (number[]|null);
        snacks?: (string[]|null);
        oldStates?: (simple.StateEnum[]|null);
        thing?: (simple.ImportedThing|null);
    }

    class Simple implements ISimple {
        constructor(properties?: simple.ISimple);
        public name: string;
        public age: number;
        public createdAt?: (google.protobuf.Timestamp|null);
        public child?: (simple.Child|null);
        public state: simple.StateEnum;
        public grandChildren: simple.Child[];
        public coins: number[];
        public snacks: string[];
        public oldStates: simple.StateEnum[];
        public thing?: (simple.ImportedThing|null);
        public static create(properties?: simple.ISimple): simple.Simple;
        public static encode(message: simple.Simple, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.Simple, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.Simple;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.Simple;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.Simple;
        public static toObject(message: simple.Simple, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IChild {
        name?: (string|null);
        type?: (simple.Child.Type|null);
    }

    class Child implements IChild {
        constructor(properties?: simple.IChild);
        public name: string;
        public type: simple.Child.Type;
        public static create(properties?: simple.IChild): simple.Child;
        public static encode(message: simple.Child, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.Child, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.Child;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.Child;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.Child;
        public static toObject(message: simple.Child, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace Child {

        enum Type {
            UNKNOWN = 0,
            GOOD = 1,
            BAD = 2
        }
    }

    enum StateEnum {
        UNKNOWN = 0,
        ON = 2,
        OFF = 3
    }

    interface INested {
        name?: (string|null);
        message?: (simple.Nested.InnerMessage|null);
        state?: (simple.Nested.InnerEnum|null);
    }

    class Nested implements INested {
        constructor(properties?: simple.INested);
        public name: string;
        public message?: (simple.Nested.InnerMessage|null);
        public state: simple.Nested.InnerEnum;
        public static create(properties?: simple.INested): simple.Nested;
        public static encode(message: simple.Nested, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.Nested, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.Nested;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.Nested;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.Nested;
        public static toObject(message: simple.Nested, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace Nested {

        interface IInnerMessage {
            name?: (string|null);
            deep?: (simple.Nested.InnerMessage.DeepMessage|null);
        }

        class InnerMessage implements IInnerMessage {
            constructor(properties?: simple.Nested.IInnerMessage);
            public name: string;
            public deep?: (simple.Nested.InnerMessage.DeepMessage|null);
            public static create(properties?: simple.Nested.IInnerMessage): simple.Nested.InnerMessage;
            public static encode(message: simple.Nested.InnerMessage, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: simple.Nested.InnerMessage, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.Nested.InnerMessage;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.Nested.InnerMessage;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): simple.Nested.InnerMessage;
            public static toObject(message: simple.Nested.InnerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        namespace InnerMessage {

            interface IDeepMessage {
                name?: (string|null);
            }

            class DeepMessage implements IDeepMessage {
                constructor(properties?: simple.Nested.InnerMessage.IDeepMessage);
                public name: string;
                public static create(properties?: simple.Nested.InnerMessage.IDeepMessage): simple.Nested.InnerMessage.DeepMessage;
                public static encode(message: simple.Nested.InnerMessage.DeepMessage, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: simple.Nested.InnerMessage.DeepMessage, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.Nested.InnerMessage.DeepMessage;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.Nested.InnerMessage.DeepMessage;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): simple.Nested.InnerMessage.DeepMessage;
                public static toObject(message: simple.Nested.InnerMessage.DeepMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }

        enum InnerEnum {
            UNKNOWN_INNER = 0,
            GOOD = 100,
            BAD = 1000
        }
    }

    interface IOneOfMessage {
        first?: (string|null);
        last?: (string|null);
    }

    class OneOfMessage implements IOneOfMessage {
        constructor(properties?: simple.IOneOfMessage);
        public first: string;
        public last: string;
        public nameFields?: ("first"|"last");
        public static create(properties?: simple.IOneOfMessage): simple.OneOfMessage;
        public static encode(message: simple.OneOfMessage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.OneOfMessage, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.OneOfMessage;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.OneOfMessage;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.OneOfMessage;
        public static toObject(message: simple.OneOfMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISimpleWithWrappers {
        name?: (google.protobuf.StringValue|null);
        age?: (google.protobuf.Int32Value|null);
        enabled?: (google.protobuf.BoolValue|null);
        coins?: (google.protobuf.Int32Value[]|null);
        snacks?: (google.protobuf.StringValue[]|null);
    }

    class SimpleWithWrappers implements ISimpleWithWrappers {
        constructor(properties?: simple.ISimpleWithWrappers);
        public name?: (google.protobuf.StringValue|null);
        public age?: (google.protobuf.Int32Value|null);
        public enabled?: (google.protobuf.BoolValue|null);
        public coins: google.protobuf.Int32Value[];
        public snacks: google.protobuf.StringValue[];
        public static create(properties?: simple.ISimpleWithWrappers): simple.SimpleWithWrappers;
        public static encode(message: simple.SimpleWithWrappers, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.SimpleWithWrappers, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.SimpleWithWrappers;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.SimpleWithWrappers;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.SimpleWithWrappers;
        public static toObject(message: simple.SimpleWithWrappers, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IEntity {
        id?: (number|null);
    }

    class Entity implements IEntity {
        constructor(properties?: simple.IEntity);
        public id: number;
        public static create(properties?: simple.IEntity): simple.Entity;
        public static encode(message: simple.Entity, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.Entity, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.Entity;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.Entity;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.Entity;
        public static toObject(message: simple.Entity, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ISimpleWithMap {
        entitiesById?: ({ [k: string]: simple.Entity }|null);
    }

    class SimpleWithMap implements ISimpleWithMap {
        constructor(properties?: simple.ISimpleWithMap);
        public entitiesById: { [k: string]: simple.Entity };
        public static create(properties?: simple.ISimpleWithMap): simple.SimpleWithMap;
        public static encode(message: simple.SimpleWithMap, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.SimpleWithMap, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.SimpleWithMap;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.SimpleWithMap;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.SimpleWithMap;
        public static toObject(message: simple.SimpleWithMap, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    class PingService extends $protobuf.rpc.Service {
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): PingService;
        public ping(request: simple.PingRequest, callback: simple.PingService.pingCallback): void;
        public ping(request: simple.PingRequest): Promise<simple.PingResponse>;
    }

    namespace PingService {

        type pingCallback = (error: (Error|null), response?: simple.PingResponse) => void;
    }

    interface IPingRequest {
        input?: (string|null);
    }

    class PingRequest implements IPingRequest {
        constructor(properties?: simple.IPingRequest);
        public input: string;
        public static create(properties?: simple.IPingRequest): simple.PingRequest;
        public static encode(message: simple.PingRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.PingRequest, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.PingRequest;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.PingRequest;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.PingRequest;
        public static toObject(message: simple.PingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IPingResponse {
        output?: (string|null);
    }

    class PingResponse implements IPingResponse {
        constructor(properties?: simple.IPingResponse);
        public output: string;
        public static create(properties?: simple.IPingResponse): simple.PingResponse;
        public static encode(message: simple.PingResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.PingResponse, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.PingResponse;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.PingResponse;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.PingResponse;
        public static toObject(message: simple.PingResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IImportedThing {
        createdAt?: (google.protobuf.Timestamp|null);
    }

    class ImportedThing implements IImportedThing {
        constructor(properties?: simple.IImportedThing);
        public createdAt?: (google.protobuf.Timestamp|null);
        public static create(properties?: simple.IImportedThing): simple.ImportedThing;
        public static encode(message: simple.ImportedThing, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: simple.ImportedThing, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): simple.ImportedThing;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): simple.ImportedThing;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): simple.ImportedThing;
        public static toObject(message: simple.ImportedThing, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }
}

export namespace google {

    namespace protobuf {

        interface IDoubleValue {
            value?: (number|null);
        }

        class DoubleValue implements IDoubleValue {
            constructor(properties?: google.protobuf.IDoubleValue);
            public value: number;
            public static create(properties?: google.protobuf.IDoubleValue): google.protobuf.DoubleValue;
            public static encode(message: google.protobuf.DoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.DoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DoubleValue;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DoubleValue;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.DoubleValue;
            public static toObject(message: google.protobuf.DoubleValue, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IFloatValue {
            value?: (number|null);
        }

        class FloatValue implements IFloatValue {
            constructor(properties?: google.protobuf.IFloatValue);
            public value: number;
            public static create(properties?: google.protobuf.IFloatValue): google.protobuf.FloatValue;
            public static encode(message: google.protobuf.FloatValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.FloatValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FloatValue;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FloatValue;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.FloatValue;
            public static toObject(message: google.protobuf.FloatValue, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IInt64Value {
            value?: (number|Long|null);
        }

        class Int64Value implements IInt64Value {
            constructor(properties?: google.protobuf.IInt64Value);
            public value: (number|Long);
            public static create(properties?: google.protobuf.IInt64Value): google.protobuf.Int64Value;
            public static encode(message: google.protobuf.Int64Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.Int64Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int64Value;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int64Value;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int64Value;
            public static toObject(message: google.protobuf.Int64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IUInt64Value {
            value?: (number|Long|null);
        }

        class UInt64Value implements IUInt64Value {
            constructor(properties?: google.protobuf.IUInt64Value);
            public value: (number|Long);
            public static create(properties?: google.protobuf.IUInt64Value): google.protobuf.UInt64Value;
            public static encode(message: google.protobuf.UInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.UInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt64Value;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt64Value;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt64Value;
            public static toObject(message: google.protobuf.UInt64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IInt32Value {
            value?: (number|null);
        }

        class Int32Value implements IInt32Value {
            constructor(properties?: google.protobuf.IInt32Value);
            public value: number;
            public static create(properties?: google.protobuf.IInt32Value): google.protobuf.Int32Value;
            public static encode(message: google.protobuf.Int32Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.Int32Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int32Value;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int32Value;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int32Value;
            public static toObject(message: google.protobuf.Int32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IUInt32Value {
            value?: (number|null);
        }

        class UInt32Value implements IUInt32Value {
            constructor(properties?: google.protobuf.IUInt32Value);
            public value: number;
            public static create(properties?: google.protobuf.IUInt32Value): google.protobuf.UInt32Value;
            public static encode(message: google.protobuf.UInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.UInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt32Value;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt32Value;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt32Value;
            public static toObject(message: google.protobuf.UInt32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IBoolValue {
            value?: (boolean|null);
        }

        class BoolValue implements IBoolValue {
            constructor(properties?: google.protobuf.IBoolValue);
            public value: boolean;
            public static create(properties?: google.protobuf.IBoolValue): google.protobuf.BoolValue;
            public static encode(message: google.protobuf.BoolValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.BoolValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BoolValue;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BoolValue;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.BoolValue;
            public static toObject(message: google.protobuf.BoolValue, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IStringValue {
            value?: (string|null);
        }

        class StringValue implements IStringValue {
            constructor(properties?: google.protobuf.IStringValue);
            public value: string;
            public static create(properties?: google.protobuf.IStringValue): google.protobuf.StringValue;
            public static encode(message: google.protobuf.StringValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.StringValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.StringValue;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.StringValue;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.StringValue;
            public static toObject(message: google.protobuf.StringValue, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IBytesValue {
            value?: (Uint8Array|null);
        }

        class BytesValue implements IBytesValue {
            constructor(properties?: google.protobuf.IBytesValue);
            public value: Uint8Array;
            public static create(properties?: google.protobuf.IBytesValue): google.protobuf.BytesValue;
            public static encode(message: google.protobuf.BytesValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.BytesValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BytesValue;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BytesValue;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.BytesValue;
            public static toObject(message: google.protobuf.BytesValue, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface ITimestamp {
            seconds?: (number|Long|null);
            nanos?: (number|null);
        }

        class Timestamp implements ITimestamp {
            constructor(properties?: google.protobuf.ITimestamp);
            public seconds: (number|Long);
            public nanos: number;
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;
            public static encode(message: google.protobuf.Timestamp, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.Timestamp, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }
    }
}

export namespace vector_tile {

    interface ITile {
        layers?: (vector_tile.Tile.Layer[]|null);
    }

    class Tile implements ITile {
        constructor(properties?: vector_tile.ITile);
        public layers: vector_tile.Tile.Layer[];
        public static create(properties?: vector_tile.ITile): vector_tile.Tile;
        public static encode(message: vector_tile.Tile, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: vector_tile.Tile, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): vector_tile.Tile;
        public static toObject(message: vector_tile.Tile, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace Tile {

        enum GeomType {
            UNKNOWN = 0,
            POINT = 1,
            LINESTRING = 2,
            POLYGON = 3
        }

        interface IValue {
            stringValue?: (string|null);
            floatValue?: (number|null);
            doubleValue?: (number|null);
            intValue?: (number|Long|null);
            uintValue?: (number|Long|null);
            sintValue?: (number|Long|null);
            boolValue?: (boolean|null);
        }

        class Value implements IValue {
            constructor(properties?: vector_tile.Tile.IValue);
            public stringValue: string;
            public floatValue: number;
            public doubleValue: number;
            public intValue: (number|Long);
            public uintValue: (number|Long);
            public sintValue: (number|Long);
            public boolValue: boolean;
            public static create(properties?: vector_tile.Tile.IValue): vector_tile.Tile.Value;
            public static encode(message: vector_tile.Tile.Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: vector_tile.Tile.Value, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Value;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Value;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): vector_tile.Tile.Value;
            public static toObject(message: vector_tile.Tile.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IFeature {
            id?: (number|Long|null);
            tags?: (number[]|null);
            type?: (vector_tile.Tile.GeomType|null);
            geometry?: (number[]|null);
        }

        class Feature implements IFeature {
            constructor(properties?: vector_tile.Tile.IFeature);
            public id: (number|Long);
            public tags: number[];
            public type: vector_tile.Tile.GeomType;
            public geometry: number[];
            public static create(properties?: vector_tile.Tile.IFeature): vector_tile.Tile.Feature;
            public static encode(message: vector_tile.Tile.Feature, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: vector_tile.Tile.Feature, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Feature;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Feature;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): vector_tile.Tile.Feature;
            public static toObject(message: vector_tile.Tile.Feature, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface ILayer {
            version: number;
            name: string;
            features?: (vector_tile.Tile.Feature[]|null);
            keys?: (string[]|null);
            values?: (vector_tile.Tile.Value[]|null);
            extent?: (number|null);
        }

        class Layer implements ILayer {
            constructor(properties?: vector_tile.Tile.ILayer);
            public version: number;
            public name: string;
            public features: vector_tile.Tile.Feature[];
            public keys: string[];
            public values: vector_tile.Tile.Value[];
            public extent: number;
            public static create(properties?: vector_tile.Tile.ILayer): vector_tile.Tile.Layer;
            public static encode(message: vector_tile.Tile.Layer, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: vector_tile.Tile.Layer, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): vector_tile.Tile.Layer;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): vector_tile.Tile.Layer;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): vector_tile.Tile.Layer;
            public static toObject(message: vector_tile.Tile.Layer, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }
    }
}
