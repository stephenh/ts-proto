import { HeroService, HeroById, Hero, Villain, VillainById } from './hero';

export class SampleService implements HeroService {
  findOneHero(request: HeroById): Promise<Hero> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById): Promise<Villain> {
    return Promise.resolve({ id: 1, name: 'test' });
  }
}
