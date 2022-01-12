/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = '';

export enum MyEnum {
  FOO = 0,
  BAR = 1,
  UNRECOGNIZED = -1,
}

export interface MyMessage {
  foo?: number | undefined;
  foo2?: number | undefined;
  bar?: string | undefined;
  quux: string;
}

export interface RequestType {}

export interface ResponseType {}

const baseMyMessage: object = { quux: '' };

export const MyMessage = {
  encode(message: MyMessage, writer: Writer = Writer.create()): Writer {
    if (message.foo !== undefined) {
      writer.uint32(8).int32(message.foo);
    }
    if (message.foo2 !== undefined) {
      writer.uint32(16).int32(message.foo2);
    }
    if (message.bar !== undefined) {
      writer.uint32(26).string(message.bar);
    }
    if (message.quux !== '') {
      writer.uint32(34).string(message.quux);
    }
    if ('_unknownFields' in message) {
      for (const key of Object.keys(message['_unknownFields'])) {
        const values = message['_unknownFields'][key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MyMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMyMessage } as MyMessage;
    (message as any)._unknownFields = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.foo = reader.int32();
          break;
        case 2:
          message.foo2 = reader.int32();
          break;
        case 3:
          message.bar = reader.string();
          break;
        case 4:
          message.quux = reader.string();
          break;
        default:
          const startPos = reader.pos;
          reader.skipType(tag & 7);
          (message as any)._unknownFields[tag] = [
            ...((message as any)._unknownFields[tag] || []),
            reader.buf.slice(startPos, reader.pos),
          ];
          break;
      }
    }
    return message;
  },
};

const baseRequestType: object = {};

export const RequestType = {
  encode(message: RequestType, writer: Writer = Writer.create()): Writer {
    if ('_unknownFields' in message) {
      for (const key of Object.keys(message['_unknownFields'])) {
        const values = message['_unknownFields'][key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RequestType {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestType } as RequestType;
    (message as any)._unknownFields = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          const startPos = reader.pos;
          reader.skipType(tag & 7);
          (message as any)._unknownFields[tag] = [
            ...((message as any)._unknownFields[tag] || []),
            reader.buf.slice(startPos, reader.pos),
          ];
          break;
      }
    }
    return message;
  },
};

const baseResponseType: object = {};

export const ResponseType = {
  encode(message: ResponseType, writer: Writer = Writer.create()): Writer {
    if ('_unknownFields' in message) {
      for (const key of Object.keys(message['_unknownFields'])) {
        const values = message['_unknownFields'][key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ResponseType {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseType } as ResponseType;
    (message as any)._unknownFields = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          const startPos = reader.pos;
          reader.skipType(tag & 7);
          (message as any)._unknownFields[tag] = [
            ...((message as any)._unknownFields[tag] || []),
            reader.buf.slice(startPos, reader.pos),
          ];
          break;
      }
    }
    return message;
  },
};

export interface MyService {
  MyMethod(request: RequestType): Promise<ResponseType>;
}

export class MyServiceClientImpl implements MyService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MyMethod = this.MyMethod.bind(this);
  }
  MyMethod(request: RequestType): Promise<ResponseType> {
    const data = RequestType.encode(request).finish();
    const promise = this.rpc.request('MyService', 'MyMethod', data);
    return promise.then((data) => ResponseType.decode(new Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
