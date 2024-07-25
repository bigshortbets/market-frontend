import { useAtom } from 'jotai';
import { recentTradesAtom } from '../Market';
import { RecentTradesItem } from './RecentTradesItem';

export const RecentTrades = () => {
  const [recentTrades] = useAtom(recentTradesAtom);
  return (
    <div className='flex flex-col pt-[14px] px-4 text-xs'>
      <div className='flex justify-between items-center'>
        <p className='text-[#7F828F] font-semibold'>Time</p>
        <div className='flex items-center'>
          <div className='w-[50px] text-right'>
            <p className='text-[#7F828F] font-semibold'>Quantity</p>
          </div>

          <div className='w-[50px] text-right'>
            <p className='text-[#7F828F] font-semibold'>Price</p>
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
