/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'simple';

export interface TestMessage {
  value: string;
}

function createBaseTestMessage(): TestMessage {
  return { value: '' };
}

export const TestMessage = {
  encode(message: TestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== '') {
      writer.uint32(10).string(message.value);
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
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<TestMessage, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<TestMessage | TestMessage[]> | Iterable<TestMessage | TestMessage[]>
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [TestMessage.encode(p).finish()];
        }
      } else {
        yield* [TestMessage.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, TestMessage>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>
  ): AsyncIterable<TestMessage> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [TestMessage.decode(p)];
        }
      } else {
        yield* [TestMessage.decode(pkt)];
      }
    }
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

export interface Test {
  BidiStreaming(request: AsyncIterable<TestMessage>): AsyncIterable<TestMessage>;
}

export class TestClientImpl implements Test {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.BidiStreaming = this.BidiStreaming.bind(this);
  }
  BidiStreaming(request: AsyncIterable<TestMessage>): AsyncIterable<TestMessage> {
    const data = TestMessage.encodeTransform(request);
    const result = this.rpc.bidirectionalStreamingRequest('simple.Test', 'BidiStreaming', data);
    return TestMessage.decodeTransform(result);
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: AsyncIterable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): AsyncIterable<Uint8Array>;
  bidirectionalStreamingRequest(
    service: string,
    method: string,
    data: AsyncIterable<Uint8Array>
  ): AsyncIterable<Uint8Array>;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
