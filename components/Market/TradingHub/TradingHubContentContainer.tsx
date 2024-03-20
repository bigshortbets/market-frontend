import {
  USER_HISTORY_SUBSCRIPTION,
  USER_OPEN_POSITIONS_SUBSCRIPTION,
  USER_ORDERS_SUBSCRIPTION,
} from '@/api/queries';
import { convertToSS58 } from '@/utils/convertToSS58';
import { useSubscription } from '@apollo/client';
import { useAtom } from 'jotai';
import React from 'react';
import { useAccount } from 'wagmi';
import { tradingHubStateAtom } from './TradingHub';
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

  const oraclePrice = positionsRes?.positions[0].market.oraclePrice;

  useUnsettledLosses(positionsRes?.positions, address!, oraclePrice!);
  useCollateral(positionsRes?.positions, address!);

  const [tradingHubState] = useAtom(tradingHubStateAtom);
  useOpponentsMargin(positionsRes?.positions!, address!);

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
