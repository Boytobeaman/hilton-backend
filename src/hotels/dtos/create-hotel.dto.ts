import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class CreateHotelDto {
  @IsNotEmpty()
  readonly name: string;
  readonly address: string;
  reservations: Types.ObjectId[];
}
