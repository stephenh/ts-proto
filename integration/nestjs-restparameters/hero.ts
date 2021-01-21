import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

/* eslint-disable */

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

export const HERO_PACKAGE_NAME = 'hero';

export interface HeroServiceClient {
  findOneHero(request: HeroById, ...rest: any): Observable<Hero>;

  findOneVillain(request: VillainById, ...rest: any): Observable<Villain>;

  findManyVillain(request: Observable<VillainById>, ...rest: any): Observable<Villain>;
}

export interface HeroServiceController {
  findOneHero(request: HeroById, ...rest: any): Promise<Hero> | Observable<Hero> | Hero;

  findOneVillain(request: VillainById, ...rest: any): Promise<Villain> | Observable<Villain> | Villain;

  findManyVillain(request: Observable<VillainById>, ...rest: any): Observable<Villain>;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods = ['findOneHero', 'findOneVillain'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods = ['findManyVillain'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_SERVICE_NAME = 'HeroService';
