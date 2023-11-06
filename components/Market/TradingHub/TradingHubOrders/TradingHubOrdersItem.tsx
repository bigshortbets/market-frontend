import { OrderType } from '@/types/orderTypes';
import React from 'react';
import { SideLabel } from '../SideLabel';
import { scaleNumber } from '@/utils/scaleNumber';
import { parseEther } from 'viem';

interface TradingHubOrdersItemProps {
  order: OrderType;
}

export const TradingHubOrdersItem = ({ order }: TradingHubOrdersItemProps) => {
  return (
    <tr className="text-sm odd:bg-[#23252E] text-[#7F828F]">
      {/* Side */}
      <td className="pl-3 py-2">
        <SideLabel side={order.side} />
      </td>
      <td>{order.timestamp}</td>
      <td>{order.market.ticker}</td>
      <td>{scaleNumber(Number(order.price))}</td>
    </tr>
  );
};
