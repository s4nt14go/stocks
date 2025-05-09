export class Identifier<T> {
  private readonly _value;

  public constructor(value: T) {
    this._value = value;
  }

  public toString() {
    return String(this._value);
  }

  /**
   * Return raw value of identifier
   */

  get value(): T {
    return this._value;
  }
}
