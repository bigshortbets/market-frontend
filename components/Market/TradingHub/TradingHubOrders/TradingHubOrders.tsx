import React, { useEffect } from 'react';
import { TradingHubOrdersItem } from './TradingHubOrdersItem';
import { OrderType } from '@/types/orderTypes';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useAtom } from 'jotai';
import { tradingHubOrdersCountAtom } from '../TradingHub';

interface TradingHubOrdersProps {
  orders: OrderType[];
}

export const TradingHubOrders = ({ orders }: TradingHubOrdersProps) => {
  /* const [animationParent] = useAutoAnimate(); - Not working properly*/

  const [, setOrdersCount] = useAtom(tradingHubOrdersCountAtom);

  useEffect(() => {
    setOrdersCount(orders.length);
  }, [orders]);
  return (
    <div
      className="w-full h-full overflow-y-auto no-scrollbar"
      style={{ maxHeight: 'calc(100vh - 230px)' }}
    >
      {orders.length > 0 ? (
        <table className="table-auto w-full">
          <thead className="bg-secondary-bg text-sm text-left text-[#ABACBA]">
            <tr>
              <th className="font-normal py-3 pl-3">Side</th>
              <th className="font-normal">Created</th>
              <th className="font-normal">Market</th>
              <th className="font-normal">Price</th>
              <th className="font-normal">Quantity</th>
              <th className="pr-3"></th>
            </tr>
          </thead>
          <tbody /* ref={animationParent} */>
            {orders.map((order: OrderType, key: number) => (
              <TradingHubOrdersItem order={order} key={key} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="opacity-20 text-2xl mt-5">Currently no open orders</p>
        </div>
      )}
    </div>
  );
};
