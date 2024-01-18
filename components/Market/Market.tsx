import { useEffect } from "react";
import { MarketBar } from "../MarketBar";
import { Navbar } from "../Navbar/Navbar";
import { MarketType } from "@/types/marketTypes";
import { atom, useAtom } from "jotai";
import { ContractDetails } from "./ContractDetails/ContractDetails";
import { OrderManager } from "./OrderManager/OrderManager";
import { TradingHub } from "./TradingHub/TradingHub";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { Mobile } from "../Mobile";
import { OrderBookContainer } from "./OrderBook/OrderBookContainer";
import { FinanceManager } from "./FinanceManager/FinanceManager";

interface MarketProps {
  markets: MarketType[];
}

export type UIConfigurationType = "HubOrder" | "OrderHub";

export const selectedMarketIdAtom = atom<string>("");
export const UIConfigurationAtom = atom<UIConfigurationType>("HubOrder");

export const Market = ({ markets }: MarketProps) => {
  const [, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    setSelectedMarketId(markets[0].id);
    if (chain?.id != 2137) {
      switchNetwork?.(2137);
    }
  }, []);

  const [UIConfiguration] = useAtom(UIConfigurationAtom);

  return (
    <div className="h-screen w-full">
      <div className={`h-full bg-primary-bg flex-col hidden lg:flex`}>
        <Navbar />
        <MarketBar markets={markets} />
        <div className="h-[(100vh-120px)] px-6 py-6">
          <div
            className={`flex justify-between gap-6 h-full ${
              UIConfiguration === "HubOrder" ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <TradingHub />
            <div className="h-full">
              <OrderBookContainer />
            </div>
            <div className="flex flex-col gap-6 h-full">
              {/*  <OrderManager markets={markets} /> */}
              <FinanceManager markets={markets} />
              <ContractDetails markets={markets} />
            </div>
          </div>
        </div>
      </div>
      <Mobile />
    </div>
  );
};
