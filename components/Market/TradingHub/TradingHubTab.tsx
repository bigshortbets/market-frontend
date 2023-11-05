import React from 'react';
import { TradingHubStateType, tradingHubStateAtom } from './TradingHub';
import { useAtom } from 'jotai';

interface TradingHubTabProps {
  value: TradingHubStateType;
}

export const TradingHubTab = ({ value }: TradingHubTabProps) => {
  const [tradingHubState, setTradingHubState] = useAtom(tradingHubStateAtom);

  const isActive = tradingHubState === value;
  return (
    <button
      className={`flex-1  rounded flex items-center justify-center text-sm font-semibold ${
        isActive ? 'bg-primary-bg' : 'bg-secondary-bg'
      }`}
      onClick={() => setTradingHubState(value)}
    >
      <p className="capitalize">{value}</p>
    </button>
  );
};
