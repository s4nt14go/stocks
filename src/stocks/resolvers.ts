import { Resolvers } from './types.js';
import { MyContext } from './server.js';
import { formatErrors } from '../core/AppError.js';
import GetStocksUseCase from './useCases/getStocks/index.js';
import PurchaseUseCase from './useCases/purchase/index.js';
import GetPortfolioUseCase from './useCases/getPortfolio/index.js';
import DailyReportUseCase from './useCases/dailyReport/index.js';
import { Result } from '../core/Result.js';
import { Report } from './domain/Report.js';
import { Stock } from './domain/Stock.js';

const resolvers: Resolvers = {
  Query: {
    getStocks: async (_, __, { dataSources }: MyContext) =>
      handleResult<[Stock, ...Stock[]]>(
        await GetStocksUseCase.execute({
          vendorApi: dataSources.vendorApi,
          useCache: true,
          just: false,
        }),
      ),

    getPortfolio: async (_, args) =>
      handleResult<{ symbol: string; quantity: number }[]>(
        await GetPortfolioUseCase.execute(args),
      ),

    dailyReport: async (_, args) =>
      handleResult<Report>(await DailyReportUseCase.execute(args)),
  },
  Mutation: {
    purchase: async (
      _,
      args: {
        user: string;
        symbol: string;
        quantity: number;
        price: number;
      },
      { dataSources }: MyContext,
    ) =>
      handleResult<string>(
        await PurchaseUseCase.execute({
          ...args,
          vendorApi: dataSources.vendorApi,
        }),
      ),
  },
};

export default resolvers;

const handleResult = <T>(result: Result<T>): T => {
  if (result.isFailure) throw formatErrors(result.errors);
  return result.value!;
};
