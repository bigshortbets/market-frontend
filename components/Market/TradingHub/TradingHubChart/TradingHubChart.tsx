import { Chart } from '@/components/Chart/Chart';
import { CandleFeed, OracleFeed1HResponse } from '@/types/chartTypes';
import { format } from 'date-fns';
import { UTCTimestamp } from 'lightweight-charts';
import React from 'react';

interface TradingHubChartProps {
  data: { time: UTCTimestamp; value: number }[];
  oracleData: CandleFeed[];
}

export interface ConvertedOracleFeed {
  open: number;
  high: number;
  close: number;
  low: number;
  time: UTCTimestamp;
}

export const TradingHubChart = ({ data, oracleData }: TradingHubChartProps) => {
  const oracleDataConverted: ConvertedOracleFeed[] = oracleData.map(
    ({ open, high, close, time, low }) => {
      return {
        open: Number(open),
        high: Number(high),
        close: Number(close),
        low: Number(low),
        time: Number(time) as UTCTimestamp,
      };
    }
  );
  return (
    <div className='w-full   px-2.5  overflow-y-auto no-scrollbar h-[calc(100vh-290px)] md:h-[calc(100vh-230px)]'>
      <Chart data={data} oracleData={oracleDataConverted} />
    </div>
  );
};
