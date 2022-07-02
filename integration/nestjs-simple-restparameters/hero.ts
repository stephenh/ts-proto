/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.js';

export const protobufPackage = 'hero';

export interface User {
  id: number;
  name: string;
}

export const HERO_PACKAGE_NAME = 'hero';

export interface HeroServiceClient {
  findCurrentUser(request: Empty, ...rest: any): Observable<User>;
}

export interface HeroServiceController {
  findCurrentUser(request: Empty, ...rest: any): Promise<User> | Observable<User> | User;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findCurrentUser'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_SERVICE_NAME = 'HeroService';
