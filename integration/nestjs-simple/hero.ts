/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty";
import { Struct, Value } from "./google/protobuf/struct";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "hero";

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
  externalData: { [key: string]: any } | undefined;
}

export interface Villain {
  id: number;
  name: string;
}

export const HERO_PACKAGE_NAME = "hero";

const wrapStruct = (value: any, nested = false): any => {
  const valueType = typeof value;
  const primitiveValueTypes = { number: "numberValue", string: "stringValue", boolean: "boolValue" };
  if (Object.keys(primitiveValueTypes).includes(valueType)) {
    return Value.wrap(value);
  }
  if (Array.isArray(value)) {
    return { listValue: { values: value.map((item) => wrapStruct(item)) } };
  }
  if (valueType === "object") {
    const res = nested ? { structValue: { fields: {} as any } } : { fields: {} as any };
    Object.keys(value).forEach((field) => {
      if (nested) {
        res.structValue!.fields[field] = wrapStruct(value[field], true);
      } else {
        res.fields![field] = wrapStruct(value[field], true);
      }
    });
    return res;
  }
};
wrappers[".google.protobuf.Struct"] = {
  fromObject: wrapStruct,
  toObject(message: Struct) {
    return message ? Struct.unwrap(message) : message;
  },
} as any;

function createBaseHeroById(): HeroById {
  return { id: 0 };
}

export const HeroById = {};

function createBaseVillainById(): VillainById {
  return { id: 0 };
}

export const VillainById = {};

function createBaseHero(): Hero {
  return { id: 0, name: "", birthDate: undefined, externalData: undefined };
}

export const Hero = {};

function createBaseVillain(): Villain {
  return { id: 0, name: "" };
}

export const Villain = {};

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
    const grpcMethods: string[] = ["addOneHero", "findOneHero", "findOneVillain", "findManyVillainStreamOut"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HeroService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["findManyVillain", "findManyVillainStreamIn"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HeroService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_SERVICE_NAME = "HeroService";
