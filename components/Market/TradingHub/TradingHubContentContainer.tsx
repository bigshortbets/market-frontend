import {
  USER_HISTORY_SUBSCRIPTION,
  USER_OPEN_POSITIONS_SUBSCRIPTION,
  USER_ORDERS_SUBSCRIPTION,
} from '@/api/queries';
import { convertToSS58 } from '@/utils/convertToSS58';
import { useSubscription } from '@apollo/client';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import {
  tradingHubOrdersCountAtom,
  tradingHubPositionsCountAtom,
  tradingHubStateAtom,
} from './TradingHub';
import { TradingHubOrders } from './TradingHubOrders/TradingHubOrders';
import { OrdersResponse } from '@/types/orderTypes';
import { PositionsResponse } from '@/types/positionTypes';
import { TradingHubPositions } from './TradingHubPositions/TradingHubPositions';
import { TradingHubHistory } from './TradingHubHistory/TradingHubHistory';
import { HistoryResponse } from '@/types/historyTypes';
import { useOpponentsMargin } from '@/blockchain/hooks/useOpponentsMargin';
import { useUnsettledLosses } from '@/hooks/useUnsettledLosses';
import { useCollateral } from '@/hooks/useCollateral';

export const TradingHubContentContainer = () => {
  const { address } = useAccount();
  const [, setOrdersCount] = useAtom(tradingHubOrdersCountAtom);
  const [, setPositionsCount] = useAtom(tradingHubPositionsCountAtom);
  const { data: ordersRes } = useSubscription<OrdersResponse>(
    USER_ORDERS_SUBSCRIPTION,
    {
      variables: { userId: convertToSS58(address!) },
    }
  );

  const { data: positionsRes } = useSubscription<PositionsResponse>(
    USER_OPEN_POSITIONS_SUBSCRIPTION,
    {
      variables: { userId: convertToSS58(address!) },
    }
  );

  const { data: historyRes } = useSubscription<HistoryResponse>(
    USER_HISTORY_SUBSCRIPTION,
    {
      variables: { userId: convertToSS58(address!) },
    }
  );

  useUnsettledLosses(positionsRes?.positions, address!);
  useCollateral(positionsRes?.positions, address!);

  const [tradingHubState] = useAtom(tradingHubStateAtom);
  useOpponentsMargin(positionsRes?.positions!, address!);

  useEffect(() => {
    if (ordersRes?.orders) {
      setOrdersCount(ordersRes.orders.length);
    }
    if (positionsRes?.positions) {
      setPositionsCount(positionsRes.positions.length);
    }
  }, [ordersRes?.orders, positionsRes?.positions]);

  return (
    <div className="w-full no-scrollbar">
      {tradingHubState === 'orders' && ordersRes && (
        <TradingHubOrders orders={ordersRes.orders} />
      )}
      {tradingHubState === 'positions' && positionsRes && (
        <TradingHubPositions positions={positionsRes.positions} />
      )}
      {tradingHubState === 'history' && historyRes && (
        <TradingHubHistory history={historyRes.orders} />
      )}
    </div>
  );
};
