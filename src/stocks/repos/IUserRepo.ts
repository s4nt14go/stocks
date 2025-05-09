import { User } from '../domain/User';

export interface IUserRepo {
  get(id: string): Promise<User | null>;
}
