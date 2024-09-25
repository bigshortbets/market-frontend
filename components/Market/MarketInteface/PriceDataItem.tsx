import { initialLoadingAtom } from '@/store/store';
import { useAtom } from 'jotai';
import React from 'react';

export interface PriceDataItem {
  label: string;
  value: string;
}

export const PriceDataItem = ({ label, value }: PriceDataItem) => {
  const [initialLoading] = useAtom(initialLoadingAtom);
  return (
    <div>
      <p className='text-xs text-tetriary font-semibold'>{label}</p>
      {initialLoading ? (
        <div className='bg-bigsbgrey h-[16px] w-[45px] rounded animate-pulse'></div>
      ) : (
        <p className='text-xs font-normal'>{value}</p>
      )}
    </div>
  );
};
