/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
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
    /** Server Streaming */
    serverStreaming: {
      name: 'ServerStreaming',
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: true,
      options: {},
    },
    serverStringValueStreaming: {
      name: 'ServerStringValueStreaming',
      requestType: StringValue,
      requestStream: false,
      responseType: StringValue,
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
    clientStringValueStreaming: {
      name: 'ClientStringValueStreaming',
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
    bidiStringValueStreaming: {
      name: 'BidiStringValueStreaming',
      requestType: StringValue,
      requestStream: true,
      responseType: StringValue,
      responseStream: true,
      options: {},
    },
    idempotent: {
      name: 'Idempotent',
      requestType: Empty,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {
        idempotencyLevel: 'IDEMPOTENT',
      },
    },
    noSideEffects: {
      name: 'NoSideEffects',
      requestType: Empty,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {
        idempotencyLevel: 'NO_SIDE_EFFECTS',
      },
    },
  },
} as const;

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
