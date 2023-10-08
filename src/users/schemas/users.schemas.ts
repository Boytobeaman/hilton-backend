import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Reservation } from 'src/reservations/schemas/reservations.schemas';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema({
  timestamps: true,
})
export class User {
  @Field()
  _id?: string;

  @Field()
  @Prop({ unique: [true, 'username has been used'] })
  username: string;

  @Field()
  @Prop({ unique: [true, 'email has been used'] })
  email: string;

  @Field()
  @Prop({ unique: [true, 'phone has been used'] })
  phone: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  role: string;

  @Field(() => [Reservation])
  @Prop()
  reservations: string[];
}

@InputType()
export class UsersPermissionsLoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class UsersPermissionsMe {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  role: string;
}

@ObjectType()
export class UsersPermissionsLoginPayload {
  @Field()
  token: string;

  @Field(() => UsersPermissionsMe)
  user: UsersPermissionsMe;
}

export const UserSchema = SchemaFactory.createForClass(User);
