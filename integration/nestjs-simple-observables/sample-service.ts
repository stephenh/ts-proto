import { HeroService, HeroById, Hero, Villain, VillainById } from './hero';
import { Observable, of } from 'rxjs';

export class SampleService implements HeroService {
  findOneHero(request: HeroById): Observable<Hero> {
    return of({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById): Observable<Villain> {
    return of({ id: 1, name: 'test' });
  }
}
