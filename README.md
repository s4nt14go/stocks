## Stocks

Backend service for stock trading operations. It has the following endpoints:

1. List available stocks.
2. Get user portfolios (list of their stocks and quantities)
3. Execute stock purchase transactions
4. Generate and send by email daily reports including successful and failed transactions

### Considerations

Source data is retrieved from a 3rd party API provided by a stock vendor with the following characteristics:
- The stock vendor changes the stock price every 5 minutes
- The stock vendor is not reliable 100% all the time

When purchasing a stock, if the price is more/less than 2% from the current stock price, the transaction will fail. For example:
- If the stock price is 100, and the user tries to buy it for 95, the transaction should fail because it's more than 2% of the stock price
- If the stock price is 100, and the user tries to buy it for 98.5, the transaction should succeed because it's less than 2% of the stock price

## Architecture

These are the reasons behind the choices made in the project. They don’t represent an exhaustive list of the technologies' advantages, but rather a few points I believe are worth highlighting.

- The architecture is based on the **hexagonal**/**onion**/**layered** **architecture**, a pattern which promotes separation of concerns and makes the codebase more maintainable and testable. This pattern allows for easy integration with different external systems (like the stock vendor API and the database) without tightly coupling them to the core business logic.
- The use of **dependency injection** allows for better testability and flexibility in the codebase. Additionally, it enables the use of different implementations for the same interface, making it easier to swap out components as needed.
- The **screaming architecture** principle is applied, where the code structure and naming conventions clearly reflect the business domain. This makes it easier for developers to understand the purpose of each component and how they fit into the overall system.
```
src/
├── core/                # Supporting files not related to the business domain
│   ├── domain/          # Base classes for domain entities and value objects
├── infra/               # Infrastructure-related code
│   ├── sequelize/       # Sequelize ORM configuration and models
│   └── events           # Event bus and subscriptions
├── stocks/              # Stocks-related domain and repository logic
│   ├── domain/          # Domain models and value objects for stocks
│   ├── repos/           # Repository interfaces and implementations for stocks
│   ├── services/        # Services related to stocks
│   │   ├── email/       # Email sender
│   │   └── vendorApi/    # Stock vendor API data source
│   └── useCases/        # Use cases for stocks
│       ├── dailyReport  # Get daily report       
│       ├── dailyReportCron # Runs every day and sends a report  
│       ├── getPortfolio # Get user portfolio
│       ├── getStocks    # Get available stocks
│       ├── purchase     # Purchase stocks
│       └── purchaseResultSubscriber # Save purchase results
└── utils/               # General-purpose utility functions
```
- The **pubsub pattern** is used to decouple the use cases (e.g. purchasing and saving purchase result). This allows for better separation of concerns, making the codebase more maintainable and scalable. Another advantage is it enables a quicker response to the user, as the purchase result is saved in a different process.

## GraphQL

GraphQL is chosen for the API, their advantages include:
- **Flexibility**: Clients can request only the data they need, reducing over-fetching and under-fetching.
- **Strongly Typed**: GraphQL schemas are strongly typed, which helps in validating queries and responses.
- **Single Endpoint**: Unlike REST, which often requires multiple endpoints for different resources, GraphQL uses a single endpoint for all interactions.
- **Documentation**: GraphQL APIs are self-documenting, allowing developers to explore the API and understand its capabilities without extensive documentation.
- **Great Testing Experience**: The GraphQL Playground allows saving operations and variables, which simplifies testing. These saved configurations can be shared via a link, enabling collaborative testing and allowing the API to be tested directly from the browser.
- **Real-time Communication**: GraphQL supports subscriptions, allowing for real-time updates pushed to clients.
- **Versioning**: GraphQL APIs can evolve without versioning, as clients can request only the fields they need. This allows for smoother transitions when adding or deprecating fields.
- **Tooling**: GraphQL has excellent tooling support, including IDE plugins, documentation generators, and client libraries.

## SQL

- The main reason to choosing SQL as the database it's because it enables a trackable and revertible **data model evolution** through schema migrations, providing reliable adaptation to changing requirements.
- **CockroachDB** is used as the database.

## Implementation details

- **Entry point**: [server.ts](https://github.com/s4nt14go/stocks/blob/master/src/stocks/server.ts)
- To run in production using script **prod** with need to import files using `.js` extension.


Schema:
```graphql
type Query {
  getStocks: [Stock!]
  getPortfolio(
    user: ID!
  ): [Portfolio!]
  dailyReport(
    day: String!
  ): Report!
}

type Mutation {
  purchase(
    user: ID!
    symbol: String!
    quantity: Int!
    price: Float!
  ): ID!
}
```

Use cases:
- [Query.getStocks](https://github.com/s4nt14go/stocks/blob/master/src/stocks/useCases/getStocks): Returns all available stocks for purchase. It makes use of service [VendorApi](https://github.com/s4nt14go/stocks/blob/master/src/stocks/services/vendorApi/VendorApi.ts), where:
    - **Exponential backoff** is implemented as the API stock vendor is not reliable 100% all the time.
    - **All available stocks** for purchase are returned, since they're just a few and that would simplify the client code. If this wasn't the case, a paginated response would be more appropriate.
- [Query.getPortfolio](https://github.com/s4nt14go/stocks/blob/master/src/stocks/useCases/getPortfolio): Returns the portfolio of a user, including the stocks they own and their quantities.
- [Query.dailyReport](https://github.com/s4nt14go/stocks/blob/master/src/stocks/useCases/dailyReport): Returns a report of the daily transactions, including successful and failed purchases.
- [Mutation.purchase](https://github.com/s4nt14go/stocks/blob/master/src/stocks/useCases/purchase): Executes a stock purchase transaction for a user, returning the transaction ID.
- [DailyReportCron](https://github.com/s4nt14go/stocks/tree/master/src/stocks/useCases/dailyReportCron): Generates and sends by email a daily report including successful and failed transactions, it was implemented a cron job using `node-cron`, executed in [server.ts](https://github.com/s4nt14go/stocks/blob/master/src/stocks/server.ts).

For details about every schema type, please refer to the [GraphQL schema](https://github.com/s4nt14go/stocks/blob/master/src/stocks/schema.graphql).

## Deployment

The project is deployed on **Google Cloud Run** to https://api-465156217155.us-central1.run.app. For the `user` argument, use any of the user IDs from the [seeded](https://github.com/s4nt14go/stocks/blob/master/src/infra/sequelize/migrations/Users.json) data:

```shell
00ad8920-c36d-11ee-8adf-3f66c88fcbdd
01a82ed0-c39a-11ee-8adf-3f66c88fcbdd
```

Use this [link](https://api-465156217155.us-central1.run.app/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoDKK0A1gM5HAA6SRRA5uVbQ8620QA2AQzooAqgAcwwlAjAsBRKAAthSTooGS8ASygItbJMMRGidAnABGEQVoC%2BLJ0hY58xMigAKEPCgAzO10IAAoAEhg6fHQiAEkAEQBCAEpGLU4fP0DgsKiYokjovDS%2BJUsbO3McdRRdFAJHZxY3XEIiBOFdQQIAJQRJbIiZAliqPQ1U9P4Zbr6BoZHY8JHS8xHzOhgoAzpounMArsEYPAQD-jZJU9VRBH6twRReczYxWSjXonw8PwulNg1VD1RqXAT5PBfCq2exgq56Axfa54W7ROIKMEuNguFwsOAwFCyEKsACyBKJECQEQhsUSSQANIVoXYxigJuwGYUgXUGrTUJzwjp9AhYgAxQQQWRTMpEZGohChGmFCGM5mCZZqxnckHLbUNRlCgzLQ0IFLOED0kAAN2EemE1kE5wwIBlTHAwkaGCIboATAAGH0AVgAtH6ACzBn0ARjd9K0bohbtibr9fuEYAAHABOf3BqAAZgAbGBg1GowgEMGM%2BmAsH8wFC4WoBmMwEoNYwAoLfGQBCfUnvSA-VHhBmffI-Xn81nhKXy5Xq2Ba-XG83W%2B3O7Ge2qB26AHIANQSAEEt-w3XrPbEo3HzyATQO-QA6IPmhxAA) to prefill the GraphQL Playground with operations and variables, for an easier testing experience:
- Place the cursor inside an operation and click the play button.
- Make purchases, change `day` variable to today in `YYYY-MM-DD` format and run query `DailyReport` to see your purchases in the report. Please note: the report cutoff is at 00:00 UTC, so if you're in a different time zone, you may need to adjust the date based on the time of day in order to see your recent purchases.