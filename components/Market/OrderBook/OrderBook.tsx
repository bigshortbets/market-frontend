import { OrderBookOrder, OrderBookResponse } from '@/types/orderTypes';
import { OrderBookItem } from './OrderBookItem';
import { currencySymbol } from '@/blockchain/constants';
import { useAtom } from 'jotai';
import { chosenMarketAtom, initialLoadingAtom } from '@/store/store';
import Image from 'next/image';
import { IoMdLock } from 'react-icons/io';
import ReactLoading from 'react-loading';
import { useEffect, useRef, useState } from 'react';

export enum OrderSide {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

interface OrderBooksProps {
  shorts: OrderBookOrder[];
  longs: OrderBookOrder[];
  loading: boolean;
}

export const OrderBook = ({ shorts, longs, loading }: OrderBooksProps) => {
  const [chosenMarket] = useAtom(chosenMarketAtom);
  const [initialLoading] = useAtom(initialLoadingAtom);
  const orderBookRef = useRef<HTMLDivElement>(null);
  const [prevMarketId, setPrevMarketId] = useState<string | null>(null);

  const fillEmptyOrders = (
    orders: OrderBookOrder[],
    side: OrderSide,
    maxCount: number
  ) => {
    const emptyOrders = Array(maxCount - orders.length).fill(null);
    return [
      ...orders.map((data) => ({ empty: false, side, data })),
      ...emptyOrders.map(() => ({ empty: true, side, data: undefined })),
    ];
  };

  const maxOrderCount = Math.max(shorts.length, longs.length, 20); // Ensure at least 20 rows
  const filledShorts = fillEmptyOrders(shorts, OrderSide.SHORT, maxOrderCount);
  const filledLongs = fillEmptyOrders(longs, OrderSide.LONG, maxOrderCount);

  useEffect(() => {
    if (orderBookRef.current && !loading && !initialLoading) {
      const scrollToCenter = () => {
        const scrollHeight = orderBookRef.current!.scrollHeight + 75;
        orderBookRef.current!.scrollTop =
          scrollHeight / 2 - orderBookRef.current!.clientHeight / 2;
      };

      if (chosenMarket?.id !== prevMarketId) {
        // Market has changed, scroll to center
        scrollToCenter();
        setPrevMarketId(chosenMarket?.id || null);
      } else {
        // Market hasn't changed, maintain relative scroll position
        const currentScrollTop = orderBookRef.current.scrollTop;
        const oldScrollHeight = orderBookRef.current.scrollHeight + 75;

        setTimeout(() => {
          if (orderBookRef.current) {
            const newScrollHeight = orderBookRef.current.scrollHeight + 75;
            const newScrollTop =
              currentScrollTop + (newScrollHeight - oldScrollHeight) / 2;
            orderBookRef.current.scrollTop = newScrollTop;
          }
        }, 0);
      }
    }
  }, [shorts, longs, loading, initialLoading, chosenMarket]);

  return (
    <div className='flex flex-col text-xs h-full'>
      <div className='pt-[14px] pl-4 mb-2 text-[#7F828F] text-[11px] flex items-center gap-2'>
        {chosenMarket?.path && !initialLoading && (
          <Image
            src={chosenMarket.path}
            width={16}
            height={16}
            alt='Market logo'
            className='rounded-full'
          />
        )}
        {initialLoading && (
          <div className='w-4 h-4 rounded-full bg-bigsbgrey animate-pulse'></div>
        )}
        {!initialLoading ? (
          <div className='flex items-center gap-1'>
            <p>{chosenMarket?.name}</p>
            {chosenMarket?.isClosed && (
              <div className='text-[11px] text-tetriary'>
                <IoMdLock />
              </div>
            )}
          </div>
        ) : (
          <div className='h-[12px] w-[140px] bg-bigsbgrey animate-pulse rounded'></div>
        )}
      </div>

      <div className='flex justify-between items-center px-4'>
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
      <div className='flex flex-col mt-6 flex-grow overflow-hidden'>
        {loading ? (
          <div className='flex justify-center'>
            {' '}
            <ReactLoading type='spin' width={36} height={36} color='#444650' />
          </div>
        ) : (
          <div
            ref={orderBookRef}
            className='flex flex-col overflow-y-auto min-h-[400px] max-h-full'
          >
            <div className='flex-col-reverse flex flex-1 gap-[1px]'>
              {!initialLoading &&
                filledShorts.map((item, key) => (
                  <OrderBookItem
                    side={item.side}
                    empty={item.empty}
                    data={item.data}
                    key={key}
                  />
                ))}
            </div>
            <hr className='border-top-[1px] border-[#444650]' />
            <div className='flex-1 flex flex-col gap-[1px]'>
              {!initialLoading &&
                filledLongs.map((item, key) => (
                  <OrderBookItem
                    side={item.side}
                    empty={item.empty}
                    data={item.data}
                    key={key}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
