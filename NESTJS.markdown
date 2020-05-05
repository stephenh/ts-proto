NestJS
=====
With the use of NestJS it's easy to implement an GRPC Microservice ([example](https://docs.nestjs.com/microservices/grpc)). But as you can see you have a lot of boilerplating to define your GRPC interfaces correctly. This approach works fine but is a bit tricky, because it doesn't support type checks. If you change your proto file you also need to update your interface.

By using `ts-proto` you have strong type checks and compiler errors!

To generate `ts` files for your `.proto` files you can use the `--ts_proto_opt=nestJs=true` option.

### Naming convention
For each service in your `.proto` file we generate two `interfaces` on to implement in your nestjs `controller` and one for the `client`.

The name of the `controller` interface is base on the name of the service inside the `.proto`.

If we have to following `.proto` file:
```protobuf
syntax = "proto3";

package hero;

service HeroService {
    rpc FindOneHero (HeroById) returns (Hero) {}
    rpc FindOneVillain (VillainById) returns (Villain) {}
    rpc FindManyVillain (stream VillainById) returns (stream Villain) {}
}
```

The controller interface name would be `HeroServiceController`.
The client interface name would  `HeroServiceClient`.

### implementation
To implement the typescript file in your `nestjs` project you need to add the `controller` interface to your controller. We also generate a `decorator` for you controller. For example: `HeroServiceControllerMethods`, when you apply this to your controller we add all the method decorators you normally should do but doing it this way is safer.

For the client we simply pass the `client` interface to the `client.getService<?>();`.

> Note: Based on the `.proto` we'll generate a `const` for example `HERO_PACKAGE_NAME` and `HERO_SERVICE_NAME` this way your code breaks if you change your package or service name. (It's safer to have compiler errors than runtime errors)

##### Controller

```typescript
import { HeroById, Hero, HeroServiceController, VillainById, Villain, HeroServiceControllerMethods } from '../hero';

@Controller('hero')
// Generated decorator that applies all the @GrpcMethod and @GrpcStreamMethod to the right methods
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
  private readonly heroes: Hero[] = [
    { id: 1, name: 'Stephenh' },
    { id: 2, name: 'Iangregsondev' }
  ];

  private readonly villains: Villain[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' }
  ];

  async findOneHero(data: HeroById): Promise<Hero> {
    return this.heroes.find(({ id }) => id === data.id)!;
  }

  async findOneVillain(data: VillainById): Promise<Villain> {
    return this.villains.find(({ id }) => id === data.id)!;
  }

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
```

##### Client

```typescript
import { HeroById, Hero, HeroServiceController, HeroesService, HERO_SERVICE_NAME, HERO_PACKAGE_NAME } from '../hero';

@Injectable()
export class AppService implements OnModuleInit {
  private heroesService: HeroesService;

  constructor(@Inject(HERO_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>(HERO_SERVICE_NAME);
  }

  getHero(): Observable<Hero> {
    return this.heroesService.findOne({ id: 1 });
  }
}
```

### Supported options

* With`--ts_proto_opt=addGrpcMetadata=true`, the last argument of service methods will accept the grpc `Metadata` type, which contains additional information with the call (i.e. access tokens/etc.).

  (Requires `nestJs=true`.)

* With `--ts_proto_opt=nestJs=true`, the defaults will change to generate [NestJS protobuf](https://docs.nestjs.com/microservices/grpc) friendly types & service interfaces that can be used in both the client-side and server-side of NestJS protobuf implementations.
