import { chartIntervalAtom } from '@/store/store';
import { useAtom } from 'jotai';
import React from 'react';

interface ChartIntervalTabProps {
  value: '1H' | '15M';
}

export const ChartIntervalTab = ({ value }: ChartIntervalTabProps) => {
  const [chartInterval, setChartInterval] = useAtom(chartIntervalAtom);
  const isActive = value === chartInterval;
  return (
    <button
      className={` rounded-lg flex items-center justify-center text-[11px] font-semibold py-1 px-2 ${
        isActive ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
      }`}
      onClick={() => setChartInterval(value)}
    >
      {value}
    </button>
  );
};
