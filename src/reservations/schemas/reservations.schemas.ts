import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/users.schemas';
import { Hotel } from 'src/hotels/schemas/hotels.schemas';
import { RESERVATION_STATUS } from 'src/utils/const';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import {
  DateTimeFilterInput,
  IntFilterInput,
  StringFilterInput,
} from 'src/common/graphql/common.graphqltype';

export type ReservationDocument = HydratedDocument<Reservation>;

@ObjectType()
@Schema({
  timestamps: true,
})
export class Reservation {
  @Field()
  _id?: string;

  @Field()
  @Prop()
  expected_arrival_time: Date;

  @Field()
  @Prop()
  size: number;

  @Field()
  @Prop()
  username: string;

  @Field()
  @Prop()
  phone: string;

  @Field()
  @Prop({
    default: RESERVATION_STATUS.START,
  })
  status: string;

  @Field(() => Hotel)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
  hotel: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;
}

@InputType()
export class CreateReservationInput {
  @Field()
  expected_arrival_time: Date;

  @Field()
  size: number;

  @Field()
  username: string;

  @Field()
  phone: string;

  @Field()
  status: string;

  @Field(() => ID)
  hotel: string;

  @Field(() => ID)
  user: string;
}

@InputType()
export class UpdateReservationInput extends PartialType(
  CreateReservationInput,
) {
  @Field({ nullable: true })
  expected_arrival_time?: Date;

  @Field({ nullable: true })
  size?: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  status?: string;
}

@InputType()
export class ReservationFiltersInput {
  @Field({ nullable: true })
  status?: StringFilterInput;

  @Field({ nullable: true })
  user?: string;

  @Field({ nullable: true })
  username?: StringFilterInput;

  @Field({ nullable: true })
  phone?: StringFilterInput;

  @Field({ nullable: true })
  size?: IntFilterInput;

  @Field(() => DateTimeFilterInput, { nullable: true })
  expected_arrival_time?: DateTimeFilterInput;

  @Field(() => [ReservationFiltersInput], { nullable: true })
  and?: [ReservationFiltersInput];

  @Field(() => [ReservationFiltersInput], { nullable: true })
  or?: [ReservationFiltersInput];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
