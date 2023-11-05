import React from 'react';
import { TradingHubTab } from './TradingHubTab';
import { atom, useAtom } from 'jotai';
import { useAccount } from 'wagmi';

const tabs = ['positions', 'orders', 'history'] as const;

export type TradingHubStateType = (typeof tabs)[number];

export const tradingHubStateAtom = atom<TradingHubStateType>('orders');

const disabledStyle = 'opacity-50 pointer-events-none';

export const TradingHub = () => {
  const { address } = useAccount();
  return (
    <div
      className={`h-[500px] bg-secondary-bg flex-grow rounded-lg transition ease-in-out ${
        !address && disabledStyle
      }`}
    >
      <div className="w-full bg-primary-bg h-[45px]">
        <div className="bg-secondary-bg rounded-t w-1/2 h-full flex p-[2px] gap-1">
          {tabs.map((tab, key) => (
            <TradingHubTab key={key} value={tab} />
          ))}
        </div>
      </div>
    </div>
  );
};
