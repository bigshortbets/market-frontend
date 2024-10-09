import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { OrderBookResponse, OrderBookOrder } from '@/types/orderTypes';
import { OrderSide } from '@/components/Market/OrderBook/OrderBook';
import {
  ORDER_BOOK_LONGS_QUERY,
  ORDER_BOOK_SHORTS_QUERY,
} from '@/requests/queries';

export const useOrderBook = (selectedMarketId: string | undefined) => {
  const [changeMarketLoading, setChangeMarketLoading] = useState(false);

  useEffect(() => {
    if (selectedMarketId) {
      setChangeMarketLoading(true);
      const timer = setTimeout(() => {
        setChangeMarketLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedMarketId]);

  const {
    data: longsRes,
    loading: longsLoading,
    error: longsError,
    refetch: refetchLongs,
  } = useQuery<OrderBookResponse>(ORDER_BOOK_LONGS_QUERY, {
    pollInterval: selectedMarketId ? 3000 : 0,
    skip: !selectedMarketId,
    variables: {
      marketId: selectedMarketId,
      limit: 5,
      side: OrderSide.LONG,
    },
  });

  const {
    data: shortsRes,
    loading: shortsLoading,
    error: shortsError,
    refetch: refetchShorts,
  } = useQuery<OrderBookResponse>(ORDER_BOOK_SHORTS_QUERY, {
    pollInterval: selectedMarketId ? 3000 : 0,
    skip: !selectedMarketId,
    variables: {
      marketId: selectedMarketId,
      limit: 5,
      side: OrderSide.SHORT,
    },
  });

  const longs: OrderBookOrder[] = useMemo(
    () => longsRes?.aggregatedOrdersByPrices ?? [],
    [longsRes]
  );
  const shorts: OrderBookOrder[] = useMemo(
    () => shortsRes?.aggregatedOrdersByPrices ?? [],
    [shortsRes]
  );

  const unifiedLoading = longsLoading || shortsLoading || changeMarketLoading;
  const unifiedError = longsError || shortsError;
  const unifiedRefetch = async () => {
    await Promise.all([refetchLongs(), refetchShorts()]);
  };

  return {
    longs,
    shorts,
    loading: unifiedLoading,
    error: unifiedError,
    refetch: unifiedRefetch,
  };
};
