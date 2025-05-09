import { Result } from '../../../core/Result.js';
import { VendorApi } from '../../services/vendorApi/VendorApi.js';
import { IPurchaseRepo } from '../../repos/IPurchaseRepo.js';
import { PurchaseErrors } from './PurchaseErrors.js';
import { Purchase as PurchaseEntity } from '../../domain/Purchase.js';
import { IUserRepo } from '../../repos/IUserRepo.js';
import { Events } from '../../domain/Events.js';
import { Emitter } from 'mitt';
import { nonEmpty } from '../../../utils/utils.js';

export class Purchase {
  private purchaseRepo: IPurchaseRepo;
  private userRepo: IUserRepo;
  private pubsub: Emitter<Events>;

  public constructor(args: {
    purchaseRepo: IPurchaseRepo;
    userRepo: IUserRepo;
    pubsub: Emitter<Events>;
  }) {
    const { purchaseRepo, userRepo, pubsub } = args;
    this.purchaseRepo = purchaseRepo;
    this.userRepo = userRepo;
    this.pubsub = pubsub;
  }

  async execute(args: {
    vendorApi: VendorApi;
    user: string;
    symbol: string;
    quantity: number;
    price: number;
  }): Promise<Result<string>> {
    console.log(`Purchase ${JSON.stringify(args)}`);

    const { vendorApi, user, symbol, quantity, price } = args;

    const stockOrErrors = await vendorApi.stocks({
      useCache: false, // for purchases, we make sure we get an up-to-date price
      just: symbol,
    });

    if (stockOrErrors.isFailure) {
      this.pubsub.emit('FAILURE', {
        errors: nonEmpty(stockOrErrors.errors.map((e) => e.toDto())),
        ...args,
      });
      return Result.fail(stockOrErrors.errors);
    }

    const stock = stockOrErrors.value[0];

    const userExists = await this.userRepo.get(user);
    if (!userExists) {
      const error = new PurchaseErrors.UserNotFound(user);
      this.pubsub.emit('FAILURE', {
        errors: nonEmpty([error.toDto()]),
        ...args,
      });
      return Result.fail([error]);
    }

    const priceMismatch = Math.abs((stock.price - price) / price);
    if (priceMismatch > 0.02) {
      const error = new PurchaseErrors.PriceMismatch({
        symbol,
        askedPrice: price,
        currentPrice: stock.price,
      });
      this.pubsub.emit('FAILURE', {
        errors: nonEmpty([error.toDto()]),
        ...args,
      });
      return Result.fail([error]);
    }

    const purchase = PurchaseEntity.create({
      user,
      symbol,
      quantity,
      price,
    });

    await this.purchaseRepo.create(purchase);

    const purchaseId = purchase.id.toString();
    console.log(`Purchased ${quantity} shares of ${symbol} (id: ${purchaseId})`);

    this.pubsub.emit('SUCCESS', purchase.toDto());

    return Result.ok(purchaseId);
  }
}
