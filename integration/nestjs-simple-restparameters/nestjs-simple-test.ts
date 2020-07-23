import { createApp } from './nestjs-project/main';
import { INestMicroservice } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { HeroServiceClient, User, HERO_SERVICE_NAME, HERO_PACKAGE_NAME } from './hero';

describe('nestjs-simple-test nestjs', () => {
  let app: INestMicroservice;
  let client: ClientGrpc;
  let heroService: HeroServiceClient;

  beforeAll(async () => {
    app = await createApp();
    client = app.get(HERO_PACKAGE_NAME);
    heroService = client.getService<HeroServiceClient>(HERO_SERVICE_NAME);
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

  it('should findCurrentUser', async () => {
    const currentUser = await heroService.findCurrentUser({}).toPromise();
    expect(currentUser).toEqual({id: 1, name: 'test'});
  });
});
