import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import resolvers from './resolvers.js';
import { VendorApi } from './services/vendorApi/VendorApi.js';
import { prefixSrcDir } from '../utils/utils.js';
import DailyReportCronUseCase from './useCases/dailyReportCron/index.js';

await DailyReportCronUseCase.execute();

const typeDefs = readFileSync(prefixSrcDir('stocks/schema.graphql'), {
  encoding: 'utf-8',
});

export interface MyContext {
  // Context typing
  dataSources: {
    vendorApi: VendorApi;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  context: async () => ({
    dataSources: {
      vendorApi: new VendorApi(),
    },
  }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
