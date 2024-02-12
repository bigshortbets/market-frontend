import { useAtom } from "jotai";
import React from "react";
import { FinanceManagerTabsType, financeManagerAtom } from "./FinanceManager";

interface FinanceManagerTabProps {
  value: FinanceManagerTabsType;
}

export const FinanceManagerTab = ({ value }: FinanceManagerTabProps) => {
  const [financeManagerState, setFinanceManagerState] =
    useAtom(financeManagerAtom);

  const isActive = financeManagerState === value;
  return (
    <button
      className={` rounded-lg flex items-center justify-center text-[13px] font-semibold py-2 px-4 ${
        isActive ? "bg-[#444650]" : "bg-[#23252E] text-tetriary"
      }`}
      onClick={() => setFinanceManagerState(value)}
    >
      <p className="capitalize">{value}</p>
    </button>
  );
};
