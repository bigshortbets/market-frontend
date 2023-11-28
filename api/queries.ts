import { gql } from '@apollo/client';

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
      quantity
      timestamp
      short
      long
      quantityLeft
      market {
        id
        ticker
        contractUnit
      }
    }
  }
`;
