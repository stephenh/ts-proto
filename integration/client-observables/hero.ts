import { Observable } from 'rxjs';
import { Reader, Writer } from 'protobufjs/minimal';
import { map } from 'rxjs/operators';


export interface HeroRequest {
}

export interface Hero {
  random: number;
}

const baseHeroRequest: object = {
};

const baseHero: object = {
  random: 0,
};

export interface HeroService {

  RegularMethod(request: HeroRequest): Promise<Hero>;

  ClientStreamingMethod(request: Observable<HeroRequest>): Promise<Hero>;

  ServerStreamingMethod(request: HeroRequest): Observable<Hero>;

  TwoWayStreamingMethod(request: Observable<HeroRequest>): Observable<Hero>;

}

export class HeroServiceClientImpl implements HeroService {

  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  RegularMethod(request: HeroRequest): Promise<Hero> {
    const data = HeroRequest.encode(request).finish();
    const response = this.rpc.request("hero.HeroService", "RegularMethod", data);
    if (!(response instanceof Promise)) throw new Error(`Stream response expected to be Promise. ${response.constructor.name} encountered.`);
    return response.then(data => Hero.decode(new Reader(data)));
  }

  ClientStreamingMethod(request: Observable<HeroRequest>): Promise<Hero> {
    const data = request.pipe(map(value => HeroRequest.encode(value).finish()));
    const response = this.rpc.request("hero.HeroService", "ClientStreamingMethod", data);
    if (!(response instanceof Promise)) throw new Error(`Stream response expected to be Promise. ${response.constructor.name} encountered.`);
    return response.then(data => Hero.decode(new Reader(data)));
  }

  ServerStreamingMethod(request: HeroRequest): Observable<Hero> {
    const data = HeroRequest.encode(request).finish();
    const response = this.rpc.request("hero.HeroService", "ServerStreamingMethod", data, true);
    if (!(response instanceof Observable)) throw new Error(`Stream response expected to be Observable. ${response.constructor.name} encountered.`);
    return response.pipe(map(data => Hero.decode(new Reader(data))));
  }

  TwoWayStreamingMethod(request: Observable<HeroRequest>): Observable<Hero> {
    const data = request.pipe(map(value => HeroRequest.encode(value).finish()));
    const response = this.rpc.request("hero.HeroService", "TwoWayStreamingMethod", data, true);
    if (!(response instanceof Observable)) throw new Error(`Stream response expected to be Observable. ${response.constructor.name} encountered.`);
    return response.pipe(map(data => Hero.decode(new Reader(data))));
  }

}

interface Rpc {

  request(service: string, method: string, data: Uint8Array|Observable<Uint8Array>, expectObservable?: boolean): Promise<Uint8Array>|Observable<Uint8Array>;

}

export const HeroRequest = {
  encode(_: HeroRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): HeroRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseHeroRequest) as HeroRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): HeroRequest {
    const message = Object.create(baseHeroRequest) as HeroRequest;
    return message;
  },
  fromPartial(_: DeepPartial<HeroRequest>): HeroRequest {
    const message = Object.create(baseHeroRequest) as HeroRequest;
    return message;
  },
  toJSON(_: HeroRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

export const Hero = {
  encode(message: Hero, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.random);
    return writer;
  },
  decode(reader: Reader, length?: number): Hero {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseHero) as Hero;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.random = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Hero {
    const message = Object.create(baseHero) as Hero;
    if (object.random !== undefined && object.random !== null) {
      message.random = Number(object.random);
    } else {
      message.random = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Hero>): Hero {
    const message = Object.create(baseHero) as Hero;
    if (object.random !== undefined && object.random !== null) {
      message.random = object.random;
    } else {
      message.random = 0;
    }
    return message;
  },
  toJSON(message: Hero): unknown {
    const obj: any = {};
    obj.random = message.random || 0;
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;