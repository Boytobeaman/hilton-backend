import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  Reservation,
  CreateReservationInput,
  ReservationFiltersInput,
  UpdateReservationInput,
} from './schemas/reservations.schemas';

import { ReservationsService } from './reservations.service';
import { UsersService } from 'src/users/users.service';
import { HotelsService } from 'src/hotels/hotels.service';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly usersService: UsersService,
    private readonly hotelsService: HotelsService,
  ) {}

  @Query(() => Reservation, { nullable: true })
  async reservation(@Args('id') id: string): Promise<Reservation> {
    return await this.reservationsService.findOne(id);
  }

  @Query(() => [Reservation], { nullable: true })
  async reservations(
    @Args('filters', { nullable: true }) filters: ReservationFiltersInput,
  ): Promise<Reservation[]> {
    return await this.reservationsService.findAll(filters);
  }

  @Mutation(() => Reservation)
  async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ) {
    return await this.reservationsService.create(createReservationInput);
  }

  @Mutation(() => Reservation)
  async updateReservation(
    @Args('id') id: string,
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return await this.reservationsService.update(id, updateReservationInput);
  }

  @Mutation(() => Reservation, { description: 'delete hotel' })
  async deleteReservation(@Args('id') id: string) {
    return await this.reservationsService.remove(id);
  }

  @ResolveField()
  async user(@Parent() reservation: Reservation) {
    const id = reservation.user.toString();
    return await this.usersService.findOne(id);
  }

  @ResolveField()
  async hotel(@Parent() reservation: Reservation) {
    const id = reservation.hotel.toString();
    return await this.hotelsService.findOne(id);
  }
}
