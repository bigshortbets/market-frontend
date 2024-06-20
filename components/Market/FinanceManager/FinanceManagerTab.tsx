import { useAtom } from 'jotai';
import React from 'react';
import { FinanceManagerTabsType, financeManagerAtom } from './FinanceManager';

interface FinanceManagerTabProps {
  value: FinanceManagerTabsType;
  disabled?: boolean;
}

export const FinanceManagerTab = ({
  value,
  disabled,
}: FinanceManagerTabProps) => {
  const [financeManagerState, setFinanceManagerState] =
    useAtom(financeManagerAtom);

  const isActive = financeManagerState === value;
  return (
    <button
      disabled={disabled}
      className={` rounded-lg flex items-center justify-center text-xs font-semibold py-1.5 px-3 ${
        isActive
          ? 'bg-[#444650]'
          : 'bg-[#23252E] text-tetriary disabled:bg-[#141414]'
      } `}
      onClick={() => setFinanceManagerState(value)}
    >
      <p className='capitalize'>{value}</p>
    </button>
  );
};
