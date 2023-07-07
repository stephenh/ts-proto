import { Controller } from "@nestjs/common";
import { Observable, Subject } from "rxjs";
import { Hero, HeroById, HeroServiceController, HeroServiceControllerMethods, Villain, VillainById } from "../hero";

@Controller("hero")
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
  private readonly heroes: Hero[] = [
    {
      id: 1,
      name: "Stephenh",
      birthDate: { seconds: 1, nanos: 2 },
      externalData: { foo: "bar", fizz: 1, nested: { isFailing: false, arr: [1, "foo", ["bar"]] } },
      isFamous: true,
      experience: 1000,
      nickName: 'Hackerman'
    },
    {
      id: 2,
      name: "Iangregsondev",
      birthDate: { seconds: 1, nanos: 3 },
      externalData: { bar: 10, baz: "foo", isPassing: true },
      isFamous: true,
      experience: 1000,
      nickName: 'Foo'
    },
    {
      id: 3,
      name: "Bob",
      birthDate: undefined,
      externalData: undefined,
    },
  ];

  private readonly villains: Villain[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
  ];

  addOneHero(request: Hero) {
    this.heroes.push(request);
  }

  async findOneHero(data: HeroById): Promise<Hero> {
    return this.heroes.find(({ id }) => id === data.id)!;
  }

  async findOneVillain(data: VillainById): Promise<Villain> {
    return this.villains.find(({ id }) => id === data.id)!;
  }

  findManyVillain(request: Observable<VillainById>): Observable<Villain> {
    const hero$ = new Subject<Villain>();

    const onNext = (villainById: VillainById) => {
      const item = this.villains.find(({ id }) => id === villainById.id);
      hero$.next(item!);
    };
    const onComplete = () => hero$.complete();
    request.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  }

  findManyVillainStreamIn(request: Observable<VillainById>): Observable<Villain> {
    return null!;
  }

  findManyVillainStreamOut(request: VillainById): Observable<Villain> {
    return null!;
  }
}
