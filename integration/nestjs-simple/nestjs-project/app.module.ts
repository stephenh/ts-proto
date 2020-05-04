import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
        {
            name: 'HERO_PACKAGE',
            transport: Transport.GRPC,
            options: {
                url: '0.0.0.0:8080',
                package: 'hero',
                protoPath: join(__dirname, '../hero.proto'),
            },
        },
    ]),
  ],
  controllers: [HeroController]
})
export class AppModule {}