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
        <div className='mb-2'>
          <p className='text-xs mb-2'>
            Claim 10,000 DOLARZ to participate in the trading competition. This
            can be done once per address.
          </p>
          <p className='text-xs'>
            For security reasons, only addresses with at least one mainnet
            transaction are eligible.
          </p>
        </div>
        <MintButton />
      </div>
    </div>
  );
};
