import { useQuery, gql } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { OrderBookResponse, OrderBookOrder } from '@/types/orderTypes';
import { OrderSide } from '@/components/Market/OrderBook/OrderBook';

export const ORDER_BOOK_LONGS_QUERY = gql`
  query OrderBookLongs($marketId: String!, $limit: Int!, $side: String!) {
    aggregatedOrdersByPrices(marketId: $marketId, limit: $limit, side: $side) {
      price
      quantity
    }
  }
`;

export const ORDER_BOOK_SHORTS_QUERY = gql`
  query OrderBookShorts($marketId: String!, $limit: Int!, $side: String!) {
    aggregatedOrdersByPrices(marketId: $marketId, limit: $limit, side: $side) {
      price
      quantity
    }
  }
`;

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
    pollInterval: selectedMarketId ? 1000 : 0,
    skip: !selectedMarketId,
    variables: {
      marketId: selectedMarketId ?? '',
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
    pollInterval: selectedMarketId ? 1000 : 0,
    skip: !selectedMarketId,
    variables: {
      marketId: selectedMarketId ?? '',
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
  const unifiedRefetch = () => {
    refetchLongs();
    refetchShorts();
  };

  return {
    longs,
    shorts,
    loading: unifiedLoading,
    error: unifiedError,
    refetch: unifiedRefetch,
  };
};
