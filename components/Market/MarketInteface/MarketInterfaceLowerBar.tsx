import React from "react";

export const MarketInterfaceLowerBar = () => {
  return (
    <div className="h-[58px] border-t border-[#444650] px-5 py-3">
      <div className="flex items-center gap-10">
        <div className=" text-xs text-right">
          <p className="text-tetriary font-semibold">Market gain / loss</p>
          <p className="text-[#87DAA4]">+2137$</p>
        </div>
        <div className="border-l border-[#444650] h-[32px] text-xs pl-2">
          <p className="text-tetriary font-semibold">Market deposit</p>
          <p>2137$</p>
        </div>
      </div>
    </div>
  );
};
