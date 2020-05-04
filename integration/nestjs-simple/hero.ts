import { Observable } from 'rxjs';


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

export interface HeroServiceController {

  findOneHero(request: HeroById): Promise<Hero> | Observable<Hero> | Hero;

  findOneVillain(request: VillainById): Promise<Villain> | Observable<Villain> | Villain;

  findManyVillain(request: Observable<VillainById>): Observable<Villain>;

}

export interface HeroServiceClient {

  findOneHero(request: HeroById): Observable<Hero>;

  findOneVillain(request: VillainById): Observable<Villain>;

  findManyVillain(request: Observable<VillainById>): Observable<Villain>;

}
