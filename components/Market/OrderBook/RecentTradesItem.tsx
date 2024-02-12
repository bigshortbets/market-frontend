import { RecentPositionType } from "@/types/positionTypes";
import { scaleNumber } from "@/utils/scaleNumber";
import React from "react";

interface RecentTradesItemProps {
  position: RecentPositionType;
}

export const RecentTradesItem = ({ position }: RecentTradesItemProps) => {
  return (
    <div className="py-1 flex items-center justify-between text-tetriary">
      <p>{Number(position.quantity)}</p>
      <p>{scaleNumber(Number(position.price))}</p>
    </div>
  );
};
