import { atom, useAtom } from 'jotai';
import React from 'react';
import { OrderBookStateTab } from './OrderBookStateTab';
import { OrderBook } from './OrderBook';
import { RecentTrades } from './RecentTrades';
import { useAccount } from 'wagmi';

const tabs = ['trades', 'book'];

export type OrderBookStateTabsType = (typeof tabs)[number];

export const orderBookStateAtom = atom<OrderBookStateTabsType>('trades');

export const OrderBookContainer = () => {
  const { address } = useAccount();
  const [orderBookState] = useAtom(orderBookStateAtom);
  return (
    <div
      className={`w-[230px] h-full rounded bg-secondary-bg ${
        !address && 'opacity-50 pointer-events-none'
      }}`}
    >
      <div className={`w-full flex p-1 ${!address && 'pointer-events-none'}`}>
        {tabs.map((tab, key) => (
          <OrderBookStateTab key={key} value={tab} />
        ))}
      </div>
      <div className="w-full h-full">
        {orderBookState === 'book' && <OrderBook />}
        {orderBookState === 'trades' && <RecentTrades />}
      </div>
    </div>
  );
};
