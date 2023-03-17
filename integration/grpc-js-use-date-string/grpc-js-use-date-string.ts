/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "simple";

export interface TimestampMessage {
  timestamp: string | undefined;
}

function createBaseTimestampMessage(): TimestampMessage {
  return { timestamp: undefined };
}

export const TimestampMessage = {
  encode(message: TimestampMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimestampMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestampMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 10:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TimestampMessage {
    return { timestamp: isSet(object.timestamp) ? String(object.timestamp) : undefined };
  },

  toJSON(message: TimestampMessage): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    return obj;
  },

  create<I extends Exact<DeepPartial<TimestampMessage>, I>>(base?: I): TimestampMessage {
    return TimestampMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TimestampMessage>, I>>(object: I): TimestampMessage {
    const message = createBaseTimestampMessage();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

export type TestService = typeof TestService;
export const TestService = {
  simpleNow: {
    path: "/simple.Test/SimpleNow",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: string) => Buffer.from(Timestamp.encode(toTimestamp(value)).finish()),
    requestDeserialize: (value: Buffer) => fromTimestamp(Timestamp.decode(value)),
    responseSerialize: (value: string) => Buffer.from(Timestamp.encode(toTimestamp(value)).finish()),
    responseDeserialize: (value: Buffer) => fromTimestamp(Timestamp.decode(value)),
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
  simpleNow: handleUnaryCall<string, string>;
  wrappedNow: handleUnaryCall<TimestampMessage, TimestampMessage>;
}

export interface TestClient extends Client {
  simpleNow(request: string, callback: (error: ServiceError | null, response: string) => void): ClientUnaryCall;
  simpleNow(
    request: string,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: string) => void,
  ): ClientUnaryCall;
  simpleNow(
    request: string,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: string) => void,
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(dateStr: string): Timestamp {
  const date = new Date(dateStr);
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): string {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis).toISOString();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
