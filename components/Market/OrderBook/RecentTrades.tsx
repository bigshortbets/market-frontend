import { useAtom } from "jotai";
import React from "react";
import { selectedMarketIdAtom } from "../Market";
import { useSubscription } from "@apollo/client";
import { RECENT_MARKET_POSITIONS_SUBSCRIPTION } from "@/api/queries";
import { RecentPositionTypeResponse } from "@/types/positionTypes";
import { RecentTradesItem } from "./RecentTradesItem";

interface RecentTradesProps {
  positionsRes: RecentPositionTypeResponse | undefined;
}

export const RecentTrades = ({ positionsRes }: RecentTradesProps) => {
  return (
    <div className="flex flex-col pt-[14px] px-4 text-xs">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <p className="text-[#7F828F] font-semibold">Quantity</p>
          <div className="w-10 h-4 rounded bg-[#7F828F] items-center flex justify-center text-[#191B24]">
            UNT
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-[#7F828F] font-semibold">Price</p>
          <div className="w-10 h-4 rounded bg-[#7F828F] items-center flex justify-center text-[#191B24]">
            USDC
          </div>
        </div>
      </div>
      <div className="py-2.5">
        {positionsRes?.positions &&
          positionsRes.positions.map((position, key) => (
            <RecentTradesItem position={position} key={key} />
          ))}
      </div>
    </div>
  );
};
