import { atom, useAtom } from "jotai";
import React from "react";
import { useAccount } from "wagmi";
import { OrderBookStateTab } from "../OrderBook/OrderBookStateTab";
import { FinanceManagerTab } from "./FinanceManagerTab";
import { OrderManager } from "../OrderManager/OrderManager";
import { MarketType } from "@/types/marketTypes";

interface FinanceManagerProps {
  markets: MarketType[];
}

const tabs = ["order", "deposit"];

export type FinanceManagerTabsType = (typeof tabs)[number];
export const financeManagerAtom = atom<FinanceManagerTabsType>("order");

export const FinanceManager = ({ markets }: FinanceManagerProps) => {
  const [financeManagerState] = useAtom(financeManagerAtom);
  const { address } = useAccount();
  return (
    <div className="w-[300px] h-[350px] rounded p-1 bg-secondary-bg">
      <div
        className={`w-full flex p-1 ${!address && "pointer-events-none"} mb-3`}
      >
        {tabs.map((tab, key) => (
          <FinanceManagerTab value={tab} key={key} />
        ))}
      </div>
      {financeManagerState === "order" && <OrderManager markets={markets} />}
    </div>
  );
};
