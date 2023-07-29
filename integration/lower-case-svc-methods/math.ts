/* eslint-disable */
import * as DataLoader from "dataloader";
import * as hash from "object-hash";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

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

function createBaseNumPair(): NumPair {
  return { num1: 0, num2: 0 };
}

export const NumPair = {
  encode(message: NumPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.num1 !== 0) {
      writer.uint32(9).double(message.num1);
    }
    if (message.num2 !== 0) {
      writer.uint32(17).double(message.num2);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumPair {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.num1 = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.num2 = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NumPair {
    return { num1: isSet(object.num1) ? Number(object.num1) : 0, num2: isSet(object.num2) ? Number(object.num2) : 0 };
  },

  toJSON(message: NumPair): unknown {
    const obj: any = {};
    if (message.num1 !== 0) {
      obj.num1 = message.num1;
    }
    if (message.num2 !== 0) {
      obj.num2 = message.num2;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumPair>, I>>(base?: I): NumPair {
    return NumPair.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NumPair>, I>>(object: I): NumPair {
    const message = createBaseNumPair();
    message.num1 = object.num1 ?? 0;
    message.num2 = object.num2 ?? 0;
    return message;
  },
};

function createBaseNumSingle(): NumSingle {
  return { num: 0 };
}

export const NumSingle = {
  encode(message: NumSingle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.num !== 0) {
      writer.uint32(9).double(message.num);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumSingle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumSingle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.num = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NumSingle {
    return { num: isSet(object.num) ? Number(object.num) : 0 };
  },

  toJSON(message: NumSingle): unknown {
    const obj: any = {};
    if (message.num !== 0) {
      obj.num = message.num;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumSingle>, I>>(base?: I): NumSingle {
    return NumSingle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NumSingle>, I>>(object: I): NumSingle {
    const message = createBaseNumSingle();
    message.num = object.num ?? 0;
    return message;
  },
};

function createBaseNumbers(): Numbers {
  return { num: [] };
}

export const Numbers = {
  encode(message: Numbers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.num) {
      writer.double(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumbers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 9) {
            message.num.push(reader.double());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.num.push(reader.double());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Numbers {
    return { num: Array.isArray(object?.num) ? object.num.map((e: any) => Number(e)) : [] };
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    if (message.num?.length) {
      obj.num = message.num;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Numbers>, I>>(base?: I): Numbers {
    return Numbers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Numbers>, I>>(object: I): Numbers {
    const message = createBaseNumbers();
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

export const MathServiceServiceName = "MathService";
export class MathServiceClientImpl<Context extends DataLoaders> implements MathService<Context> {
  private readonly rpc: Rpc<Context>;
  private readonly service: string;
  constructor(rpc: Rpc<Context>, opts?: { service?: string }) {
    this.service = opts?.service || MathServiceServiceName;
    this.rpc = rpc;
    this.add = this.add.bind(this);
    this.absoluteValue = this.absoluteValue.bind(this);
    this.batchDouble = this.batchDouble.bind(this);
  }
  add(ctx: Context, request: NumPair): Promise<NumSingle> {
    const data = NumPair.encode(request).finish();
    const promise = this.rpc.request(ctx, this.service, "Add", data);
    return promise.then((data) => NumSingle.decode(_m0.Reader.create(data)));
  }

  absoluteValue(ctx: Context, request: NumSingle): Promise<NumSingle> {
    const data = NumSingle.encode(request).finish();
    const promise = this.rpc.request(ctx, this.service, "AbsoluteValue", data);
    return promise.then((data) => NumSingle.decode(_m0.Reader.create(data)));
  }

  getDouble(ctx: Context, nu: number): Promise<number> {
    const dl = ctx.getDataLoader("MathService.BatchDouble", () => {
      return new DataLoader<number, number, string>((num) => {
        const request = { num };
        return this.batchDouble(ctx, request as any).then((res) => res.num);
      }, { cacheKeyFn: hash, ...ctx.rpcDataLoaderOptions });
    });
    return dl.load(nu);
  }

  batchDouble(ctx: Context, request: Numbers): Promise<Numbers> {
    const data = Numbers.encode(request).finish();
    const promise = this.rpc.request(ctx, this.service, "BatchDouble", data);
    return promise.then((data) => Numbers.decode(_m0.Reader.create(data)));
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

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
