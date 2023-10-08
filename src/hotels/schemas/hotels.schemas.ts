import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { ReservationType } from 'src/reservations/dtos/reservation.type';
import { Reservation } from 'src/reservations/schemas/reservations.schemas';
import { Field, InputType, ObjectType, ID } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';

export type HotelDocument = HydratedDocument<Hotel>;

@ObjectType()
@Schema({
  timestamps: true,
})
// timestamps add updatedAt and createdAt fields to collection
export class Hotel {
  @Field()
  _id?: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop()
  address: string;

  @Field(() => [Reservation], { nullable: 'itemsAndList' })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  })
  reservations: (Reservation | string)[];
}

@InputType()
export class CreateHotelInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  })
  reservations: string[];
}

@InputType()
export class UpdateHotelInput extends PartialType(CreateHotelInput) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  address?: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
