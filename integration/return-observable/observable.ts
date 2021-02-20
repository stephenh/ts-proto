/* eslint-disable */
import { Observable } from 'rxjs';
import { Writer, Reader } from 'protobufjs/minimal';

export const protobufPackage = '';

export interface ProduceRequest {
  ingredients: string;
}

export interface ProduceReply {
  result: string;
}

const baseProduceRequest: object = { ingredients: '' };

export const ProduceRequest = {
  encode(message: ProduceRequest, writer: Writer = Writer.create()): Writer {
    if (message.ingredients !== '') {
      writer.uint32(10).string(message.ingredients);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ProduceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseProduceRequest) as ProduceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ingredients = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProduceRequest {
    const message = globalThis.Object.create(baseProduceRequest) as ProduceRequest;
    if (object.ingredients !== undefined && object.ingredients !== null) {
      message.ingredients = String(object.ingredients);
    } else {
      message.ingredients = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<ProduceRequest>): ProduceRequest {
    const message = { ...baseProduceRequest } as ProduceRequest;
    if (object.ingredients !== undefined && object.ingredients !== null) {
      message.ingredients = object.ingredients;
    } else {
      message.ingredients = '';
    }
    return message;
  },

  toJSON(message: ProduceRequest): unknown {
    const obj: any = {};
    message.ingredients !== undefined && (obj.ingredients = message.ingredients);
    return obj;
  },
};

const baseProduceReply: object = { result: '' };

export const ProduceReply = {
  encode(message: ProduceReply, writer: Writer = Writer.create()): Writer {
    if (message.result !== '') {
      writer.uint32(10).string(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ProduceReply {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseProduceReply) as ProduceReply;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProduceReply {
    const message = globalThis.Object.create(baseProduceReply) as ProduceReply;
    if (object.result !== undefined && object.result !== null) {
      message.result = String(object.result);
    } else {
      message.result = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<ProduceReply>): ProduceReply {
    const message = { ...baseProduceReply } as ProduceReply;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = '';
    }
    return message;
  },

  toJSON(message: ProduceReply): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },
};

export interface Factory {
  Produce(request: ProduceRequest): Observable<ProduceReply>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

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
