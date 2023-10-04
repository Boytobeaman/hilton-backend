import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';
import { Reservation } from 'src/reservations/schemas/reservations.schemas';
export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
// add timestamps updatedAt and createdAt fields to collection
export class User {
  @Prop({ unique: [true, 'username has been used'] })
  username: string;

  @Prop({ unique: [true, 'email has been used'] })
  email: string;

  @Prop({ unique: [true, 'phone has been used'] })
  phone: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  role: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' })
  reservations: Reservation[];
}

export const UserSchema = SchemaFactory.createForClass(User);
