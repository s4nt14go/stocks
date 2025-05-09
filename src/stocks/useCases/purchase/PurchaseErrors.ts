import { StatusError } from '../../../core/Status.js';
import { patch } from '../../../core/utils.js';
import { BaseError } from '../../../core/AppError.js';

export namespace PurchaseErrors {
  export class UserNotFound extends BaseError {
    public constructor(id: string) {
      super({
        message: `User "${id}" not found.`,
        status: StatusError.NOT_FOUND,
      });
    }
  }

  export class PriceMismatch extends BaseError {
    public constructor(args: {
      symbol: string;
      askedPrice: number;
      currentPrice: number;
    }) {
      const { symbol, askedPrice, currentPrice } = args;
      super({
        message: `Price mismatch for stock ${symbol}. Asked: ${askedPrice}, current: ${currentPrice}`,
        status: StatusError.BAD_REQUEST,
      });
    }
  }
}

patch({ PurchaseErrors });
