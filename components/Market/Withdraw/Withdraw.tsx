import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { useWithdraw } from '@/blockchain/hooks/useWithdraw';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useAccount, useNetwork } from 'wagmi';
import { selectedMarketIdAtom, selectedMarketMarginAtom } from '../Market';
import { useAtom } from 'jotai';
import { findMarketById } from '@/utils/findMarketById';
import { MarketType } from '@/types/marketTypes';
import { bigshortbetsChain } from '@/blockchain/chain';

export interface WithdrawProps {
  markets: MarketType[];
}

export const Withdraw = ({ markets }: WithdrawProps) => {
  const { open } = useWeb3Modal();
  const [amount, setAmount] = useState<number>(1);
  const { address } = useAccount();
  const { data: walletBalance } = useNativeCurrencyBalance(address);
  const { write, isLoading } = useWithdraw(amount);
  const { chain } = useNetwork();
  const [selecteMarketMargin] = useAtom(selectedMarketMarginAtom);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const market = findMarketById(markets, selectedMarketId);

  const isBsbNetwork = chain?.id === bigshortbetsChain.id;

  const handleWithdraw = () => {
    if (!address) {
      open();
      return;
    }
    if (address && !isBsbNetwork) {
      switchToBigShortBetsChain();
      return;
    }
    write?.();
  };

  const possibleWithdraw =
    selecteMarketMargin?.liquidationStatus === 'EverythingFine'
      ? Number(selecteMarketMargin.margin) -
        Number(selecteMarketMargin.requiredDeposit)
      : 0;

  const withdrawDisabled = amount <= 0 || amount > possibleWithdraw;

  return (
    <div className="p-2.5 pb-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-secondary leading-[24px]">
          Withdraw
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
              id={'orderPriceInput'}
              className="text-right outline-none  w-[85%] bg-[#23252E]"
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
          <div className="flex justify-between items-center text-xs text-tetriary ">
            <p>Your current {market?.ticker} deposit</p>
            <p>
              {address
                ? `${Number(selecteMarketMargin?.margin).toFixed(2)} USDC`
                : '-'}{' '}
            </p>
          </div>
          <div className="flex justify-between items-center text-xs text-tetriary mb-2">
            <p>Your required {market?.ticker} deposit</p>
            <p>
              {Number(selecteMarketMargin?.requiredDeposit) > 0 && address
                ? `${Number(selecteMarketMargin?.requiredDeposit).toFixed(
                    2
                  )} USDC`
                : '-'}
            </p>
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex justify-between items-center text-xs text-secondary ">
              <p>Possible withdraw</p>
              <button
                className="underline"
                onClick={() => setAmount(possibleWithdraw)}
              >
                {possibleWithdraw.toFixed(2)} USDC
              </button>
            </div>
            <div className="flex justify-between items-center font-semibold text-[13px] text-secondary ">
              <p>Amount</p>
              <p>{amount.toFixed(2)} USDC</p>
            </div>
          </div>
        </div>
        <button
          disabled={address && isBsbNetwork ? withdrawDisabled : false}
          onClick={handleWithdraw}
          className={`disabled:bg-gray-400 bg-[#9BA6F8] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-3`}
        >
          {!address && 'Connect wallet'}
          {address && isBsbNetwork && 'Withdraw'}
          {address && !isBsbNetwork && 'Change network'}
        </button>
      </div>
    </div>
  );
};
