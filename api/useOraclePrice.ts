import { gql, useQuery } from '@apollo/client';

const GET_ORACLE_PRICE = gql`
  query QueryOraclePrices($marketId: String!) {
    getLatestOraclePrice(marketId: $marketId) {
      price
    }
  }
`;

export const useOraclePrice = (marketId: string) => {
  const { data } = useQuery(GET_ORACLE_PRICE, {
    variables: { marketId },
    pollInterval: 1000,
  });

  const oraclePriceData = data && BigInt(data.getLatestOraclePrice.price);

  return oraclePriceData;
};
