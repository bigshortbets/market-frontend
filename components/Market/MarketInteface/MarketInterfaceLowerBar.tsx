import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { useAtom } from 'jotai';
import React from 'react';
import { useAccount } from 'wagmi';
import { userMarginsAtom } from '../Market';

export const MarketInterfaceLowerBar = () => {
  const { address } = useAccount();
  const { data } = useNativeCurrencyBalance(address);
  const [userMargins] = useAtom(userMarginsAtom);
  return (
    <div className="h-[58px] border-t border-[#444650] px-5 py-3">
      <div className="flex items-center gap-10">
        <div className=" text-xs ">
          <p className="text-tetriary font-semibold">Wallet balance</p>
          <p className="text-white">
            {address
              ? `${Number(data?.formatted).toFixed(2).toString()} ${
                  data?.symbol
                }`
              : '-'}
          </p>
        </div>
        <div className="border-l border-[#444650] h-[32px] text-xs pl-2">
          <p className="text-tetriary font-semibold">Total deposits</p>
          <p>
            {userMargins.totalMarginValue === 0
              ? '-'
              : `${userMargins.totalMarginValue} USDC`}
          </p>
        </div>
      </div>
    </div>
  );
};
