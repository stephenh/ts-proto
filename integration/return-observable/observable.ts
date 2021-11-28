/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

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
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProduceRequest } as ProduceRequest;
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
    const message = { ...baseProduceRequest } as ProduceRequest;
    message.ingredients =
      object.ingredients !== undefined && object.ingredients !== null ? String(object.ingredients) : '';
    return message;
  },

  toJSON(message: ProduceRequest): unknown {
    const obj: any = {};
    message.ingredients !== undefined && (obj.ingredients = message.ingredients);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProduceRequest>, I>>(object: I): ProduceRequest {
    const message = { ...baseProduceRequest } as ProduceRequest;
    message.ingredients = object.ingredients ?? '';
    return message;
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
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProduceReply } as ProduceReply;
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
    const message = { ...baseProduceReply } as ProduceReply;
    message.result = object.result !== undefined && object.result !== null ? String(object.result) : '';
    return message;
  },

  toJSON(message: ProduceReply): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProduceReply>, I>>(object: I): ProduceReply {
    const message = { ...baseProduceReply } as ProduceReply;
    message.result = object.result ?? '';
    return message;
  },
};

export interface Factory {
  Produce(request: ProduceRequest): Observable<ProduceReply>;
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
