import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { HERO_PACKAGE_NAME } from "../hero";
import { AppModule } from "./app.module";

export async function createApp() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:8087",
      // The server is configured with the package-relative service name (`HeroService`), while the
      // generated decorator registers the handlers under the fully qualified name (`hero.HeroService`).
      // NestJS resolves them through its fallback lookup by the `package.Service` segment of the method path.
      package: HERO_PACKAGE_NAME,
      protoPath: join(__dirname, "../hero.proto"),
      loader: {
        longs: Number,
      },
    },
  });

  return app;
}
