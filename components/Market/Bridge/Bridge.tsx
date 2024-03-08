import Image from 'next/image';
import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';

const tabs = ['deposit', 'withdraw'];
type BridgeTabsType = (typeof tabs)[number];

export const Bridge = () => {
  const [amount, setAmount] = useState<number>(1);
  const [state, setState] = useState<BridgeTabsType>('deposit');

  return (
    <div className="p-2.5 pb-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-secondary leading-[24px]">
          Bridge
        </p>
        <div className="flex gap-1.5 mb-2">
          {tabs.map((tab, key) => (
            <button
              className={`rounded-lg flex items-center justify-center text-[10px] font-semibold py-1.5 px-3 ${
                tab === state ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
              }`}
              onClick={() => setState(tab)}
            >
              <p className="capitalize">{tab}</p>
            </button>
          ))}
        </div>

        <div
          className={`flex  justify-start text-secondary items-center gap-3 mb-2`}
        >
          <div
            className={`flex items-center gap-1 ${
              state === 'deposit' ? 'order-1' : 'order-3'
            }`}
          >
            <Image
              className="rounded-full"
              src={'/market-logos/ETH.svg'}
              alt={'Ethereum Logo'}
              width={16}
              height={16}
            />
            <p className="text-sm font-semibold">Ethereum</p>
          </div>
          <div className="text-lg order-2">
            <FaLongArrowAltRight />
          </div>
          <div
            className={`flex items-center gap-1 ${
              state === 'deposit' ? 'order-3' : 'order-1'
            }`}
          >
            <Image
              className="rounded-full"
              src={'/market-logos/BIGSB.svg'}
              alt={'Ethereum Logo'}
              width={16}
              height={16}
            />
            <p className="text-sm font-semibold">BigShortBets</p>
          </div>
        </div>

        <div className="flex flex-col mb-2">
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
