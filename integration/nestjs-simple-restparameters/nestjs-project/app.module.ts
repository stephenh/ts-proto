import { Module } from "@nestjs/common";
import { HeroController } from "./hero.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { HERO_PACKAGE_NAME } from "../hero";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: HERO_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "0.0.0.0:8082",
          package: HERO_PACKAGE_NAME,
          protoPath: join(__dirname, "../hero.proto"),
        },
      },
    ]),
  ],
  controllers: [HeroController],
})
export class AppModule {}
