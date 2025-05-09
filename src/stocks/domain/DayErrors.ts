import { patch } from '../../core/utils.js';
import { BaseError } from '../../core/AppError.js';
import { StatusError } from '../../core/Status.js';

export namespace DayErrors {
  export class InvalidFormat extends BaseError {
    public constructor() {
      super({
        message: `Invalid date format. Expected format: YYYY-MM-DD`,
        status: StatusError.BAD_REQUEST,
      });
    }
  }
}

patch({ DayErrors });
