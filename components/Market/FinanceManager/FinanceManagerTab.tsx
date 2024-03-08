import { useAtom } from 'jotai';
import React from 'react';
import { FinanceManagerTabsType, financeManagerAtom } from './FinanceManager';

interface FinanceManagerTabProps {
  value: FinanceManagerTabsType;
}

export const FinanceManagerTab = ({ value }: FinanceManagerTabProps) => {
  const [financeManagerState, setFinanceManagerState] =
    useAtom(financeManagerAtom);

  const isActive = financeManagerState === value;
  return (
    <button
      className={` rounded-lg flex items-center justify-center text-xs font-semibold py-1.5 px-3 ${
        isActive ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
      }`}
      onClick={() => setFinanceManagerState(value)}
    >
      <p className="capitalize">{value}</p>
    </button>
  );
};
