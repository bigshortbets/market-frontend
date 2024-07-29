import { useDeposit } from '@/blockchain/hooks/useDeposit';
import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useAccount } from 'wagmi';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';
import { useAtom } from 'jotai';
import {
  collateralAtom,
  selectedMarketIdAtom,
  selectedMarketMarginAtom,
  unsettledLossesAtom,
} from '../Market';
import { findMarketById } from '@/utils/findMarketById';
import { EnrichedMarketType } from '@/types/marketTypes';
import { LiquidationStatusTab } from '../LiquidationStatusTab';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { FinanceManagerInfo } from '../FinanceManager/FinanceManagerInfo';
import { bigshortbetsChain } from '@/blockchain/chain';
import { FinanceManagerWarning } from '../FinanceManager/FinanceManagerWarning';
import { currencySymbol } from '@/blockchain/constants';
import { chosenMarketAtom } from '@/store/store';
import { checkIfBidenMarket } from '@/utils/checkIfBidenMarket';

export interface DepositProps {
  markets: EnrichedMarketType[];
}

export const Deposit = ({ markets }: DepositProps) => {
  const [amount, setAmount] = useState<string>('0');
  const numAmount = Number(amount);
  const [chosenMarket] = useAtom(chosenMarketAtom);
  const { address, chain } = useAccount();
  const { data: walletBalance, refetch } = useNativeCurrencyBalance(address);
  const { write: writeDeposit } = useDeposit(numAmount);
  const isBsbNetwork = chain?.id === bigshortbetsChain.id;
  const [selecteMarketMargin] = useAtom(selectedMarketMarginAtom);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const selectedMarket = findMarketById(markets, selectedMarketId);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDeposit = () => {
    if (!address) {
      open();
      return;
    }
    if (address && !isBsbNetwork) {
      switchToBigShortBetsChain();
      return;
    }
    writeDeposit();
  };

  const depositDisabled =
    Number(walletBalance?.formatted) < numAmount + 50 ||
    numAmount <= 0 ||
    !address;

  const [unsettledLosesArr] = useAtom(unsettledLossesAtom);
  const [collateralArr] = useAtom(collateralAtom);

  const unsettledLoses = unsettledLosesArr[selectedMarketId];
  const collateral = collateralArr[selectedMarketId];

  const toEverythingFine = (
    Number(selecteMarketMargin?.margin) -
    Number(selecteMarketMargin?.requiredDeposit)
  ).toFixed(2);

  const toMarginCall = (
    Number(selecteMarketMargin?.margin) -
    Number(
      collateral * (Number(chosenMarket!.initialMargin.toString()) / 100) +
        unsettledLoses
    )
  ).toFixed(2);

  const toLiquidation = (
    Number(selecteMarketMargin?.margin) -
    Number(
      collateral * (Number(chosenMarket!.maintenanceMargin.toString()) / 100) +
        unsettledLoses
    )
  ).toFixed(2);

  const handleAddNegative = (val: number) => {
    if (val < 0) {
      setAmount(Math.abs(val).toString());
    }
  };

  const isBidenMarket = checkIfBidenMarket(selectedMarket?.ticker);

  return (
    <div className='p-2.5 pb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold text-secondary leading-[24px]'>
          Add Margin to Current Market
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
              value={amount}
              allowNegative={false}
              id={'orderPriceInput'}
              className='text-right outline-none  w-[85%] bg-[#23252E] '
              onChange={(e) => setAmount(e.target.value)}
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
          {address && (
            <div className='flex justify-between items-center text-xs text-tetriary mb-2'>
              <p>Status</p>
              <LiquidationStatusTab
                status={
                  selecteMarketMargin?.liquidationStatus as LiquidationStatusType
                }
              />
            </div>
          )}

          {selecteMarketMargin?.liquidationStatus != 'EverythingFine' &&
            address && (
              <div className='flex justify-between items-center text-xs text-tetriary mb-2'>
                <div className='flex items-center gap-1.5'>
                  <p>To</p>
                  <LiquidationStatusTab status={'EverythingFine'} />
                </div>
                <p
                  onClick={() => handleAddNegative(Number(toEverythingFine))}
                  className={`text-xs font-semibold ${
                    Number(toEverythingFine) > 0
                      ? 'text-[#ACE7C2]'
                      : 'text-[#DA8D8B] underline cursor-pointer'
                  }`}
                >
                  {Number(toEverythingFine) > 0
                    ? `+${toEverythingFine}`
                    : toEverythingFine}{' '}
                  {currencySymbol}
                </p>
              </div>
            )}
          {selecteMarketMargin?.liquidationStatus != 'MarginCall' &&
            Number(selecteMarketMargin?.requiredDeposit) > 0 && (
              <div className='flex justify-between items-center text-xs text-tetriary mb-2'>
                <div className='flex items-center gap-1.5'>
                  <p>To</p>
                  <LiquidationStatusTab status={'MarginCall'} />
                </div>
                <p
                  onClick={() => handleAddNegative(Number(toMarginCall))}
                  className={`text-xs font-semibold ${
                    Number(toMarginCall) > 0
                      ? 'text-[#ACE7C2]'
                      : 'text-[#DA8D8B] underline cursor-pointer'
                  }`}
                >
                  {Number(toMarginCall) > 0 ? `+${toMarginCall}` : toMarginCall}{' '}
                  {currencySymbol}
                </p>
              </div>
            )}
          {selecteMarketMargin?.liquidationStatus != 'Liquidation' &&
            Number(selecteMarketMargin?.requiredDeposit) > 0 && (
              <div className='flex justify-between items-center text-xs text-tetriary mb-2'>
                <div className='flex items-center gap-1.5'>
                  <p>To</p>
                  <LiquidationStatusTab status={'Liquidation'} />
                </div>
                <p
                  onClick={() => handleAddNegative(Number(toLiquidation))}
                  className={`text-xs font-semibold ${
                    Number(toLiquidation) > 0
                      ? 'text-[#ACE7C2]'
                      : 'text-[#DA8D8B] underline cursor-pointer'
                  }`}
                >
                  {Number(toLiquidation) > 0
                    ? `+${toLiquidation}`
                    : toLiquidation}{' '}
                  {currencySymbol}
                </p>
              </div>
            )}

          {/*   {selecteMarketMargin?.liquidationStatus != 'EverythingFine' &&
            selecteMarketMargin?.liquidationStatus && (
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <LiquidationStatusTab
                    status={
                      selecteMarketMargin.liquidationStatus as LiquidationStatusType
                    }
                  />
                  <div className="text-lg">
                    <FaLongArrowAltRight />
                  </div>
                  <LiquidationStatusTab status={'EverythingFine'} />
                </div>
                <button
                  className="text-xs underline cursor-pointer"
                  onClick={() =>
                    setAmount(
                      Number(selecteMarketMargin.requiredDeposit) -
                        Number(selecteMarketMargin.margin)
                    )
                  }
                >
                  {(
                    Number(selecteMarketMargin.requiredDeposit) -
                    Number(selecteMarketMargin.margin)
                  ).toFixed(2)}{' '}
                  USDC
                </button>
              </div>
            )} */}

          <div className='flex justify-between items-center font-semibold text-[13px] text-secondary '>
            <p>Amount</p>
            <p>
              {numAmount.toFixed(2)} {currencySymbol}
            </p>
          </div>
        </div>

        <button
          disabled={depositDisabled}
          onClick={handleDeposit}
          className={`disabled:bg-gray-400 bg-[#4ECB7D] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-3`}
        >
          {!address && 'Deposit'}
          {address && isBsbNetwork && 'Deposit'}
          {address && !isBsbNetwork && 'Change network'}
        </button>
      </div>
      {isBidenMarket && (
        <FinanceManagerWarning error='This market (BIGSB_EL:BIDENX2024) will close at 18:00 UTC on 26 July 2024. ' />
      )}
      {selecteMarketMargin?.liquidationStatus != 'EverythingFine' &&
        selecteMarketMargin?.liquidationStatus != ('None' as any) &&
        selecteMarketMargin &&
        selecteMarketMargin.requiredDeposit &&
        address && (
          <FinanceManagerInfo
            value={`To change your market status from ${
              selecteMarketMargin?.liquidationStatus
            } to Everthing fine, you need to deposit ${(
              Number(selecteMarketMargin!.requiredDeposit) -
              Number(selecteMarketMargin!.margin)
            ).toFixed(2)} ${currencySymbol} to ${chosenMarket?.ticker} market.`}
          />
        )}
      {address &&
        numAmount + 50 > Number(walletBalance?.formatted) &&
        Number(walletBalance?.formatted) > 0 &&
        Number(walletBalance?.formatted) > numAmount && (
          <FinanceManagerWarning
            error={`Your wallet balance is enough to cover the deposit cost, but an additional buffer of 50 ${currencySymbol} is required to cover potential gas in the future.`}
          />
        )}
      {!address && (
        <FinanceManagerWarning error='Connect your wallet to interact with the market. ' />
      )}
      {address &&
        Number(walletBalance?.formatted) < numAmount &&
        Number(walletBalance?.formatted) > 0 && (
          <FinanceManagerWarning
            error={`Your given amount is greater than your wallet balance.`}
          />
        )}
      {address && Number(walletBalance?.formatted) === 0 && (
        <FinanceManagerWarning
          error={`Your wallet has no funds. Please add ${currencySymbol} to proceed with your deposit.`}
        />
      )}
    </div>
  );
};
