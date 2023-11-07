import React from 'react';
import { TradingHubOrdersItem } from './TradingHubOrdersItem';
import { OrderType } from '@/types/orderTypes';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface TradingHubOrdersProps {
  orders: OrderType[];
}

export const TradingHubOrders = ({ orders }: TradingHubOrdersProps) => {
  /* const [animationParent] = useAutoAnimate(); - Not working properly*/
  return (
    <div className="w-full h-full">
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
    </div>
  );
};
