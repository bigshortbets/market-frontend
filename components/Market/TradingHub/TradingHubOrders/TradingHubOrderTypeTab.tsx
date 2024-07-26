import { useAtom } from 'jotai';
import React from 'react';
import { TradingHubOrderTypeTabsType } from './TradingHubOrders';

interface TradingHubOrderTypeTabProps {
  value: TradingHubOrderTypeTabsType;
  currentOrdersType: TradingHubOrderTypeTabsType;
  setType: (val: TradingHubOrderTypeTabsType) => void;
}

export const TradingHubOrderTypeTab = ({
  value,
  currentOrdersType,
  setType,
}: TradingHubOrderTypeTabProps) => {
  const isActive = currentOrdersType === value;
  return (
    <button
      className={` rounded-lg flex items-center justify-center text-[11px] font-semibold py-1 px-2 ${
        isActive ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
      }`}
      onClick={() => setType(value)}
    >
      <p className='capitalize'>
        {value === 'close' && 'Closing'} {value === 'open' && 'Opening'}
        {value === 'finalized' && 'Finalized'}
      </p>
    </button>
  );
};
