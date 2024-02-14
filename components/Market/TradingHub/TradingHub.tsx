import { TradingHubTab } from "./TradingHubTab";
import { atom } from "jotai";
import { useAccount } from "wagmi";
import { TradingHubContentContainer } from "./TradingHubContentContainer";

const tabs = ["positions", "orders", "history"] as const;

export type TradingHubStateType = (typeof tabs)[number];

export const tradingHubStateAtom = atom<TradingHubStateType>("positions");

export const TradingHub = () => {
  const { address } = useAccount();

  return (
    <div className="flex-grow h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]">
      {/* <div className="w-full bg-primary-bg h-[45px]">
        <div className="bg-secondary-bg rounded-t w-1/2 h-full flex p-1 gap-1">
          {tabs.map((tab, key) => (
            <TradingHubTab key={key} value={tab} />
          ))}
        </div>
      </div>
      {address && <TradingHubContentContainer />} */}
      <div className="flex-grow">
        <div className="px-2.5 pt-3 pb-2.5 flex gap-1">
          {tabs.map((tab, key) => (
            <TradingHubTab key={key} value={tab} />
          ))}
        </div>
      </div>
      <div className="h-[58px] border-t border-[#444650] "></div>
    </div>
  );
};
