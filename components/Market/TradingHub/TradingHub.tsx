import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { TradingHubTab } from './TradingHubTab';
import { TradingHubContentContainer } from './TradingHubContentContainer';
import { AggregatedPositionsCheckbox } from './TradingHubPositions/AggregatedPositionsCheckbox';
import { tradingHubStateAtom } from '@/store/store';
import { TradingHubFooter } from './TradingHubFooter';
import { selectedMarketIdAtom } from '../Market';
import { ChartFeedResponse } from '@/types/chartTypes';
import { useQuery } from '@apollo/client';
import { CHART_FEED_QUERY } from '@/requests/queries';
import { UTCTimestamp } from 'lightweight-charts';
import { ChatContainer } from './Chat/ChatContainer';
import { TradingHubChart } from './TradingHubChart/TradingHubChart';

const tabs = ['chart', 'positions', 'orders', 'history'] as const;
export type TradingHubStateType = (typeof tabs)[number];

export const TradingHub = () => {
  const { address } = useAccount();

  const [tradingHubState] = useAtom(tradingHubStateAtom);
  const [isAggregated, setIsAggregated] = useState<boolean>(true);

  const toggleIsAggregated = () => {
    setIsAggregated(!isAggregated);
  };

  /* Chart logic  */

  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const {
    data: chartRes,
    error,
    loading,
  } = useQuery<ChartFeedResponse>(CHART_FEED_QUERY, {
    pollInterval: 5000,
    variables: { marketId: selectedMarketId },
  });

  const [chartData, setChartData] = useState<
    { time: UTCTimestamp; value: number }[]
  >([]);

  useEffect(() => {
    if (chartRes?.positions) {
      const uniquePositionsMap = new Map();
      chartRes.positions.forEach((item) => {
        const time = new Date(item.timestamp).getTime() / 1000;
        if (!uniquePositionsMap.has(time)) {
          uniquePositionsMap.set(time, {
            time: time as UTCTimestamp,
            value: Number(item.createPrice),
          });
        }
      });
      const formattedData = Array.from(uniquePositionsMap.values());

      setChartData(formattedData);
    }
  }, [chartRes]);

  /*  */

  return (
    <div className='h-[calc(100vh-166px)] lg:flex-1 lg:h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]'>
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
        {tradingHubState === 'chart' && (
          <div className='w-full no-scrollbar'>
            <TradingHubChart data={chartData} />
          </div>
        )}
      </div>

      <TradingHubFooter />
    </div>
  );
};
