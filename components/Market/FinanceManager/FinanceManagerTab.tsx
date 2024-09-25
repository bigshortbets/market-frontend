import { useAtom } from 'jotai';
import React from 'react';
import { FinanceManagerTabsType, financeManagerAtom } from './FinanceManager';
import { initialLoadingAtom } from '@/store/store';

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
        if (initialLoading) {
          return 'bg-bigsbgrey animate-pulse text-bigsbgrey';
        } else {
          return 'bg-[#4CC9F0] text-black';
        }
      } else {
        if (initialLoading) {
          return 'bg-bigsbgrey animate-pulse text-bigsbgrey';
        } else {
          return 'bg-[#4ECB7D] text-black';
        }
      }
    }
    return isActive
      ? 'bg-[#444650]'
      : 'bg-[#23252E] text-tetriary disabled:bg-[#141414]';
  };

  const [initialLoading] = useAtom(initialLoadingAtom);

  return (
    <button
      disabled={disabled}
      className={`rounded-lg flex items-center justify-center text-xs font-semibold py-1.5 ${getButtonStyles()} ${
        value === 'claim' ? `px-0 w-[90px]` : 'px-3'
      }`}
      onClick={() => setFinanceManagerState(value)}
    >
      <p className='capitalize'>{getText()}</p>
    </button>
  );
};
