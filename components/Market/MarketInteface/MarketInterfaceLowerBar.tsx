import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { useAtom } from 'jotai';
import React from 'react';
import { useAccount } from 'wagmi';
import { selectedMarketMarginAtom, userMarginsAtom } from '../Market';
import { LiquidationStatusTab } from '../LiquidationStatusTab';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { currencyFormatter } from '@/utils/currencyFormatter';

export const MarketInterfaceLowerBar = () => {
  const { address } = useAccount();
  const { data } = useNativeCurrencyBalance(address);
  const [userMargins] = useAtom(userMarginsAtom);
  const [selectedMarketMargin] = useAtom(selectedMarketMarginAtom);
  return (
    <div className="h-[58px] border-t border-[#444650] px-5 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className=" text-xs ">
            <p className="text-tetriary font-semibold">Wallet balance</p>
            <p className="text-white">
              {address
                ? `${currencyFormatter.format(Number(data?.formatted))} ${
                    data?.symbol
                  }`
                : '-'}
            </p>
          </div>
          <div className="border-l border-[#444650] h-[32px] text-xs pl-2">
            <p className="text-tetriary font-semibold">Total deposits</p>
            <p>
              {address
                ? `${currencyFormatter.format(
                    userMargins.totalMarginValue
                  )} USDC`
                : '-'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs">
            <div className="flex items-center gap-1">
              {' '}
              <p className="text-tetriary font-semibold">Market deposit</p>
            </div>

            <p className="text-white">
              {address
                ? `${currencyFormatter.format(
                    Number(selectedMarketMargin?.margin)
                  )} USDC`
                : '-'}{' '}
            </p>
          </div>
          <LiquidationStatusTab
            status={
              selectedMarketMargin?.liquidationStatus as LiquidationStatusType
            }
          />
        </div>
      </div>
    </div>
  );
};
