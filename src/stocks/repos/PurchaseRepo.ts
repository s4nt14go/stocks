import { Purchase, PurchaseDto } from '../domain/Purchase.js';
import { IPurchaseRepo } from './IPurchaseRepo.js';
import { User } from '../domain/User';

export class PurchaseRepo implements IPurchaseRepo {
  private Purchase: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(PurchaseModel: any) {
    if (PurchaseModel.tableName !== 'purchases')
      throw Error(
        `Wrong model passed in: ${PurchaseModel.tableName}, while correct is purchases`,
      );
    this.Purchase = PurchaseModel;
  }

  public async create(purchase: Purchase) {
    await this.Purchase.create(purchase.toDto());
  }

  public async getPortfolio(user: User) {
    const found: {
      dataValues: PurchaseDto;
    }[] = await this.Purchase.findAll({
      where: { user: user.id.toString() },
    });
    if (!found.length) return null;

    const dtos = found.map((f) => f.dataValues);

    const totalsBySymbol = dtos.reduce(
      (acc, purchase) => {
        const { symbol, quantity } = purchase;
        acc[symbol] = (acc[symbol] || 0) + quantity;
        return acc;
      },
      {} as Record<string, number>,
    );

    const entries = Object.entries(totalsBySymbol);

    return entries.map(([symbol, quantity]) => ({ symbol, quantity }));
  }
}
