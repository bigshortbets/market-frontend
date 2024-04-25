import { useAtom } from 'jotai';
import { recentTradesAtom } from '../Market';
import { RecentTradesItem } from './RecentTradesItem';
import { currencySymbol } from '@/blockchain/constants';

export const RecentTrades = () => {
  const [recentTrades] = useAtom(recentTradesAtom);
  return (
    <div className='flex flex-col pt-[14px] px-4 text-xs'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1.5'>
          <p className='text-[#7F828F] font-semibold'>Quantity</p>
          <div className='w-10 h-4 rounded bg-[#7F828F] items-center flex justify-center text-[#191B24]'>
            UNT
          </div>
        </div>
        <div className='flex items-center gap-1.5'>
          <p className='text-[#7F828F] font-semibold'>Price</p>
          <div className='w-14 h-4 rounded bg-[#7F828F] items-center flex justify-center text-[#191B24]'>
            {currencySymbol}
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
