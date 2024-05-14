import { PositionWithSide } from '@/types/positionTypes';
import { useState } from 'react';
import { SideLabel } from '../SideLabel';
import { truncateAddress } from '@/utils/truncateAddress';
import { getOpponentMarginData } from '@/utils/getOpponentMarginData';
import { opponentsMarginsAtom } from '../../Market';
import { useAtom } from 'jotai';
import { LiquidationStatusTab } from '../../LiquidationStatusTab';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { Tooltip } from 'react-tooltip';
import { useMarkToMarket } from '@/blockchain/hooks/useMarkToMarket';
import { ClosePositionModal } from './ClosePositionModal';
import { currencySymbol } from '@/blockchain/constants';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import { FaMessage } from 'react-icons/fa6';
import { tradingHubStateAtom } from '@/store/store';

interface TradingHubPositionsItemProps {
  position: PositionWithSide;
  isNotAggregated?: boolean;
}

export const TradingHubPositionsItem = ({
  position,
  isNotAggregated,
}: TradingHubPositionsItemProps) => {
  const oraclePrice = position.market.oraclePrice;
  const opponent = position.side === 'LONG' ? position.short : position.long;
  const calculatedProfitOrLoss =
    position.side === 'LONG'
      ? Number(position.quantityLeft) *
        Number(position.market.contractUnit) *
        (Number(oraclePrice.toString()) -
          Number(position.createPrice.toString()))
      : Number(position.quantityLeft) *
        Number(position.market.contractUnit) *
        (Number(position.createPrice.toString()) -
          Number(oraclePrice.toString()));

  const { write: writeMarkToMarket } = useMarkToMarket(
    position.market.id,
    position.id
  );

  const [opponentsMargin] = useAtom(opponentsMarginsAtom);

  const marginData = getOpponentMarginData(
    opponentsMargin,
    opponent,
    position.market.id
  );

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };
  const marketDetails = getMarkeDetails(position.market.ticker);

  const [_, setTradingHubState] = useAtom(tradingHubStateAtom);

  return (
    <tr
      className={`text-sm even:bg-[#23252E] text-[#7F828F]  overflow-x-scroll
  }`}
    >
      <td className='px-6 sm:pr-0 sm:pl-3 py-3'>
        <SideLabel side={position.side} />
      </td>
      {isNotAggregated && (
        <td className='text-[10px] sm:text-xs px-6 sm:px-0'>
          {marketDetails?.name}
        </td>
      )}
      <td className='text-[10px] sm:text-xs px-6 sm:px-0'>
        {Number(position.quantityLeft)}
      </td>
      <td className='text-[10px] sm:text-xs px-6 sm:px-0'>
        {Number(position.createPrice)}
      </td>
      <td className='text-[10px] sm:text-xs px-6 sm:px-0'>
        {Number(position.price)}
      </td>
      <td
        className={`${
          calculatedProfitOrLoss < 0
            ? 'text-red-500'
            : 'text-[#73D391] font-semibold'
        } text-[10px] sm:text-xs px-6 sm:px-0`}
      >
        {calculatedProfitOrLoss.toFixed(2)}{' '}
        <span className={`text-[10px] sm:text-xs`}>{currencySymbol}</span>
      </td>

      <td className='align-middle px-6 sm:px-0 '>
        <div className='flex items-center space-x-2'>
          <p className='text-[10px] sm:text-xs'>{truncateAddress(opponent)}</p>
          <LiquidationStatusTab
            status={marginData?.liquidationStatus! as LiquidationStatusType}
            small
          />

          {/* CHAT LOGIC */}

          {/*  <button onClick={() => setTradingHubState('chat')}>
            <FaMessage className='text-sm' />
          </button> */}

          {/*  */}
        </div>
      </td>

      <td className=' text-right pr-3 hidden sm:table-cell'>
        <a
          data-tooltip-id='m2m-tooltip'
          data-tooltip-html='Mark-to-Market (MTM): Instantly updates your</br> asset values based  on current market conditions.</br> On our peer-to-peer market, this action is </br>executed on demand, ensuring transparency without</br> daily automatic adjustments.'
        >
          <button
            className='mr-4 text-xs font-semibold text-[#4ECB7D] hover:underline'
            onClick={() => writeMarkToMarket()}
          >
            MTM
          </button>
        </a>

        <button
          onClick={() => setIsModalOpened(true)}
          className={`font-bold text-xs hover:underline transition ease-in-out text-[#C53F3A] duration-300`}
        >
          CLOSE
        </button>
      </td>
      <td className='sm:hidden sm:pr-3 sm:pl-0 text-right px-6 '>
        {' '}
        <a
          data-tooltip-id='m2m-tooltip'
          data-tooltip-html='Mark-to-Market (MTM): Instantly updates your</br> asset values based  on current market conditions.</br> On our peer-to-peer market, this action is </br>executed on demand, ensuring transparency without</br> daily automatic adjustments.'
        >
          <button
            className='mr-4 text-[10px] sm:text-xs font-semibold text-[#4ECB7D] hover:underline '
            onClick={() => writeMarkToMarket()}
          >
            MTM
          </button>
        </a>
      </td>
      <td className='sm:hidden sm:pr-3 sm:pl-0 px-6  '>
        <button
          onClick={() => setIsModalOpened(true)}
          className={`font-bold text-[10px] sm:text-xs hover:underline transition ease-in-out text-[#C53F3A] duration-300`}
        >
          CLOSE
        </button>
      </td>
      <Tooltip id='m2m-tooltip' />
      <ClosePositionModal
        handleCloseModal={handleCloseModal}
        isModalOpened={isModalOpened}
        position={position}
      />
    </tr>
  );
};
