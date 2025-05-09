import { ValueObject } from '../../core/domain/ValueObject.js';
import { Result } from '../../core/Result.js';
import { DayErrors } from './DayErrors.js';

type DayProps = {
  value: string;
};

export type DayDto = DayProps;

export class Day extends ValueObject<DayProps, DayDto> {
  private constructor(props: DayProps) {
    super(props);
  }

  get value(): DayProps['value'] {
    return this.props.value;
  }

  public toDto(): DayDto {
    return this.props;
  }

  public static create(args: DayProps): Result<Day> {
    const { value } = args;

    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return Result.fail([new DayErrors.InvalidFormat()]);
    }

    return Result.ok(new Day(args));
  }
}
