import React from 'react';
import { TradingHubStateType } from './TradingHub';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';
import {
  tradingHubOrdersCountAtom,
  tradingHubPositionsCountAtom,
  tradingHubStateAtom,
} from '@/store/store';

interface TradingHubTabProps {
  value: TradingHubStateType;
}

export const TradingHubTab = ({ value }: TradingHubTabProps) => {
  const { address } = useAccount();
  const [tradingHubState, setTradingHubState] = useAtom(tradingHubStateAtom);
  const [positionsCount] = useAtom(tradingHubPositionsCountAtom);
  const [ordersCount] = useAtom(tradingHubOrdersCountAtom);

  const isActive = tradingHubState === value;

  const count =
    value === 'positions'
      ? positionsCount
      : value === 'orders'
      ? ordersCount
      : null;

  return (
    <button
      className={`rounded-lg flex items-center justify-center text-[13px] font-semibold py-2 px-4 ${
        isActive ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
      }`}
      onClick={() => setTradingHubState(value)}
    >
      <p className='capitalize'>
        {value} {count != null && address ? `(${count})` : ''}
      </p>
    </button>
  );
};
