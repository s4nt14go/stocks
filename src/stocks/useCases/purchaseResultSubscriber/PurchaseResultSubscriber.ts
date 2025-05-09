import { IPurchaseResultRepo } from '../../repos/IPurchaseResultRepo.js';
import { PurchaseResult, PurchaseStatus } from '../../domain/PurchaseResult.js';
import { Emitter } from 'mitt';
import { Events } from '../../domain/Events.js';
import { nonEmpty } from '../../../utils/utils.js';

export class PurchaseResultSubscriber {
  private purchaseResultRepo: IPurchaseResultRepo;

  public constructor(args: { purchaseResultRepo: IPurchaseResultRepo }) {
    const { purchaseResultRepo } = args;
    this.purchaseResultRepo = purchaseResultRepo;
  }

  public subscribe(pubsub: Emitter<Events>) {
    pubsub.on('SUCCESS', async (event) => {
      const { user, quantity, symbol, price, id: purchaseId } = event;

      const purchaseResult = PurchaseResult.create({
        status: PurchaseStatus.SUCCESS,
        errors: null,
        quantity,
        user,
        symbol,
        price,
        purchaseId,
      });

      await this.purchaseResultRepo.create(purchaseResult);
    });

    pubsub.on('FAILURE', async (event) => {
      const { user, errors, quantity, price, symbol } = event;

      if (!errors.length) throw Error('No errors provided');

      const purchaseResult = PurchaseResult.create({
        status: PurchaseStatus.FAILURE,
        errors: nonEmpty(errors.map((e) => e.type)),
        quantity,
        user,
        symbol,
        price,
        purchaseId: null,
      });

      await this.purchaseResultRepo.create(purchaseResult);
    });
  }
}
