import { EnrichedMarketType } from '@/types/marketTypes';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { categorizeMarkets } from '@/utils/categorizeMarkets';
import { currentBlockAtom } from '../Market';
import { useAtom } from 'jotai';
import { MarketSelectItem } from '../MarketInteface/MarketSelectItem';
import { MarketDataCategories } from '@/data/marketsData';
import { MarketSelectCategoryTab } from './MarketSelectCategoryTab';
import { getUniqueCategories } from '@/utils/getUniqueCategories';
import { chosenMarketAtom, initialLoadingAtom } from '@/store/store';
import { IoMdLock } from 'react-icons/io';

interface MarketSelectProps {
  markets: EnrichedMarketType[];
}

export const MarketSelect = ({ markets }: MarketSelectProps) => {
  const [activeCategory, setActiveCategory] = useState<
    MarketDataCategories | undefined
  >('election');
  const [currentBlock] = useAtom(currentBlockAtom);
  const [chosenMarket] = useAtom(chosenMarketAtom);
  const [initialLoading] = useAtom(initialLoadingAtom);
  const selectRef = useRef<HTMLDivElement>(null);

  const {
    activeMarkets: unsortedActiveMarkets,
    closedMarkets: unsortedClosedMarkets,
  } = categorizeMarkets(markets, Number(currentBlock));

  const noMarkets = markets.length < 1;
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const handleToggleSelectOpen = () => {
    if (!noMarkets) {
      if (isSelectOpen) {
        setIsSelectOpen(false);
      } else {
        setIsSelectOpen(true);
      }
    }
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

  const handleCloseSelect = () => {
    setIsSelectOpen(false);
  };

  const handleSetCategory = (val: MarketDataCategories | undefined) => {
    setActiveCategory(val);
  };

  const categories = getUniqueCategories(markets);

  const sortCategories = (categories: string[]) => {
    const filteredCategories = categories.filter(
      (category) => category !== 'election'
    );

    return filteredCategories.sort((a, b) => a.localeCompare(b));
  };

  const sortMarketsAlphabeticly = (markets: EnrichedMarketType[]) => {
    return markets.sort((a, b) => {
      if (!a.name) return 1;
      if (!b.name) return -1;
      return a.name.localeCompare(b.name);
    });
  };

  const sortedActiveMarkets = sortMarketsAlphabeticly(unsortedActiveMarkets);
  const sortedClosedMarkets = sortMarketsAlphabeticly(unsortedClosedMarkets);
  const sortedCategories = sortCategories(categories);

  return (
    <div
      className={`sm:w-[360px] w-full bg-[#23252E]  relative  rounded-t-lg sm:rounded-r-none sm:rounded-bl-none sm:rounded-tl-[10px]  sm:border-r border-[#444650] ${
        noMarkets && 'opacity-50'
      }`}
      ref={selectRef}
    >
      <button
        className={`pr-6 pl-4 py-2 flex w-full justify-between items-center h-full text-left ${
          chosenMarket?.isClosed && 'opacity-50'
        }    ${!noMarkets && 'cursor-pointer'}`}
        onClick={handleToggleSelectOpen}
        disabled={initialLoading}
      >
        <div className='flex items-center gap-4'>
          {chosenMarket?.path && !initialLoading ? (
            <Image
              src={chosenMarket.path}
              width={28}
              height={28}
              alt='Market logo'
              className='rounded-full'
            />
          ) : (
            <div className=' w-[28px] h-[28px] rounded-full animate-pulse bg-bigsbgrey'></div>
          )}
          <div>
            {initialLoading ? (
              <div className='w-[150px] h-[16.5px] bg-bigsbgrey animate-pulse rounded mb-1'></div>
            ) : (
              <div className='flex items-center gap-1'>
                <p className='text-[13px] font-semibold'>
                  {chosenMarket?.name
                    ? chosenMarket.name
                    : chosenMarket?.ticker}
                </p>
                {chosenMarket?.isClosed && (
                  <div className='text-[12px] text-tetriary'>
                    <IoMdLock />
                  </div>
                )}
              </div>
            )}
            {initialLoading ? (
              <div className='w-[100px] h-[14px] bg-bigsbgrey animate-pulse rounded'></div>
            ) : (
              <p className='text-[10px] font-normal'>{chosenMarket?.ticker}</p>
            )}

            {noMarkets && !initialLoading && (
              <p className='text-xs'>Currently no markets available</p>
            )}
          </div>
        </div>
        <div className='text-[24px]'>
          {isSelectOpen ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </div>
      </button>
      {isSelectOpen && (
        <div className='absolute w-full bg-[#23252E] z-40'>
          <div className='p-2 border-b border-[#444650]'>
            <div className='flex items-center gap-2 flex-wrap gap-y-2 '>
              <MarketSelectCategoryTab
                activeCategory={activeCategory}
                value={'election'}
                handleSetCategory={handleSetCategory}
              />
              <MarketSelectCategoryTab
                activeCategory={activeCategory}
                value={undefined}
                handleSetCategory={handleSetCategory}
              />

              {sortedCategories.map((category, key) => (
                <MarketSelectCategoryTab
                  activeCategory={activeCategory}
                  key={key}
                  value={category as MarketDataCategories}
                  handleSetCategory={handleSetCategory}
                />
              ))}
            </div>
          </div>

          <div>
            {sortedActiveMarkets.map(
              (market, key) =>
                (market.category === activeCategory || !activeCategory) && (
                  <MarketSelectItem
                    key={key}
                    market={market}
                    handleCloseSelect={handleCloseSelect}
                  />
                )
            )}
          </div>
          <div className='h-1 w-full bg-[#444650]'></div>
          <div>
            {sortedClosedMarkets.map(
              (market, key) =>
                (market.category === activeCategory || !activeCategory) && (
                  <MarketSelectItem
                    key={key}
                    market={market}
                    handleCloseSelect={handleCloseSelect}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
