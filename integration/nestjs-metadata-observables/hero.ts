import { Metadata } from 'grpc';
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

export interface HeroService {

  findOneHero(request: HeroById, metadata?: Metadata): Observable<Hero>;

  findOneVillain(request: VillainById, metadata?: Metadata): Observable<Villain>;

}
