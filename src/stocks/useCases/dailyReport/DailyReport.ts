import { Result } from '../../../core/Result.js';
import { Day } from '../../domain/Day.js';
import { Report } from '../../domain/Report.js';
import { IPurchaseResultRepo } from '../../repos/IPurchaseResultRepo.js';
import { IController } from './IController.js';

export type Args = {
  day: string;
};

export type Response = Report;

export class DailyReport implements IController<Args, Response> {
  private purchaseResultRepo: IPurchaseResultRepo;

  public constructor(args: { purchaseResultRepo: IPurchaseResultRepo }) {
    const { purchaseResultRepo } = args;
    this.purchaseResultRepo = purchaseResultRepo;
  }

  public async execute(args: Args): Promise<Result<Response>> {
    const { day: _day } = args;

    const dayOrErrors = Day.create({ value: _day });

    if (dayOrErrors.isFailure) {
      console.error(dayOrErrors.errors);
      return Result.fail(dayOrErrors.errors);
    }

    const day = dayOrErrors.value;

    const report = await this.purchaseResultRepo.dailyReport({ day });

    return Result.ok(report);
  }
}
