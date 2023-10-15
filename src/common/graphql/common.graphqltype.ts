import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StringFilterInput {
  @Field(() => [String], { nullable: true })
  and: [string];

  @Field(() => [String], { nullable: true })
  or: [string];

  @Field(() => StringFilterInput, { nullable: true })
  not: StringFilterInput;

  @Field(() => String, { nullable: true })
  eq: string;

  @Field(() => String, { nullable: true })
  ne: string;

  @Field(() => String, { nullable: true })
  gt: string;

  @Field(() => String, { nullable: true })
  gte: string;

  @Field(() => String, { nullable: true })
  lt: string;

  @Field(() => String, { nullable: true })
  lte: string;

  @Field(() => [String], { nullable: true })
  in: [string];
}

@InputType()
export class IntFilterInput {
  @Field(() => [String], { nullable: true })
  and: [string];

  @Field(() => [String], { nullable: true })
  or: [string];

  @Field(() => StringFilterInput, { nullable: true })
  not: StringFilterInput;

  @Field(() => String, { nullable: true })
  eq: string;

  @Field(() => String, { nullable: true })
  ne: string;

  @Field(() => String, { nullable: true })
  gt: string;

  @Field(() => String, { nullable: true })
  gte: string;

  @Field(() => String, { nullable: true })
  lt: string;

  @Field(() => String, { nullable: true })
  lte: string;

  @Field(() => [String], { nullable: true })
  in: [string];
}

@InputType()
export class DateTimeFilterInput {
  @Field(() => [Date], { nullable: true })
  and: [Date];

  @Field(() => [Date], { nullable: true })
  or: [Date];

  @Field(() => DateTimeFilterInput, { nullable: true })
  not: DateTimeFilterInput;

  @Field(() => Date, { nullable: true })
  eq: Date;

  @Field(() => Date, { nullable: true })
  ne: Date;

  @Field(() => Date, { nullable: true })
  gt: Date;

  @Field(() => Date, { nullable: true })
  gte: Date;

  @Field(() => Date, { nullable: true })
  lt: Date;

  @Field(() => Date, { nullable: true })
  lte: Date;

  @Field(() => [Date], { nullable: true })
  in: [Date];
}
