/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "user";

export interface ProfileInfo {
  id: number;
  bio: string;
  phone: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  /**
   * ProfileInfo will be optional in typescript, the type will be ProfileInfo | null | undefined
   * this is needed in cases where you don't wanna provide any value for the profile.
   */
  profile?:
    | ProfileInfo
    | null
    | undefined;
  /** Department only accepts a Department type or null, so this means you have to pass it null if there is no value available. */
  department: Department | null;
}

export interface UserById {
  id: number;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  addOneUser(request: User): Observable<Empty>;

  findOneUser(request: UserById): Observable<User>;

  findManyUser(request: Observable<UserById>): Observable<User>;
}

export interface UserServiceController {
  addOneUser(request: User): void;

  findOneUser(request: UserById): Promise<User> | Observable<User> | User;

  findManyUser(request: Observable<UserById>): Observable<User>;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["addOneUser", "findOneUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["findManyUser"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
