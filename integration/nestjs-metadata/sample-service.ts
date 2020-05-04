import { HeroService, HeroById, Hero, Villain, VillainById } from './hero';
import { Metadata } from 'grpc';
import { Observable, Subject } from 'rxjs';

export class SampleService implements HeroService {
  findOneHero(request: HeroById, metadata?: Metadata): Promise<Hero> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById, metadata?: Metadata): Promise<Villain> {
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
