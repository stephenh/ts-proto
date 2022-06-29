/* eslint-disable */
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  handleServerStreamingCall,
  handleClientStreamingCall,
  handleBidiStreamingCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ClientReadableStream,
  ClientWritableStream,
  ClientDuplexStream,
  ServiceError,
} from '@grpc/grpc-js';
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
import { Struct, ListValue, Value } from './google/protobuf/struct.js';
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

  fromPartial<I extends Exact<DeepPartial<TestMessage>, I>>(object: I): TestMessage {
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
export type TestService = typeof TestService;
export const TestService = {
  /**
   * Unary
   *
   * @deprecated
   */
  unary: {
    path: '/simple.Test/Unary',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  unaryStringValue: {
    path: '/simple.Test/UnaryStringValue',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    requestDeserialize: (value: Buffer) => StringValue.decode(value).value,
    responseSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    responseDeserialize: (value: Buffer) => StringValue.decode(value).value,
  },
  unaryInt64Value: {
    path: '/simple.Test/UnaryInt64Value',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: number | undefined) => Buffer.from(Int64Value.encode({ value: value ?? 0 }).finish()),
    requestDeserialize: (value: Buffer) => Int64Value.decode(value).value,
    responseSerialize: (value: number | undefined) => Buffer.from(Int64Value.encode({ value: value ?? 0 }).finish()),
    responseDeserialize: (value: Buffer) => Int64Value.decode(value).value,
  },
  unaryUint64Value: {
    path: '/simple.Test/UnaryUint64Value',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: number | undefined) => Buffer.from(UInt64Value.encode({ value: value ?? 0 }).finish()),
    requestDeserialize: (value: Buffer) => UInt64Value.decode(value).value,
    responseSerialize: (value: number | undefined) => Buffer.from(UInt64Value.encode({ value: value ?? 0 }).finish()),
    responseDeserialize: (value: Buffer) => UInt64Value.decode(value).value,
  },
  unaryInt32Value: {
    path: '/simple.Test/UnaryInt32Value',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: number | undefined) => Buffer.from(Int32Value.encode({ value: value ?? 0 }).finish()),
    requestDeserialize: (value: Buffer) => Int32Value.decode(value).value,
    responseSerialize: (value: number | undefined) => Buffer.from(Int32Value.encode({ value: value ?? 0 }).finish()),
    responseDeserialize: (value: Buffer) => Int32Value.decode(value).value,
  },
  unaryUInt32Value: {
    path: '/simple.Test/UnaryUInt32Value',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: number | undefined) => Buffer.from(UInt32Value.encode({ value: value ?? 0 }).finish()),
    requestDeserialize: (value: Buffer) => UInt32Value.decode(value).value,
    responseSerialize: (value: number | undefined) => Buffer.from(UInt32Value.encode({ value: value ?? 0 }).finish()),
    responseDeserialize: (value: Buffer) => UInt32Value.decode(value).value,
  },
  unaryBytesValue: {
    path: '/simple.Test/UnaryBytesValue',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Uint8Array | undefined) =>
      Buffer.from(BytesValue.encode({ value: value ?? new Uint8Array() }).finish()),
    requestDeserialize: (value: Buffer) => BytesValue.decode(value).value,
    responseSerialize: (value: Uint8Array | undefined) =>
      Buffer.from(BytesValue.encode({ value: value ?? new Uint8Array() }).finish()),
    responseDeserialize: (value: Buffer) => BytesValue.decode(value).value,
  },
  unaryFloatValue: {
    path: '/simple.Test/UnaryFloatValue',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: number | undefined) => Buffer.from(FloatValue.encode({ value: value ?? 0 }).finish()),
    requestDeserialize: (value: Buffer) => FloatValue.decode(value).value,
    responseSerialize: (value: number | undefined) => Buffer.from(FloatValue.encode({ value: value ?? 0 }).finish()),
    responseDeserialize: (value: Buffer) => FloatValue.decode(value).value,
  },
  unaryDoubleValue: {
    path: '/simple.Test/UnaryDoubleValue',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: number | undefined) => Buffer.from(DoubleValue.encode({ value: value ?? 0 }).finish()),
    requestDeserialize: (value: Buffer) => DoubleValue.decode(value).value,
    responseSerialize: (value: number | undefined) => Buffer.from(DoubleValue.encode({ value: value ?? 0 }).finish()),
    responseDeserialize: (value: Buffer) => DoubleValue.decode(value).value,
  },
  unaryBoolValue: {
    path: '/simple.Test/UnaryBoolValue',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: boolean | undefined) => Buffer.from(BoolValue.encode({ value: value ?? false }).finish()),
    requestDeserialize: (value: Buffer) => BoolValue.decode(value).value,
    responseSerialize: (value: boolean | undefined) =>
      Buffer.from(BoolValue.encode({ value: value ?? false }).finish()),
    responseDeserialize: (value: Buffer) => BoolValue.decode(value).value,
  },
  unaryTimestamp: {
    path: '/simple.Test/UnaryTimestamp',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Date) => Buffer.from(Timestamp.encode(toTimestamp(value)).finish()),
    requestDeserialize: (value: Buffer) => Timestamp.decode(value),
    responseSerialize: (value: Date) => Buffer.from(Timestamp.encode(toTimestamp(value)).finish()),
    responseDeserialize: (value: Buffer) => Timestamp.decode(value),
  },
  struct: {
    path: '/simple.Test/Struct',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: { [key: string]: any } | undefined) =>
      Buffer.from(Struct.encode(Struct.wrap(value)).finish()),
    requestDeserialize: (value: Buffer) => Struct.unwrap(Struct.decode(value)),
    responseSerialize: (value: { [key: string]: any } | undefined) =>
      Buffer.from(Struct.encode(Struct.wrap(value)).finish()),
    responseDeserialize: (value: Buffer) => Struct.unwrap(Struct.decode(value)),
  },
  value: {
    path: '/simple.Test/Value',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: any | undefined) => Buffer.from(Value.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Value.decode(value),
    responseSerialize: (value: any | undefined) => Buffer.from(Value.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Value.decode(value),
  },
  listValue: {
    path: '/simple.Test/ListValue',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Array<any> | undefined) =>
      Buffer.from(ListValue.encode({ values: value ?? [] }).finish()),
    requestDeserialize: (value: Buffer) => ListValue.unwrap(ListValue.decode(value)),
    responseSerialize: (value: Array<any> | undefined) =>
      Buffer.from(ListValue.encode({ values: value ?? [] }).finish()),
    responseDeserialize: (value: Buffer) => ListValue.unwrap(ListValue.decode(value)),
  },
  /** Server Streaming */
  serverStreaming: {
    path: '/simple.Test/ServerStreaming',
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TestMessage.decode(value),
    responseSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TestMessage.decode(value),
  },
  serverStreamingStringValue: {
    path: '/simple.Test/ServerStreamingStringValue',
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    requestDeserialize: (value: Buffer) => StringValue.decode(value).value,
    responseSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    responseDeserialize: (value: Buffer) => StringValue.decode(value).value,
  },
  serverStreamingStruct: {
    path: '/simple.Test/ServerStreamingStruct',
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: { [key: string]: any } | undefined) =>
      Buffer.from(Struct.encode(Struct.wrap(value)).finish()),
    requestDeserialize: (value: Buffer) => Struct.unwrap(Struct.decode(value)),
    responseSerialize: (value: { [key: string]: any } | undefined) =>
      Buffer.from(Struct.encode(Struct.wrap(value)).finish()),
    responseDeserialize: (value: Buffer) => Struct.unwrap(Struct.decode(value)),
  },
  /** Client Streaming */
  clientStreaming: {
    path: '/simple.Test/ClientStreaming',
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TestMessage.decode(value),
    responseSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TestMessage.decode(value),
  },
  clientStreamingStringValue: {
    path: '/simple.Test/ClientStreamingStringValue',
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    requestDeserialize: (value: Buffer) => StringValue.decode(value).value,
    responseSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    responseDeserialize: (value: Buffer) => StringValue.decode(value).value,
  },
  /** Bidi Streaming */
  bidiStreaming: {
    path: '/simple.Test/BidiStreaming',
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TestMessage.decode(value),
    responseSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TestMessage.decode(value),
  },
  bidiStreamingStringValue: {
    path: '/simple.Test/BidiStreamingStringValue',
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    requestDeserialize: (value: Buffer) => StringValue.decode(value).value,
    responseSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    responseDeserialize: (value: Buffer) => StringValue.decode(value).value,
  },
} as const;

export interface TestServer extends UntypedServiceImplementation {
  /**
   * Unary
   *
   * @deprecated
   */
  unary: handleUnaryCall<Empty, Empty>;
  unaryStringValue: handleUnaryCall<string | undefined, string | undefined>;
  unaryInt64Value: handleUnaryCall<number | undefined, number | undefined>;
  unaryUint64Value: handleUnaryCall<number | undefined, number | undefined>;
  unaryInt32Value: handleUnaryCall<number | undefined, number | undefined>;
  unaryUInt32Value: handleUnaryCall<number | undefined, number | undefined>;
  unaryBytesValue: handleUnaryCall<Uint8Array | undefined, Uint8Array | undefined>;
  unaryFloatValue: handleUnaryCall<number | undefined, number | undefined>;
  unaryDoubleValue: handleUnaryCall<number | undefined, number | undefined>;
  unaryBoolValue: handleUnaryCall<boolean | undefined, boolean | undefined>;
  unaryTimestamp: handleUnaryCall<Date, Date>;
  struct: handleUnaryCall<{ [key: string]: any } | undefined, { [key: string]: any } | undefined>;
  value: handleUnaryCall<any | undefined, any | undefined>;
  listValue: handleUnaryCall<Array<any> | undefined, Array<any> | undefined>;
  /** Server Streaming */
  serverStreaming: handleServerStreamingCall<TestMessage, TestMessage>;
  serverStreamingStringValue: handleServerStreamingCall<string | undefined, string | undefined>;
  serverStreamingStruct: handleServerStreamingCall<
    { [key: string]: any } | undefined,
    { [key: string]: any } | undefined
  >;
  /** Client Streaming */
  clientStreaming: handleClientStreamingCall<TestMessage, TestMessage>;
  clientStreamingStringValue: handleClientStreamingCall<string | undefined, string | undefined>;
  /** Bidi Streaming */
  bidiStreaming: handleBidiStreamingCall<TestMessage, TestMessage>;
  bidiStreamingStringValue: handleBidiStreamingCall<string | undefined, string | undefined>;
}

export interface TestClient extends Client {
  /**
   * Unary
   *
   * @deprecated
   */
  unary(request: Empty, callback: (error: ServiceError | null, response: Empty) => void): ClientUnaryCall;
  unary(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
  unary(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
  unaryStringValue(
    request: string | undefined,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientUnaryCall;
  unaryStringValue(
    request: string | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientUnaryCall;
  unaryStringValue(
    request: string | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientUnaryCall;
  unaryInt64Value(
    request: number | undefined,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryInt64Value(
    request: number | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryInt64Value(
    request: number | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryUint64Value(
    request: number | undefined,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryUint64Value(
    request: number | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryUint64Value(
    request: number | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryInt32Value(
    request: number | undefined,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryInt32Value(
    request: number | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryInt32Value(
    request: number | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryUInt32Value(
    request: number | undefined,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryUInt32Value(
    request: number | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryUInt32Value(
    request: number | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryBytesValue(
    request: Uint8Array | undefined,
    callback: (error: ServiceError | null, response: Uint8Array | undefined) => void
  ): ClientUnaryCall;
  unaryBytesValue(
    request: Uint8Array | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Uint8Array | undefined) => void
  ): ClientUnaryCall;
  unaryBytesValue(
    request: Uint8Array | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Uint8Array | undefined) => void
  ): ClientUnaryCall;
  unaryFloatValue(
    request: number | undefined,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryFloatValue(
    request: number | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryFloatValue(
    request: number | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryDoubleValue(
    request: number | undefined,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryDoubleValue(
    request: number | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryDoubleValue(
    request: number | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: number | undefined) => void
  ): ClientUnaryCall;
  unaryBoolValue(
    request: boolean | undefined,
    callback: (error: ServiceError | null, response: boolean | undefined) => void
  ): ClientUnaryCall;
  unaryBoolValue(
    request: boolean | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: boolean | undefined) => void
  ): ClientUnaryCall;
  unaryBoolValue(
    request: boolean | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: boolean | undefined) => void
  ): ClientUnaryCall;
  unaryTimestamp(request: Date, callback: (error: ServiceError | null, response: Date) => void): ClientUnaryCall;
  unaryTimestamp(
    request: Date,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Date) => void
  ): ClientUnaryCall;
  unaryTimestamp(
    request: Date,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Date) => void
  ): ClientUnaryCall;
  struct(
    request: { [key: string]: any } | undefined,
    callback: (error: ServiceError | null, response: { [key: string]: any } | undefined) => void
  ): ClientUnaryCall;
  struct(
    request: { [key: string]: any } | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: { [key: string]: any } | undefined) => void
  ): ClientUnaryCall;
  struct(
    request: { [key: string]: any } | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: { [key: string]: any } | undefined) => void
  ): ClientUnaryCall;
  value(
    request: any | undefined,
    callback: (error: ServiceError | null, response: any | undefined) => void
  ): ClientUnaryCall;
  value(
    request: any | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: any | undefined) => void
  ): ClientUnaryCall;
  value(
    request: any | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: any | undefined) => void
  ): ClientUnaryCall;
  listValue(
    request: Array<any> | undefined,
    callback: (error: ServiceError | null, response: Array<any> | undefined) => void
  ): ClientUnaryCall;
  listValue(
    request: Array<any> | undefined,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Array<any> | undefined) => void
  ): ClientUnaryCall;
  listValue(
    request: Array<any> | undefined,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Array<any> | undefined) => void
  ): ClientUnaryCall;
  /** Server Streaming */
  serverStreaming(request: TestMessage, options?: Partial<CallOptions>): ClientReadableStream<TestMessage>;
  serverStreaming(
    request: TestMessage,
    metadata?: Metadata,
    options?: Partial<CallOptions>
  ): ClientReadableStream<TestMessage>;
  serverStreamingStringValue(
    request: string | undefined,
    options?: Partial<CallOptions>
  ): ClientReadableStream<string | undefined>;
  serverStreamingStringValue(
    request: string | undefined,
    metadata?: Metadata,
    options?: Partial<CallOptions>
  ): ClientReadableStream<string | undefined>;
  serverStreamingStruct(
    request: { [key: string]: any } | undefined,
    options?: Partial<CallOptions>
  ): ClientReadableStream<{ [key: string]: any } | undefined>;
  serverStreamingStruct(
    request: { [key: string]: any } | undefined,
    metadata?: Metadata,
    options?: Partial<CallOptions>
  ): ClientReadableStream<{ [key: string]: any } | undefined>;
  /** Client Streaming */
  clientStreaming(
    callback: (error: ServiceError | null, response: TestMessage) => void
  ): ClientWritableStream<TestMessage>;
  clientStreaming(
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TestMessage) => void
  ): ClientWritableStream<TestMessage>;
  clientStreaming(
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TestMessage) => void
  ): ClientWritableStream<TestMessage>;
  clientStreaming(
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TestMessage) => void
  ): ClientWritableStream<TestMessage>;
  clientStreamingStringValue(
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientWritableStream<string | undefined>;
  clientStreamingStringValue(
    metadata: Metadata,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientWritableStream<string | undefined>;
  clientStreamingStringValue(
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientWritableStream<string | undefined>;
  clientStreamingStringValue(
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientWritableStream<string | undefined>;
  /** Bidi Streaming */
  bidiStreaming(): ClientDuplexStream<TestMessage, TestMessage>;
  bidiStreaming(options: Partial<CallOptions>): ClientDuplexStream<TestMessage, TestMessage>;
  bidiStreaming(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<TestMessage, TestMessage>;
  bidiStreamingStringValue(): ClientDuplexStream<string | undefined, string | undefined>;
  bidiStreamingStringValue(options: Partial<CallOptions>): ClientDuplexStream<string | undefined, string | undefined>;
  bidiStreamingStringValue(
    metadata: Metadata,
    options?: Partial<CallOptions>
  ): ClientDuplexStream<string | undefined, string | undefined>;
}

export const TestClient = makeGenericClientConstructor(TestService, 'simple.Test') as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): TestClient;
  service: typeof TestService;
};

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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

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
