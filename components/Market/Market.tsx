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
import { MarketInterface } from "./MarketInteface/MarketInterface";

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
    <div className="h-screen w-full bg-[#111217] flex  flex-col">
      <Navbar />
      <div className="flex-grow p-6 flex gap-6">
        <MarketInterface markets={markets} />
        <div className="flex-grow h-full border-[#444650] border rounded-[10px] flex flex-col bg-[#191B24]">
          <div className="flex-grow"></div>
          <div className="h-[58px] border-t border-[#444650] "></div>
        </div>
      </div>
      {/* <div className={`h-full flex-col hidden lg:flex `}>
        <Navbar />
        <MarketBar markets={markets} />

        <div
          className="px-6 py-6 w-full max-w-[1800px] mx-auto"
          style={{ height: "calc(100vh - 120px)" }}
        >
          <div
            className={`flex justify-between gap-6 h-full ${
              UIConfiguration === "HubOrder" ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <TradingHub />

            <OrderBookContainer />

            <div className="flex flex-col gap-6 h-full ">
              <FinanceManager markets={markets} />
                     <ContractDetails markets={markets} /> 
            </div>
          </div>
        </div>
      </div>
      <Mobile /> */}
    </div>
  );
};
