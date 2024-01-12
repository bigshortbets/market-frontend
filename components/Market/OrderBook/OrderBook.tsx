import {
  ORDER_BOOK_LONGS_SUBSCRIPTION,
  ORDER_BOOK_SHORTS_SUBSCRIPTION,
  RECENT_MARKET_POSITIONS_SUBSCRIPTION,
} from "@/api/queries";
import { useSubscription } from "@apollo/client";
import { useAtom } from "jotai";
import React from "react";
import { selectedMarketIdAtom } from "../Market";
import { OrderBookResponse } from "@/types/orderTypes";
import { OrderBookItem } from "./OrderBookItem";

export enum OrderSide {
  LONG = "LONG",
  SHORT = "SHORT",
}

export const OrderBook = () => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const { data: longsRes } = useSubscription<OrderBookResponse>(
    ORDER_BOOK_LONGS_SUBSCRIPTION,
    {
      variables: { marketId: selectedMarketId, limit: 5, side: OrderSide.LONG },
    }
  );

  const { data: shortsRes } = useSubscription<OrderBookResponse>(
    ORDER_BOOK_SHORTS_SUBSCRIPTION,
    {
      variables: {
        marketId: selectedMarketId,
        limit: 5,
        side: OrderSide.SHORT,
      },
    }
  );

  const numberOfShorts = shortsRes
    ? shortsRes.aggregatedOrdersByPrices.length
    : 0;

  const shortPlaceholders = Array.from({ length: 5 - numberOfShorts });

  const numberOfLongs = longsRes ? longsRes.aggregatedOrdersByPrices.length : 0;

  const longsPlaceholders = Array.from({ length: 5 - numberOfLongs });

  return (
    <div
      className="w-full h-[400px] flex flex-col"
      onClick={() => console.log(longsRes)}
    >
      <div className="py-2 flex pl-2 text-xs">
        <p className="flex-1">Price</p>
        <p className="flex-1">Quantity</p>
      </div>
      <div className="flex-1 flex-col-reverse flex">
        {shortsRes &&
          shortsRes.aggregatedOrdersByPrices.map((data, key) => (
            <OrderBookItem
              side={OrderSide.SHORT}
              empty={false}
              data={data}
              key={key}
            />
          ))}
        {shortPlaceholders.map((_, key) => (
          <OrderBookItem side={OrderSide.SHORT} empty key={key} />
        ))}
      </div>
      <hr className="opacity-[8%] " />
      <div className="flex-1 flex flex-col">
        {longsRes &&
          longsRes.aggregatedOrdersByPrices.map((data, key) => (
            <OrderBookItem
              side={OrderSide.LONG}
              empty={false}
              data={data}
              key={key}
            />
          ))}
        {longsPlaceholders.map((_, key) => (
          <OrderBookItem side={OrderSide.LONG} empty key={key} />
        ))}
      </div>
    </div>
  );
};
