import React from 'react';
import { FaCircleInfo } from 'react-icons/fa6';

interface FinanceManagerInfoProps {
  value: string;
}

export const FinanceManagerInfo = ({ value }: FinanceManagerInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-2 rounded-lg  text-xs font-normal bg-[#0324D7] bg-opacity-20 border border-[#0324D7] text-[#C3CAFB]">
        <div className="flex items-center gap-2">
          <div className="text-xl text-[#C3CAFB]">
            <FaCircleInfo />
          </div>
          <p className="leading-[18px]">{value}</p>
        </div>
      </div>
    </div>
  );
};
