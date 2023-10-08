import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  User,
  UsersPermissionsLoginInput,
  UsersPermissionsLoginPayload,
} from './schemas/users.schemas';

// import { ReservationsService } from './reservations.service';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/utils/const';

@Resolver()
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Query(() => Reservation, { nullable: true })
  // async reservation(@Args('id') id: string): Promise<Reservation> {
  //   return await this.reservationsService.findOne(id);
  // }

  @Public()
  @Mutation(() => UsersPermissionsLoginPayload)
  async login(
    @Args('loginInput')
    loginInput: UsersPermissionsLoginInput,
  ) {
    return await this.usersService.login(loginInput);
  }
}
