import React from "react";
import { TradingHubStateType, tradingHubStateAtom } from "./TradingHub";
import { useAtom } from "jotai";

interface TradingHubTabProps {
  value: TradingHubStateType;
}

export const TradingHubTab = ({ value }: TradingHubTabProps) => {
  const [tradingHubState, setTradingHubState] = useAtom(tradingHubStateAtom);

  const isActive = tradingHubState === value;
  return (
    <button
      className={` rounded-lg flex items-center justify-center text-[13px] font-semibold py-2 px-4 ${
        isActive ? "bg-[#444650]" : "bg-[#23252E] text-tetriary"
      }`}
      onClick={() => setTradingHubState(value)}
    >
      <p className="capitalize">{value}</p>
    </button>
  );
};
