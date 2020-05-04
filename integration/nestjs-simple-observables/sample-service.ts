import { HeroService, HeroById, Hero, Villain, VillainById } from './hero';
import { Observable, of, Subject } from 'rxjs';

export class SampleService implements HeroService {
  findOneHero(request: HeroById): Observable<Hero> {
    return of({ id: 1, name: 'test' });
  }
  
  findOneVillain(request: VillainById): Observable<Villain> {
    return of({ id: 1, name: 'test' });
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
