import { SampleService } from './sample-service';
import { createApp } from './nestjs-project/main';
import { INestMicroservice } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { HeroServiceClient, VillainById, Villain, HERO_SERVICE_NAME, HERO_PACKAGE_NAME } from './hero';
import { Subject } from 'rxjs';

describe('nestjs-simple-usedate-test', () => {
  it('compiles', () => {
    const service = new SampleService();
    expect(service).not.toBeUndefined();
  });
});

describe('nestjs-simple-usedate-test nestjs', () => {
  let app: INestMicroservice;
  let client: ClientGrpc;
  let heroService: HeroServiceClient;

  beforeAll(async () => {
    app = await createApp();
    client = app.get(HERO_PACKAGE_NAME);
    heroService = client.getService<HeroServiceClient>(HERO_SERVICE_NAME);
    await app.listen();
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

  xit('should addOneHero', async () => {
    const emptyResponse = await heroService.addOneHero({ id: 3, name: 'Toon', birthDate: new Date("2000/03/03") }).toPromise();
    expect(emptyResponse).toEqual({});
  });

  xit('should findOneHero', async () => {
    const hero = await heroService.findOneHero({ id: 1 }).toPromise();
    expect(hero).toEqual({ id: 1, name: 'Stephenh', birthDate: new Date("2000/01/01") });
  });

  xit('should findOneHero recently added hero', async () => {
    const hero = await heroService.findOneHero({ id: 3 }).toPromise();
    expect(hero).toEqual({ id: 3, name: 'Toon', birthDate: new Date("2000/03/03") });
  });

  it('should findOneVillain', async () => {
    const villain = await heroService.findOneVillain({ id: 1 }).toPromise();
    expect(villain).toEqual({ id: 1, name: 'John' });
  });

  it('should findManyVillain', (done) => {
    const villainIdSubject = new Subject<VillainById>();
    const villains: Villain[] = [];

    heroService.findManyVillain(villainIdSubject.asObservable()).subscribe({
      next: (villain) => {
        villains.push(villain);
      },
      complete: () => {
        expect(villains).toEqual([
          { id: 1, name: 'John' },
          { id: 2, name: 'Doe' },
        ]);
        done();
      },
    });

    villainIdSubject.next({ id: 1 });
    villainIdSubject.next({ id: 2 });
    villainIdSubject.complete();
  });
});
