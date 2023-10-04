import { IsMongoId, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsPhoneNumber('CN')
  phone: string;

  @IsNotEmpty()
  size: number;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  expected_arrival_time: Date;

  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsMongoId()
  hotel: string;
}
