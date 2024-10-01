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

export const useUserOrders = (ss58address: string | undefined) => {
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
    pollInterval: ss58address ? 5000 : 0,
    skip: !ss58address,
    variables: { userId: ss58address ? ss58address : '' },
  });

  useEffect(() => {
    if (ordersRes && ordersRes.orders) {
      setOrders(ordersRes.orders);
    } else if (!ss58address) {
      setOrders(undefined);
    }
  }, [ordersRes, setOrders, ss58address]);

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
      if (openOrders.length > 0 && ss58address) {
        try {
          const marginPromises = openOrders.map((order) =>
            apolloClient.query({
              query: OPEN_ORDER_MARGIN,
              variables: { orderId: order.id, address: ss58address },
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
  }, [openOrders, ss58address]);

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
