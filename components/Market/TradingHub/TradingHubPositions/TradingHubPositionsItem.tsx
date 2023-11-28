import { PositionWithSide } from '@/types/positionTypes';
import React from 'react';
import { SideLabel } from '../SideLabel';
import { truncateAddress } from '@/utils/truncateAddress';
import { scaleNumber } from '@/utils/scaleNumber';

interface TradingHubPositionsItemProps {
  position: PositionWithSide;
  oraclePrice: BigInt;
}

export const TradingHubPositionsItem = ({
  position,
  oraclePrice,
}: TradingHubPositionsItemProps) => {
  const opponent = position.side === 'LONG' ? position.short : position.long;
  const calculatedProfitOrLoss =
    position.side === 'LONG'
      ? Number(position.quantity) *
        Number(position.market.contractUnit) *
        (Number(scaleNumber(oraclePrice.toString())) -
          Number(scaleNumber(position.price.toString())))
      : Number(position.quantity) *
        Number(position.market.contractUnit) *
        (Number(scaleNumber(position.price.toString())) -
          Number(scaleNumber(oraclePrice.toString())));
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
      <td
        className={`${
          calculatedProfitOrLoss < 0
            ? 'text-red-500'
            : 'text-[#73D391] font-semibold'
        }`}
      >
        {calculatedProfitOrLoss.toFixed(2)}{' '}
        <span className={`text-xs`}>USDC</span>
      </td>
    </tr>
  );
};
