import { SampleService } from './sample-service';
import { createApp } from './nestjs-project/main';
import { INestMicroservice } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { HeroService } from './hero';
import { Observable } from 'rxjs';
import { Hero } from '../nestjs-metadata/hero';

describe('nestjs-simple-test', () => {
  it('compiles', () => {
    const service = new SampleService();
    expect(service).not.toBeUndefined();
  });
});

describe('nestjs-simple-test nestjs', () => {
  let app: INestMicroservice;
  let client: ClientGrpc;
  let heroService: HeroService;

  beforeAll(async () => {
    app = await createApp();
    client = app.get('HERO_PACKAGE');
    heroService = client.getService<HeroService>('HeroService');
    await app.listenAsync();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get grpc client', async () => {
    expect(client).not.toBeUndefined();
  });

  it('should get heroService', async () => {
    expect(heroService).not.toBeUndefined();
  });

  it('should findOneHero', async() => {
    const hero = await (heroService.findOneHero({ id: 1 }) as unknown as Observable<Hero>).toPromise();
    expect(hero).toEqual({ id: 1, name: 'Stephenh' });
  });
});
