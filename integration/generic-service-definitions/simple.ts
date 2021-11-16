/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'simple';

export interface TestMessage {
  value: string;
}

const baseTestMessage: object = { value: '' };

export const TestMessage = {
  encode(message: TestMessage, writer: Writer = Writer.create()): Writer {
    if (message.value !== '') {
      writer.uint32(10).string(message.value);
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
          message.value = reader.string();
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
    message.value = object.value !== undefined && object.value !== null ? String(object.value) : '';
    return message;
  },

  toJSON(message: TestMessage): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<TestMessage>): TestMessage {
    const message = { ...baseTestMessage } as TestMessage;
    message.value = object.value ?? '';
    return message;
  },
};

/** @deprecated */
export const TestDefinition = {
  name: 'Test',
  fullName: 'simple.Test',
  methods: {
    unary: {
      name: 'Unary',
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: false,
      options: {},
    },
    serverStreaming: {
      name: 'ServerStreaming',
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: true,
      options: {},
    },
    clientStreaming: {
      name: 'ClientStreaming',
      requestType: TestMessage,
      requestStream: true,
      responseType: TestMessage,
      responseStream: false,
      options: {},
    },
    bidiStreaming: {
      name: 'BidiStreaming',
      requestType: TestMessage,
      requestStream: true,
      responseType: TestMessage,
      responseStream: true,
      options: {},
    },
    /** @deprecated */
    deprecated: {
      name: 'Deprecated',
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: false,
      options: {},
    },
    idempotent: {
      name: 'Idempotent',
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: false,
      options: {
        idempotencyLevel: 'IDEMPOTENT',
      },
    },
    noSideEffects: {
      name: 'NoSideEffects',
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
