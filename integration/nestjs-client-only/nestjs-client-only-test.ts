import "reflect-metadata";
import { INestMicroservice } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { readFileSync } from "fs";
import { join } from "path";
import { Subject } from "rxjs";
import { HERO_PACKAGE_NAME, HERO_SERVICE_NAME, HeroServiceClient, Villain, VillainById } from "./hero";
import { createApp } from "./nestjs-project/main";

describe("nestjs-client-only-test", () => {
  it("only generates the client interface", () => {
    const source = readFileSync(join(__dirname, "hero.ts"), "utf8");
    expect(source).toContain("export interface HeroServiceClient {");
    expect(source).toContain(`export const HERO_SERVICE_NAME = "HeroService";`);
    expect(source).not.toContain("HeroServiceController");
    expect(source).not.toContain("@nestjs/microservices");
  });
});

describe("nestjs-client-only-test nestjs", () => {
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
