import { HistoryOrderType } from '@/types/historyTypes';
import { TradingHubHistoryItem } from './TradingHubHistoryItem';
import { MarketSettlementsType } from '@/types/marketSettlementsTypes';
import { format, parseISO } from 'date-fns';
import { currencySymbol } from '@/blockchain/constants';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

interface TradingHubHistoryProps {
  settlements: MarketSettlementsType[];
}

export const TradingHubHistory = ({ settlements }: TradingHubHistoryProps) => {
  return (
    <div className='w-full h-full overflow-y-auto no-scrollbar  max-h-[calc(100vh-290px)] md:max-h-[calc(100vh-230px)]'>
      {settlements.length > 0 ? (
        <div className='px-2.5 flex flex-col gap-3.5 mt-2'>
          {settlements.map((settlement, key) => (
            <TradingHubHistoryItem key={key} settlement={settlement} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-full'>
          <p className='opacity-20 text-2xl mt-5'>Currently no settlements</p>
        </div>
      )}
    </div>
  );
};
