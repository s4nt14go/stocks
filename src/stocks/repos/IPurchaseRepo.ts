import { Purchase } from '../domain/Purchase';
import { User } from '../domain/User';

export interface IPurchaseRepo {
  create(purchase: Purchase): Promise<void>;
  getPortfolio(user: User): Promise<{ symbol: string; quantity: number }[] | null>;
}
