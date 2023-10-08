import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsPhoneNumber('CN')
  phone: string;

  @IsNotEmpty()
  size: number;

  status?: string;

  @IsNotEmpty()
  expected_arrival_time: Date;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  hotel: string;
}
