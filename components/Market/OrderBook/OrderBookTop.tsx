import { EnrichedMarketType } from '@/types/marketTypes';
import { RecentPositionType } from '@/types/positionTypes';

interface OrderBookTopProps {
  recentTrades: RecentPositionType[];
  market: EnrichedMarketType | undefined;
}

export const OrderBookTop = ({ recentTrades, market }: OrderBookTopProps) => {
  return (
    <div className='lg:w-[320px]  h-[55px] border-b md:border-none border-[#444650]'>
      <div className='pr-6 pl-12 py-2 h-full flex items-center gap-6'>
        <div>
          <p className='text-xs text-tetriary font-semibold'>Oracle Price</p>
          <p className='text-xs font-normal'>
            {market?.oraclePrice && market?.oraclePrice.toString()}
          </p>
        </div>

        <div className='border-l border-[#444650] text-xs pl-2'>
          <p className='text-tetriary font-semibold'>Market Price</p>
          <p>
            {recentTrades.length > 0
              ? Number(recentTrades[0].createPrice)
              : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};
