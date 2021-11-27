/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import * as DataLoader from 'dataloader';
import * as hash from 'object-hash';

export const protobufPackage = '';

export interface NumPair {
  num1: number;
  num2: number;
}

export interface NumSingle {
  num: number;
}

export interface Numbers {
  num: number[];
}

const baseNumPair: object = { num1: 0, num2: 0 };

export const NumPair = {
  encode(message: NumPair, writer: Writer = Writer.create()): Writer {
    if (message.num1 !== 0) {
      writer.uint32(9).double(message.num1);
    }
    if (message.num2 !== 0) {
      writer.uint32(17).double(message.num2);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NumPair {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNumPair } as NumPair;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.num1 = reader.double();
          break;
        case 2:
          message.num2 = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NumPair {
    const message = { ...baseNumPair } as NumPair;
    message.num1 = object.num1 !== undefined && object.num1 !== null ? Number(object.num1) : 0;
    message.num2 = object.num2 !== undefined && object.num2 !== null ? Number(object.num2) : 0;
    return message;
  },

  toJSON(message: NumPair): unknown {
    const obj: any = {};
    message.num1 !== undefined && (obj.num1 = message.num1);
    message.num2 !== undefined && (obj.num2 = message.num2);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NumPair>, I>>(object: I): NumPair {
    const message = { ...baseNumPair } as NumPair;
    message.num1 = object.num1 ?? 0;
    message.num2 = object.num2 ?? 0;
    return message;
  },
};

const baseNumSingle: object = { num: 0 };

export const NumSingle = {
  encode(message: NumSingle, writer: Writer = Writer.create()): Writer {
    if (message.num !== 0) {
      writer.uint32(9).double(message.num);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NumSingle {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNumSingle } as NumSingle;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.num = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NumSingle {
    const message = { ...baseNumSingle } as NumSingle;
    message.num = object.num !== undefined && object.num !== null ? Number(object.num) : 0;
    return message;
  },

  toJSON(message: NumSingle): unknown {
    const obj: any = {};
    message.num !== undefined && (obj.num = message.num);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NumSingle>, I>>(object: I): NumSingle {
    const message = { ...baseNumSingle } as NumSingle;
    message.num = object.num ?? 0;
    return message;
  },
};

const baseNumbers: object = { num: 0 };

export const Numbers = {
  encode(message: Numbers, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork();
    for (const v of message.num) {
      writer.double(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNumbers } as Numbers;
    message.num = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.num.push(reader.double());
            }
          } else {
            message.num.push(reader.double());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Numbers {
    const message = { ...baseNumbers } as Numbers;
    message.num = (object.num ?? []).map((e: any) => Number(e));
    return message;
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    if (message.num) {
      obj.num = message.num.map((e) => e);
    } else {
      obj.num = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Numbers>, I>>(object: I): Numbers {
    const message = { ...baseNumbers } as Numbers;
    message.num = object.num?.map((e) => e) || [];
    return message;
  },
};

export interface MathService<Context extends DataLoaders> {
  add(ctx: Context, request: NumPair): Promise<NumSingle>;
  absoluteValue(ctx: Context, request: NumSingle): Promise<NumSingle>;
  batchDouble(ctx: Context, request: Numbers): Promise<Numbers>;
  getDouble(ctx: Context, nu: number): Promise<number>;
}

export class MathServiceClientImpl<Context extends DataLoaders> implements MathService<Context> {
  private readonly rpc: Rpc<Context>;
  constructor(rpc: Rpc<Context>) {
    this.rpc = rpc;
    this.add = this.add.bind(this);
    this.absoluteValue = this.absoluteValue.bind(this);
    this.batchDouble = this.batchDouble.bind(this);
  }
  add(ctx: Context, request: NumPair): Promise<NumSingle> {
    const data = NumPair.encode(request).finish();
    const promise = this.rpc.request(ctx, 'MathService', 'Add', data);
    return promise.then((data) => NumSingle.decode(new Reader(data)));
  }

  absoluteValue(ctx: Context, request: NumSingle): Promise<NumSingle> {
    const data = NumSingle.encode(request).finish();
    const promise = this.rpc.request(ctx, 'MathService', 'AbsoluteValue', data);
    return promise.then((data) => NumSingle.decode(new Reader(data)));
  }

  getDouble(ctx: Context, nu: number): Promise<number> {
    const dl = ctx.getDataLoader('MathService.BatchDouble', () => {
      return new DataLoader<number, number>(
        (num) => {
          const request = { num };
          return this.batchDouble(ctx, request).then((res) => res.num);
        },
        { cacheKeyFn: hash, ...ctx.rpcDataLoaderOptions }
      );
    });
    return dl.load(nu);
  }

  batchDouble(ctx: Context, request: Numbers): Promise<Numbers> {
    const data = Numbers.encode(request).finish();
    const promise = this.rpc.request(ctx, 'MathService', 'BatchDouble', data);
    return promise.then((data) => Numbers.decode(new Reader(data)));
  }
}

interface Rpc<Context> {
  request(ctx: Context, service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

export interface DataLoaderOptions {
  cache?: boolean;
}

export interface DataLoaders {
  rpcDataLoaderOptions?: DataLoaderOptions;
  getDataLoader<T>(identifier: string, constructorFn: () => T): T;
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
