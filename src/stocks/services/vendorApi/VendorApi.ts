import * as dotenv from 'dotenv';
import { backOff } from 'exponential-backoff';
import { RESTDataSource } from '@apollo/datasource-rest';
import { Result } from '../../../core/Result.js';
import { VendorApiErrors } from './VendorApiErrors.js';
import { Stock } from '../../domain/Stock.js';
import { nonEmpty } from '../../../utils/utils.js';

dotenv.config();
if (!process.env.VENDOR_API_URL || !process.env.VENDOR_API_KEY)
  throw new Error(
    'Required environment variables are missing: VENDOR_API_URL, VENDOR_API_KEY',
  );

const cache = {
  stocks: {
    timestamp: 0,
    value: null as [Stock, ...Stock[]] | null,
  },
};

type StocksResponse = {
  status: number;
  data: {
    items: Stock[];
    nextToken?: string;
  };
};

export class VendorApi extends RESTDataSource {
  baseURL = process.env.VENDOR_API_URL;

  /**
   * Fetches a list of stocks, optionally using cached data.
   *
   * @param args - The arguments for fetching stocks.
   * @param {Boolean} args.useCache - Whether to use cached data if available.
   * @param {String | false} args.just - A specific stock symbol to fetch. If provided, the method will return early with the matching stock.
   * @returns A `Promise` resolving to a `Result` containing an array of stocks or errors.
   */
  async stocks(args: {
    useCache: boolean;
    just: string | false;
  }): Promise<Result<[Stock, ...Stock[]]>> {
    const { useCache, just } = args;

    if (useCache) {
      const elapsed = Date.now() - cache.stocks.timestamp;
      if (elapsed < 1000 * 60 * 5) {
        console.log(`Using cached stocks from ${elapsed}ms ago`);
        if (just) {
          const found = cache.stocks.value.find((s) => s.symbol === just);
          if (!found) return Result.fail([new VendorApiErrors.StockNotFound(just)]);
          return Result.ok([found]);
        }
        return Result.ok(cache.stocks.value);
      }
    }

    let response: StocksResponse;
    let all: Stock[] = [];
    let nextToken: string;
    try {
      while (true) {
        response = await backOff(
          () =>
            this.get('stocks', {
              params: {
                nextToken,
              },
              headers: {
                'x-api-key': process.env.VENDOR_API_KEY,
              },
            }),
          backOffOptions('stocks'),
        );

        if (just) {
          const found = response.data.items.find((s) => s.symbol === just);
          if (found) {
            return Result.ok([found]);
          }
        }

        all = all.concat(response.data.items);
        nextToken = response.data.nextToken;
        if (!nextToken) break;
      }
    } catch (e) {
      console.log(`Error when getting stocks`, e);
      return Result.fail([new VendorApiErrors.WhenGettingStocks()]);
    }

    if (just) return Result.fail([new VendorApiErrors.StockNotFound(just)]); // just should have been found previously

    if (!all.length) return Result.fail([new VendorApiErrors.NoStocksFound()]);

    const all2 = nonEmpty(all);
    cache.stocks = {
      timestamp: Date.now(),
      value: all2,
    };
    return Result.ok(all2);
  }
}

const backOffOptions = (method: string) => ({
  // Send to analytics
  // https://github.com/coveooss/exponential-backoff?tab=readme-ov-file#readme
  numOfAttempts: 8,
  jitter: 'full' as const,
  retry: (e: unknown, attempt: number) => {
    console.log(
      `Retrying VendorAPI.${method}, backOff attempt number ${attempt}`,
      e,
    );
    return true;
  },
});
