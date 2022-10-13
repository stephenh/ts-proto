import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HERO_PACKAGE_NAME } from '../hero';
import { HeroController } from './hero.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: HERO_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:8080',
          package: HERO_PACKAGE_NAME,
          protoPath: join(__dirname, '../hero.proto'),
          loader: {
            longs: Number,
          },
        },
      },
    ]),
  ],
  controllers: [HeroController],
})
export class AppModule {}
