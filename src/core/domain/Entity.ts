import { EntityID } from './EntityID.js';

export abstract class Entity<T, TDto> {
  protected readonly _id: EntityID;
  public readonly props: T;
  protected abstract toDto(): TDto;

  protected constructor(props: T, id?: EntityID) {
    this._id = id ? id : new EntityID();
    this.props = props;
  }

  get id(): EntityID {
    return this._id;
  }
}
