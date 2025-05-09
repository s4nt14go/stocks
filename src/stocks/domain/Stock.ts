import { ValueObject } from '../../core/domain/ValueObject.js';

type StockProps = {
  lastUpdated: string;
  change: number;
  price: number;
  name: string;
  symbol: string;
};

export type StockDto = StockProps;

export class Stock extends ValueObject<StockProps, StockDto> {
  private constructor(props: StockProps) {
    super(props);
  }

  get lastUpdated(): string {
    return this.props.lastUpdated;
  }
  get change(): number {
    return this.props.change;
  }
  get price(): number {
    return this.props.price;
  }
  get name(): string {
    return this.props.name;
  }
  get symbol(): string {
    return this.props.symbol;
  }

  public toDto(): StockDto {
    return this.props;
  }

  public static create(args: StockProps): Stock {
    return new Stock(args);
  }
}
