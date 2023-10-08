import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateHotelInput,
  Hotel,
  HotelDocument,
  UpdateHotelInput,
} from './schemas/hotels.schemas';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async create(createHotelInput: CreateHotelInput): Promise<Hotel> {
    createHotelInput.reservations = [];
    const createdHotel = new this.hotelModel(createHotelInput);
    return createdHotel.save();
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  findOne(id: string) {
    return this.hotelModel.findById(id);
  }

  update(id: string, updateHotelInput: UpdateHotelInput) {
    return this.hotelModel.findByIdAndUpdate(id, updateHotelInput);
  }

  remove(id: string) {
    return this.hotelModel.findByIdAndRemove(id);
  }
}
