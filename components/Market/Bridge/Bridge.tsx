import Image from 'next/image';
import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';
import { BridgeDeposit } from './BridgeDeposit';
import { BridgeWithdraw } from './BridgeWithdraw';

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
              key={key}
              className={`rounded-lg flex items-center justify-center text-[10px] font-semibold py-1.5 px-3 ${
                tab === state ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
              }`}
              onClick={() => setState(tab)}
            >
              <p className="capitalize">{tab}</p>
            </button>
          ))}
        </div>

        {state === 'deposit' ? <BridgeDeposit /> : <BridgeWithdraw />}
      </div>
    </div>
  );
};
