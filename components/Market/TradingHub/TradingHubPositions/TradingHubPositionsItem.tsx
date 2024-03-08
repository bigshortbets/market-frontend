import { PositionWithSide } from '@/types/positionTypes';
import React, { useState } from 'react';
import { SideLabel } from '../SideLabel';
import { truncateAddress } from '@/utils/truncateAddress';
import { scaleNumber } from '@/utils/scaleNumber';
import { NumericFormat } from 'react-number-format';
import { useClosePosition } from '@/blockchain/hooks/useClosePosition';

interface TradingHubPositionsItemProps {
  position: PositionWithSide;
  oraclePrice: BigInt;
}

export const TradingHubPositionsItem = ({
  position,
  oraclePrice,
}: TradingHubPositionsItemProps) => {
  const [priceToClose, setPriceToClose] = useState<number>(0);
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

  const { write: writeClosePosition, isLoading } = useClosePosition(
    position.market.id,
    position.id,
    priceToClose,
    position.quantityLeft
  );

  return (
    <tr
      className={`text-sm even:bg-[#23252E] text-[#7F828F] 
  }`}
    >
      <td className="pl-3 py-3">
        <SideLabel side={position.side} />
      </td>
      <td>{Number(position.quantityLeft)}</td>
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
      <td className=" text-right pr-3 ">
        <NumericFormat
          className="rounded-lg mr-4 w-[100px] py-1.5 px-2 close-position-input text-xs outline-none"
          placeholder="Price to close"
          allowNegative={false}
          value={priceToClose === 0 ? '' : priceToClose}
          onChange={(e) => setPriceToClose(Number(e.target.value))}
        />

        <button
          onClick={() => writeClosePosition?.()}
          className={`font-bold text-xs ${
            priceToClose > 0
              ? 'text-[#D26D6C] '
              : 'text-[#7F828F] pointer-events-none'
          } transition ease-in-out hover:text-[#C53F3A] duration-300 `}
        >
          CLOSE POSITION
        </button>
      </td>
    </tr>
  );
};
