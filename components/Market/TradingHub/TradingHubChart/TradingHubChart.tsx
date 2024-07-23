import { Chart } from '@/components/Chart/Chart';
import { UTCTimestamp } from 'lightweight-charts';
import React from 'react';

interface TradingHubChartProps {
  marketPriceData: { time: UTCTimestamp; value: number }[];
  oraclePriceData: { time: UTCTimestamp; value: number }[];
}

export const TradingHubChart = ({
  marketPriceData,
  oraclePriceData,
}: TradingHubChartProps) => {
  return (
    <div className='w-full   px-2.5  overflow-y-auto no-scrollbar h-[calc(100vh-290px)] md:h-[calc(100vh-230px)]'>
      <Chart
        marketPriceData={marketPriceData}
        oraclePriceData={oraclePriceData}
      />
    </div>
  );
};
