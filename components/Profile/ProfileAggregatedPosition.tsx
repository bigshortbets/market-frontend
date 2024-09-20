import { PositionType } from '@/types/positionTypes';
import { convertToSS58 } from '@/utils/convertToSS58';
import { extendPositionsWithSide } from '@/utils/extendPositionsWithSide';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { currencySymbol } from '@/blockchain/constants';
import { FaChartBar } from 'react-icons/fa';
import { tradingHubStateAtom } from '@/store/store';
import { useRouter } from 'next/router';
import { ProfilePositionItem } from './ProfilePositionItem';

interface ProfileAggregatedPositionProps {
  positions: PositionType[];
  ticker: string;
  address: string;
}

export const ProfileAggregatedPosition = ({
  positions,
  ticker,
  address,
}: ProfileAggregatedPositionProps) => {
  const [isExtended, setIsExtended] = useState(false);
  const marketId = positions[0].market.id;
  const oraclePrice = positions[0].market.oraclePrice;

  const positionsWithSide = extendPositionsWithSide(positions, address);

  const toggleExtended = () => {
    setIsExtended((prevState) => !prevState);
  };
  const marketDetails = getMarkeDetails(ticker);

  const experimentalSumLossProfit: number =
    oraclePrice &&
    positionsWithSide.reduce((acc, position) => {
      return position.side === 'LONG'
        ? acc +
            Number(position.quantityLeft) *
              Number(position.market.contractUnit) *
              (Number(oraclePrice.toString()) -
                Number(position.createPriceLong.toString()))
        : acc +
            Number(position.quantityLeft) *
              Number(position.market.contractUnit) *
              (Number(position.createPriceShort.toString()) -
                Number(oraclePrice.toString()));
    }, 0);

  const handleClick = () => {
    toggleExtended();
  };

  /*  const [userMargins] = useAtom(userMarginsAtom); */

  return (
    /* MOBILE */
    <>
      <div className='sm:hidden'>
        <div
          className=' p-3 bg-[#23252E] cursor-pointer w-full  rounded-md overflow-x-auto no-scroll'
          onClick={handleClick}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              {marketDetails && (
                <Image
                  src={marketDetails?.path}
                  width={16}
                  height={16}
                  alt='Market logo'
                  className='rounded-full'
                />
              )}
              <div>
                <div className='flex items-center gap-1'>
                  <p className='text-[#EBEDFD] text-xs'>
                    {marketDetails?.name}
                  </p>

                  {/*  <button
                    className='text-tetriary text-[16px] hover:text-gray-400'
                    onClick={handleOpenChart}
                  >
                    <FaChartBar />
                  </button> */}
                </div>
                <p className='text-[#ABACBA] text-[10px] mb-1'>{ticker}</p>
                {/* <div className='flex gap-2 items-center'>
                  {' '}
                  <p className='text-[#EBEDFD] text-xs'>Status</p>
                  <LiquidationStatusTab
                    small
                    status={userMargins.details?.[marketId]?.liquidationStatus}
                  />
                </div> */}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex flex-col text-right'>
                <p className='text-[10px] text-tetriary'>Sum gain / loss</p>
                <p
                  className={`text-[11px] font-semibold ${
                    experimentalSumLossProfit < 0
                      ? 'text-[#DA8787]'
                      : 'text-[#87DAA4]'
                  }`}
                >
                  {experimentalSumLossProfit?.toFixed(2)}{' '}
                  <span className='text-xs'>{currencySymbol}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {isExtended && (
          <div className='w-full border-t-[1px] border-[#2d2d2f]'>
            <div className='overflow-x-auto'>
              <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs   dark:text-gray-400'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        Side
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Quantity
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Entry price
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Settlement price
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Profit/loss
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Opponent&Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {positionsWithSide.map((position) => (
                      <ProfilePositionItem
                        position={position}
                        key={position.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP */}

      <div className='w-full  flex-col  relative h-full hidden sm:flex'>
        <div
          className='w-full px-3 bg-[#23252E] py-3  cursor-pointer h-full rounded-md'
          onClick={handleClick}
        >
          <div className='flex justify-between items-center h-full'>
            <div className='flex gap-4 h-full items-end'>
              <div>
                <div className='flex items-center gap-2'>
                  <p className='text-[#EBEDFD] text-sm'>
                    {marketDetails?.name}
                  </p>
                  {marketDetails && (
                    <Image
                      src={marketDetails?.path}
                      width={14}
                      height={14}
                      alt='Market logo'
                      className='rounded-full'
                    />
                  )}

                  {/* <button
                    className='text-tetriary text-[16px] hover:text-gray-400'
                    onClick={handleOpenChart}
                  >
                    <FaChartBar />
                  </button> */}
                </div>
                <p className='text-[#ABACBA] text-xs'>{ticker}</p>
              </div>
            </div>

            <div className='flex gap-6'>
              {/* {userMargins.details[marketId] && (
                <div className='flex items-start  gap-1.5 w-[150px]'>
                  <p className='text-xs text-tetriary'>Status</p>
                  <LiquidationStatusTab
                    status={
                      userMargins.details[marketId]
                        .liquidationStatus as LiquidationStatusType
                    }
                  />
                </div>
              )} */}
              {/* Sum profit / loss */}
              <div className='flex flex-col text-right min-w-[100px]'>
                <p className='text-xs text-tetriary'>Sum gain / loss</p>
                <p
                  className={`text-xs font-semibold ${
                    experimentalSumLossProfit < 0
                      ? 'text-[#DA8787]'
                      : 'text-[#87DAA4]'
                  }`}
                >
                  {experimentalSumLossProfit &&
                    experimentalSumLossProfit.toFixed(2)}{' '}
                  <span className='text-xs'>{currencySymbol}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {isExtended && (
          <div className='w-full border-t-[1px] border-[#2d2d2f]'>
            <table className='table-auto w-full'>
              <thead className=' text-sm text-left text-[#ABACBA] border-b-[1px] border-[#23252E] bg-[#191B24]'>
                <tr className='text-xs'>
                  <th className='font-normal pb-2 py-2 pl-3 '>Side</th>
                  <th className='font-normal'>Quantity</th>

                  <th className='font-normal'>Entry price</th>
                  <th className='font-normal'>Settlement price</th>
                  <th className='font-normal'>Profit / loss</th>
                  <th className='font-normal'>Opponent & status</th>

                  {/* <th className="font-normal">Created</th>
                <th className="font-normal">Market</th>
                <th className="font-normal">Price</th>
              
                <th className="pr-3"></th> */}
                </tr>
              </thead>
              <tbody>
                {positionsWithSide.map((position) => (
                  <ProfilePositionItem position={position} key={position.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
