import { atom, useAtom } from "jotai";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { OrderBookStateTab } from "../OrderBook/OrderBookStateTab";
import { FinanceManagerTab } from "./FinanceManagerTab";
import { OrderManager } from "../OrderManager/OrderManager";
import { MarketType } from "@/types/marketTypes";
import { Deposit } from "../Deposit/Deposit";
import useGetDeposit from "@/blockchain/hooks/useGetDeposit";
import { selectedMarketIdAtom } from "../Market";
import { findMarketById } from "@/utils/findMarketById";
import ReactLoading from "react-loading";
import { IoMdInformationCircle } from "react-icons/io";

interface FinanceManagerProps {
  markets: MarketType[];
}

const tabs = ["order", "deposit", "withdraw"];

export type FinanceManagerTabsType = (typeof tabs)[number];
export const financeManagerAtom = atom<FinanceManagerTabsType>("order");

const loadingState = "opacity-50 pointer-events-none";

export const FinanceManager = ({ markets }: FinanceManagerProps) => {
  const [getDepositRefetchTrigger, setGetDepositRefetchTrigger] =
    useState<number>(1);

  const triggerDepositRefetch = () => {
    setGetDepositRefetchTrigger(
      (getDepositRefetchTrigger) => getDepositRefetchTrigger + 1
    );
  };
  const [financeManagerState] = useAtom(financeManagerAtom);
  const { address } = useAccount();
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { depositRes } = useGetDeposit(
    selectedMarketId,
    address,
    getDepositRefetchTrigger
  );
  const selectedMarket = findMarketById(markets, selectedMarketId);

  const [loading, setLoading] = useState<boolean>(true);

  const handleSetLoading = (val: boolean) => {
    setLoading(val);
  };
  return (
    <div className="flex flex-col">
      <div className="py-3 px-4 border-b border-[#444650] flex items-center gap-2">
        <IoMdInformationCircle className="w-6 h-6 mr-4 text-[#444650]" />

        {tabs.map((tab, key) => (
          <FinanceManagerTab value={tab} key={key} />
        ))}
      </div>
    </div>
    /* <div
      className={`w-[300px] h-[440px] rounded p-1 bg-secondary-bg relative flex flex-col ${
        loading && loadingState
      }`}
    >
      {loading && (
        <ReactLoading
          type={'spin'}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width={60}
        />
      )}
      <div
        className={`w-full flex p-1 ${
          !address && 'pointer-events-none'
        } mb-3 h-[40px]`}
      >
        {tabs.map((tab, key) => (
          <FinanceManagerTab value={tab} key={key} />
        ))}
      </div>
      {financeManagerState === 'order' && (
        <OrderManager markets={markets} handleSetLoading={handleSetLoading} />
      )}
      {financeManagerState === 'deposit' && depositRes && (
        <Deposit
          triggerDepositRefetch={triggerDepositRefetch}
          depositValue={(depositRes as any)!.result as string}
          selectedMarket={selectedMarket!}
          handleSetLoading={handleSetLoading}
        />
      )}
    </div> */
  );
};
