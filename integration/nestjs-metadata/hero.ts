import { Metadata } from 'grpc';


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

  findOneHero(request: HeroById, metadata?: Metadata): Promise<Hero>;

  findOneVillain(request: VillainById, metadata?: Metadata): Promise<Villain>;

}
