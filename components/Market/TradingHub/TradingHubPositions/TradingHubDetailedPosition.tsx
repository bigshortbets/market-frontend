import { PositionWithSide } from '@/types/positionTypes';
import React from 'react';
import { SideLabel } from '../SideLabel';
import truncateEthAddress from 'truncate-eth-address';

interface TradingHubDetailedPositionProps {
  position: PositionWithSide;
}

export const TradingHubDetailedPosition = ({
  position,
}: TradingHubDetailedPositionProps) => {
  const opponent = position.side === 'LONG' ? position.short : position.long;
  return (
    <tr
      className={`text-sm even:bg-[#23252E] text-[#7F828F]
  }`}
    >
      {/* Side */}
      <td className="pl-3 py-3">
        <SideLabel side={position.side} />
      </td>
      <td>{Number(position.quantity)}</td>
      <td>{opponent}</td>
    </tr>
  );
};
