import React from 'react';

interface LiquidationStatusTabProps {
  status: 'EverythingFine' | 'MarginCall' | 'Liquidation' | 'Underwater';
  small?: boolean;
}

export const LiquidationStatusTab = ({
  status,
  small = false,
}: LiquidationStatusTabProps) => {
  const statusText = {
    EverythingFine: 'Everything fine',
    MarginCall: 'Below required',
    Liquidation: 'Liquidation',
    Underwater: 'Underwater',
  };

  const statusBackgroundColors = {
    EverythingFine: 'bg-[#ACE7C2]',
    MarginCall: 'bg-[#EED07D]',
    Liquidation: 'bg-[#DA8D8B]',
    Underwater: 'bg-[#C53F3A]',
  };

  const text = statusText[status];
  const backgroundColor = statusBackgroundColors[status];

  return (
    <>
      {small ? (
        <div className={`${backgroundColor} h-4 w-4 rounded`}></div>
      ) : (
        <div
          className={`rounded flex items-center justify-center px-1 font-semibold text-[#191B24] text-xs py-[1px] ${backgroundColor}`}
        >
          {text}
        </div>
      )}
    </>
  );
};
