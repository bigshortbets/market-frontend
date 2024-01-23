import { useDeposit } from '@/blockchain/hooks/useDeposit';
import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useAccount } from 'wagmi';
import { selectedMarketIdAtom } from '../Market';
import useGetDeposit from '@/blockchain/hooks/useGetDeposit';
import {
  numberToCurrencyFormat,
  toFixedNoRounding,
} from '@/utils/numberToCurrencyFormat';
import { scaleNumber } from '@/utils/scaleNumber';
import { MarketType } from '@/types/marketTypes';
import { formatEther, parseEther } from 'viem';

interface DepositProps {
  triggerDepositRefetch: () => void;
  depositValue?: string;
  selectedMarket: MarketType;
  handleSetLoading: (val: boolean) => void;
}

export const Deposit = ({
  triggerDepositRefetch,
  depositValue,
  selectedMarket,
  handleSetLoading,
}: DepositProps) => {
  const [decimals, setDecimals] = useState<number>(2);
  const [amount, setAmount] = useState<number>(1);
  const { address } = useAccount();
  const { formattedBalance } = useNativeCurrencyBalance(address);
  const { write, isLoading } = useDeposit(amount, triggerDepositRefetch);
  const isActionDisabled = amount === 0 || amount > Number(formattedBalance);

  const countDecimalPlaces = (tick_size?: string) => {
    if (!tick_size) return 2;
    if (tick_size.includes('.')) {
      const parts = tick_size.split('.');
      if (parts[1]) {
        return parts[1].length;
      }
    }
    return 0;
  };

  useEffect(() => {
    const val = countDecimalPlaces(
      scaleNumber(String(selectedMarket.tickSize)).toString()
    );
    setDecimals(val);
  }, [selectedMarket]);

  useEffect(() => {
    if (isLoading) {
      handleSetLoading(true);
    } else {
      handleSetLoading(false);
    }
  }, [isLoading]);

  return (
    <div
      className="w-full h-full rounded flex flex-col transition ease-in-out px-1"
      onClick={() => console.log(decimals, selectedMarket!.tickSize)}
    >
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
            id={'amountInput'}
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
          : '?'}{' '}
      </p>
    </div>
  );
};
