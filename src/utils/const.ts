import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const RESERVATION_STATUS = {
  START: 'START',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};
