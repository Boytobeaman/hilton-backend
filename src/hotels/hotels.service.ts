import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { UpdateHotelDto } from './dtos/update-hotel.dto';
import { Hotel } from './schemas/hotels.schemas';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createHotelDto);
    return createdHotel.save();
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  findOne(id: string) {
    return this.hotelModel.findById(id);
  }

  update(id: string, updateHotelDto: UpdateHotelDto) {
    return this.hotelModel.findByIdAndUpdate(id, updateHotelDto);
  }

  remove(id: string) {
    return this.hotelModel.findByIdAndRemove(id);
  }
}
