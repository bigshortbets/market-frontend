import { CHART_FEED_QUERY } from '@/requests/queries';
import { ChartFeedResponse } from '@/types/chartTypes';
import { useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { selectedMarketIdAtom } from '../Market/Market';
import { UTCTimestamp } from 'lightweight-charts';
import {
  Chart as ChartComponent,
  LineSeries,
} from 'lightweight-charts-react-wrapper';

interface ChartProps {
  data: { time: UTCTimestamp; value: number }[];
}

export const Chart = ({ data }: ChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  return (
    <div ref={containerRef} className='w-full h-[80%]'>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ChartComponent
          width={dimensions.width}
          height={dimensions.height}
          grid={{
            horzLines: { color: '#444650' },
            vertLines: { color: '#444650' },
          }}
          layout={{ background: { color: '#191B24' }, textColor: 'white' }}
        >
          {data.length > 0 && (
            <LineSeries data={data} reactive color={'#4ECB7D'} />
          )}
        </ChartComponent>
      )}
      <div className='m-3 flex items-center gap-1.5'>
        <div className='w-[11px] h-[11px] rounded-full bg-[#4ECB7D]'></div>
        <p className='text-xs'>- Market price</p>
      </div>
    </div>
  );
};
