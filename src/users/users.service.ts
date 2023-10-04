import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/users.schemas';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<{ token: string; user: object }> {
    try {
      const { password } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = Object.assign({}, createUserDto, {
        password: hashedPassword,
      });

      const user = await this.userModel.create(userData);

      const token = this.jwtService.sign({
        id: user._id,
      });
      const responseUser = {
        id: user._id,
        name: user.username,
        phone: user.phone,
      };
      return { token, user: responseUser };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(error.errmsg);
      }
    }
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ token: string; user: object }> {
    const { username, password } = loginUserDto;

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('invalid username or password');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('invalid username or password');
    }

    const token = this.jwtService.sign({
      id: user._id,
    });
    const responseUser = {
      id: user._id,
      name: user.username,
      phone: user.phone,
    };

    return { token, user: responseUser };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('reservations').exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate('reservations').exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
