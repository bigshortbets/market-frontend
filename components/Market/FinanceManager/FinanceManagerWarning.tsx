import React from "react";

interface FinanceManagerWarning {
  error: string;
}

export const FinanceManagerWarning = ({ error }: FinanceManagerWarning) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-[#E5B744]">Warning</p>
      <div className="p-2 rounded-lg text-white text-xs font-normal bg-[#e5b74433] border border-[#E5B744]">
        {error}
      </div>
    </div>
  );
};
