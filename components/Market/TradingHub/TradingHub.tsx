import { TradingHubTab } from './TradingHubTab';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { TradingHubContentContainer } from './TradingHubContentContainer';
import { AggregatedPositionsCheckbox } from './TradingHubPositions/AggregatedPositionsCheckbox';
import { useState } from 'react';
import { tradingHubStateAtom } from '@/store/store';
import { TradingHubFooter } from './TradingHubFooter';
import {
  Chart,
  LineSeries,
  CandlestickSeries,
} from 'lightweight-charts-react-wrapper';

const tabs = ['positions', 'orders', 'history' /* , 'chat' */] as const;
export type TradingHubStateType = (typeof tabs)[number];

export const TradingHub = () => {
  const { address } = useAccount();
  const [tradingHubState] = useAtom(tradingHubStateAtom);
  const [isAggregated, setIsAggregated] = useState<boolean>(true);

  const toggleIsAggregated = () => {
    isAggregated ? setIsAggregated(false) : setIsAggregated(true);
  };

  const [data, setData] = useState([
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 76.64 },
    { time: '2019-04-14', value: 81.89 },
    { time: '2019-04-15', value: 74.43 },
    { time: '2019-04-16', value: 80.01 },
    { time: '2019-04-17', value: 96.63 },
    { time: '2019-04-18', value: 76.64 },
    { time: '2019-04-19', value: 81.89 },
    { time: '2019-04-20', value: 74.43 },
    { time: '2019-04-22', value: 80.01 },
    { time: '2019-04-25', value: 100.01 },
    { time: '2019-04-26', value: 105.01 },
    { time: '2019-04-27', value: 1.01 },
  ]);

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
      <Chart width={400} height={200}>
        <LineSeries data={data} />
      </Chart>
      <TradingHubFooter />
    </div>
  );
};
