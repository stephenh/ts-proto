import { Controller } from "@nestjs/common";
import { Observable, Subject } from "rxjs";
import {
  DeepPartial,
  Hero,
  HeroById,
  HeroServiceController,
  HeroServiceControllerMethods,
  Villain,
  VillainById,
} from "../hero";

@Controller("hero")
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
  // With outputPartialMethods=true the controller can return partial responses, and
  // the fields that are left out are sent as their default values
  private readonly heroes: DeepPartial<Hero>[] = [
    { id: 1, name: "Stephenh", weapon: { name: "Keyboard", damage: 10 } },
    { id: 2, weapon: { name: "Mouse" } },
  ];

  private readonly villains: DeepPartial<Villain>[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe", weapon: { damage: 5 } },
  ];

  async findOneHero(data: HeroById): Promise<DeepPartial<Hero>> {
    return this.heroes.find(({ id }) => id === data.id)!;
  }

  findManyVillain(request: Observable<VillainById>): Observable<DeepPartial<Villain>> {
    const villain$ = new Subject<DeepPartial<Villain>>();

    const onNext = (villainById: VillainById) => {
      const item = this.villains.find(({ id }) => id === villainById.id);
      villain$.next(item!);
    };
    const onComplete = () => villain$.complete();
    request.subscribe(onNext, null, onComplete);

    return villain$.asObservable();
  }
}
