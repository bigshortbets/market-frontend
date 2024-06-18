import { EnrichedMarketType } from '@/types/marketTypes';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { currentBlockAtom, recentTradesAtom } from '../Market';
import { categorizeMarkets } from '@/utils/categorizeMarkets';
import { MarketSelect } from '../FinanceManager/MarketSelect';
import ReactLoading from 'react-loading';
import { chosenMarketAtom } from '@/store/store';

interface MarketInterfaceTopBarProps {
  markets: EnrichedMarketType[];
  selectedMarketId: string;
}

export const MarketInterfaceTopBar = ({
  markets,
  selectedMarketId,
}: MarketInterfaceTopBarProps) => {
  const [chosenMarket] = useAtom(chosenMarketAtom);
  const selectRef = useRef<HTMLDivElement>(null);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [recentTrades] = useAtom(recentTradesAtom);
  const [currentBlock] = useAtom(currentBlockAtom);

  const handleToggleSelectOpen = () => {
    if (isSelectOpen) {
      setIsSelectOpen(false);
    } else {
      setIsSelectOpen(true);
    }
  };

  const handleCloseSelect = () => {
    setIsSelectOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  const { activeMarkets, closedMarkets } = categorizeMarkets(
    markets,
    Number(currentBlock)
  );

  return (
    <div className='flex border-b border-[#444650]'>
      <MarketSelect markets={markets} />

      <div className='lg:w-[320px]  h-[55px] '>
        <div className='pr-6 pl-12 py-2 h-full flex items-center gap-6'>
          <div>
            <p
              className='text-xs text-tetriary font-semibold'
              onClick={() => console.log(markets)}
            >
              Oracle Price
            </p>
            <div className='text-xs font-normal'>
              {chosenMarket?.oraclePrice === undefined &&
                markets.length >= 1 && (
                  <ReactLoading
                    type='spin'
                    width={14}
                    height={14}
                    color='#444650'
                    className='mt-0.5'
                  />
                )}
              {chosenMarket?.oraclePrice != undefined &&
                markets.length >= 1 &&
                chosenMarket?.oraclePrice.toString()}
              {markets.length < 1 && '-'}
              {chosenMarket?.oraclePrice === null && '-'}
            </div>
          </div>

          <div className='border-l border-[#444650] text-xs pl-2'>
            <p className='text-tetriary font-semibold'>Market Price</p>
            <p>
              {recentTrades === undefined && (
                <ReactLoading
                  type='spin'
                  width={14}
                  height={14}
                  color='#444650'
                  className='mt-0.5'
                />
              )}
              {recentTrades && recentTrades.length > 0
                ? Number(recentTrades[0].price)
                : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
