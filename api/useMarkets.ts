import { Market } from '@/types/marketTypes';
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
    }
  }
`;

type MarketsQueryResponse = {
  markets: Market[];
};

export const selectedMarketAtom = atom<Market | undefined>(undefined);

export const useMarkets = () => {
  const {
    loading: marketsLoading,
    error: marketsError,
    data,
  } = useSubscription<MarketsQueryResponse>(GET_ALL_MARKETS);

  const hasSetInitialMarket = useRef(false);

  const [selectedMarket, setSelectedMarket] = useAtom(selectedMarketAtom);

  const markets = data?.markets;

  useEffect(() => {
    if (markets && markets.length > 0 && !hasSetInitialMarket.current) {
      setSelectedMarket(markets[0]);
      hasSetInitialMarket.current = true;
    }
  }, [markets, setSelectedMarket]);

  const initialMarket = markets?.[0];
  return {
    markets,
    marketsLoading,
    marketsError,
    initialMarket,
    selectedMarket,
    setSelectedMarket,
  };
};
