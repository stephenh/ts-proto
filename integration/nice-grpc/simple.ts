/* eslint-disable */
import { CallContext, CallOptions } from 'nice-grpc-common';
import { Timestamp } from './google/protobuf/timestamp.js';
import { Empty } from './google/protobuf/empty.js';
import {
  StringValue,
  Int64Value,
  UInt64Value,
  Int32Value,
  UInt32Value,
  BytesValue,
  FloatValue,
  DoubleValue,
  BoolValue,
} from './google/protobuf/wrappers.js';
import { Struct, Value, ListValue } from './google/protobuf/struct.js';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'simple';

export interface TestMessage {
  timestamp: Date | undefined;
}

function createBaseTestMessage(): TestMessage {
  return { timestamp: undefined };
}

export const TestMessage = {
  encode(message: TestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TestMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTestMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TestMessage {
    return {
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: TestMessage): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<TestMessage>): TestMessage {
    const message = createBaseTestMessage();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

/**
 * Test
 *
 * @deprecated
 */
export type TestDefinition = typeof TestDefinition;
export const TestDefinition = {
  name: 'Test',
  fullName: 'simple.Test',
  methods: {
    /**
     * Unary
     *
     * @deprecated
     */
    unary: {
      name: 'Unary',
      requestType: Empty,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    unaryStringValue: {
      name: 'UnaryStringValue',
      requestType: StringValue,
      requestStream: false,
      responseType: StringValue,
      responseStream: false,
      options: {},
    },
    unaryInt64Value: {
      name: 'UnaryInt64Value',
      requestType: Int64Value,
      requestStream: false,
      responseType: Int64Value,
      responseStream: false,
      options: {},
    },
    unaryUint64Value: {
      name: 'UnaryUint64Value',
      requestType: UInt64Value,
      requestStream: false,
      responseType: UInt64Value,
      responseStream: false,
      options: {},
    },
    unaryInt32Value: {
      name: 'UnaryInt32Value',
      requestType: Int32Value,
      requestStream: false,
      responseType: Int32Value,
      responseStream: false,
      options: {},
    },
    unaryUInt32Value: {
      name: 'UnaryUInt32Value',
      requestType: UInt32Value,
      requestStream: false,
      responseType: UInt32Value,
      responseStream: false,
      options: {},
    },
    unaryBytesValue: {
      name: 'UnaryBytesValue',
      requestType: BytesValue,
      requestStream: false,
      responseType: BytesValue,
      responseStream: false,
      options: {},
    },
    unaryFloatValue: {
      name: 'UnaryFloatValue',
      requestType: FloatValue,
      requestStream: false,
      responseType: FloatValue,
      responseStream: false,
      options: {},
    },
    unaryDoubleValue: {
      name: 'UnaryDoubleValue',
      requestType: DoubleValue,
      requestStream: false,
      responseType: DoubleValue,
      responseStream: false,
      options: {},
    },
    unaryBoolValue: {
      name: 'UnaryBoolValue',
      requestType: BoolValue,
      requestStream: false,
      responseType: BoolValue,
      responseStream: false,
      options: {},
    },
    unaryTimestamp: {
      name: 'UnaryTimestamp',
      requestType: Timestamp,
      requestStream: false,
      responseType: Timestamp,
      responseStream: false,
      options: {},
    },
    struct: {
      name: 'Struct',
      requestType: Struct,
      requestStream: false,
      responseType: Struct,
      responseStream: false,
      options: {},
    },
    value: {
      name: 'Value',
      requestType: Value,
      requestStream: false,
      responseType: Value,
      responseStream: false,
      options: {},
    },
    listValue: {
      name: 'ListValue',
      requestType: ListValue,
      requestStream: false,
      responseType: ListValue,
      responseStream: false,
      options: {},
    },
    /** Server Streaming */
    serverStreaming: {
      name: 'ServerStreaming',
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: true,
      options: {},
    },
    serverStreamingStringValue: {
      name: 'ServerStreamingStringValue',
      requestType: StringValue,
      requestStream: false,
      responseType: StringValue,
      responseStream: true,
      options: {},
    },
    serverStreamingStruct: {
      name: 'ServerStreamingStruct',
      requestType: Struct,
      requestStream: false,
      responseType: Struct,
      responseStream: true,
      options: {},
    },
    /** Client Streaming */
    clientStreaming: {
      name: 'ClientStreaming',
      requestType: TestMessage,
      requestStream: true,
      responseType: TestMessage,
      responseStream: false,
      options: {},
    },
    clientStreamingStringValue: {
      name: 'ClientStreamingStringValue',
      requestType: StringValue,
      requestStream: true,
      responseType: StringValue,
      responseStream: false,
      options: {},
    },
    /** Bidi Streaming */
    bidiStreaming: {
      name: 'BidiStreaming',
      requestType: TestMessage,
      requestStream: true,
      responseType: TestMessage,
      responseStream: true,
      options: {},
    },
    bidiStreamingStringValue: {
      name: 'BidiStreamingStringValue',
      requestType: StringValue,
      requestStream: true,
      responseType: StringValue,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface TestServiceImplementation<CallContextExt = {}> {
  /**
   * Unary
   *
   * @deprecated
   */
  unary(request: Empty, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  unaryStringValue(request: StringValue, context: CallContext & CallContextExt): Promise<DeepPartial<StringValue>>;
  unaryInt64Value(request: Int64Value, context: CallContext & CallContextExt): Promise<DeepPartial<Int64Value>>;
  unaryUint64Value(request: UInt64Value, context: CallContext & CallContextExt): Promise<DeepPartial<UInt64Value>>;
  unaryInt32Value(request: Int32Value, context: CallContext & CallContextExt): Promise<DeepPartial<Int32Value>>;
  unaryUInt32Value(request: UInt32Value, context: CallContext & CallContextExt): Promise<DeepPartial<UInt32Value>>;
  unaryBytesValue(request: BytesValue, context: CallContext & CallContextExt): Promise<DeepPartial<BytesValue>>;
  unaryFloatValue(request: FloatValue, context: CallContext & CallContextExt): Promise<DeepPartial<FloatValue>>;
  unaryDoubleValue(request: DoubleValue, context: CallContext & CallContextExt): Promise<DeepPartial<DoubleValue>>;
  unaryBoolValue(request: BoolValue, context: CallContext & CallContextExt): Promise<DeepPartial<BoolValue>>;
  unaryTimestamp(request: Timestamp, context: CallContext & CallContextExt): Promise<DeepPartial<Timestamp>>;
  struct(request: Struct, context: CallContext & CallContextExt): Promise<DeepPartial<Struct>>;
  value(request: Value, context: CallContext & CallContextExt): Promise<DeepPartial<Value>>;
  listValue(request: ListValue, context: CallContext & CallContextExt): Promise<DeepPartial<ListValue>>;
  /** Server Streaming */
  serverStreaming(
    request: TestMessage,
    context: CallContext & CallContextExt
  ): ServerStreamingMethodResult<DeepPartial<TestMessage>>;
  serverStreamingStringValue(
    request: StringValue,
    context: CallContext & CallContextExt
  ): ServerStreamingMethodResult<DeepPartial<StringValue>>;
  serverStreamingStruct(
    request: Struct,
    context: CallContext & CallContextExt
  ): ServerStreamingMethodResult<DeepPartial<Struct>>;
  /** Client Streaming */
  clientStreaming(
    request: AsyncIterable<TestMessage>,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<TestMessage>>;
  clientStreamingStringValue(
    request: AsyncIterable<StringValue>,
    context: CallContext & CallContextExt
  ): Promise<DeepPartial<StringValue>>;
  /** Bidi Streaming */
  bidiStreaming(
    request: AsyncIterable<TestMessage>,
    context: CallContext & CallContextExt
  ): ServerStreamingMethodResult<DeepPartial<TestMessage>>;
  bidiStreamingStringValue(
    request: AsyncIterable<StringValue>,
    context: CallContext & CallContextExt
  ): ServerStreamingMethodResult<DeepPartial<StringValue>>;
}

export interface TestClient<CallOptionsExt = {}> {
  /**
   * Unary
   *
   * @deprecated
   */
  unary(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  unaryStringValue(request: DeepPartial<StringValue>, options?: CallOptions & CallOptionsExt): Promise<StringValue>;
  unaryInt64Value(request: DeepPartial<Int64Value>, options?: CallOptions & CallOptionsExt): Promise<Int64Value>;
  unaryUint64Value(request: DeepPartial<UInt64Value>, options?: CallOptions & CallOptionsExt): Promise<UInt64Value>;
  unaryInt32Value(request: DeepPartial<Int32Value>, options?: CallOptions & CallOptionsExt): Promise<Int32Value>;
  unaryUInt32Value(request: DeepPartial<UInt32Value>, options?: CallOptions & CallOptionsExt): Promise<UInt32Value>;
  unaryBytesValue(request: DeepPartial<BytesValue>, options?: CallOptions & CallOptionsExt): Promise<BytesValue>;
  unaryFloatValue(request: DeepPartial<FloatValue>, options?: CallOptions & CallOptionsExt): Promise<FloatValue>;
  unaryDoubleValue(request: DeepPartial<DoubleValue>, options?: CallOptions & CallOptionsExt): Promise<DoubleValue>;
  unaryBoolValue(request: DeepPartial<BoolValue>, options?: CallOptions & CallOptionsExt): Promise<BoolValue>;
  unaryTimestamp(request: DeepPartial<Timestamp>, options?: CallOptions & CallOptionsExt): Promise<Timestamp>;
  struct(request: DeepPartial<Struct>, options?: CallOptions & CallOptionsExt): Promise<Struct>;
  value(request: DeepPartial<Value>, options?: CallOptions & CallOptionsExt): Promise<Value>;
  listValue(request: DeepPartial<ListValue>, options?: CallOptions & CallOptionsExt): Promise<ListValue>;
  /** Server Streaming */
  serverStreaming(
    request: DeepPartial<TestMessage>,
    options?: CallOptions & CallOptionsExt
  ): AsyncIterable<TestMessage>;
  serverStreamingStringValue(
    request: DeepPartial<StringValue>,
    options?: CallOptions & CallOptionsExt
  ): AsyncIterable<StringValue>;
  serverStreamingStruct(request: DeepPartial<Struct>, options?: CallOptions & CallOptionsExt): AsyncIterable<Struct>;
  /** Client Streaming */
  clientStreaming(
    request: AsyncIterable<DeepPartial<TestMessage>>,
    options?: CallOptions & CallOptionsExt
  ): Promise<TestMessage>;
  clientStreamingStringValue(
    request: AsyncIterable<DeepPartial<StringValue>>,
    options?: CallOptions & CallOptionsExt
  ): Promise<StringValue>;
  /** Bidi Streaming */
  bidiStreaming(
    request: AsyncIterable<DeepPartial<TestMessage>>,
    options?: CallOptions & CallOptionsExt
  ): AsyncIterable<TestMessage>;
  bidiStreamingStringValue(
    request: AsyncIterable<DeepPartial<StringValue>>,
    options?: CallOptions & CallOptionsExt
  ): AsyncIterable<StringValue>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = {
  [Symbol.asyncIterator](): AsyncIterator<Response, void>;
};
