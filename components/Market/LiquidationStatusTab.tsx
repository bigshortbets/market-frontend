import React from 'react';

interface LiquidationStatusTabProps {
  status: 'EverythingFine' | 'MarginCall' | 'Liquidation' | 'Underwater'; // Define the possible status values
}

export const LiquidationStatusTab = ({ status }: LiquidationStatusTabProps) => {
  const statusText = {
    EverythingFine: 'Everything fine',
    MarginCall: 'Margin call',
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
    <div
      className={`rounded flex items-center justify-center px-1 font-semibold text-[#191B24] text-xs py-[1px] ${backgroundColor}`}
    >
      {text}
    </div>
  );
};
