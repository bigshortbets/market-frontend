import { gql } from '@apollo/client';

/* QUuery for getting all makets */

export const GET_ALL_MARKETS = gql`
  query {
    markets {
      id
      ticker
      tickSize
      lifetime
      initialMargin
      maintenanceMargin
      contractUnit
      blockHeight
      timestamp
      dailyVolume
      oraclePrice
    }
  }
`;

/* Query for getting orders of given user */

export const USER_ORDERS_SUBSCRIPTION = gql`
  subscription orders($userId: String!) {
    orders(
      where: { status_eq: ACTIVE, who_eq: $userId }
      orderBy: timestamp_DESC
    ) {
      who
      timestamp
      quantity
      initialQuantity
      price
      id
      blockHeight
      side
      status
      market {
        id
        ticker
      }
    }
  }
`;

/* Query for getting history of given user */

export const USER_HISTORY_SUBSCRIPTION = gql`
  subscription orders($userId: String!) {
    orders(
      where: {
        who_eq: $userId
        AND: { status_eq: COMPLETED, OR: { status_eq: CANCELLED } }
      }
      orderBy: timestamp_DESC
    ) {
      who
      timestamp
      quantity
      initialQuantity
      price
      id
      blockHeight
      side
      status
      market {
        id
        ticker
      }
    }
  }
`;

/* Query for getting open positions of given user */

export const USER_OPEN_POSITIONS_SUBSCRIPTION = gql`
  subscription positions($userId: String!) {
    positions(
      where: {
        AND: [
          { OR: [{ long_eq: $userId }, { short_eq: $userId }] }
          { status_eq: OPEN }
        ]
      }
      orderBy: timestamp_DESC
    ) {
      id
      price
      createPrice
      quantity
      timestamp
      short
      long
      quantityLeft
      market {
        id
        ticker
        contractUnit
        oraclePrice
      }
    }
  }
`;

/* Query for recent positions of given market*/

export const RECENT_MARKET_POSITIONS_SUBSCRIPTION = gql`
  subscription SubscribePositions($marketId: String!) {
    positions(
      where: { market: { id_eq: $marketId } }
      limit: 10
      orderBy: timestamp_DESC
    ) {
      id
      price
      timestamp
      quantity
      createPrice
    }
  }
`;

/* Query for order book shorts */

export const ORDER_BOOK_SHORTS_SUBSCRIPTION = gql`
  subscription aggregatedOrdersByPrices(
    $marketId: String!
    $limit: Int!
    $side: OrderSide!
  ) {
    aggregatedOrdersByPrices(
      where: { market: { id_eq: $marketId }, side_eq: $side }
      limit: $limit
      orderBy: price_ASC
    ) {
      quantity
      price
      id
    }
  }
`;

/* Query for order book longs */

export const ORDER_BOOK_LONGS_SUBSCRIPTION = gql`
  subscription aggregatedOrdersByPrices(
    $marketId: String!
    $limit: Int!
    $side: OrderSide!
  ) {
    aggregatedOrdersByPrices(
      where: { market: { id_eq: $marketId }, side_eq: $side }
      limit: $limit
      orderBy: price_DESC
    ) {
      quantity
      price
      id
    }
  }
`;
