import { HeroService, HeroById, Hero, Villain, VillainById } from './hero';
import { Metadata } from 'grpc';

export class SampleService implements HeroService {
  findOneHero(request: HeroById, metadata?: Metadata): Promise<Hero> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById, metadata?: Metadata): Promise<Villain> {
    return Promise.resolve({ id: 1, name: 'test' });
  }
}
