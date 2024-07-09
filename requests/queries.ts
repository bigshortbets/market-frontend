import { gql } from '@apollo/client';

/* QUuery for getting all makets */

export const GET_ALL_MARKETS_QUERY = gql`
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

export const USER_ORDERS_QUERY = gql`
  query orders($userId: String!) {
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
      type {
        ... on OpeningOrder {
          type
        }
        ... on ClosingOrder {
          type
          value
        }
      }
      market {
        id
        ticker
      }
    }
  }
`;

/* Query for getting history of given user */

export const USER_HISTORY_QUERY = gql`
  query orders($userId: String!) {
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

export const USER_OPEN_POSITIONS_QUERY = gql`
  query positions($userId: String!) {
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
      createPriceShort
      createPriceLong
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

export const RECENT_MARKET_POSITIONS_QUERY = gql`
  query SubscribePositions($marketId: String!) {
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

export const ORDER_BOOK_SHORTS_QUERY = gql`
  query aggregatedOrdersByPrices(
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
    }
  }
`;

/* Query for order book longs */

export const ORDER_BOOK_LONGS_QUERY = gql`
  query aggregatedOrdersByPrices(
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
    }
  }
`;

/* Query for getting leaderboard data */

export const LEADERBOARD_QUERY = gql`
  query generalLeaderboards {
    generalLeaderboards(orderBy: balanceChange_DESC) {
      balanceChange
      id
    }
  }
`;

/* Query for getting leaderboard data for election */

export const LEADERBOARD_ELECTION_QUERY = gql`
  query LeaderboardElection {
    userBalances(where: { market: { ticker_startsWith: "BIGSB_EL" } }) {
      balanceChange
      user
    }
  }
`;
