import Image from 'next/image';
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';

export const Bridge = () => {
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className="p-2.5 pb-4 flex flex-col gap-4">
      <div className="flex flex-col gap-3.5">
        <p className="text-sm font-semibold text-secondary leading-[24px]">
          Bridge
        </p>
        <div className="flex items-center gap-3 3">
          <div className="flex flex-col ml-1 text-secondary">
            <p className=" mb-1.5 text-xs  font-semibold">Source</p>
            <div className="flex items-center gap-1.5">
              <Image
                className="rounded-full"
                src={'/market-logos/ETH.svg'}
                alt={'Ethereum Logo'}
                width={18}
                height={18}
              />
              <p className="text-sm font-semibold">Ethereum</p>
            </div>
          </div>
          <div className="flex flex-col ml-1 text-secondary">
            <p className=" mb-1.5 text-xs  font-semibold">Asset</p>
            <div className="flex items-center gap-1.5">
              <Image
                className="rounded-full"
                src={'/market-logos/USDC.svg'}
                alt={'USDC Logo'}
                width={18}
                height={18}
              />
              <p className="text-sm font-semibold">$USDC</p>
            </div>
          </div>
        </div>
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
        <div className="p-2 rounded-lg bg-[#000211] flex flex-col gap-4">
          <p className="text-sm font-semibold text-secondary leading-[24px]">
            Summary
          </p>
          <div className="flex flex-col gap-2 ">
            <div className="flex justify-between items-center font-semibold text-[13px] text-secondary ">
              <p>Total</p>
              <p>{amount.toFixed(2)} USDC</p>
            </div>
          </div>

          <button
            disabled
            className={`disabled:bg-gray-400 bg-[#9BA6F8] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-3`}
          >
            Swap
          </button>
        </div>
      </div>
    </div>
  );
};
