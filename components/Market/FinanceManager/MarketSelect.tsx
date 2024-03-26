import { MarketType } from '@/types/marketTypes';
import { findMarketById } from '@/utils/findMarketById';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { categorizeMarkets } from '@/utils/categorizeMarkets';
import { currentBlockAtom } from '../Market';
import { useAtom } from 'jotai';
import { MarketSelectItem } from '../MarketInteface/MarketSelectItem';

interface MarketSelectProps {
  markets: MarketType[];
  selectedMarketId: string;
}

export const MarketSelect = ({
  markets,
  selectedMarketId,
}: MarketSelectProps) => {
  const [currentBlock] = useAtom(currentBlockAtom);
  const selectRef = useRef<HTMLDivElement>(null);
  const market = findMarketById(markets, selectedMarketId);
  const marketDetails = market && getMarkeDetails(market.ticker);
  const { activeMarkets, closedMarkets } = categorizeMarkets(
    markets,
    Number(currentBlock)
  );

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

  return (
    <div
      className={`sm:w-[360px] w-full bg-[#23252E] rounded-tl-[10px] relative sm:border-r border-[#444650] ${
        noMarkets && 'opacity-50'
      }`}
      ref={selectRef}
    >
      <div
        className={`pr-6 pl-4 py-2 flex w-full justify-between items-center h-full ${
          !noMarkets && 'cursor-pointer'
        }`}
        onClick={handleToggleSelectOpen}
      >
        <div className="flex items-center gap-4">
          {marketDetails && (
            <Image
              src={marketDetails.path}
              width={28}
              height={28}
              alt="Market logo"
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-[13px] font-semibold">
              {marketDetails ? marketDetails.name : market?.ticker}
            </p>

            {marketDetails && (
              <p className="text-[10px] font-normal">{market?.ticker}</p>
            )}
            {noMarkets && (
              <p className="text-xs">Currently no markets available</p>
            )}
          </div>
        </div>
        <div className="text-[24px]">
          {isSelectOpen ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </div>
      </div>
      {isSelectOpen && (
        <div className="absolute w-full bg-[#23252E] z-40">
          <div>
            {activeMarkets.map((market, key) => (
              <MarketSelectItem
                key={key}
                market={market}
                handleCloseSelect={handleCloseSelect}
              />
            ))}
          </div>
          <div className="h-1 w-full bg-[#444650]"></div>
          <div>
            {closedMarkets.map((market, key) => (
              <MarketSelectItem
                key={key}
                market={market}
                handleCloseSelect={handleCloseSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
