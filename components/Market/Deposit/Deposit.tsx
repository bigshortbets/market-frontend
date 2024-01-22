import { useDeposit } from "@/blockchain/hooks/useDeposit";
import { useNativeCurrencyBalance } from "@/blockchain/hooks/useNativeCurrencyBalance";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useAccount } from "wagmi";

interface DepositProps {
  handleSetLoading: (val: boolean) => void;
}

export const Deposit = ({ handleSetLoading }: DepositProps) => {
  const [amount, setAmount] = useState<number>(1);
  const { address } = useAccount();
  const { formattedBalance } = useNativeCurrencyBalance(address);
  const { write, isLoading } = useDeposit(amount);
  const isActionDisabled = amount === 0 || amount > Number(formattedBalance);

  useEffect(() => {
    if (isLoading) {
      handleSetLoading(true);
    } else {
      handleSetLoading(false);
    }
  }, [isLoading]);
  return (
    <div className="w-full h-full rounded flex flex-col transition ease-in-out px-1">
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
    </div>
  );
};
