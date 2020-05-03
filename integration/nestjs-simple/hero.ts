

export interface HeroById {
  id: number;
}

export interface VillainById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export interface Villain {
  id: number;
  name: string;
}

export interface HeroService {

  findOneHero(request: HeroById): Promise<Hero>;

  findOneVillain(request: VillainById): Promise<Villain>;

}
