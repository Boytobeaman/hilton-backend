import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import mongoose from 'mongoose';
import { CreateHotelInput, UpdateHotelInput } from './schemas/hotels.schemas';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelInput: CreateHotelInput, @Req() req) {
    console.log(req.user);
    return this.hotelsService.create(createHotelInput);
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('please enter correct id');
    }
    return this.hotelsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHotelInput: UpdateHotelInput) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('please enter correct id');
    }
    return this.hotelsService.update(id, updateHotelInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('please enter correct id');
    }
    return this.hotelsService.remove(id);
  }
}
