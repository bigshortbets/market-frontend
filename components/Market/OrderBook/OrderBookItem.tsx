import React from "react";
import { OrderSide } from "./OrderBook";
import { OrderBookOrder } from "@/types/orderTypes";
import { scaleNumber } from "@/utils/scaleNumber";

interface OrderBookItem {
  empty: boolean;
  side: OrderSide;
  data?: OrderBookOrder;
}

export const OrderBookItem = ({ empty, side, data }: OrderBookItem) => {
  return (
    <div
      className={`flex-1  bg-opacity-[15%] border-opacity-[15%] text-opacity-50  border ${
        side === OrderSide.LONG
          ? "border-green-800 bg-green-900 text-green-300"
          : "border-red-800 bg-red-900 text-red-300"
      }`}
    >
      {!empty && data && (
        <div className="w-full items-center h-full flex pl-2 text-xs">
          <div className="flex-1">{scaleNumber(data.price)}</div>
          <div className="flex-1">{data.quantity}</div>
        </div>
      )}
    </div>
  );
};
