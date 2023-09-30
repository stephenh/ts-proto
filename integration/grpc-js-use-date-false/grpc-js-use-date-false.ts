/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "simple";

export interface TimestampMessage {
  timestamp: Timestamp | undefined;
}

function createBaseTimestampMessage(): TimestampMessage {
  return { timestamp: undefined };
}

export const TimestampMessage = {
  encode(message: TimestampMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimestampMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestampMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.timestamp = Timestamp.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TimestampMessage {
    return { timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined };
  },

  toJSON(message: TimestampMessage): unknown {
    const obj: any = {};
    if (message.timestamp !== undefined) {
      obj.timestamp = fromTimestamp(message.timestamp).toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TimestampMessage>, I>>(base?: I): TimestampMessage {
    return TimestampMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TimestampMessage>, I>>(object: I): TimestampMessage {
    const message = createBaseTimestampMessage();
    message.timestamp = (object.timestamp !== undefined && object.timestamp !== null)
      ? Timestamp.fromPartial(object.timestamp)
      : undefined;
    return message;
  },
};

export type TestService = typeof TestService;
export const TestService = {
  simpleNow: {
    path: "/simple.Test/SimpleNow",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Timestamp) => Buffer.from(Timestamp.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Timestamp.decode(value),
    responseSerialize: (value: Timestamp) => Buffer.from(Timestamp.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Timestamp.decode(value),
  },
  wrappedNow: {
    path: "/simple.Test/WrappedNow",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TimestampMessage) => Buffer.from(TimestampMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TimestampMessage.decode(value),
    responseSerialize: (value: TimestampMessage) => Buffer.from(TimestampMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TimestampMessage.decode(value),
  },
} as const;

export interface TestServer extends UntypedServiceImplementation {
  simpleNow: handleUnaryCall<Timestamp, Timestamp>;
  wrappedNow: handleUnaryCall<TimestampMessage, TimestampMessage>;
}

export interface TestClient extends Client {
  simpleNow(request: Timestamp, callback: (error: ServiceError | null, response: Timestamp) => void): ClientUnaryCall;
  simpleNow(
    request: Timestamp,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Timestamp) => void,
  ): ClientUnaryCall;
  simpleNow(
    request: Timestamp,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Timestamp) => void,
  ): ClientUnaryCall;
  wrappedNow(
    request: TimestampMessage,
    callback: (error: ServiceError | null, response: TimestampMessage) => void,
  ): ClientUnaryCall;
  wrappedNow(
    request: TimestampMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TimestampMessage) => void,
  ): ClientUnaryCall;
  wrappedNow(
    request: TimestampMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TimestampMessage) => void,
  ): ClientUnaryCall;
}

export const TestClient = makeGenericClientConstructor(TestService, "simple.Test") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): TestClient;
  service: typeof TestService;
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new tsProtoGlobalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof tsProtoGlobalThis.Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new tsProtoGlobalThis.Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
