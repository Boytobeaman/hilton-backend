import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReservationsService } from 'src/reservations/reservations.service';
import { ReservationFiltersInput } from 'src/reservations/schemas/reservations.schemas';
import { transformFilter } from 'src/utils/utils';
// import { CreateHotelInput, HotelType } from './dtos/hotel.type';
import { HotelsService } from './hotels.service';
import {
  Hotel,
  CreateHotelInput,
  UpdateHotelInput,
} from './schemas/hotels.schemas';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(
    private readonly hotelsService: HotelsService,
    private readonly reservationsService: ReservationsService,
  ) {}

  @Query(() => Hotel)
  async hotel(@Args('id') id: string) {
    return await this.hotelsService.findOne(id);
  }

  @Query(() => [Hotel], { nullable: true })
  async hotels(): Promise<Hotel[]> {
    return await this.hotelsService.findAll();
  }

  @Mutation(() => Hotel)
  async updateHotel(
    @Args('id') id: string,
    @Args('updateHotelInput')
    updateHotelInput: UpdateHotelInput,
  ) {
    return await this.hotelsService.update(id, updateHotelInput);
  }

  @Mutation(() => Hotel)
  async createHotel(
    @Args('createHotelInput') createHotelInput: CreateHotelInput,
  ): Promise<Hotel> {
    return await this.hotelsService.create(createHotelInput);
  }

  @Mutation(() => Hotel, { description: 'delete hotel' })
  async deleteHotel(@Args('id') id: string): Promise<Hotel> {
    return await this.hotelsService.remove(id);
  }

  @ResolveField()
  async reservations(
    @Parent() hotel: Hotel,
    @Args('filters', { nullable: true }) filters?: ReservationFiltersInput,
  ) {
    if (hotel.reservations && hotel.reservations.length > 0) {
      const newFilter = transformFilter(filters);
      const resp = await this.reservationsService.findAll(
        Object.assign({}, newFilter, { hotel: hotel._id }),
      );
      return resp;
    } else {
      return [];
    }
  }
}
