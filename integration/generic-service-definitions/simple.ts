/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "simple";

export interface TestMessage {
  value: string;
}

function createBaseTestMessage(): TestMessage {
  return { value: "" };
}

export const TestMessage = {
  encode(
    message: TestMessage,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): TestMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTestMessage();
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
    return {
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: TestMessage): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TestMessage>, I>>(
    object: I,
  ): TestMessage {
    const message = createBaseTestMessage();
    message.value = object.value ?? "";
    return message;
  },
};

/** @deprecated */
export type TestDefinition = typeof TestDefinition;
export const TestDefinition = {
  name: "Test",
  fullName: "simple.Test",
  methods: {
    unary: {
      name: "Unary",
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: false,
      options: {},
    },
    serverStreaming: {
      name: "ServerStreaming",
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: true,
      options: {},
    },
    clientStreaming: {
      name: "ClientStreaming",
      requestType: TestMessage,
      requestStream: true,
      responseType: TestMessage,
      responseStream: false,
      options: {},
    },
    bidiStreaming: {
      name: "BidiStreaming",
      requestType: TestMessage,
      requestStream: true,
      responseType: TestMessage,
      responseStream: true,
      options: {},
    },
    /** @deprecated */
    deprecated: {
      name: "Deprecated",
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: false,
      options: {},
    },
    idempotent: {
      name: "Idempotent",
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: false,
      options: {
        idempotencyLevel: "IDEMPOTENT",
      },
    },
    noSideEffects: {
      name: "NoSideEffects",
      requestType: TestMessage,
      requestStream: false,
      responseType: TestMessage,
      responseStream: false,
      options: {
        idempotencyLevel: "NO_SIDE_EFFECTS",
      },
    },
  },
} as const;

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : 
    & P
    & { [K in keyof P]: Exact<P[K], I[K]> }
    & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
