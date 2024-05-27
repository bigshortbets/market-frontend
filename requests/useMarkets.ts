import { useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { marketsAtom } from '@/store/store';
import { EnrichedMarketType, MarketsQueryResponse } from '@/types/marketTypes';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import { currentBlockAtom } from '@/components/Market/Market';
import { calculateMarketClosing } from '@/utils/calculateMarketClosing';
import { GET_ALL_MARKETS_QUERY } from './queries';

export const useMarkets = () => {
  const [, setMarkets] = useAtom(marketsAtom);
  const [blockHeight] = useAtom(currentBlockAtom);

  const { data } = useQuery<MarketsQueryResponse>(GET_ALL_MARKETS_QUERY, {
    pollInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      const extendedMarkets = data.markets.map((market) => {
        let extendedMarket: EnrichedMarketType = market;

        const details = getMarkeDetails(market.ticker);
        if (details) {
          extendedMarket = { ...extendedMarket, ...details };
        }

        const timingData = calculateMarketClosing(
          blockHeight!,
          Number(market.lifetime)
        );

        if (timingData) {
          extendedMarket = { ...extendedMarket, ...timingData };
        }

        return extendedMarket;
      });
      setMarkets(extendedMarkets);
    }
  }, [data, setMarkets]);
};
