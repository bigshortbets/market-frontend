import { chosenMarketAtom } from '@/store/store';
import { EnrichedMarketType } from '@/types/marketTypes';
import { RecentPositionType } from '@/types/positionTypes';
import { getPrecision } from '@/utils/getPrecision';
import { useAtom } from 'jotai';
import { PriceDataItem } from '../MarketInteface/PriceDataItem';

interface OrderBookTopProps {
  recentTrades: RecentPositionType[];
  market: EnrichedMarketType | undefined;
}

export const OrderBookTop = ({ recentTrades, market }: OrderBookTopProps) => {
  const [chosenMarket] = useAtom(chosenMarketAtom);

  const precision = getPrecision(Number(chosenMarket?.tickSize));
  return (
    <div className='lg:w-[320px]  h-[55px] border-b md:border-none border-[#444650]'>
      <div className='px-6 py-2 h-full flex items-center gap-6'>
        <PriceDataItem
          tooltipContent={
            <div className='text-xs'>
              Price of the underlying asset provided by external data sources
            </div>
          }
          label={'Oracle Price'}
          value={
            market?.oraclePrice
              ? Number(market?.oraclePrice).toFixed(precision).toString()
              : '-'
          }
        />
        <PriceDataItem
          tooltipContent={
            <div className='text-xs'>
              Price of the last transaction on bigshortbets P2P Market
            </div>
          }
          label={'Market Price'}
          value={
            recentTrades.length > 0
              ? Number(recentTrades[0].createPrice).toFixed(precision)
              : '-'
          }
        />
      </div>
    </div>
  );
};
