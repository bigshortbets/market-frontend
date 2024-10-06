import { PositionWithSide } from '@/types/positionTypes';
import { useState } from 'react';
import { truncateAddress } from '@/utils/truncateAddress';
import { getOpponentMarginData } from '@/utils/getOpponentMarginData';
import { useAtom } from 'jotai';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { Tooltip } from 'react-tooltip';
import { useMarkToMarket } from '@/blockchain/hooks/useMarkToMarket';
import { currencySymbol } from '@/blockchain/constants';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import { FaMessage } from 'react-icons/fa6';
import { tradingHubStateAtom } from '@/store/store';
import { useDisplayName } from '@/hooks/useDisplayName';
import { IoChatbubble } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { addressMatcherApi } from '@/requests/bidgeApi/addressMatcherApi';
import { useRouter } from 'next/router';
import { opponentsMarginsAtom } from '../Market/Market';
import { SideLabel } from '../Market/TradingHub/SideLabel';
import { LiquidationStatusTab } from '../Market/LiquidationStatusTab';
import Link from 'next/link';

interface ProfilePositionItemProps {
  position: PositionWithSide;
  isNotAggregated?: boolean;
}

export const ProfilePositionItem = ({
  position,
  isNotAggregated,
}: ProfilePositionItemProps) => {
  const oraclePrice = position.market.oraclePrice;
  const opponent = position.side === 'LONG' ? position.short : position.long;
  const calculatedProfitOrLoss =
    position.side === 'LONG'
      ? Number(position.quantityLeft) *
        Number(position.market.contractUnit) *
        (Number(oraclePrice.toString()) -
          Number(position.createPriceLong.toString()))
      : Number(position.quantityLeft) *
        Number(position.market.contractUnit) *
        (Number(position.createPriceShort.toString()) -
          Number(oraclePrice.toString()));

  const { write: writeMarkToMarket } = useMarkToMarket(
    position.market.id,
    position.id
  );

  const [opponentsMargin] = useAtom(opponentsMarginsAtom);
  const router = useRouter();

  const marginData = getOpponentMarginData(
    opponentsMargin,
    opponent,
    position.market.id
  );

  const marketDetails = getMarkeDetails(position.market.ticker);

  const [tradingHubState, setTradingHubState] = useAtom(tradingHubStateAtom);

  const { displayName } = useDisplayName(opponent);

  const { data: h160address } = useQuery({
    queryKey: ['h160', opponent],
    queryFn: addressMatcherApi.geth160Address,
  });

  /*   const openChat = () => {
    router.push(
      {
        pathname: router.pathname, // Keep the current path
        query: { ...router.query, chat: h160address!.data.ethAddress }, // Add the 'chat' param
      },
      undefined,
      { shallow: true } // Don't reload the page
    );
    setTradingHubState('chat');
  }; */

  return (
    <tr
      className={`text-sm even:bg-[#23252E] text-[#7F828F]  overflow-x-scroll`}
    >
      <td className='px-6 sm:pr-0 sm:pl-3 py-3'>
        <SideLabel side={position.side} />
      </td>
      {isNotAggregated && (
        <td
          className='text-[10px] sm:text-xs px-6 sm:px-0 underline cursor-pointer'
          role='button'
          aria-label={`Select market ${marketDetails?.name}`}
        >
          {marketDetails?.name}
        </td>
      )}
      <td className='text-[10px] sm:text-xs px-6 sm:px-0'>
        {Number(position.quantityLeft)}
      </td>
      <td className='text-[10px] sm:text-xs px-6 sm:px-0'>
        {position.side === 'LONG'
          ? Number(position.createPriceLong)
          : Number(position.createPriceShort)}
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
          <Link
            href={`/profile/${opponent}`}
            className='text-[10px] sm:text-xs hover:underline'
          >
            {displayName ? displayName : truncateAddress(opponent)}
          </Link>
          <LiquidationStatusTab
            status={marginData?.liquidationStatus! as LiquidationStatusType}
            small
          />

          {/* {h160address && h160address.data.ethAddress && (
            <button onClick={openChat} className='hidden lg:block'>
              <FaMessage className='text-sm' />
            </button>
          )} */}
        </div>
      </td>
      {/* <td className=' text-right pr-3 hidden sm:table-cell'>
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
      </td> */}
      {/* <td className='sm:hidden sm:pr-3 sm:pl-0 text-right px-6 '>
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
      </td> */}
      {/* <td className='sm:hidden sm:pr-3 sm:pl-0 px-6  '>
        <button
          onClick={() => setIsModalOpened(true)}
          className={`font-bold text-[10px] sm:text-xs hover:underline transition ease-in-out text-[#C53F3A] duration-300`}
        >
          CLOSE
        </button>
      </td> */}
      {/* <Tooltip id='m2m-tooltip' />
      <ClosePositionModal
        handleCloseModal={handleCloseModal}
        isModalOpened={isModalOpened}
        position={position}
      /> */}
    </tr>
  );
};
