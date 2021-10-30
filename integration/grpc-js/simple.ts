/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { makeGenericClientConstructor, ChannelCredentials, Client, Metadata } from '@grpc/grpc-js';
import type {
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  handleServerStreamingCall,
  handleClientStreamingCall,
  handleBidiStreamingCall,
  ClientUnaryCall,
  CallOptions,
  ClientReadableStream,
  ClientWritableStream,
  ClientDuplexStream,
  ServiceError,
} from '@grpc/grpc-js';
import { Timestamp } from './google/protobuf/timestamp';
import { Empty } from './google/protobuf/empty';
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
} from './google/protobuf/wrappers';

export const protobufPackage = 'simple';

export interface TestMessage {
  timestamp: Date | undefined;
}

const baseTestMessage: object = {};

export const TestMessage = {
  encode(message: TestMessage, writer: Writer = Writer.create()): Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TestMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTestMessage } as TestMessage;
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
    const message = { ...baseTestMessage } as TestMessage;
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp);
    } else {
      message.timestamp = undefined;
    }
    return message;
  },

  toJSON(message: TestMessage): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<TestMessage>): TestMessage {
    const message = { ...baseTestMessage } as TestMessage;
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = undefined;
    }
    return message;
  },
};

/**
 * Test
 *
 * @deprecated
 */
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
  serverStringValueStreaming: {
    path: '/simple.Test/ServerStringValueStreaming',
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    requestDeserialize: (value: Buffer) => StringValue.decode(value).value,
    responseSerialize: (value: string | undefined) => Buffer.from(StringValue.encode({ value: value ?? '' }).finish()),
    responseDeserialize: (value: Buffer) => StringValue.decode(value).value,
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
  clientStringValueStreaming: {
    path: '/simple.Test/ClientStringValueStreaming',
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
  bidiStringValueStreaming: {
    path: '/simple.Test/BidiStringValueStreaming',
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
  /** Server Streaming */
  serverStreaming: handleServerStreamingCall<TestMessage, TestMessage>;
  serverStringValueStreaming: handleServerStreamingCall<string | undefined, string | undefined>;
  /** Client Streaming */
  clientStreaming: handleClientStreamingCall<TestMessage, TestMessage>;
  clientStringValueStreaming: handleClientStreamingCall<string | undefined, string | undefined>;
  /** Bidi Streaming */
  bidiStreaming: handleBidiStreamingCall<TestMessage, TestMessage>;
  bidiStringValueStreaming: handleBidiStreamingCall<string | undefined, string | undefined>;
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
  /** Server Streaming */
  serverStreaming(request: TestMessage, options?: Partial<CallOptions>): ClientReadableStream<TestMessage>;
  serverStreaming(
    request: TestMessage,
    metadata?: Metadata,
    options?: Partial<CallOptions>
  ): ClientReadableStream<TestMessage>;
  serverStringValueStreaming(
    request: string | undefined,
    options?: Partial<CallOptions>
  ): ClientReadableStream<string | undefined>;
  serverStringValueStreaming(
    request: string | undefined,
    metadata?: Metadata,
    options?: Partial<CallOptions>
  ): ClientReadableStream<string | undefined>;
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
  clientStringValueStreaming(
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientWritableStream<string | undefined>;
  clientStringValueStreaming(
    metadata: Metadata,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientWritableStream<string | undefined>;
  clientStringValueStreaming(
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientWritableStream<string | undefined>;
  clientStringValueStreaming(
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: string | undefined) => void
  ): ClientWritableStream<string | undefined>;
  /** Bidi Streaming */
  bidiStreaming(): ClientDuplexStream<TestMessage, TestMessage>;
  bidiStreaming(options: Partial<CallOptions>): ClientDuplexStream<TestMessage, TestMessage>;
  bidiStreaming(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<TestMessage, TestMessage>;
  bidiStringValueStreaming(): ClientDuplexStream<string | undefined, string | undefined>;
  bidiStringValueStreaming(options: Partial<CallOptions>): ClientDuplexStream<string | undefined, string | undefined>;
  bidiStringValueStreaming(
    metadata: Metadata,
    options?: Partial<CallOptions>
  ): ClientDuplexStream<string | undefined, string | undefined>;
}

export const TestClient = (makeGenericClientConstructor(TestService, 'simple.Test') as unknown) as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): TestClient;
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
