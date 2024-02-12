import { atom, useAtom } from "jotai";
import React from "react";
import { OrderBookStateTab } from "./OrderBookStateTab";
import { OrderBook } from "./OrderBook";
import { RecentTrades } from "./RecentTrades";
import { useAccount } from "wagmi";
import { useSubscription } from "@apollo/client";
import { RecentPositionTypeResponse } from "@/types/positionTypes";
import { RECENT_MARKET_POSITIONS_SUBSCRIPTION } from "@/api/queries";
import { selectedMarketIdAtom } from "../Market";

const tabs = ["orderbook", "trades"];

export type OrderBookStateTabsType = (typeof tabs)[number];

export const orderBookStateAtom = atom<OrderBookStateTabsType>("trades");

export const OrderBookContainer = () => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const { address } = useAccount();
  const [orderBookState] = useAtom(orderBookStateAtom);
  const { data: recentPositionsRes } =
    useSubscription<RecentPositionTypeResponse>(
      RECENT_MARKET_POSITIONS_SUBSCRIPTION,
      {
        variables: { marketId: selectedMarketId },
      }
    );
  return (
    <div className="flex flex-col">
      <div className="py-3 px-4 border-b border-[#444650] flex flex-row-reverse items-center gap-2">
        {tabs.map((tab, key) => (
          <OrderBookStateTab key={key} value={tab} />
        ))}
      </div>
      {orderBookState === "book" && <OrderBook />}
      {orderBookState === "trades" && (
        <RecentTrades positionsRes={recentPositionsRes} />
      )}
    </div>

    /* <div
      className={`h-[440px] w-[230px] rounded bg-secondary-bg ${
        !address && 'opacity-50 pointer-events-none'
      }}`}
    >
      <div
        className={`w-full h-[40px] flex p-1 ${
          !address && 'pointer-events-none'
        }`}
      >
        {tabs.map((tab, key) => (
          <OrderBookStateTab key={key} value={tab} />
        ))}
      </div>
      <div className="w-full h-full">
        {orderBookState === 'book' && <OrderBook />}
        {orderBookState === 'trades' && <RecentTrades />}
      </div>
    </div> */
  );
};
