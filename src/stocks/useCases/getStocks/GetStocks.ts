import { Result } from '../../../core/Result.js';
import { VendorApi } from '../../services/vendorApi/VendorApi.js';
import { Stock } from '../../domain/Stock.js';

export class GetStocks {
  async execute(args: {
    vendorApi: VendorApi;
    useCache: boolean;
    just: string | false;
  }): Promise<Result<[Stock, ...Stock[]]>> {
    const { vendorApi, useCache, just } = args;

    return vendorApi.stocks({
      useCache,
      just,
    });
  }
}
