import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: 'Mutation';
  purchase: Scalars['ID']['output'];
};

export type MutationPurchaseArgs = {
  price: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
  symbol: Scalars['String']['input'];
  user: Scalars['ID']['input'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  quantity: Scalars['Int']['output'];
  symbol: Scalars['String']['output'];
};

export type PurchaseResult = {
  __typename?: 'PurchaseResult';
  errors?: Maybe<Array<Scalars['String']['output']>>;
  price: Scalars['Float']['output'];
  purchaseId?: Maybe<Scalars['ID']['output']>;
  quantity: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  user: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  dailyReport: Report;
  getPortfolio?: Maybe<Array<Portfolio>>;
  getStocks?: Maybe<Array<Stock>>;
};

export type QueryDailyReportArgs = {
  day: Scalars['String']['input'];
  user: Scalars['ID']['input'];
};

export type QueryGetPortfolioArgs = {
  user: Scalars['ID']['input'];
};

export type Report = {
  __typename?: 'Report';
  failures: Scalars['Int']['output'];
  purchaseResults?: Maybe<Array<PurchaseResult>>;
  successes: Scalars['Int']['output'];
};

export type Stock = {
  __typename?: 'Stock';
  change: Scalars['Float']['output'];
  lastUpdated: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  symbol: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Portfolio: ResolverTypeWrapper<Portfolio>;
  PurchaseResult: ResolverTypeWrapper<PurchaseResult>;
  Query: ResolverTypeWrapper<{}>;
  Report: ResolverTypeWrapper<Report>;
  Stock: ResolverTypeWrapper<Stock>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Portfolio: Portfolio;
  PurchaseResult: PurchaseResult;
  Query: {};
  Report: Report;
  Stock: Stock;
  String: Scalars['String']['output'];
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  purchase?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationPurchaseArgs, 'price' | 'quantity' | 'symbol' | 'user'>
  >;
};

export type PortfolioResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Portfolio'] = ResolversParentTypes['Portfolio'],
> = {
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PurchaseResult'] = ResolversParentTypes['PurchaseResult'],
> = {
  errors?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  purchaseId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  dailyReport?: Resolver<
    ResolversTypes['Report'],
    ParentType,
    ContextType,
    RequireFields<QueryDailyReportArgs, 'day' | 'user'>
  >;
  getPortfolio?: Resolver<
    Maybe<Array<ResolversTypes['Portfolio']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPortfolioArgs, 'user'>
  >;
  getStocks?: Resolver<
    Maybe<Array<ResolversTypes['Stock']>>,
    ParentType,
    ContextType
  >;
};

export type ReportResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Report'] = ResolversParentTypes['Report'],
> = {
  failures?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  purchaseResults?: Resolver<
    Maybe<Array<ResolversTypes['PurchaseResult']>>,
    ParentType,
    ContextType
  >;
  successes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Stock'] = ResolversParentTypes['Stock'],
> = {
  change?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lastUpdated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Portfolio?: PortfolioResolvers<ContextType>;
  PurchaseResult?: PurchaseResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Report?: ReportResolvers<ContextType>;
  Stock?: StockResolvers<ContextType>;
};
