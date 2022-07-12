/* eslint-disable */
import { Foo } from './some-file';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'hero';

export interface HeroById {
  id: number;
}

export interface VillainById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export interface Villain {
  id: number;
  name: string;
}

function createBaseHeroById(): HeroById {
  return { id: 0 };
}

export const HeroById = {
  encode(message: HeroById, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeroById {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeroById();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HeroById {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: HeroById): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HeroById>, I>>(object: I): HeroById {
    const message = createBaseHeroById();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseVillainById(): VillainById {
  return { id: 0 };
}

export const VillainById = {
  encode(message: VillainById, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VillainById {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVillainById();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VillainById {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: VillainById): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VillainById>, I>>(object: I): VillainById {
    const message = createBaseVillainById();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseHero(): Hero {
  return { id: 0, name: '' };
}

export const Hero = {
  encode(message: Hero, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Hero {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHero();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Hero {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : '',
    };
  },

  toJSON(message: Hero): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Hero>, I>>(object: I): Hero {
    const message = createBaseHero();
    message.id = object.id ?? 0;
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseVillain(): Villain {
  return { id: 0, name: '' };
}

export const Villain = {
  encode(message: Villain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Villain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVillain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Villain {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : '',
    };
  },

  toJSON(message: Villain): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Villain>, I>>(object: I): Villain {
    const message = createBaseVillain();
    message.id = object.id ?? 0;
    message.name = object.name ?? '';
    return message;
  },
};

export interface HeroService {
  FindOneHero(request: HeroById, metadata?: Foo): Promise<Hero>;
  FindOneVillain(request: VillainById, metadata?: Foo): Promise<Villain>;
  FindManyVillain(request: Observable<VillainById>, metadata?: Foo): Observable<Villain>;
}

export class HeroServiceClientImpl implements HeroService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.FindOneHero = this.FindOneHero.bind(this);
    this.FindOneVillain = this.FindOneVillain.bind(this);
    this.FindManyVillain = this.FindManyVillain.bind(this);
  }
  FindOneHero(request: HeroById): Promise<Hero> {
    const data = HeroById.encode(request).finish();
    const promise = this.rpc.request('hero.HeroService', 'FindOneHero', data);
    return promise.then((data) => Hero.decode(new _m0.Reader(data)));
  }

  FindOneVillain(request: VillainById): Promise<Villain> {
    const data = VillainById.encode(request).finish();
    const promise = this.rpc.request('hero.HeroService', 'FindOneVillain', data);
    return promise.then((data) => Villain.decode(new _m0.Reader(data)));
  }

  FindManyVillain(request: Observable<VillainById>): Observable<Villain> {
    const data = request.pipe(map((request) => VillainById.encode(request).finish()));
    const result = this.rpc.bidirectionalStreamingRequest('hero.HeroService', 'FindManyVillain', data);
    return result.pipe(map((data) => Villain.decode(new _m0.Reader(data))));
  }
}

export type HeroServiceDefinition = typeof HeroServiceDefinition;
export const HeroServiceDefinition = {
  name: 'HeroService',
  fullName: 'hero.HeroService',
  methods: {
    findOneHero: {
      name: 'FindOneHero',
      requestType: HeroById,
      requestStream: false,
      responseType: Hero,
      responseStream: false,
      options: {},
    },
    findOneVillain: {
      name: 'FindOneVillain',
      requestType: VillainById,
      requestStream: false,
      responseType: Villain,
      responseStream: false,
      options: {},
    },
    findManyVillain: {
      name: 'FindManyVillain',
      requestType: VillainById,
      requestStream: true,
      responseType: Villain,
      responseStream: true,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
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
