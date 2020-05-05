import { Controller } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { HeroById, Hero, HeroServiceController, VillainById, Villain, HeroServiceControllerMethods } from '../hero';

@Controller('hero')
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
  private readonly heroes: Hero[] = [
    { id: 1, name: 'Stephenh' },
    { id: 2, name: 'Iangregsondev' }
  ];

  private readonly villains: Villain[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' }
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
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    request.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  }
}
