import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import { TradingHubTab } from './TradingHubTab';
import { TradingHubContentContainer } from './TradingHubContentContainer';
import { AggregatedPositionsCheckbox } from './TradingHubPositions/AggregatedPositionsCheckbox';
import { tradingHubStateAtom } from '@/store/store';
import { TradingHubFooter } from './TradingHubFooter';
import { Chart, LineSeries } from 'lightweight-charts-react-wrapper';
import { CHART_FEED_QUERY } from '@/requests/queries';
import { selectedMarketIdAtom } from '../Market';
import { ChartFeedResponse } from '@/types/chartTypes';
import { Background, SolidColor, UTCTimestamp } from 'lightweight-charts';

const tabs = ['positions', 'orders', 'history'] as const;
export type TradingHubStateType = (typeof tabs)[number];

export const TradingHub = () => {
  const { address } = useAccount();
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const [tradingHubState] = useAtom(tradingHubStateAtom);
  const [isAggregated, setIsAggregated] = useState<boolean>(true);

  const toggleIsAggregated = () => {
    setIsAggregated(!isAggregated);
  };

  const {
    data: chartData,
    error,
    loading,
  } = useQuery<ChartFeedResponse>(CHART_FEED_QUERY, {
    pollInterval: 5000,
    variables: { marketId: selectedMarketId },
  });

  const [data, setData] = useState<{ time: UTCTimestamp; value: number }[]>([]);

  useEffect(() => {
    console.log('chartData:', chartData);
    if (chartData && chartData.positions) {
      const formattedData = chartData.positions.map((item) => ({
        time: (new Date(item.timestamp).getTime() / 1000) as UTCTimestamp,
        value: Number(item.createPrice),
      }));
      console.log('formattedData:', formattedData);
      setData(formattedData);
    }
  }, [chartData]);

  return (
    <div
      className='h-[calc(100vh-166px)] lg:flex-1 lg:h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]'
      onClick={() => console.log(data, chartData?.positions)}
    >
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
      <Chart
        width={500}
        height={300}
        grid={{
          horzLines: { color: '#444650' },
          vertLines: { color: '#444650' },
        }}
        layout={{ background: { color: '#191B24' }, textColor: 'white' }}
      >
        {data.length > 0 && (
          <LineSeries data={data} reactive color={'#4ECB7D'} />
        )}
      </Chart>
      <TradingHubFooter />
    </div>
  );
};
