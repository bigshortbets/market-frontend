import { atom, useAtom } from 'jotai';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { OrderBookStateTab } from '../OrderBook/OrderBookStateTab';
import { FinanceManagerTab } from './FinanceManagerTab';
import { OrderManager } from '../OrderManager/OrderManager';
import { MarketType } from '@/types/marketTypes';
import { Deposit } from '../Deposit/Deposit';
import useGetDeposit from '@/blockchain/hooks/useGetDeposit';
import { selectedMarketIdAtom } from '../Market';
import { findMarketById } from '@/utils/findMarketById';

interface FinanceManagerProps {
  markets: MarketType[];
}

const tabs = ['order', 'deposit'];

export type FinanceManagerTabsType = (typeof tabs)[number];
export const financeManagerAtom = atom<FinanceManagerTabsType>('order');

export const FinanceManager = ({ markets }: FinanceManagerProps) => {
  const [getDepositRefetchTrigger, setGetDepositRefetchTrigger] =
    useState<number>(1);

  const triggerDepositRefetch = () => {
    setGetDepositRefetchTrigger(
      (getDepositRefetchTrigger) => getDepositRefetchTrigger + 1
    );
  };
  const [financeManagerState] = useAtom(financeManagerAtom);
  const { address } = useAccount();
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { depositRes } = useGetDeposit(
    selectedMarketId,
    address,
    getDepositRefetchTrigger
  );
  const selectedMarket = findMarketById(markets, selectedMarketId);
  return (
    <div
      className="w-[300px] h-[350px] rounded p-1 bg-secondary-bg"
      onClick={() => console.log(getDepositRefetchTrigger)}
    >
      <div
        className={`w-full flex p-1 ${!address && 'pointer-events-none'} mb-3`}
      >
        {tabs.map((tab, key) => (
          <FinanceManagerTab value={tab} key={key} />
        ))}
      </div>
      {financeManagerState === 'order' && <OrderManager markets={markets} />}
      {financeManagerState === 'deposit' && (
        <Deposit
          triggerDepositRefetch={triggerDepositRefetch}
          depositValue={(depositRes as any)!.result as string}
          selectedMarket={selectedMarket!}
        />
      )}
    </div>
  );
};
