import { HeroServiceController, HeroById, Hero, Villain, VillainById } from './hero';
import { Observable, Subject } from 'rxjs';
import { Foo } from './some-file';

export class SampleService implements HeroServiceController {
  findOneHero(request: HeroById, metadata?: Foo): Promise<Hero> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById, metadata?: Foo): Promise<Villain> {
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
}
