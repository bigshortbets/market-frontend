import { useAtom } from 'jotai';
import { recentTradesAtom } from '../Market';
import { RecentTradesItem } from './RecentTradesItem';
import Image from 'next/image';
import { chosenMarketAtom } from '@/store/store';
import { IoMdLock } from 'react-icons/io';

export const RecentTrades = () => {
  const [recentTrades] = useAtom(recentTradesAtom);
  const [chosenMarket] = useAtom(chosenMarketAtom);
  return (
    <div className='flex flex-col px-4 text-xs'>
      <div className='pt-[14px] mb-2 text-[#7F828F] text-[11px] flex items-center gap-2'>
        {chosenMarket?.path && (
          <Image
            src={chosenMarket.path}
            width={16}
            height={16}
            alt='Market logo'
            className='rounded-full'
          />
        )}
        <div className='flex items-center gap-1'>
          <p>{chosenMarket?.name}</p>
          {chosenMarket?.isClosed && (
            <div className='text-[11px] text-tetriary'>
              <IoMdLock />
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <p className='text-[#7F828F] font-semibold'>Time</p>
        <div className='flex items-center'>
          <div className='w-[64px] text-right'>
            <p className='text-[#7F828F] font-semibold'>Price</p>
          </div>
          <div className='w-[64px] text-right'>
            <p className='text-[#7F828F] font-semibold'>Quantity</p>
          </div>
        </div>
      </div>
      <div className='py-2.5'>
        {recentTrades &&
          recentTrades.map((position, key) => (
            <RecentTradesItem position={position} key={key} />
          ))}
      </div>
    </div>
  );
};
