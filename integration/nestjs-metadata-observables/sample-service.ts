import { HeroService, HeroById, Hero, Villain, VillainById } from './hero';
import { Observable, of } from 'rxjs';
import { Metadata } from 'grpc';

export class SampleService implements HeroService {
  findOneHero(request: HeroById, metadata?: Metadata): Observable<Hero> {
    return of({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById, metadata?: Metadata): Observable<Villain> {
    return of({ id: 1, name: 'test' });
  }
}
