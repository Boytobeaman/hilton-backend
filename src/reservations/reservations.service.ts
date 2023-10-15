import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelsService } from 'src/hotels/hotels.service';
import { UsersService } from 'src/users/users.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';
// import { UpdateReservationDto } from './dtos/update-reservation.dto';
import {
  Reservation,
  ReservationDocument,
  UpdateReservationInput,
} from './schemas/reservations.schemas';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationsModel: Model<ReservationDocument>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    @Inject(forwardRef(() => HotelsService))
    private hotelsService: HotelsService,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationDocument> {
    const { hotel: hotelId } = createReservationDto;

    const createdReservation = new this.reservationsModel(createReservationDto);

    const theHotel = await this.hotelsService.findOne(hotelId);

    if (!theHotel) {
      throw new HttpException('Hotel not exist', HttpStatus.BAD_REQUEST);
    }
    const newRes = await createdReservation.save();

    const newResId = [newRes.id, ...(theHotel.reservations || [])];
    await this.hotelsService.update(hotelId, { reservations: newResId });

    return newRes;
  }

  async findAll(filters?: object) {
    return this.reservationsModel.find(filters);
  }

  findOne(id: string): Promise<ReservationDocument> {
    return this.reservationsModel.findById(id);
  }

  update(id: string, updateReservationInput: UpdateReservationInput) {
    return this.reservationsModel.findByIdAndUpdate(id, updateReservationInput);
  }

  remove(id: string) {
    return this.reservationsModel.findByIdAndRemove(id);
  }

  async getManyReservations(ids: string[]) {
    return this.reservationsModel.find().where('_id').in(ids);
  }
}
