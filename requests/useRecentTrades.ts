import { useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { recentTradesAtom } from '@/components/Market/Market';
import { RecentPositionTypeResponse } from '@/types/positionTypes';
import { RECENT_MARKET_POSITIONS_QUERY } from './queries';

export const useRecentTrades = (selectedMarketId: string) => {
  const { data, error, loading } = useQuery<RecentPositionTypeResponse>(
    RECENT_MARKET_POSITIONS_QUERY,
    {
      pollInterval: 1000,
      variables: { marketId: selectedMarketId },
    }
  );
  const [, setRecentTrades] = useAtom(recentTradesAtom);

  useEffect(() => {
    if (data) {
      setRecentTrades(data.positions);
    }
  }, [data, setRecentTrades]);

  return { loading, error };
};
