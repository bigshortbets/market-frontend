import { TradingHubTab } from './TradingHubTab';
import { atom, useAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { TradingHubContentContainer } from './TradingHubContentContainer';
import Image from 'next/image';
import { AggregatedPositionsCheckbox } from './TradingHubPositions/AggregatedPositionsCheckbox';
import { useState } from 'react';
import { tradingHubStateAtom } from '@/store/store';

const tabs = ['positions', 'orders', 'history' /* 'chat' */] as const;

export type TradingHubStateType = (typeof tabs)[number];

export const tradingHubPositionsCountAtom = atom<number>(0);
export const tradingHubOrdersCountAtom = atom<number>(0);

export const TradingHub = () => {
  const { address } = useAccount();
  const [tradingHubState] = useAtom(tradingHubStateAtom);
  const [isAggregated, setIsAggregated] = useState<boolean>(true);

  const toggleIsAggregated = () => {
    isAggregated ? setIsAggregated(false) : setIsAggregated(true);
  };

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
      <div className='h-[58px] border-t border-[#444650] flex justify-between items-center'>
        <div></div>
        <div className='pr-5 flex items-center gap-2.5'>
          <p>$BigSB:</p>
          <a
            href='https://coinmarketcap.com/currencies/bigshortbets/'
            target='_blank'
          >
            <Image
              src='/coinmarketcap.svg'
              alt='uniswap'
              height={23}
              width={23}
            />
          </a>
          <a
            href='https://coinpaprika.com/coin/bigsb-bigshortbets/'
            target='_blank'
          >
            <Image
              src='/coinpaprika.svg'
              alt='uniswap'
              height={23}
              width={23}
            />
          </a>
          <a
            href='https://www.coingecko.com/pl/waluty/bigshortbets'
            target='_blank'
          >
            <Image src='/coingecko.svg' alt='uniswap' height={23} width={23} />
          </a>
          <a
            href='https://app.uniswap.org/swap?use=V2&outputCurrency=0x131157c6760f78f7ddf877c0019eba175ba4b6f6'
            target='_blank'
          >
            <Image src='/uniswap.svg' alt='uniswap' height={24} width={24} />
          </a>
        </div>
      </div>
    </div>
  );
};
