import { useAtom } from 'jotai';
import React from 'react';
import { FinanceManagerTabsType, financeManagerAtom } from './FinanceManager';

interface FinanceManagerTabProps {
  value: FinanceManagerTabsType;
  disabled?: boolean;
  hasUserMinted: boolean;
}

export const FinanceManagerTab = ({
  value,
  disabled,
  hasUserMinted,
}: FinanceManagerTabProps) => {
  const [financeManagerState, setFinanceManagerState] =
    useAtom(financeManagerAtom);

  const isActive = financeManagerState === value;

  const getText = () => {
    if (value === 'claim') {
      return hasUserMinted ? 'Get Bonus' : 'Get Free 10K';
    }
    return value;
  };

  const getButtonStyles = () => {
    if (value === 'claim') {
      if (hasUserMinted) {
        return 'bg-[#4CC9F0] text-black';
      } else {
        return 'bg-[#4ECB7D] text-black';
      }
    }
    return isActive
      ? 'bg-[#444650]'
      : 'bg-[#23252E] text-tetriary disabled:bg-[#141414]';
  };

  return (
    <button
      disabled={disabled}
      className={`rounded-lg flex items-center justify-center text-xs font-semibold py-1.5 px-3 ${getButtonStyles()}`}
      onClick={() => setFinanceManagerState(value)}
    >
      <p className='capitalize'>{getText()}</p>
    </button>
  );
};
