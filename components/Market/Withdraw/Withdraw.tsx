import { useWithdraw } from '@/blockchain/hooks/useWithdraw';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useAccount } from 'wagmi';
import { selectedMarketIdAtom, selectedMarketMarginAtom } from '../Market';
import { useAtom } from 'jotai';
import { EnrichedMarketType } from '@/types/marketTypes';
import { bigshortbetsChain } from '@/blockchain/chain';
import { FinanceManagerWarning } from '../FinanceManager/FinanceManagerWarning';
import { currencySymbol } from '@/blockchain/constants';
import { checkIfBidenMarket } from '@/utils/checkIfBidenMarket';
import { findMarketById } from '@/utils/findMarketById';

export interface WithdrawProps {
  markets: EnrichedMarketType[];
}

export const Withdraw = ({ markets }: WithdrawProps) => {
  const [amount, setAmount] = useState<number>(0);
  const { address, chain } = useAccount();
  const { write } = useWithdraw(amount);
  const [selecteMarketMargin] = useAtom(selectedMarketMarginAtom);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const selectedMarket = findMarketById(markets, selectedMarketId);

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
    write();
  };

  const possibleWithdraw =
    selecteMarketMargin?.liquidationStatus === 'EverythingFine' ||
    selecteMarketMargin?.liquidationStatus === ('None' as any)
      ? Number(selecteMarketMargin!.margin) -
        Number(selecteMarketMargin!.requiredDeposit)
      : 0;

  const withdrawDisabled = amount <= 0 || amount > possibleWithdraw || !address;

  const isBidenMarket = checkIfBidenMarket(selectedMarket?.ticker);

  return (
    <div className='p-2.5 pb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold text-secondary leading-[24px]'>
          Remove Margin from Current Market
        </p>
        <div className='flex flex-col'>
          <label
            htmlFor='orderPriceInput'
            className='ml-1 mb-1 text-xs text-secondary font-semibold'
          >
            Amount
          </label>
          <div className='relative bg-[#23252E] border-none text-xs text-white py-3 rounded-lg px-6'>
            <NumericFormat
              allowNegative={false}
              id={'orderPriceInput'}
              className='text-right outline-none  w-[85%] bg-[#23252E]'
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <span className='absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs'>
              {currencySymbol}
            </span>
          </div>
        </div>
      </div>
      <div className='p-2 rounded-lg bg-[#000211] flex flex-col gap-4'>
        <p className='text-sm font-semibold text-secondary leading-[24px]'>
          Summary
        </p>
        <div className='flex flex-col gap-2 '>
          <div className='flex justify-between items-center text-xs text-tetriary '>
            <p>Current Deposit</p>
            <p>
              {address
                ? `${Number(selecteMarketMargin?.margin).toFixed(
                    2
                  )} ${currencySymbol}`
                : '-'}{' '}
            </p>
          </div>
          <div className='flex justify-between items-center text-xs text-tetriary mb-2'>
            <p>Required Deposit</p>
            <p>
              {Number(selecteMarketMargin?.requiredDeposit) > 0 && address
                ? `${Number(selecteMarketMargin?.requiredDeposit).toFixed(
                    2
                  )} ${currencySymbol}`
                : '-'}
            </p>
          </div>

          <div className='flex flex-col gap-2 '>
            {address && (
              <div className='flex justify-between items-center text-xs text-secondary '>
                <p>Available for withdrawal</p>
                <button
                  className='underline'
                  onClick={() => setAmount(possibleWithdraw)}
                >
                  {possibleWithdraw.toFixed(2)} {currencySymbol}
                </button>
              </div>
            )}

            <div className='flex justify-between items-center font-semibold text-[13px] text-secondary '>
              <p>Amount</p>
              <p>
                {amount.toFixed(2)} {currencySymbol}
              </p>
            </div>
          </div>
        </div>
        <button
          disabled={withdrawDisabled}
          onClick={handleWithdraw}
          className={`disabled:bg-gray-400 bg-[#4ECB7D] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-3`}
        >
          {!address && 'Withdraw'}
          {address && isBsbNetwork && 'Withdraw'}
          {address && !isBsbNetwork && 'Change Network'}
        </button>
      </div>
      {isBidenMarket && (
        <FinanceManagerWarning error='This market (BIGSB_EL:BIDENX2024) will close at 18:00 UTC on 26 July 2024. ' />
      )}
      {!address && (
        <FinanceManagerWarning error='Connect your wallet to interact with the market. ' />
      )}
      {address && amount > possibleWithdraw && (
        <FinanceManagerWarning error='Your given amount is greater than possible withdrawal value.' />
      )}
    </div>
  );
};
