import { RecentPositionType } from "@/types/positionTypes";
import { scaleNumber } from "@/utils/scaleNumber";
import React from "react";

interface RecentTradesItemProps {
  position: RecentPositionType;
}

export const RecentTradesItem = ({ position }: RecentTradesItemProps) => {
  return (
    <tr className={`text-xs odd:bg-[#23252E] text-[#7F828F] h-1/10`}>
      {/* Quantity */}
      <td className="pl-3 py-1">{Number(position.quantity)}</td>
      {/* Price */}
      <td>{scaleNumber(Number(position.price))}</td>
      {/* Market */}
      {/*     <td>{position.timestamp}</td> */}
    </tr>
  );
};
