import { Chart } from '@/components/Chart/Chart';
import { UTCTimestamp } from 'lightweight-charts';
import React from 'react';

interface TradingHubChartProps {
  data: { time: UTCTimestamp; value: number }[];
}

export const TradingHubChart = ({ data }: TradingHubChartProps) => {
  return (
    <div
      className='w-full h-full  px-2.5  overflow-y-auto no-scrollbar'
      style={{ height: 'calc(100vh - 290px)' }}
    >
      <Chart data={data} />
    </div>
  );
};
