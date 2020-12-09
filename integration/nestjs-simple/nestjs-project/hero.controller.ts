import { Controller } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Hero, HeroById, HeroServiceController, HeroServiceControllerMethods, Villain, VillainById } from '../hero';

@Controller('hero')
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
  private readonly heroes: Hero[] = [
    { id: 1, name: 'Stephenh', birthDate: { seconds: 1, nanos: 2 } },
    { id: 2, name: 'Iangregsondev', birthDate: { seconds: 1, nanos: 3 } },
  ];

  private readonly villains: Villain[] = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];

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
      hero$.next(item);
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
