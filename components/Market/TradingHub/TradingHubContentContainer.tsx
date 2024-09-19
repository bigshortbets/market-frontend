import {
  USER_HISTORY_QUERY,
  USER_MARKET_SETTLEMENTS_QUERY,
  USER_OPEN_POSITIONS_QUERY,
  USER_ORDERS_QUERY,
} from '@/requests/queries';
import { convertToSS58 } from '@/utils/convertToSS58';
import { useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import {} from './TradingHub';
import { TradingHubOrders } from './TradingHubOrders/TradingHubOrders';
import { OrdersResponse } from '@/types/orderTypes';
import { PositionsResponse } from '@/types/positionTypes';
import { TradingHubPositions } from './TradingHubPositions/TradingHubPositions';
import { TradingHubHistory } from './TradingHubHistory/TradingHubHistory';
import { HistoryResponse } from '@/types/historyTypes';
import { useOpponentsMargin } from '@/blockchain/hooks/useOpponentsMargin';
import { useUnsettledLosses } from '@/hooks/useUnsettledLosses';
import { useCollateral } from '@/hooks/useCollateral';
import {
  tradingHubOrdersCountAtom,
  tradingHubPositionsCountAtom,
  tradingHubStateAtom,
} from '@/store/store';
import { MarketSettlementsResponse } from '@/types/marketSettlementsTypes';
import { ChatContainer } from './Chat/ChatContainer';
import { useUserPositions } from '@/hooks/useUserPositions';

interface TradingHubContentContainerProps {
  isAggregated: boolean;
}

export const TradingHubContentContainer = ({
  isAggregated,
}: TradingHubContentContainerProps) => {
  const { address } = useAccount();
  const [, setOrdersCount] = useAtom(tradingHubOrdersCountAtom);
  const [, setPositionsCount] = useAtom(tradingHubPositionsCountAtom);
  const { data: ordersRes } = useQuery<OrdersResponse>(USER_ORDERS_QUERY, {
    pollInterval: 1000,
    variables: { userId: convertToSS58(address!) },
  });

  const { positions, aggregatedPositions } = useUserPositions(address);

  const { data: historyOrdersRes } = useQuery<HistoryResponse>(
    USER_HISTORY_QUERY,
    {
      pollInterval: 1000,
      variables: { userId: convertToSS58(address!) },
    }
  );

  const { data: marketSettlementsRes } = useQuery<MarketSettlementsResponse>(
    USER_MARKET_SETTLEMENTS_QUERY,
    {
      pollInterval: 1000,
      variables: { userId: convertToSS58(address!) },
    }
  );

  useUnsettledLosses(positions, address!);
  useCollateral(positions, address!);

  const [tradingHubState] = useAtom(tradingHubStateAtom);
  useOpponentsMargin(positions, address!);

  useEffect(() => {
    if (ordersRes?.orders) {
      setOrdersCount(ordersRes.orders.length);
    }
    if (positions) {
      setPositionsCount(positions.length);
    }
  }, [ordersRes?.orders, positions]);

  return (
    <div className='w-full no-scrollbar'>
      {tradingHubState === 'orders' && ordersRes && historyOrdersRes && (
        <TradingHubOrders
          orders={ordersRes.orders}
          historyOrders={historyOrdersRes.orders}
        />
      )}
      {tradingHubState === 'positions' && positions && (
        <TradingHubPositions
          isAggregated={isAggregated}
          positions={positions}
          aggregatedPositions={aggregatedPositions}
        />
      )}
      {tradingHubState === 'history' && marketSettlementsRes && (
        <TradingHubHistory
          settlements={marketSettlementsRes.marketSettlements}
        />
      )}
      {/* {tradingHubState === 'chart' && chartData && (
        <TradingHubChart data={chartData} />
      )} */}
      {tradingHubState === 'chat' && <ChatContainer />}
    </div>
  );
};
