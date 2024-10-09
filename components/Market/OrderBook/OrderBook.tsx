import { OrderBookOrder, OrderBookResponse } from '@/types/orderTypes';
import { OrderBookItem } from './OrderBookItem';
import { currencySymbol } from '@/blockchain/constants';
import { useAtom } from 'jotai';
import { chosenMarketAtom, initialLoadingAtom } from '@/store/store';
import Image from 'next/image';
import { IoMdLock } from 'react-icons/io';
import ReactLoading from 'react-loading';

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
  return (
    <div className='flex flex-col  text-xs h-full'>
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
      <div className='flex-grow flex flex-col justify-center'>
        {loading ? (
          <div className='flex justify-center'>
            {' '}
            <ReactLoading type='spin' width={36} height={36} color='#444650' />
          </div>
        ) : (
          <>
            <div className='flex-col-reverse flex flex-1 gap-[1px]'>
              {!initialLoading &&
                shorts.map((data, key) => (
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
              {!initialLoading &&
                longs.map((data, key) => (
                  <OrderBookItem
                    side={OrderSide.LONG}
                    empty={false}
                    data={data}
                    key={key}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
