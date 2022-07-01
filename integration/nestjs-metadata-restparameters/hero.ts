/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

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
  findOneHero(request: HeroById, metadata: Metadata, ...rest: any): Observable<Hero>;

  findOneVillain(request: VillainById, metadata: Metadata, ...rest: any): Observable<Villain>;

  findManyVillain(request: Observable<VillainById>, metadata: Metadata, ...rest: any): Observable<Villain>;
}

export interface HeroServiceController {
  findOneHero(request: HeroById, metadata: Metadata, ...rest: any): Promise<Hero> | Observable<Hero> | Hero;

  findOneVillain(
    request: VillainById,
    metadata: Metadata,
    ...rest: any
  ): Promise<Villain> | Observable<Villain> | Villain;

  findManyVillain(request: Observable<VillainById>, metadata: Metadata, ...rest: any): Observable<Villain>;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findOneHero', 'findOneVillain'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['findManyVillain'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_SERVICE_NAME = 'HeroService';
