import { OrderBookResponse } from '@/types/orderTypes';
import { OrderBookItem } from './OrderBookItem';
import { currencySymbol } from '@/blockchain/constants';
import { useEffect, useRef } from 'react';

export enum OrderSide {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

interface OrderBooksProps {
  shortsRes: OrderBookResponse | undefined;
  longsRes: OrderBookResponse | undefined;
}

export const OrderBook = ({ shortsRes, longsRes }: OrderBooksProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Center the scroll on the <hr>
      const halfHeight = container.scrollHeight / 2;
      container.scrollTop = halfHeight - container.clientHeight / 2;
    }
  }, [shortsRes, longsRes]);

  return (
    <div className='flex flex-col pt-[14px] text-xs h-full max-h-[calc(100%-66px)]'>
      {/* Static header */}
      <div className='flex justify-between items-center px-4 mb-3'>
        <div className='flex items-center gap-1.5'>
          <p className='text-[#7F828F] font-semibold'>Price</p>
          <div className='w-14 h-4 rounded bg-[#7F828F] items-center flex justify-center text-[#191B24]'>
            {currencySymbol}
          </div>
        </div>
        <div className='flex items-center gap-1.5'>
          <p className='text-[#7F828F] font-semibold'>Quantity</p>
          <div className='w-10 h-4 rounded bg-[#7F828F] items-center flex justify-center text-[#191B24]'>
            UNT
          </div>
        </div>
      </div>
      {/* Scrollable content area */}
      <div
        ref={scrollContainerRef}
        className='flex-grow flex flex-col justify-center overflow-y-auto no-scrollbar'
      >
        <div className='flex-1 flex flex-col-reverse gap-[1px]'>
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
        <hr className='border-top-[1px] border-[#444650]' />
        <div className='flex-1 flex flex-col gap-[1px]'>
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
    </div>
  );
};
