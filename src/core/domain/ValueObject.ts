export interface ValueObjectProps {
  [index: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */

export abstract class ValueObject<T extends ValueObjectProps, ValueObjectDto> {
  public readonly props: T;
  public abstract toDto(): ValueObjectDto;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }
}
