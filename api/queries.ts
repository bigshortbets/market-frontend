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
