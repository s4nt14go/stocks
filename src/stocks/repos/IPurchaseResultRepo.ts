import { PurchaseResult } from '../domain/PurchaseResult';
import { Day } from '../domain/Day';
import { Report } from '../domain/Report';

export interface IPurchaseResultRepo {
  create(purchaseResult: PurchaseResult): Promise<void>;
  dailyReport(args: { day: Day }): Promise<Report>;
}
