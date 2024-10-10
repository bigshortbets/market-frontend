import { TradingHubHistoryItem } from './TradingHubHistoryItem';
import { MarketSettlementsType } from '@/types/marketSettlementsTypes';

interface TradingHubHistoryProps {
  settlements: MarketSettlementsType[];
}

export const TradingHubHistory = ({ settlements }: TradingHubHistoryProps) => {
  return (
    <div className='w-full h-full overflow-y-auto no-scrollbar  max-h-[calc(100vh-285px)] md:max-h-[calc(100vh-230px)]'>
      {settlements.length > 0 ? (
        <div className='px-2.5 flex flex-col gap-3.5 mt-2'>
          {settlements.map((settlement, key) => (
            <TradingHubHistoryItem key={key} settlement={settlement} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-full'>
          <p className='opacity-20 text-2xl mt-5'>No settlement records</p>
        </div>
      )}
    </div>
  );
};
