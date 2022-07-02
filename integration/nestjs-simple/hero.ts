/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Timestamp } from './google/protobuf/timestamp.js';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.js';

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
  birthDate: Timestamp | undefined;
}

export interface Villain {
  id: number;
  name: string;
}

export const HERO_PACKAGE_NAME = 'hero';

export interface HeroServiceClient {
  addOneHero(request: Hero): Observable<Empty>;

  findOneHero(request: HeroById): Observable<Hero>;

  findOneVillain(request: VillainById): Observable<Villain>;

  findManyVillain(request: Observable<VillainById>): Observable<Villain>;

  findManyVillainStreamIn(request: Observable<VillainById>): Observable<Villain>;

  findManyVillainStreamOut(request: VillainById): Observable<Villain>;
}

export interface HeroServiceController {
  addOneHero(request: Hero): void;

  findOneHero(request: HeroById): Promise<Hero> | Observable<Hero> | Hero;

  findOneVillain(request: VillainById): Promise<Villain> | Observable<Villain> | Villain;

  findManyVillain(request: Observable<VillainById>): Observable<Villain>;

  findManyVillainStreamIn(request: Observable<VillainById>): Promise<Villain> | Observable<Villain> | Villain;

  findManyVillainStreamOut(request: VillainById): Observable<Villain>;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['addOneHero', 'findOneHero', 'findOneVillain', 'findManyVillainStreamOut'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['findManyVillain', 'findManyVillainStreamIn'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_SERVICE_NAME = 'HeroService';
