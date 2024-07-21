import { useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { selectedMarketIdAtom } from '../Market/Market';
import { UTCTimestamp } from 'lightweight-charts';
import {
  Chart as ChartComponent,
  LineSeries,
} from 'lightweight-charts-react-wrapper';
import { chosenMarketAtom } from '@/store/store';
import Image from 'next/image';

interface ChartProps {
  marketPriceData: { time: UTCTimestamp; value: number }[];
  oraclePriceData: { time: UTCTimestamp; value: number }[];
}

export const Chart = ({ marketPriceData, oraclePriceData }: ChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [chosenMarket] = useAtom(chosenMarketAtom);
  const [marketPriceDisplay, setMarketPriceDisplay] = useState<boolean>(true);
  const [oraclePriceDisplay, setOraclePriceDisplay] = useState<boolean>(false);
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

  const toggleDisplay = (type: 'MarketPrice' | 'OraclePrice') => {
    if (type === 'MarketPrice') {
      marketPriceDisplay
        ? setMarketPriceDisplay(false)
        : setMarketPriceDisplay(true);
    }
    if (type === 'OraclePrice') {
      oraclePriceDisplay
        ? setOraclePriceDisplay(false)
        : setOraclePriceDisplay(true);
    }
  };
  return (
    <div ref={containerRef} className='w-full h-[85%]'>
      <div className='flex justify-between flex-col md:flex-row md:items-center gap-2 md:gap-0 mt-2 mb-6 md:mr-3'>
        <div className='flex items-center gap-2 '>
          {' '}
          {chosenMarket?.path && (
            <Image
              src={chosenMarket.path}
              width={20}
              height={20}
              alt='Market logo'
              className='rounded-full'
            />
          )}
          <p className=' text-sm font-semibold'>{chosenMarket?.name} Chart</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1.5 ml-1 md:ml-0'>
            <input
              disabled={marketPriceDisplay && !oraclePriceDisplay}
              type='checkbox'
              checked={marketPriceDisplay}
              onClick={() => toggleDisplay('MarketPrice')}
            />

            <p className='text-xs'>Market Price</p>
            <div className='w-[11px] h-[11px] rounded-full bg-[#4ECB7D]'></div>
          </div>
          <div className='flex items-center gap-1.5 ml-1 md:ml-0'>
            <input
              disabled={oraclePriceDisplay && !marketPriceDisplay}
              type='checkbox'
              checked={oraclePriceDisplay}
              onClick={() => toggleDisplay('OraclePrice')}
            />

            <p className='text-xs'>Oracle Price</p>
            <div className='w-[11px] h-[11px] rounded-full bg-white'></div>
          </div>
        </div>
      </div>

      {dimensions.width > 0 && dimensions.height > 0 && (
        <ChartComponent
          width={dimensions.width}
          height={dimensions.height}
          grid={{
            horzLines: { color: '#444650' },
            vertLines: { color: '#444650' },
          }}
          layout={{ background: { color: '#191B24' }, textColor: 'white' }}
          timeScale={{
            timeVisible: true,
            secondsVisible: true,
            tickMarkFormatter: (time: any, tickMarkType: any, locale: any) => {
              const date = new Date(time * 1000);
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const seconds = date.getSeconds().toString().padStart(2, '0');

              if (tickMarkType === 'second') {
                return `${hours}:${minutes}:${seconds}`;
              } else if (tickMarkType === 'minute') {
                return `${hours}:${minutes}`;
              } else if (tickMarkType === 'hour') {
                return `${hours}:00`;
              } else {
                return date.toLocaleDateString(locale);
              }
            },
          }}
        >
          {marketPriceData.length > 0 && marketPriceDisplay && (
            <LineSeries data={marketPriceData} reactive color={'#4ECB7D'} />
          )}
          {oraclePriceData.length > 0 && oraclePriceDisplay && (
            <LineSeries data={oraclePriceData} reactive color={'white'} />
          )}
        </ChartComponent>
      )}
    </div>
  );
};
