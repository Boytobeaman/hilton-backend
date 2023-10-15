import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const RESERVATION_STATUS = {
  START: 'START',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};

export const GRAPHQL_DB_OPERATOR_MAPPING = {
  eq: '$eq',
  gt: '$gt',
  gte: '$gte',
  in: '$in',
  lt: '$lt',
  lte: '$lte',
  ne: '$ne',
  nin: '$nin',
  and: '$and',
  not: '$not',
  nor: '$nor',
  or: '$or',
};
