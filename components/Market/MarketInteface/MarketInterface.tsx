import { EnrichedMarketType } from '@/types/marketTypes';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '../Market';
import { MarketInterfaceLowerBar } from './MarketInterfaceLowerBar';
import { MarketInterfaceTopBar } from './MarketInterfaceTopBar';
import { FinanceManager } from '../FinanceManager/FinanceManager';
import { OrderBookContainer } from '../OrderBook/OrderBookContainer';

interface MarketInterfaceProps {
  markets: EnrichedMarketType[];
}

export const MarketInterface = ({ markets }: MarketInterfaceProps) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  return (
    <div className=' h-[calc(100vh-166px)]  lg:h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]'>
      <div className='flex-grow flex flex-col overflow-auto no-scrollbar'>
        {/* TOPBAR */}
        <MarketInterfaceTopBar
          markets={markets}
          selectedMarketId={selectedMarketId}
        />
        <div className='flex-grow flex overflow-auto'>
          <FinanceManager markets={markets} />
          <OrderBookContainer />
        </div>
      </div>

      <MarketInterfaceLowerBar />
    </div>
  );
};
