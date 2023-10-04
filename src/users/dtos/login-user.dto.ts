import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class LoginUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
