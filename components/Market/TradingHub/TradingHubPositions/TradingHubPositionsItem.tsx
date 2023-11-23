import { PositionWithSide } from '@/types/positionTypes';
import React from 'react';
import { SideLabel } from '../SideLabel';
import { truncateAddress } from '@/utils/truncateAddress';
import { scaleNumber } from '@/utils/scaleNumber';

interface TradingHubPositionsItemProps {
  position: PositionWithSide;
}

export const TradingHubPositionsItem = ({
  position,
}: TradingHubPositionsItemProps) => {
  const opponent = position.side === 'LONG' ? position.short : position.long;
  return (
    <tr
      className={`text-sm even:bg-[#23252E] text-[#7F828F]
  }`}
    >
      <td className="pl-3 py-3">
        <SideLabel side={position.side} />
      </td>
      <td>{Number(position.quantity)}</td>
      <td>{truncateAddress(opponent)}</td>
      <td>{scaleNumber(Number(position.price))}</td>
    </tr>
  );
};
