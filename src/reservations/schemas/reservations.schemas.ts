import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Hotel } from 'src/hotels/schemas/hotels.schemas';
import { User } from 'src/users/schemas/users.schemas';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({
  timestamps: true,
})
// timestamps add updatedAt and createdAt fields to collection
export class Reservation {
  @Prop({ required: true })
  expected_arrival_time: Date;

  @Prop()
  size: number;

  @Prop()
  username: string;

  @Prop()
  phone: string;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
  hotel: Hotel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
