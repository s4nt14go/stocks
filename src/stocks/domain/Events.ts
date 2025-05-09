import { PurchaseDto } from './Purchase';
import { BaseErrorDto } from '../../core/AppError';

export type Events = {
  FAILURE: {
    errors: [BaseErrorDto, ...BaseErrorDto[]];
    user: string;
    symbol: string;
    quantity: number;
    price: number;
  };
  SUCCESS: PurchaseDto;
};
