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
      className={`flex-1  rounded flex items-center justify-center text-sm font-semibold p-2 ${
        isActive ? "bg-primary-bg" : "bg-secondary-bg"
      }`}
      onClick={() => setFinanceManagerState(value)}
    >
      <p className="capitalize">{value}</p>
    </button>
  );
};
