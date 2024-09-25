import { useEffect, useState } from 'react';
import { OrderSide } from './OrderBook';
import { OrderBookOrder } from '@/types/orderTypes';
import { fetchOrderCollateral } from '@/utils/fetchOrderCollateral';
import { useAccount } from 'wagmi';
import { useAtom } from 'jotai';
import { chosenMarketAtom } from '@/store/store';
import { getPrecision } from '@/utils/getPrecision';

interface OrderBookItem {
  empty: boolean;
  side: OrderSide;
  data?: OrderBookOrder;
}

export const OrderBookItem = ({ empty, side, data }: OrderBookItem) => {
  const [chosenMarket] = useAtom(chosenMarketAtom);

  const precision = getPrecision(Number(chosenMarket?.tickSize));

  return (
    <div
      className={`w-full bg-opacity-[15%]  text-opacity-50 py-2   ${
        side === OrderSide.LONG
          ? ' bg-green-900 text-tetriary'
          : ' bg-[#C53F3A] text-tetriary'
      }`}
    >
      {!empty && data && (
        <div className='w-full justify-between h-full flex px-4 text-xs items-center'>
          <div className='text-right min-w-[60px]'>
            {Number(data.price).toFixed(precision)}
          </div>
          <div>{data.quantity}</div>
        </div>
      )}
    </div>
  );
};
