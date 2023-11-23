import {
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

  const [tradingHubState] = useAtom(tradingHubStateAtom);

  return (
    <div className="w-full h-[420px] overflow-y-auto no-scrollbar">
      {tradingHubState === 'orders' && ordersRes && (
        <TradingHubOrders orders={ordersRes.orders} />
      )}
      {tradingHubState === 'positions' && positionsRes && (
        <TradingHubPositions positions={positionsRes.positions} />
      )}
    </div>
  );
};
