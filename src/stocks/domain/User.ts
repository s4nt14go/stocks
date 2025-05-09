import { EntityID } from '../../core/domain/EntityID.js';
import { Entity } from '../../core/domain/Entity.js';

type UserProps = {
  name: string;
};

export type UserDto = UserProps & {
  id: string;
};

export class User extends Entity<UserProps, UserDto> {
  private constructor(props: UserProps, id?: EntityID) {
    super(props, id);
  }

  public static create(input: UserProps): User {
    return new User(input);
  }

  public toDto(): UserDto {
    return {
      ...this.props,
      id: this._id.toString(),
    };
  }

  public static assemble(dto: UserDto): User {
    return new User(dto, new EntityID(dto.id));
  }
}
