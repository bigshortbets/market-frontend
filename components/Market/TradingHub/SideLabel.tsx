import React from 'react';

interface SideLabelProps {
  side: 'LONG' | 'SHORT';
}

export const SideLabel = ({ side }: SideLabelProps) => {
  return (
    <div
      className={`${
        side === 'LONG'
          ? 'bg-[#ACE7C2] text-[#191B24]'
          : 'bg-[#E4ADAC] text-[#191B24]'
      } w-[50px] text-center rounded inline-block text-sm font-semibold`}
    >
      {side === 'LONG' ? 'BUY' : 'SELL'}
    </div>
  );
};
