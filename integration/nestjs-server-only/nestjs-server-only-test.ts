import "reflect-metadata";
import { INestMicroservice } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { readFileSync } from "fs";
import { join } from "path";
import { Observable, Subject } from "rxjs";
import { HERO_PACKAGE_NAME, HERO_SERVICE_NAME, Hero, HeroById, Villain, VillainById } from "./hero";
import { createApp } from "./nestjs-project/main";

// With nestJs=server there is no generated client interface, so the test declares the one it calls the server with.
interface HeroServiceClient {
  findOneHero(request: HeroById): Observable<Hero>;
  findOneVillain(request: VillainById): Observable<Villain>;
  findManyVillain(request: Observable<VillainById>): Observable<Villain>;
}

describe("nestjs-server-only-test", () => {
  it("only generates the controller interface and decorator", () => {
    const source = readFileSync(join(__dirname, "hero.ts"), "utf8");
    expect(source).toContain("export interface HeroServiceController {");
    expect(source).toContain("export function HeroServiceControllerMethods() {");
    expect(source).toContain(`export const HERO_SERVICE_NAME = "HeroService";`);
    expect(source).not.toContain("HeroServiceClient");
  });
});

describe("nestjs-server-only-test nestjs", () => {
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
