/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
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
import { Timestamp } from './google/protobuf/timestamp';
import { Empty } from './google/protobuf/empty';

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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp !== undefined ? message.timestamp.toISOString() : null);
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
export const TestServiceService = {
  /**
   * Unary
   *
   * @deprecated
   */
  unary: {
    path: '/simple.TestService/Unary',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  /** Server Streaming */
  serverStreaming: {
    path: '/simple.TestService/ServerStreaming',
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TestMessage.decode(value),
    responseSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TestMessage.decode(value),
  },
  /** Client Streaming */
  clientStreaming: {
    path: '/simple.TestService/ClientStreaming',
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TestMessage.decode(value),
    responseSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TestMessage.decode(value),
  },
  /** Bidi Streaming */
  bidiStreaming: {
    path: '/simple.TestService/BidiStreaming',
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TestMessage.decode(value),
    responseSerialize: (value: TestMessage) => Buffer.from(TestMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TestMessage.decode(value),
  },
} as const;

export interface TestServiceServer extends UntypedServiceImplementation {
  /**
   * Unary
   *
   * @deprecated
   */
  unary: handleUnaryCall<Empty, Empty>;
  /** Server Streaming */
  serverStreaming: handleServerStreamingCall<TestMessage, TestMessage>;
  /** Client Streaming */
  clientStreaming: handleClientStreamingCall<TestMessage, TestMessage>;
  /** Bidi Streaming */
  bidiStreaming: handleBidiStreamingCall<TestMessage, TestMessage>;
}

export interface TestServiceClient extends Client {
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
  /** Server Streaming */
  serverStreaming(request: TestMessage, options?: Partial<CallOptions>): ClientReadableStream<TestMessage>;
  serverStreaming(
    request: TestMessage,
    metadata?: Metadata,
    options?: Partial<CallOptions>
  ): ClientReadableStream<TestMessage>;
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
  /** Bidi Streaming */
  bidiStreaming(): ClientDuplexStream<TestMessage, TestMessage>;
  bidiStreaming(options: Partial<CallOptions>): ClientDuplexStream<TestMessage, TestMessage>;
  bidiStreaming(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<TestMessage, TestMessage>;
}

export const TestServiceClient = (makeGenericClientConstructor(
  TestServiceService,
  'simple.TestService'
) as unknown) as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): TestServiceClient;
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
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
