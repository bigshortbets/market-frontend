import React from 'react';
import { IoIosWarning } from 'react-icons/io';

interface FinanceManagerWarningProps {
  error: string;
}

export const FinanceManagerWarning = ({
  error,
}: FinanceManagerWarningProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-2 rounded-lg  text-xs font-normal bg-[#e5b74433] bg-opacity-20 border border-[#E5B744] text-[#E5B744]">
        <div className="flex items-center gap-2">
          <div className="text-xl text-[#E5B744]">
            <IoIosWarning />
          </div>
          <p className="leading-[18px]">{error}</p>
        </div>
      </div>
    </div>
  );
};
