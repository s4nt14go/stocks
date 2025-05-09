import { StatusError } from '../../../core/Status.js';
import { patch } from '../../../core/utils.js';
import { BaseError } from '../../../core/AppError.js';

export namespace GetPortfolioErrors {
  export class UserNotFound extends BaseError {
    public constructor(id: string) {
      super({
        message: `User "${id}" not found.`,
        status: StatusError.NOT_FOUND,
      });
    }
  }
}

patch({ GetPortfolioErrors });
