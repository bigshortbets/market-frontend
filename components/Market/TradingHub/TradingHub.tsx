import { TradingHubTab } from './TradingHubTab';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { TradingHubContentContainer } from './TradingHubContentContainer';
import { AggregatedPositionsCheckbox } from './TradingHubPositions/AggregatedPositionsCheckbox';
import { useState } from 'react';
import { tradingHubStateAtom } from '@/store/store';
import { TradingHubFooter } from './TradingHubFooter';

const tabs = ['positions', 'orders', 'history' /* , 'chat' */] as const;
export type TradingHubStateType = (typeof tabs)[number];

export const TradingHub = () => {
  const { address } = useAccount();
  const [tradingHubState] = useAtom(tradingHubStateAtom);
  const [isAggregated, setIsAggregated] = useState<boolean>(true);

  const toggleIsAggregated = () => {
    isAggregated ? setIsAggregated(false) : setIsAggregated(true);
  };

  return (
    <div className=' h-[calc(100vh-166px)] lg:flex-1 lg:h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]'>
      <div className='flex-grow'>
        <div className='flex items-center justify-between px-2.5 pt-3 pb-2.5'>
          <div className='flex gap-1'>
            {tabs.map((tab, key) => (
              <TradingHubTab key={key} value={tab} />
            ))}
          </div>
          {tradingHubState === 'positions' && (
            <div className='hidden md:block'>
              <AggregatedPositionsCheckbox
                setIsAggregated={toggleIsAggregated}
                isAggregated={isAggregated}
              />
            </div>
          )}
        </div>
        {address && <TradingHubContentContainer isAggregated={isAggregated} />}
      </div>
      <TradingHubFooter />
    </div>
  );
};
