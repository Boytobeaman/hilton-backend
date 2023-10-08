import { forwardRef, Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservations.schemas';
import { ReservationResolver } from './reservations.resolver';
import { UsersModule } from 'src/users/users.module';
import { HotelsModule } from 'src/hotels/hotels.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => HotelsModule),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationResolver],
  exports: [ReservationsService],
})
export class ReservationsModule {}
