import "reflect-metadata";
import { INestMicroservice } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { readFileSync } from "fs";
import { join } from "path";
import { Subject } from "rxjs";
import { DeepPartial, HERO_PACKAGE_NAME, HERO_SERVICE_NAME, HeroServiceClient, Villain, VillainById } from "./hero";
import { createApp } from "./nestjs-project/main";

describe("nestjs-partial-methods-test", () => {
  it("accepts partial requests in the client and partial responses in the controller", () => {
    const source = readFileSync(join(__dirname, "hero.ts"), "utf8");
    expect(source).toContain("findOneHero(request: DeepPartial<HeroById>): Observable<Hero>;");
    expect(source).toContain("findManyVillain(request: Observable<DeepPartial<VillainById>>): Observable<Villain>;");
    expect(source).toContain(
      "findOneHero(request: HeroById): Promise<DeepPartial<Hero>> | Observable<DeepPartial<Hero>> | DeepPartial<Hero>;",
    );
    expect(source).toContain("findManyVillain(request: Observable<VillainById>): Observable<DeepPartial<Villain>>;");
  });
});

describe("nestjs-partial-methods-test nestjs", () => {
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

  it("should findOneHero with a partial request", async () => {
    const hero = await heroService.findOneHero({ id: 1 }).toPromise();
    expect(hero).toEqual({ id: 1, name: "Stephenh", weapon: { name: "Keyboard", damage: 10 } });
  });

  it("should fill in the defaults of a partial response", async () => {
    const hero = await heroService.findOneHero({ id: 2 }).toPromise();
    expect(hero).toEqual({ id: 2, name: "", weapon: { name: "Mouse", damage: 0 } });
  });

  it("should findManyVillain with partial requests and responses", (done) => {
    const villainIdSubject = new Subject<DeepPartial<VillainById>>();
    const villains: Villain[] = [];

    heroService.findManyVillain(villainIdSubject.asObservable()).subscribe({
      next: (villain) => {
        villains.push(villain);
      },
      complete: () => {
        expect(villains).toEqual([
          { id: 1, name: "John", weapon: null },
          { id: 2, name: "Doe", weapon: { name: "", damage: 5 } },
        ]);
        done();
      },
    });

    villainIdSubject.next({ id: 1 });
    villainIdSubject.next({ id: 2 });
    villainIdSubject.complete();
  });
});
