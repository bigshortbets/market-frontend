import { MarketType } from "@/types/marketTypes";
import { useAtom } from "jotai";
import React from "react";
import { selectedMarketIdAtom } from "../Market";
import { findMarketById } from "@/utils/findMarketById";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { scaleNumber } from "@/utils/scaleNumber";

interface MarketInterfaceProps {
  markets: MarketType[];
}

export const MarketInterface = ({ markets }: MarketInterfaceProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const market = findMarketById(markets, selectedMarketId);
  return (
    <div className="w-[720px] h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]">
      <div className="flex-grow">
        {/* TOPBAR */}
        <div className="flex border-b border-[#444650]">
          <div className="flex-1 bg-[#23252E] ">
            <div className="pr-6 pl-12 py-2 flex justify-between items-center h-full">
              <div>
                <p className="text-[13px] font-semibold">Mocked name</p>
                <p className="text-[10px] font-normal">{market?.ticker}</p>
              </div>
              <button className="text-[24px]">
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>
          </div>
          <div className="flex-1 h-[55px] border-l border-[#444650]">
            <div className="pr-6 pl-12 py-2 h-full flex items-center gap-6">
              <div>
                <p className="text-xs text-tetriary font-semibold">
                  Oracle Price
                </p>
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
      </div>
      <div className="h-[58px] border-t border-[#444650] px-5 py-3">
        <div className="flex items-center gap-10">
          <div className=" text-xs text-right">
            <p className="text-tetriary font-semibold">Market gain / loss</p>
            <p className="text-[#87DAA4]">+2137$</p>
          </div>
          <div className="border-l border-[#444650] h-[32px] text-xs pl-2">
            <p className="text-tetriary font-semibold">Market deposit</p>
            <p>2137$</p>
          </div>
        </div>
      </div>
    </div>
  );
};
