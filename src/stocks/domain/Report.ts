import { ValueObject } from '../../core/domain/ValueObject.js';
import { PurchaseResultDto } from './PurchaseResult.js';

type ReportProps = {
  day: string;
  successes: number;
  failures: number;
  purchaseResults: [PurchaseResultDto, ...PurchaseResultDto[]] | null;
};

export type ReportDto = ReportProps;

export class Report extends ValueObject<ReportProps, ReportDto> {
  private constructor(props: ReportProps) {
    super(props);
  }

  get day(): ReportProps['day'] {
    return this.props.day;
  }
  get successes(): ReportProps['successes'] {
    return this.props.successes;
  }
  get failures(): ReportProps['failures'] {
    return this.props.failures;
  }
  get purchaseResults(): ReportProps['purchaseResults'] {
    return this.props.purchaseResults;
  }

  public toDto(): ReportDto {
    return this.props;
  }

  public static create(args: ReportProps): Report {
    return new Report(args);
  }
}
