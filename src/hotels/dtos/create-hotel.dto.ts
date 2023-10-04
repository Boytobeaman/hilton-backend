import { IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  readonly name: string;
  readonly address: string;
}
