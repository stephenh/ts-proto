import { Controller, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { HeroServiceController, User, HeroServiceControllerMethods } from '../hero';
import { Empty } from '../google/protobuf/empty';

const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return {id: 1, name: 'test'};
  },
);

@Controller('hero')
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {

  findCurrentUser(request: Empty, @CurrentUser() user: User): User | Promise<User> | Observable<User> {
    return user;
  }  
}
