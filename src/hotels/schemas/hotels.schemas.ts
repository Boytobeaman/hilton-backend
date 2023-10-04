import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Reservation } from 'src/reservations/schemas/reservations.schemas';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema({
  timestamps: true,
})
// timestamps add updatedAt and createdAt fields to collection
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' })
  reservations: Reservation[];

  // @Prop({ type: Date })
  // updatedAt: Date;

  // @Prop({ type: Date })
  // createdAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
