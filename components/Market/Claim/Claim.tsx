import React from 'react';
import { MintButton } from './MintButton';

export const Claim = () => {
  return (
    <div className='p-2.5 pb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold text-secondary leading-[24px]'>
          Claim DOLAR$
        </p>
        <p className='text-xs text-tetriary mb-2'>
          You can claim 10,000 $DOLARS only once per address. To be eligible,
          ensure you have completed at least one mainnet transaction.
        </p>
        <MintButton />
      </div>
    </div>
  );
};
