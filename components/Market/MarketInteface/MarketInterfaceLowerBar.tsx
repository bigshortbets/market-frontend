import { useNativeCurrencyBalance } from "@/blockchain/hooks/useNativeCurrencyBalance";
import React from "react";
import { useAccount } from "wagmi";

export const MarketInterfaceLowerBar = () => {
  const { address } = useAccount();
  const { data } = useNativeCurrencyBalance(address);
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
              : "-"}
          </p>
        </div>
        <div className="border-l border-[#444650] h-[32px] text-xs pl-2">
          <p className="text-tetriary font-semibold">Total deposits</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
