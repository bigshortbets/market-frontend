import { MarketType } from "@/types/marketTypes";
import { useAtom } from "jotai";
import React from "react";
import { selectedMarketIdAtom } from "../Market";
import { findMarketById } from "@/utils/findMarketById";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { scaleNumber } from "@/utils/scaleNumber";
import { MarketInterfaceLowerBar } from "./MarketInterfaceLowerBar";
import { MarketInterfaceTopBar } from "./MarketInterfaceTopBar";

interface MarketInterfaceProps {
  markets: MarketType[];
}

export const MarketInterface = ({ markets }: MarketInterfaceProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);

  return (
    <div className="w-[720px] h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]">
      <div className="flex-grow flex flex-col overflow-auto no-scrollbar">
        {/* TOPBAR */}
        <MarketInterfaceTopBar
          markets={markets}
          selectedMarketId={selectedMarketId}
        />
        <div className="flex-grow flex">
          <div className="h-full flex-1 border-r border-[#444650]"></div>
          <div className="h-full flex-1"></div>
        </div>
      </div>
      <MarketInterfaceLowerBar />
    </div>
  );
};
