import { User, UserDto } from '../domain/User.js';
import { IUserRepo } from './IUserRepo.js';

export class UserRepo implements IUserRepo {
  private User: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(UserModel: any) {
    if (UserModel.tableName !== 'users')
      throw Error(
        `Wrong model passed in: ${UserModel.tableName}, while correct is users`,
      );
    this.User = UserModel;
  }

  public async get(id: string): Promise<User | null> {
    const found: {
      dataValues: UserDto;
    } | null = await this.User.findOne({
      where: {
        id,
      },
    });
    if (!found) return null;

    return User.assemble(found.dataValues);
  }
}
