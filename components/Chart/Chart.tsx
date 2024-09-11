import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { UTCTimestamp } from 'lightweight-charts';
import {
  CandlestickSeries,
  Chart as ChartComponent,
  LineSeries,
} from 'lightweight-charts-react-wrapper';
import { chosenMarketAtom } from '@/store/store';
import Image from 'next/image';
import { marketsData } from '@/data/marketsData';
import { ChartIntervalTab } from './ChartIntervalTab';
import { CandleFeed } from '@/types/chartTypes';
import { ConvertedOracleFeed } from '../Market/TradingHub/TradingHubChart/TradingHubChart';

import { ToggleChartDisplay } from '../Market/TradingHub/TradingHubChart/ToggleChartDisplay';

interface ChartProps {
  data: { time: UTCTimestamp; value: number }[];
  oracleData: ConvertedOracleFeed[];
}

export const Chart = ({ data, oracleData }: ChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [chosenMarket] = useAtom(chosenMarketAtom);
  const [isOraclePrice, setIsOraclePrice] = useState<boolean>(false);
  const [isMarketPrice, setIsMarketPrice] = useState<boolean>(true);
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

  const toggleOraclePrice = () => {
    setIsOraclePrice(!isOraclePrice);
  };

  const toggleMarketPrice = () => {
    setIsMarketPrice(!isMarketPrice);
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
        {/* <div className='flex items-center gap-1.5 ml-1 md:ml-0'>
          <div className='w-[11px] h-[11px] rounded-full bg-[#4ECB7D]'></div>
          <p className='text-xs'>- Market price</p>
        </div> */}

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1.5'>
            <ToggleChartDisplay
              name={`Market Price`}
              isVal={isMarketPrice}
              setVal={toggleMarketPrice}
            />
          </div>

          <ToggleChartDisplay
            name={`Oracle Price`}
            isVal={isOraclePrice}
            setVal={toggleOraclePrice}
          />
          {isOraclePrice && (
            <div className='flex items-center gap-1'>
              <ChartIntervalTab value='1H' />
              <ChartIntervalTab value='15M' />
            </div>
          )}
        </div>
      </div>

      {dimensions.width > 0 && dimensions.height > 0 && (
        <ChartComponent
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
          width={dimensions.width}
          height={dimensions.height}
          grid={{
            horzLines: { color: '#444650' },
            vertLines: { color: '#444650' },
          }}
          layout={{ background: { color: '#191B24' }, textColor: 'white' }}
        >
          {data.length > 0 && isMarketPrice && (
            <LineSeries
              data={data}
              reactive
              color={'#b4d9bd'}
              lineVisible={true}
              pointMarkersVisible={true}
            />
          )}
          {marketsData.length > 0 && isOraclePrice && (
            <CandlestickSeries data={oracleData} reactive />
          )}
        </ChartComponent>
      )}
    </div>
  );
};
