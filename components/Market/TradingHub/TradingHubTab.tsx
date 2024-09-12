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
      className={`rounded-lg items-center justify-center text-[12px] font-semibold py-1.5 px-3 ${
        isActive ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
      } ${value === 'chat' ? 'hidden lg:flex' : 'flex'}`}
      onClick={() => setTradingHubState(value)}
    >
      <p className='capitalize'>
        {value} {count != null && address ? `(${count})` : ''}
      </p>
    </button>
  );
};
