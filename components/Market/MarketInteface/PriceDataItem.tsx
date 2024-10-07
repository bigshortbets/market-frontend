import { BigSBTooltip } from '@/components/BigSBTooltip';
import { initialLoadingAtom } from '@/store/store';
import { Tooltip } from '@nextui-org/react';
import { useAtom } from 'jotai';
import React, { ReactNode } from 'react';

export interface PriceDataItem {
  label: string;
  value: string;
  tooltipContent: ReactNode;
}

export const PriceDataItem = ({
  label,
  value,
  tooltipContent,
}: PriceDataItem) => {
  const [initialLoading] = useAtom(initialLoadingAtom);
  return (
    <BigSBTooltip content={tooltipContent}>
      <div>
        <p className='text-xs text-tetriary font-semibold decoration-dotted underline cursor-help'>
          {label}
        </p>
        {initialLoading ? (
          <div className='bg-bigsbgrey h-[16px] w-[45px] rounded animate-pulse'></div>
        ) : (
          <p className='text-xs font-normal'>{value}</p>
        )}
      </div>
    </BigSBTooltip>
  );
};
