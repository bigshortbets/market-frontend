import { useDeposit } from '@/blockchain/hooks/useDeposit';
import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useAccount, useNetwork } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';
import { useAtom } from 'jotai';
import {
  collateralAtom,
  selectedMarketIdAtom,
  selectedMarketMarginAtom,
  unsettledLossesAtom,
} from '../Market';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import { findMarketById } from '@/utils/findMarketById';
import { MarketType } from '@/types/marketTypes';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { LiquidationStatusTab } from '../LiquidationStatusTab';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { FinanceManagerInfo } from '../FinanceManager/FinanceManagerInfo';
import { bigshortbetsChain } from '@/blockchain/chain';
import { FinanceManagerWarning } from '../FinanceManager/FinanceManagerWarning';

export interface DepositProps {
  markets: MarketType[];
}

export const Deposit = ({ markets }: DepositProps) => {
  const { open } = useWeb3Modal();
  const [amount, setAmount] = useState<number>(1);
  const { address } = useAccount();
  const { data: walletBalance } = useNativeCurrencyBalance(address);
  const { write, isLoading } = useDeposit(amount);
  const { chain } = useNetwork();
  const isBsbNetwork = chain?.id === bigshortbetsChain.id;
  const [selecteMarketMargin] = useAtom(selectedMarketMarginAtom);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const market = findMarketById(markets, selectedMarketId);

  const handleDeposit = () => {
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

  const depositDisabled =
    Number(walletBalance?.formatted) < amount || amount <= 0;

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
      collateral * (Number(market!.initialMargin.toString()) / 100) +
        unsettledLoses
    )
  ).toFixed(2);

  const toLiquidation = (
    Number(selecteMarketMargin?.margin) -
    Number(
      collateral * (Number(market!.maintenanceMargin.toString()) / 100) +
        unsettledLoses
    )
  ).toFixed(2);

  const handleAddNegative = (val: number) => {
    if (val < 0) {
      setAmount(Math.abs(val));
    }
  };

  return (
    <div
      className="p-2.5 pb-4 flex flex-col gap-4"
      onClick={() =>
        console.log(
          `Margin: ${Number(
            selecteMarketMargin?.margin
          )} Collateral: ${collateral} Usettled Loses: ${unsettledLoses} Initial margin: ${
            Number(market!.initialMargin.toString()) / 100
          } Maintenance margin: ${
            Number(market!.maintenanceMargin.toString()) / 100
          }`
        )
      }
    >
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
              id={'orderPriceInput'}
              className="text-right outline-none  w-[85%] bg-[#23252E] "
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
            <p>Current deposit</p>
            <p>
              {address
                ? `${Number(selecteMarketMargin?.margin).toFixed(2)} USDC`
                : '-'}{' '}
            </p>
          </div>
          <div className="flex justify-between items-center text-xs text-tetriary mb-2">
            <p>Required deposit</p>
            <p>
              {Number(selecteMarketMargin?.requiredDeposit) > 0 && address
                ? `${Number(selecteMarketMargin?.requiredDeposit).toFixed(
                    2
                  )} USDC`
                : '-'}
            </p>
          </div>
          {address && (
            <div className="flex justify-between items-center text-xs text-tetriary mb-2">
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
              <div className="flex justify-between items-center text-xs text-tetriary mb-2">
                <div className="flex items-center gap-1.5">
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
                  USDC
                </p>
              </div>
            )}
          {selecteMarketMargin?.liquidationStatus != 'MarginCall' &&
            Number(selecteMarketMargin?.requiredDeposit) > 0 && (
              <div className="flex justify-between items-center text-xs text-tetriary mb-2">
                <div className="flex items-center gap-1.5">
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
                  USDC
                </p>
              </div>
            )}
          {selecteMarketMargin?.liquidationStatus != 'Liquidation' &&
            Number(selecteMarketMargin?.requiredDeposit) > 0 && (
              <div className="flex justify-between items-center text-xs text-tetriary mb-2">
                <div className="flex items-center gap-1.5">
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
                  USDC
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

          <div className="flex justify-between items-center font-semibold text-[13px] text-secondary ">
            <p>Amount</p>
            <p>{amount.toFixed(2)} USDC</p>
          </div>
        </div>

        <button
          disabled={address && isBsbNetwork ? depositDisabled : false}
          onClick={handleDeposit}
          className={`disabled:bg-gray-400 bg-[#4ECB7D] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-3`}
        >
          {!address && 'Connect wallet'}
          {address && isBsbNetwork && 'Deposit'}
          {address && !isBsbNetwork && 'Change network'}
        </button>
      </div>
      {selecteMarketMargin?.liquidationStatus != 'EverythingFine' &&
        selecteMarketMargin &&
        selecteMarketMargin.requiredDeposit &&
        address && (
          <FinanceManagerInfo
            value={`To change your market status from ${
              selecteMarketMargin?.liquidationStatus
            } to Everthing fine, you need to deposit ${(
              Number(selecteMarketMargin!.requiredDeposit) -
              Number(selecteMarketMargin!.margin)
            ).toFixed(2)} USDC to ${market?.ticker} market.`}
          />
        )}
      {!address && (
        <FinanceManagerWarning error="Connect your wallet to interact with the market. " />
      )}
    </div>
  );
};
