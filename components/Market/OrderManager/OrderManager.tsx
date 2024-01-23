import { useCreateOrderWrite } from "@/blockchain/hooks/useCreateOrderWrite";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import ReactLoading from "react-loading";
import { useAccount } from "wagmi";
import { useAtom } from "jotai";
import { selectedMarketIdAtom } from "../Market";
import { findMarketById } from "@/utils/findMarketById";
import { MarketType } from "@/types/marketTypes";
import { useNativeCurrencyBalance } from "@/blockchain/hooks/useNativeCurrencyBalance";
import { IoMdInformationCircle } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { scaleNumber } from "@/utils/scaleNumber";

export enum OrderSideEnum {
  LONG,
  SHORT,
}

interface OrderManagerProps {
  markets: MarketType[];
  handleSetLoading: (val: boolean) => void;
}

export const OrderManager = ({
  markets,
  handleSetLoading,
}: OrderManagerProps) => {
  const [price, setPrice] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);

  const { address } = useAccount();
  const { formattedBalance } = useNativeCurrencyBalance(address);

  const { write: writeShortOrder, isLoading: isShortLoading } =
    useCreateOrderWrite(price, quantity, OrderSideEnum.SHORT);
  const { write: writeLongOrder, isLoading: isLongLoading } =
    useCreateOrderWrite(price, quantity, OrderSideEnum.LONG);

  const orderCost =
    (Number(selectedMarket?.initialMargin) / 100) *
    (price * quantity * Number(selectedMarket?.contractUnit));

  const orderValue = price * quantity * Number(selectedMarket?.contractUnit);

  const isActionDisabled = price === 0 || orderCost > Number(formattedBalance);

  useEffect(() => {
    selectedMarket &&
      setPrice(Number(scaleNumber(selectedMarket?.oraclePrice.toString())));
  }, [selectedMarket]);

  useEffect(() => {
    if (isShortLoading || isLongLoading) {
      handleSetLoading(true);
    } else {
      handleSetLoading(false);
    }
  }, [isShortLoading, isLongLoading]);

  return (
    <div
      className={`w-full h-full rounded flex flex-col transition ease-in-out px-1`}
    >
      <div className="mb-3">
        <div className="flex flex-col mb-3">
          <label
            htmlFor="orderPriceInput"
            className="leading-4 text-xs text-[#7F828F] font-semibold mb-1"
          >
            Order price
          </label>
          <div className="relative">
            <NumericFormat
              allowNegative={false}
              id={"orderPriceInput"}
              className="outline-none bg-[#23252E] border-none text-sm text-white py-3 rounded-lg px-3 w-full"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
            <span className="absolute right-3 bottom-[14px] text-xs opacity-50">
              USDC
            </span>
          </div>
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="quantityInput"
            className="leading-4 text-xs text-[#7F828F] font-semibold mb-1"
          >
            Quantity
          </label>
          <NumericFormat
            allowNegative={false}
            id={"quantityInput"}
            className="outline-none bg-[#23252E] border-none text-sm text-white py-3 rounded-lg px-3"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-1">
            <p className="text-xs">Order cost</p>
            <a
              data-tooltip-id="order-cost-tooltip"
              data-tooltip-html={`<b>Order cost</b> = Initial margin * ( Order price * Quantity * Contract unit )</br> <b>${orderCost}</b> = ${
                Number(selectedMarket?.initialMargin) / 100
              } * ( ${price} * ${quantity} * ${Number(
                selectedMarket?.contractUnit
              )} )`}
            >
              <IoMdInformationCircle className="text-[#7F828F] text-sm " />
            </a>
          </div>

          <p className="text-xs">{orderCost.toFixed(2)} USDC</p>
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-1">
            <p className="text-xs">Order value</p>
            <a
              data-tooltip-id="order-value-tooltip"
              data-tooltip-html={`<b>Order value</b> = Order Price * Quantity * Contract Unit</br> <b>${orderValue}</b> = ${price} * ${quantity} * ${Number(
                selectedMarket?.contractUnit
              )}`}
            >
              <IoMdInformationCircle className="text-[#7F828F] text-sm " />
            </a>
          </div>

          <p className="text-xs">{orderValue.toFixed(2)} USDC</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`flex-1  duration-300 transition bg-[#73D391] hover:bg-[#61C27B] ease-in-out py-2 flex flex-col items-center rounded-lg ${
            isActionDisabled && "opacity-50 pointer-events-none"
          }`}
          onClick={() => writeLongOrder?.()}
        >
          <p className="text-white text-sm font-bold">BUY</p>
          <p className="text-white text-xs font-bold">LONG</p>
        </button>
        <button
          className={`flex-1  duration-300 bg-[#D26D6C] hover:bg-[#C53F3A] transition ease-in-out py-2 flex flex-col items-center rounded-lg ${
            isActionDisabled && "opacity-50 pointer-events-none"
          }`}
          onClick={() => writeShortOrder?.()}
        >
          <p className="text-white text-sm font-bold rounded-lg">SELL</p>
          <p className="text-wwhite text-xs font-bold">SHORT</p>
        </button>
      </div>
      <Tooltip id="order-cost-tooltip" style={{ fontSize: "12px" }} />
      <Tooltip id="order-value-tooltip" style={{ fontSize: "12px" }} />
    </div>
  );
};
