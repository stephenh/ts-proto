import { Controller, OnModuleInit } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { HeroById, Hero, HeroServiceController, VillainById, Villain } from '../hero';

@Controller('hero')
export class HeroController implements OnModuleInit, HeroServiceController {
  private readonly heroes: Hero[] = [
    { id: 1, name: 'Stephenh' },
    { id: 2, name: 'Iangregsondev' }
  ];

  private readonly villains: Villain[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' }
  ];

  onModuleInit() {}

  @GrpcMethod('HeroService')
  async findOneHero(data: HeroById): Promise<Hero> {
    return this.heroes.find(({ id }) => id === data.id)!;
  }

  @GrpcMethod('HeroService')
  async findOneVillain(data: VillainById): Promise<Villain> {
    return this.villains.find(({ id }) => id === data.id)!;
  }

  @GrpcStreamMethod('HeroService')
  findManyVillain(request: Observable<VillainById>): Observable<Villain> {
    const hero$ = new Subject<Villain>();

    const onNext = (villainById: VillainById) => {
      const item = this.villains.find(({ id }) => id === villainById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    request.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  }
}
