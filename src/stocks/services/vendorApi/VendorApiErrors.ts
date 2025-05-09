import { StatusError } from '../../../core/Status.js';
import { patch } from '../../../core/utils.js';
import { BaseError } from '../../../core/AppError.js';

export namespace VendorApiErrors {
  export class WhenGettingStocks extends BaseError {
    public constructor() {
      super({
        message: 'Error from vendor API.',
        status: StatusError.BAD_GATEWAY,
      });
    }
  }
  export class NoStocksFound extends BaseError {
    public constructor() {
      super({
        message: 'No stocks returned by vendor API.',
        status: StatusError.NOT_FOUND,
      });
    }
  }
  export class StockNotFound extends BaseError {
    public constructor(symbol: string) {
      super({
        message: `Stock "${symbol}" not found.`,
        status: StatusError.NOT_FOUND,
      });
    }
  }
}

patch({ VendorApiErrors });
