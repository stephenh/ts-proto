import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HERO_PACKAGE_NAME } from '../hero';
import { AppModule } from './app.module';

export async function createApp() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:8080',
      package: HERO_PACKAGE_NAME,
      protoPath: join(__dirname, '../hero.proto'),
      loader: {
        longs: Number,
      },
    },
  });

  return app;
}
