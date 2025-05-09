import { EntityID } from '../../core/domain/EntityID.js';
import { Entity } from '../../core/domain/Entity.js';

export enum PurchaseStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

type PurchaseResultProps = {
  status: PurchaseStatus;
  errors: [string, ...string[]] | null;
  quantity: number;
  user: string;
  symbol: string;
  price: number;
  purchaseId: string | null;
};

export type PurchaseResultDto = PurchaseResultProps & {
  id: string;
};

export class PurchaseResult extends Entity<
  PurchaseResultProps,
  PurchaseResultDto
> {
  private constructor(props: PurchaseResultProps, id?: EntityID) {
    super(props, id);
  }

  get status(): PurchaseResultProps['status'] {
    return this.props.status;
  }
  get errors(): PurchaseResultProps['errors'] {
    return this.props.errors;
  }
  get quantity(): PurchaseResultProps['quantity'] {
    return this.props.quantity;
  }
  get user(): PurchaseResultProps['user'] {
    return this.props.user;
  }
  get symbol(): PurchaseResultProps['symbol'] {
    return this.props.symbol;
  }
  get price(): PurchaseResultProps['price'] {
    return this.props.price;
  }
  get purchaseId(): PurchaseResultProps['purchaseId'] {
    return this.props.purchaseId;
  }

  public static create(input: PurchaseResultProps): PurchaseResult {
    return new PurchaseResult(input);
  }

  public toDto(): PurchaseResultDto {
    return {
      ...this.props,
      id: this._id.toString(),
    };
  }
}
