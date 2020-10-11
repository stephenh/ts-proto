import { HeroServiceController, HeroById, Hero, Villain, VillainById } from './hero';
import { Observable, Subject } from 'rxjs';

export class SampleService implements HeroServiceController {
  addOneHero(request: Hero): void {}

  findOneHero(request: HeroById): Promise<Hero> {
    return Promise.resolve({ id: 1, name: 'test', birthDate: undefined });
  }

  findOneVillain(request: VillainById): Promise<Villain> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findManyVillain(request: Observable<VillainById>): Observable<Villain> {
    const hero$ = new Subject<Villain>();

    const onNext = (villainById: VillainById) => {
      hero$.next({ id: 1, name: 'test' });
    };
    const onComplete = () => hero$.complete();
    request.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  }

  async findManyVillainStreamIn(request: Observable<VillainById>): Promise<Villain> {
    return { id: 1, name: 'test' };
  }

  findManyVillainStreamOut(request: VillainById): Observable<Villain> {
    // Kinda making this up
    const hero$ = new Subject<Villain>();
    hero$.next({ id: 1, name: 'test' });
    hero$.complete();
    return hero$.asObservable();
  }
}
