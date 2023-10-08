import { forwardRef, Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotels.schemas';
// import { UsersModule } from 'src/users/users.module';
import { HotelResolver } from './hotel.resolver';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    forwardRef(() => ReservationsModule),
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService, HotelResolver],
  exports: [HotelsService],
})
export class HotelsModule {}
