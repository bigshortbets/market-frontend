import { MarketType } from '@/types/marketTypes';
import { gql, useSubscription } from '@apollo/client';
import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const GET_ALL_MARKETS = gql`
  subscription {
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

type MarketsQueryResponse = {
  markets: MarketType[];
};

export const useMarkets = () => {
  const {
    loading: marketsLoading,
    error: marketsError,
    data,
  } = useSubscription<MarketsQueryResponse>(GET_ALL_MARKETS);

  const markets = data?.markets;

  const initialMarket = markets?.[0];
  return {
    markets,
    marketsLoading,
    marketsError,
    initialMarket,
  };
};
