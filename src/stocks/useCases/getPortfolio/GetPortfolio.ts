import { Result } from '../../../core/Result.js';
import { IPurchaseRepo } from '../../repos/IPurchaseRepo.js';
import { GetPortfolioErrors } from './GetPortfolioErrors.js';
import { IUserRepo } from '../../repos/IUserRepo.js';

export class GetPortfolio {
  private purchaseRepo: IPurchaseRepo;
  private userRepo: IUserRepo;

  public constructor(args: { purchaseRepo: IPurchaseRepo; userRepo: IUserRepo }) {
    const { purchaseRepo, userRepo } = args;
    this.purchaseRepo = purchaseRepo;
    this.userRepo = userRepo;
  }

  async execute(args: {
    user: string;
  }): Promise<Result<{ symbol: string; quantity: number }[] | null>> {
    const { user: userId } = args;

    const user = await this.userRepo.get(userId);
    if (!user) return Result.fail([new GetPortfolioErrors.UserNotFound(userId)]);

    return Result.ok(await this.purchaseRepo.getPortfolio(user));
  }
}
