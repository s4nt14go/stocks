import { BaseError } from './AppError.js';

// Result supporting multiple errors
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public errors: null | [BaseError, ...BaseError[]];
  private readonly _value: T;

  private constructor(
    isSuccess: boolean,
    errors: null | [BaseError, ...BaseError[]],
    value: T,
  ) {
    if (isSuccess && errors) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain errors',
      );
    }
    if (!isSuccess && !errors) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain errors',
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.errors = errors;
    this._value = value;

    Object.freeze(this);
  }

  get value(): T {
    if (!this.isSuccess) {
      console.log('this:', this);
      throw new Error("Can't get value when Result didn't succeeded.");
    }
    if (this._value === undefined) {
      console.log('this:', this);
      throw new Error(`Can't get value when Result._value is undefined.`);
    }
    return this._value;
  }

  public static ok<T>(value: T): Result<T> {
    return new Result<T>(true, null, value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fail(errors: BaseError[]): Result<any> {
    if (!errors.length) {
      throw Error('InvalidOperation: A failing result needs to contain errors');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Result<any>(false, errors as [BaseError, ...BaseError[]], null);
  }
}
