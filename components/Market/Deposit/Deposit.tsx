import { useDeposit } from "@/blockchain/hooks/useDeposit";
import { useNativeCurrencyBalance } from "@/blockchain/hooks/useNativeCurrencyBalance";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useAccount } from "wagmi";
import { selectedMarketIdAtom } from "../Market";
import useGetDeposit from "@/blockchain/hooks/useGetDeposit";
import {
  numberToCurrencyFormat,
  toFixedNoRounding,
} from "@/utils/numberToCurrencyFormat";
import { scaleNumber } from "@/utils/scaleNumber";
import { MarketType } from "@/types/marketTypes";
import { formatEther, parseEther } from "viem";

/* interface DepositProps {
  triggerDepositRefetch: () => void;
  depositValue?: string;
  selectedMarket: MarketType;
  handleSetLoading: (val: boolean) => void;
}
 */
export const Deposit = (/* {
  triggerDepositRefetch,
  depositValue,
  selectedMarket,
  handleSetLoading,
}: DepositProps */) => {
  const [amount, setAmount] = useState<number>(1);
  const { address } = useAccount();
  const { data: walletBalance } = useNativeCurrencyBalance(address);

  return (
    <div className="p-2.5 pb-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-secondary leading-[24px]">
          Deposit
        </p>
        <div className="flex flex-col">
          <label
            htmlFor="orderPriceInput"
            className="ml-1 mb-1 text-xs text-secondary font-semibold"
          >
            Amount
          </label>
          <div className="relative bg-[#23252E] border-none text-xs text-white py-3 rounded-lg px-2">
            <NumericFormat
              allowNegative={false}
              id={"orderPriceInput"}
              className="text-right outline-none  w-[85%] bg-[#23252E] rounded-lg"
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
            />
            <span className="absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs">
              USDC
            </span>
          </div>
        </div>
      </div>
      <div className="p-2 rounded-lg bg-[#000211] flex flex-col gap-4">
        <p className="text-sm font-semibold text-secondary leading-[24px]">
          Summary
        </p>
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between items-center font-semibold text-[13px] text-secondary ">
            <p>Total</p>
            <p>{amount.toFixed(2)} USDC</p>
          </div>
          {/*  <div className="flex justify-between items-center font-semibold text-xs text-tetriary ">
            <p>Wallet balance</p>
            <p>{address ? Number(walletBalance?.formatted).toFixed(2) : "-"}</p>
          </div> */}
        </div>

        <button
          /* onClick={handleWriteOrder}
          disabled={isActionDisabled} */
          className={`disabled:bg-gray-400 bg-[#9BA6F8] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-3`}
        >
          {address ? "Confirm deposit" : "Connect wallet"}
        </button>
      </div>
    </div>
    /*  <div className="w-full h-full rounded flex flex-col transition ease-in-out px-1">
      <div className="flex flex-col mb-3">
        <label
          htmlFor="amountInput"
          className="leading-4 text-xs text-[#7F828F] font-semibold mb-1"
        >
          Amount
        </label>
        <div className="relative">
          <NumericFormat
            allowNegative={false}
            id={"amountInput"}
            className="outline-none bg-[#23252E] border-none text-sm text-white py-3 rounded-lg px-3 w-full"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
          />
          <span className="absolute right-3 bottom-[14px] text-xs opacity-50">
            USDC
          </span>
        </div>
      </div>
      <button
          onClick={() => write?.()}
        className="w-full py-2 rounded bg-[#9BA6F8] text-black font-semibold"
        disabled={isActionDisabled}
      >
        Deposit
      </button>
      <p>
        {depositValue !== undefined
          ? Number(depositValue) < 0.00001
            ? numberToCurrencyFormat(0, decimals)
            : numberToCurrencyFormat(
                toFixedNoRounding(Number(depositValue)),
                decimals
              )
          : '?'}
      </p>
    </div> */
  );
};
