import { useQuery, gql } from '@apollo/client';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { userOrdersAtom } from '@/store/store';
import { USER_ORDERS_QUERY } from '@/requests/queries';
import { convertToSS58 } from '@/utils/convertToSS58';
import { OrdersResponse, OrderType } from '@/types/orderTypes';
import { apolloClient } from '@/requests/graphql';

export const OPEN_ORDER_MARGIN = gql`
  query openOrderMargin($orderId: String!, $address: String!) {
    getMargin(marketId: $orderId, walletAddress: $address) {
      Margin
    }
  }
`;

export const useUserOrders = (address: `0x${string}` | undefined) => {
  const [orders, setOrders] = useAtom(userOrdersAtom);
  const [openOrdersTotalMargin, setOpenOrdersTotalMargin] = useState<
    number | undefined
  >(undefined);

  const {
    data: ordersRes,
    loading,
    error,
    refetch,
  } = useQuery<OrdersResponse>(USER_ORDERS_QUERY, {
    pollInterval: address ? 5000 : 0,
    skip: !address,
    variables: { userId: address ? convertToSS58(address) : '' },
  });

  useEffect(() => {
    if (ordersRes && ordersRes.orders) {
      setOrders(ordersRes.orders);
    } else if (!address) {
      setOrders(undefined);
    }
  }, [ordersRes, setOrders, address]);

  const splitOrdersByType = (
    orders: OrderType[] = []
  ): { open: OrderType[]; close: OrderType[] } => {
    return orders.reduce(
      (acc, order) => {
        if (order.type.type === 'OpeningOrder') {
          acc.open.push(order);
        } else if (order.type.type === 'ClosingOrder') {
          acc.close.push(order);
        }
        return acc;
      },
      { open: [], close: [] } as { open: OrderType[]; close: OrderType[] }
    );
  };

  const { open: openOrders, close: closeOrders } = useMemo(() => {
    if (orders) {
      return splitOrdersByType(orders);
    }
    return { open: [], close: [] };
  }, [orders]);

  useEffect(() => {
    const fetchMargins = async () => {
      if (openOrders.length > 0 && address) {
        try {
          const marginPromises = openOrders.map((order) =>
            apolloClient.query({
              query: OPEN_ORDER_MARGIN,
              variables: { orderId: order.id, address: convertToSS58(address) },
            })
          );

          const results = await Promise.all(marginPromises);
          const total = results.reduce(
            (sum, res) => sum + (Number(res.data?.getMargin?.Margin) || 0),
            0
          );
          setOpenOrdersTotalMargin(total);
        } catch (e) {
          console.error('Error fetching margins:', e);
          setOpenOrdersTotalMargin(undefined);
        }
      } else {
        setOpenOrdersTotalMargin(undefined);
      }
    };

    fetchMargins();
  }, [openOrders, address]);

  return {
    loading,
    error,
    refetch,
    orders,
    openOrders,
    closeOrders,
    openOrdersTotalMargin,
  };
};
