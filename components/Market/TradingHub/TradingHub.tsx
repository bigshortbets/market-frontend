import { TradingHubTab } from './TradingHubTab';
import { atom, useAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { TradingHubContentContainer } from './TradingHubContentContainer';
import { useState } from 'react';

const tabs = ['positions', 'orders', 'history'] as const;

export type TradingHubStateType = (typeof tabs)[number];

export const tradingHubStateAtom = atom<TradingHubStateType>('positions');
export const tradingHubPositionsCountAtom = atom<number>(0);
export const tradingHubOrdersCountAtom = atom<number>(0);

export const TradingHub = () => {
  const { address } = useAccount();

  const [positionsCount] = useAtom(tradingHubPositionsCountAtom);
  const [ordersCount] = useAtom(tradingHubOrdersCountAtom);

  const getCountForTab = (tabName: string) => {
    switch (tabName) {
      case 'positions':
        return positionsCount;
      case 'orders':
        return ordersCount;
      default:
        return null; // For 'history' or other tabs that don't have a count
    }
  };

  return (
    <div className=" h-[calc(100vh-166px)] lg:flex-1 lg:h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]">
      <div className="flex-grow">
        <div className="px-2.5 pt-3 pb-2.5 flex gap-1">
          {tabs.map((tab, key) => (
            <TradingHubTab key={key} value={tab} />
          ))}
        </div>
        {address && <TradingHubContentContainer />}
      </div>
      <div className="h-[58px] border-t border-[#444650] "></div>
    </div>
  );
};
