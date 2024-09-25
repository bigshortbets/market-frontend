import { EnrichedMarketType } from '@/types/marketTypes';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { currentBlockAtom, recentTradesAtom } from '../Market';
import { categorizeMarkets } from '@/utils/categorizeMarkets';
import { MarketSelect } from '../FinanceManager/MarketSelect';
import ReactLoading from 'react-loading';
import { chosenMarketAtom } from '@/store/store';
import { getPrecision } from '@/utils/getPrecision';
import { PriceDataItem } from './PriceDataItem';

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

  const precision = getPrecision(Number(chosenMarket?.tickSize));

  return (
    <div className='flex border-b border-[#444650]'>
      <MarketSelect markets={markets} />

      <div className='lg:w-[320px]  h-[55px] '>
        <div className='px-6 py-2 h-full flex items-center gap-6'>
          <PriceDataItem
            label={'Oracle Price'}
            value={
              chosenMarket?.oraclePrice
                ? Number(chosenMarket?.oraclePrice)
                    .toFixed(precision)
                    .toString()
                : '-'
            }
          />
          <PriceDataItem
            label={'Market Price'}
            value={
              recentTrades.length > 0
                ? Number(recentTrades[0].createPrice).toFixed(precision)
                : '-'
            }
          />
        </div>
      </div>
    </div>
  );
};
