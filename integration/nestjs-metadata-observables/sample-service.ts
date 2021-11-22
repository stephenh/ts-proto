import { HeroServiceController, HeroById, Hero, Villain, VillainById } from './hero';
import { Observable, of, Subject } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export class SampleService implements HeroServiceController {
  findOneHero(request: HeroById, metadata?: Metadata): Observable<Hero> {
    return of({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById, metadata?: Metadata): Observable<Villain> {
    return of({ id: 1, name: 'test' });
  }

  findManyVillain(request: Observable<VillainById>, metadata?: Metadata): Observable<Villain> {
    const hero$ = new Subject<Villain>();

    const onNext = (villainById: VillainById) => {
      hero$.next({ id: 1, name: 'test' });
    };
    const onComplete = () => hero$.complete();
    request.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  }
}
