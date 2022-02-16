/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const protobufPackage = 'simple';

export interface TestMessage {
  value: string;
}

function createBaseTestMessage(): TestMessage {
  return { value: '' };
}

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
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: TestMessage): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TestMessage>, I>>(object: I): TestMessage {
    const message = createBaseTestMessage();
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

/** @deprecated */
export interface Test {
  Unary(request: TestMessage): Promise<TestMessage>;
  ServerStreaming(request: TestMessage): Observable<TestMessage>;
  ClientStreaming(request: Observable<TestMessage>): Promise<TestMessage>;
  BidiStreaming(request: Observable<TestMessage>): Observable<TestMessage>;
  /** @deprecated */
  Deprecated(request: TestMessage): Promise<TestMessage>;
  Idempotent(request: TestMessage): Promise<TestMessage>;
  NoSideEffects(request: TestMessage): Promise<TestMessage>;
}

export class TestClientImpl implements Test {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Unary = this.Unary.bind(this);
    this.ServerStreaming = this.ServerStreaming.bind(this);
    this.ClientStreaming = this.ClientStreaming.bind(this);
    this.BidiStreaming = this.BidiStreaming.bind(this);
    this.Deprecated = this.Deprecated.bind(this);
    this.Idempotent = this.Idempotent.bind(this);
    this.NoSideEffects = this.NoSideEffects.bind(this);
  }
  Unary(request: TestMessage): Promise<TestMessage> {
    const data = TestMessage.encode(request).finish();
    const promise = this.rpc.request('simple.Test', 'Unary', data);
    return promise.then((data) => TestMessage.decode(new Reader(data)));
  }

  ServerStreaming(request: TestMessage): Observable<TestMessage> {
    const data = TestMessage.encode(request).finish();
    const result = this.rpc.serverStreamingRequest('simple.Test', 'ServerStreaming', data);
    return result.pipe(map((data) => TestMessage.decode(new Reader(data))));
  }

  ClientStreaming(request: Observable<TestMessage>): Promise<TestMessage> {
    const data = request.pipe(map((request) => TestMessage.encode(request).finish()));
    const promise = this.rpc.clientStreamingRequest('simple.Test', 'ClientStreaming', data);
    return promise.then((data) => TestMessage.decode(new Reader(data)));
  }

  BidiStreaming(request: Observable<TestMessage>): Observable<TestMessage> {
    const data = request.pipe(map((request) => TestMessage.encode(request).finish()));
    const result = this.rpc.bidirectionalStreamingRequest('simple.Test', 'BidiStreaming', data);
    return result.pipe(map((data) => TestMessage.decode(new Reader(data))));
  }

  Deprecated(request: TestMessage): Promise<TestMessage> {
    const data = TestMessage.encode(request).finish();
    const promise = this.rpc.request('simple.Test', 'Deprecated', data);
    return promise.then((data) => TestMessage.decode(new Reader(data)));
  }

  Idempotent(request: TestMessage): Promise<TestMessage> {
    const data = TestMessage.encode(request).finish();
    const promise = this.rpc.request('simple.Test', 'Idempotent', data);
    return promise.then((data) => TestMessage.decode(new Reader(data)));
  }

  NoSideEffects(request: TestMessage): Promise<TestMessage> {
    const data = TestMessage.encode(request).finish();
    const promise = this.rpc.request('simple.Test', 'NoSideEffects', data);
    return promise.then((data) => TestMessage.decode(new Reader(data)));
  }
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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
