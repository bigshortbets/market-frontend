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
import { MarketSelect } from '../FinanceManager/MarketSelect';

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
      <MarketSelect markets={markets} selectedMarketId={selectedMarketId} />

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
