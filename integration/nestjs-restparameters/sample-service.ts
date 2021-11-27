import { HeroServiceController, HeroById, Hero, Villain, VillainById } from './hero';
import { Metadata } from '@grpc/grpc-js';
import { Observable, Subject } from 'rxjs';

export class SampleService implements HeroServiceController {
  findOneHero(request: HeroById, user: any): Promise<Hero> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById, user: any): Promise<Villain> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findManyVillain(request: Observable<VillainById>, user: any): Observable<Villain> {
    const hero$ = new Subject<Villain>();

    const onNext = (villainById: VillainById) => {
      hero$.next({ id: 1, name: 'test' });
    };
    const onComplete = () => hero$.complete();
    request.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  }
}
