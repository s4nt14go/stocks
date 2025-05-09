import { PurchaseResult, PurchaseResultDto } from '../domain/PurchaseResult.js';
import { IPurchaseResultRepo } from './IPurchaseResultRepo.js';
import { Day } from '../domain/Day.js';
import { Report } from '../domain/Report.js';
import { Op } from 'sequelize';
import { nonEmpty } from '../../utils/utils.js';

export class PurchaseResultRepo implements IPurchaseResultRepo {
  private PurchaseResult: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(PurchaseResultModel: any) {
    if (PurchaseResultModel.tableName !== 'purchase_results')
      throw Error(
        `Wrong model passed in: ${PurchaseResultModel.tableName}, while correct is purchase_results`,
      );
    this.PurchaseResult = PurchaseResultModel;
  }

  public async create(purchaseResult: PurchaseResult) {
    await this.PurchaseResult.create(purchaseResult.toDto());
  }

  public async dailyReport(args: { day: Day }) {
    const { day: _day } = args;

    const day = _day.value;
    const nextDayDate = new Date(day);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    const nextDay = nextDayDate.toJSON().split('T')[0];

    const startOfDayGMT0 = 'T00:00:00.000Z';
    const found: {
      dataValues: PurchaseResultDto;
    }[] = await this.PurchaseResult.findAll({
      where: {
        created_at: {
          [Op.between]: [`${day}${startOfDayGMT0}`, `${nextDay}${startOfDayGMT0}`],
        },
      },
    });
    if (!found.length)
      return Report.create({
        day,
        successes: 0,
        failures: 0,
        purchaseResults: null,
      });

    const purchaseResultDtos = found.map((f) => f.dataValues);

    const successes = purchaseResultDtos.filter(
      (result) => result.status === 'SUCCESS',
    ).length;
    const failures = purchaseResultDtos.filter(
      (result) => result.status === 'FAILURE',
    ).length;

    return Report.create({
      day,
      successes,
      failures,
      purchaseResults: nonEmpty(purchaseResultDtos),
    });
  }
}
