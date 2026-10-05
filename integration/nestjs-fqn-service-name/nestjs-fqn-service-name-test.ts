import "reflect-metadata";
import { INestMicroservice } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { PATTERN_METADATA } from "@nestjs/microservices/constants";
import { Subject } from "rxjs";
import { HERO_PACKAGE_NAME, HERO_SERVICE_NAME, HeroServiceClient, Villain, VillainById, protobufPackage } from "./hero";
import { HeroController } from "./nestjs-project/hero.controller";
import { createApp } from "./nestjs-project/main";
import { SampleService } from "./sample-service";

describe("nestjs-fqn-service-name-test", () => {
  it("compiles", () => {
    const service = new SampleService();
    expect(service).not.toBeUndefined();
  });

  it("keeps the package-relative service name const", () => {
    expect(HERO_SERVICE_NAME).toEqual("HeroService");
  });

  it("registers unary handlers with the fully qualified service name", () => {
    const fqn = `${protobufPackage}.${HERO_SERVICE_NAME}`;
    expect(Reflect.getMetadata(PATTERN_METADATA, HeroController.prototype.findOneHero)).toEqual([
      { service: fqn, rpc: "findOneHero", streaming: "no_stream" },
    ]);
    expect(Reflect.getMetadata(PATTERN_METADATA, HeroController.prototype.findOneVillain)).toEqual([
      { service: fqn, rpc: "findOneVillain", streaming: "no_stream" },
    ]);
  });

  it("registers streaming handlers with the fully qualified service name", () => {
    const fqn = `${protobufPackage}.${HERO_SERVICE_NAME}`;
    expect(Reflect.getMetadata(PATTERN_METADATA, HeroController.prototype.findManyVillain)).toEqual([
      { service: fqn, rpc: "findManyVillain", streaming: "rx_stream" },
    ]);
  });
});

describe("nestjs-fqn-service-name-test nestjs", () => {
  let app: INestMicroservice;
  let client: ClientGrpc;
  let heroService: HeroServiceClient;

  beforeAll(async () => {
    app = await createApp();
    client = app.get(HERO_PACKAGE_NAME);
    heroService = client.getService<HeroServiceClient>(HERO_SERVICE_NAME);
    await app.listen();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should findOneHero", async () => {
    const hero = await heroService.findOneHero({ id: 1 }).toPromise();
    expect(hero).toEqual({ id: 1, name: "Stephenh" });
  });

  it("should findOneVillain", async () => {
    const villain = await heroService.findOneVillain({ id: 2 }).toPromise();
    expect(villain).toEqual({ id: 2, name: "Doe" });
  });

  it("should findManyVillain", (done) => {
    const villainIdSubject = new Subject<VillainById>();
    const villains: Villain[] = [];

    heroService.findManyVillain(villainIdSubject.asObservable()).subscribe({
      next: (villain) => {
        villains.push(villain);
      },
      complete: () => {
        expect(villains).toEqual([
          { id: 1, name: "John" },
          { id: 2, name: "Doe" },
        ]);
        done();
      },
    });

    villainIdSubject.next({ id: 1 });
    villainIdSubject.next({ id: 2 });
    villainIdSubject.complete();
  });
});
