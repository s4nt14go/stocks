import { EntityID } from '../../core/domain/EntityID.js';
import { Entity } from '../../core/domain/Entity.js';

type PurchaseProps = {
  user: string;
  symbol: string;
  quantity: number;
  price: number;
};

export type PurchaseDto = PurchaseProps & {
  id: string;
};

export class Purchase extends Entity<PurchaseProps, PurchaseDto> {
  private constructor(props: PurchaseProps, id?: EntityID) {
    super(props, id);
  }

  public static create(input: PurchaseProps): Purchase {
    return new Purchase(input);
  }

  public toDto(): PurchaseDto {
    return {
      ...this.props,
      id: this._id.toString(),
    };
  }
}
