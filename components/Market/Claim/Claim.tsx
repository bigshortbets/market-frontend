import React from 'react';
import { MintButton } from './MintButton';
import { currencySymbol } from '@/blockchain/constants';

export const Claim = () => {
  return (
    <div className='p-2.5 pb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold text-secondary leading-[24px]'>
          Claim Free {currencySymbol}
        </p>
        <MintButton />
      </div>
    </div>
  );
};
