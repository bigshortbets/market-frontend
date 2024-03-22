import { PositionWithSide } from '@/types/positionTypes';
import React, { useState } from 'react';
import { SideLabel } from '../SideLabel';
import { truncateAddress } from '@/utils/truncateAddress';
import { scaleNumber } from '@/utils/scaleNumber';
import { NumericFormat } from 'react-number-format';
import { useClosePosition } from '@/blockchain/hooks/useClosePosition';
import { getOpponentMarginData } from '@/utils/getOpponentMarginData';
import { opponentsMarginsAtom } from '../../Market';
import { useAtom } from 'jotai';
import { LiquidationStatusTab } from '../../LiquidationStatusTab';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { Tooltip } from 'react-tooltip';
import { useMarkToMarket } from '@/blockchain/hooks/useMarkToMarket';

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
      ? Number(position.quantityLeft) *
        Number(position.market.contractUnit) *
        (Number(scaleNumber(oraclePrice.toString())) -
          Number(scaleNumber(position.price.toString())))
      : Number(position.quantityLeft) *
        Number(position.market.contractUnit) *
        (Number(scaleNumber(position.price.toString())) -
          Number(scaleNumber(oraclePrice.toString())));

  const { write: writeClosePosition, isLoading: isClosePositionLoading } =
    useClosePosition(
      position.market.id,
      position.id,
      priceToClose,
      position.quantityLeft
    );

  const { write: writeMarkToMarket, isLoading: isMarkToMarketLoading } =
    useMarkToMarket(position.market.id, position.id);

  const [opponentsMargin] = useAtom(opponentsMarginsAtom);

  const marginData = getOpponentMarginData(
    opponentsMargin,
    opponent,
    position.market.id
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

      <td className="align-middle">
        <div className="flex items-center space-x-2">
          <p>{truncateAddress(opponent)}</p>
          <LiquidationStatusTab
            status={marginData?.liquidationStatus! as LiquidationStatusType}
            small
          />
        </div>
      </td>

      <td className=" text-right pr-3 ">
        <a
          data-tooltip-id="m2m-tooltip"
          data-tooltip-html="Mark-to-Market (MTM): Instantly updates your</br> asset values based  on current market conditions.</br> On our peer-to-peer market, this action is </br>executed on demand, ensuring transparency without</br> daily automatic adjustments."
        >
          <button
            className="mr-4 text-xs font-semibold text-[#9BA6F8] hover:underline"
            onClick={() => writeMarkToMarket?.()}
          >
            MTM
          </button>
        </a>

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
      <Tooltip id="m2m-tooltip" />
    </tr>
  );
};
