import { USER_ORDERS_SUBSCRIPTION } from '@/api/queries';
import { convertToSS58 } from '@/utils/convertToSS58';
import { useSubscription } from '@apollo/client';
import { useAtom } from 'jotai';
import React from 'react';
import { useAccount } from 'wagmi';
import { tradingHubStateAtom } from './TradingHub';
import { TradingHubOrders } from './TradingHubOrders/TradingHubOrders';

export const TradingHubContentContainer = () => {
  const { address } = useAccount();
  const { data } = useSubscription(USER_ORDERS_SUBSCRIPTION, {
    variables: { userId: convertToSS58(address!) },
  });
  const [tradingHubState] = useAtom(tradingHubStateAtom);
  return (
    <div className="w-full h-full">
      {tradingHubState === 'orders' && <TradingHubOrders />}
    </div>
  );
};
