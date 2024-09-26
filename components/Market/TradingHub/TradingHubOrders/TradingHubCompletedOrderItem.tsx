import { HistoryOrderType } from '@/types/historyTypes';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { SideLabel } from '../SideLabel';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '../../Market';
import { TbWorld } from 'react-icons/tb';

interface TradingHubCompletedOrderItemProps {
  order: HistoryOrderType;
}

export const TradingHubCompletedOrderItem = ({
  order,
}: TradingHubCompletedOrderItemProps) => {
  const date = parseISO(order.timestamp);
  const marketDetails = getMarkeDetails(order.market.ticker);
  const [_, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  return (
    <tr className={`text-sm odd:bg-[#23252E] text-[#7F828F] sm:text-xs  `}>
      {/* Side */}
      <td className='pl-3 py-2'>
        <SideLabel side={order.side} />
      </td>
      {/* Created */}
      <td>{format(date, 'd MMMM yyyy HH:mm:ss')}</td>
      {/* Market */}
      <td
        className='underline cursor-pointer'
        role='button'
        aria-label={`Select market ${marketDetails?.name}`}
        onClick={() => setSelectedMarketId(order.market.id)}
      >
        {marketDetails?.name}
      </td>
      {/* Price */}
      <td>{Number(order.price)}</td>
      {/* Quantity */}
      <td>{Number(order.initialQuantity)}</td>
      {/* Close */}
      <td className='font-semibold'>{order.status}</td>
      <td>
        <a
          href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftest-market.bigsb.network#/explorer/query/${order.blockHeight}`}
          target='_blank'
          className='text-medium text-tetriary'
        >
          <TbWorld />
        </a>
      </td>
    </tr>
  );
};
