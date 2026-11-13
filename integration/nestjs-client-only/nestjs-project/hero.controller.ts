import { Controller } from "@nestjs/common";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable, Subject } from "rxjs";
import { HERO_SERVICE_NAME, Hero, HeroById, Villain, VillainById } from "../hero";

// With nestJs=client there is no generated controller interface or decorator, so the
// server side of this test registers its handlers by hand.
@Controller("hero")
export class HeroController {
  private readonly heroes: Hero[] = [
    { id: 1, name: "Stephenh" },
    { id: 2, name: "Iangregsondev" },
  ];

  private readonly villains: Villain[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
  ];

  @GrpcMethod(HERO_SERVICE_NAME, "findOneHero")
  async findOneHero(data: HeroById): Promise<Hero> {
    return this.heroes.find(({ id }) => id === data.id)!;
  }

  @GrpcMethod(HERO_SERVICE_NAME, "findOneVillain")
  async findOneVillain(data: VillainById): Promise<Villain> {
    return this.villains.find(({ id }) => id === data.id)!;
  }

  @GrpcStreamMethod(HERO_SERVICE_NAME, "findManyVillain")
  findManyVillain(request: Observable<VillainById>): Observable<Villain> {
    const villain$ = new Subject<Villain>();

    const onNext = (villainById: VillainById) => {
      const item = this.villains.find(({ id }) => id === villainById.id);
      villain$.next(item!);
    };
    const onComplete = () => villain$.complete();
    request.subscribe(onNext, null, onComplete);

    return villain$.asObservable();
  }
}
