import {
  ORDER_BOOK_LONGS_SUBSCRIPTION,
  ORDER_BOOK_SHORTS_SUBSCRIPTION,
  RECENT_MARKET_POSITIONS_SUBSCRIPTION,
} from '@/api/queries';
import { useSubscription } from '@apollo/client';
import { useAtom } from 'jotai';
import React from 'react';
import { selectedMarketIdAtom } from '../Market';
import { OrderBookResponse } from '@/types/orderTypes';
import { OrderBookItem } from './OrderBookItem';
import { currencySymbol } from '@/blockchain/constants';

export enum OrderSide {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

interface OrderBooksProps {
  shortsRes: OrderBookResponse | undefined;
  longsRes: OrderBookResponse | undefined;
}

export const OrderBook = ({ shortsRes, longsRes }: OrderBooksProps) => {
  return (
    <div className="flex flex-col pt-[14px]  text-xs h-full">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-1.5">
          <p className="text-[#7F828F] font-semibold">Price</p>
          <div className="w-14 h-4 rounded bg-[#7F828F] items-center flex justify-center text-[#191B24]">
            {currencySymbol}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-[#7F828F] font-semibold">Quantity</p>
          <div className="w-10 h-4 rounded bg-[#7F828F] items-center flex justify-center text-[#191B24]">
            UNT
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <div className="flex-col-reverse flex flex-1 gap-[1px]">
          {shortsRes &&
            shortsRes.aggregatedOrdersByPrices.map((data, key) => (
              <OrderBookItem
                side={OrderSide.SHORT}
                empty={false}
                data={data}
                key={key}
              />
            ))}
        </div>
        <hr className="border-top-[1px] border-[#444650]" />
        <div className="flex-1 flex flex-col gap-[1px]">
          {longsRes &&
            longsRes.aggregatedOrdersByPrices.map((data, key) => (
              <OrderBookItem
                side={OrderSide.LONG}
                empty={false}
                data={data}
                key={key}
              />
            ))}
        </div>
      </div>
      {/*   <div className="py-2 flex pl-2 text-xs">
        <p className="flex-1">Price</p>
        <p className="flex-1">Quantity</p>
      </div>
      <div className="flex-1 flex-col-reverse flex">
        {shortsRes &&
          shortsRes.aggregatedOrdersByPrices.map((data, key) => (
            <OrderBookItem
              side={OrderSide.SHORT}
              empty={false}
              data={data}
              key={key}
            />
          ))}
        {shortPlaceholders.map((_, key) => (
          <OrderBookItem side={OrderSide.SHORT} empty key={key} />
        ))}
      </div>
      <hr className="opacity-[8%] " />
      <div className="flex-1 flex flex-col">
        {longsRes &&
          longsRes.aggregatedOrdersByPrices.map((data, key) => (
            <OrderBookItem
              side={OrderSide.LONG}
              empty={false}
              data={data}
              key={key}
            />
          ))}
        {longsPlaceholders.map((_, key) => (
          <OrderBookItem side={OrderSide.LONG} empty key={key} />
        ))}
      </div> */}
    </div>
  );
};
