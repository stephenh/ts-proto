import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { HERO_PACKAGE_NAME } from '../hero';

export async function createApp() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:8081',
        package: HERO_PACKAGE_NAME,
        protoPath: join(__dirname, '../hero.proto'),
      },
    });
    
    return app;
}