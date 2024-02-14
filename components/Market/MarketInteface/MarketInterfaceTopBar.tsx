import { MarketType } from "@/types/marketTypes";
import { findMarketById } from "@/utils/findMarketById";
import { scaleNumber } from "@/utils/scaleNumber";
import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { MarketSelectItem } from "./MarketSelectItem";
import { getMarkeDetails } from "@/utils/getMarketDetails";
import Image from "next/image";

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div className="flex border-b border-[#444650]">
      {/* SELECT */}
      <div
        className="flex-1 bg-[#23252E] rounded-tl-[10px] relative"
        ref={selectRef}
      >
        <div
          className="pr-6 pl-12 py-2 flex w-full justify-between items-center h-full cursor-pointer"
          onClick={handleToggleSelectOpen}
        >
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[13px] font-semibold">
                {marketDetails ? marketDetails.name : market?.ticker}
              </p>
              {marketDetails && (
                <Image
                  src={marketDetails.path}
                  width={14}
                  height={14}
                  alt="Market logo"
                  className="rounded-full"
                />
              )}
            </div>
            {marketDetails && (
              <p className="text-[10px] font-normal">{market?.ticker}</p>
            )}
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
            {markets.map((market, key) => (
              <MarketSelectItem
                market={market}
                handleCloseSelect={handleCloseSelect}
              />
            ))}
          </div>
        )}
      </div>
      {/*  */}
      <div className="flex-1 h-[55px] border-l border-[#444650]">
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
            <p>2137x</p>
          </div>
        </div>
      </div>
    </div>
  );
};
