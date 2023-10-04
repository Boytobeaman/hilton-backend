import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './schemas/reservations.schemas';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private hotelModel: Model<Reservation>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const createdReservation = new this.hotelModel(createReservationDto);
    return createdReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.hotelModel.find().populate(['hotel', 'user']).exec();
  }

  findOne(id: string) {
    return this.hotelModel.findById(id);
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.hotelModel.findByIdAndUpdate(id, updateReservationDto);
  }

  remove(id: string) {
    return this.hotelModel.findByIdAndRemove(id);
  }
}
