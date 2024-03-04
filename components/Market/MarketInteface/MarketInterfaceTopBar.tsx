import { MarketType } from '@/types/marketTypes';
import { findMarketById } from '@/utils/findMarketById';
import { scaleNumber } from '@/utils/scaleNumber';
import React, { useEffect, useRef, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { MarketSelectItem } from './MarketSelectItem';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { currentBlockAtom, recentTradesAtom } from '../Market';
import { categorizeMarkets } from '@/utils/categorizeMarkets';

interface MarketInterfaceTopBarProps {
  markets: MarketType[];
  selectedMarketId: string;
}

export const MarketInterfaceTopBar = ({
  markets,
  selectedMarketId,
}: MarketInterfaceTopBarProps) => {
  const market = findMarketById(markets, selectedMarketId);
  const marketDetails = market && getMarkeDetails(market.ticker);
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
    <div
      className="flex border-b border-[#444650]"
      onClick={() => console.log(activeMarkets, closedMarkets)}
    >
      {/* SELECT */}{' '}
      <div
        className="w-[360px] bg-[#23252E] rounded-tl-[10px] relative border-r border-[#444650]"
        ref={selectRef}
      >
        <div
          className="pr-6 pl-4 py-2 flex w-full justify-between items-center h-full cursor-pointer"
          onClick={handleToggleSelectOpen}
        >
          <div className="flex items-center gap-4">
            {marketDetails && (
              <Image
                src={marketDetails.path}
                width={18}
                height={18}
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
      {/*  */}
      <div className="lg:w-[320px]  h-[55px] ">
        <div className="pr-6 pl-12 py-2 h-full flex items-center gap-6">
          <div>
            <p className="text-xs text-tetriary font-semibold">Oracle Price</p>
            <p className="text-xs font-normal">
              {market?.oraclePrice &&
                scaleNumber(market?.oraclePrice.toString())}
            </p>
          </div>

          <div className="border-l border-[#444650] text-xs pl-2">
            <p className="text-tetriary font-semibold">Market Price</p>
            <p>
              {recentTrades.length > 0
                ? scaleNumber(Number(recentTrades[0].price))
                : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
