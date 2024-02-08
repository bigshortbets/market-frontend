import { useAtom } from "jotai";
import React from "react";
import { selectedMarketIdAtom } from "../Market";
import { MarketType } from "@/types/marketTypes";
import { getMarkeDetails } from "@/utils/getMarketDetails";

interface MarketSelectItemProps {
  market: MarketType;
  handleCloseSelect: () => void;
}

export const MarketSelectItem = ({
  market,
  handleCloseSelect,
}: MarketSelectItemProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const details = getMarkeDetails(market.ticker);

  const handleAction = () => {
    setSelectedMarketId(market.id);
    handleCloseSelect();
  };
  return (
    <div
      className="w-full h-[55px] border-b border-t border-[#444650] flex items-center cursor-pointer"
      onClick={handleAction}
    >
      <div className="pl-12">
        <p className="text-[13px] font-semibold">
          {details ? details.name : market.ticker}
        </p>
        {details && <p className="text-[10px] font-normal">{market?.ticker}</p>}
      </div>
    </div>
  );
};
