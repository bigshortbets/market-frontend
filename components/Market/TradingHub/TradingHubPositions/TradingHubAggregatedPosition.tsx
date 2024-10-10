import { PositionType } from '@/types/positionTypes';
import { convertToSS58 } from '@/utils/convertToSS58';
import { extendPositionsWithSide } from '@/utils/extendPositionsWithSide';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { TradingHubPositionsItem } from './TradingHubPositionsItem';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom, userMarginsAtom } from '../../Market';
import { LiquidationStatusTab } from '../../LiquidationStatusTab';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { currencySymbol } from '@/blockchain/constants';
import { FaChartBar } from 'react-icons/fa';
import { marketsAtom, tradingHubStateAtom } from '@/store/store';
import { useRouter } from 'next/router';
import { findMarketById } from '@/utils/findMarketById';
import { IoMdLock } from 'react-icons/io';
import { Tooltip } from '@nextui-org/react';
import { BigSBTooltip } from '@/components/BigSBTooltip';
import { getPrecision } from '@/utils/getPrecision';

interface TradingHubAggregatedPositionProps {
  positions: PositionType[];
  ticker: string;
}

export const TradingHubAggregatedPosition = ({
  positions,
  ticker,
}: TradingHubAggregatedPositionProps) => {
  const [tradingHubState, setTradingHubState] = useAtom(tradingHubStateAtom);
  const [markets] = useAtom(marketsAtom);
  const [isExtended, setIsExtended] = useState(false);
  const { address } = useAccount();
  const convertedAddress = convertToSS58(address!);
  const marketId = positions[0].market.id;
  const oraclePrice = positions[0].market.oraclePrice;
  const [, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const router = useRouter();
  const toggleExtended = () => {
    setIsExtended((prevState) => !prevState);
  };
  const precision = getPrecision(Number(positions[0].market.tickSize));

  const market = findMarketById(markets, marketId);

  const handleOpenChart = () => {
    setSelectedMarketId(marketId);
    router.replace(`?market=${ticker}-${marketId}`, undefined, {
      shallow: true,
    });
    setTradingHubState('chart');
  };

  const marketDetails = getMarkeDetails(ticker);

  const positionsWithSide = extendPositionsWithSide(
    positions,
    convertedAddress
  );

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
    if (!isExtended) {
      setSelectedMarketId(marketId);
      router.replace(`?market=${ticker}-${marketId}`, undefined, {
        shallow: true,
      });
    }
    toggleExtended();
  };

  const [userMargins] = useAtom(userMarginsAtom);

  return (
    /* MOBILE */
    <>
      <div className='sm:hidden'>
        <div
          className={`p-3 bg-[#23252E] ${
            market?.isClosed && 'opacity-50'
          } cursor-pointer w-full  rounded-md overflow-x-auto no-scroll`}
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
                  {market?.isClosed && <IoMdLock className='text-xs' />}
                  <button
                    className='text-tetriary text-[16px] hover:text-gray-400'
                    onClick={handleOpenChart}
                  >
                    <FaChartBar />
                  </button>
                </div>
                <p className='text-[#ABACBA] text-[10px] mb-1'>{ticker}</p>
                <div className='flex items-center gap-2'>
                  <div className='flex gap-2 items-center'>
                    {' '}
                    <p className='text-[#EBEDFD] text-xs'>Status</p>
                    <LiquidationStatusTab
                      small
                      status={
                        userMargins.details?.[marketId]?.liquidationStatus
                      }
                    />
                  </div>
                  <div className='flex items-center gap-2'>
                    <p className='text-xs text-tetriary'>O. Price:</p>
                    <p className='text-xs  font-semibold text-white'>
                      {oraclePrice && Number(oraclePrice).toFixed(precision)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex flex-col text-right'>
                <p className='text-[10px] text-tetriary'>Sum Gain / Loss</p>
                <p
                  className={`text-[11px] font-semibold ${
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
                        <BigSBTooltip
                          content={
                            <div className='text-xs'>
                              Price of the most recent settlement for this
                              position
                            </div>
                          }
                        >
                          <p className='decoration-dotted underline cursor-help'>
                            Settlement price
                          </p>
                        </BigSBTooltip>
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Profit/loss
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Opponent&Status
                      </th>
                      <th scope='col' className='px-6 py-3'></th>
                      <th scope='col' className='px-6 py-3'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {positionsWithSide.map((position) => (
                      <TradingHubPositionsItem
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
          className={`w-full px-3 bg-[#23252E] py-3 ${
            market?.isClosed && 'opacity-60'
          }  cursor-pointer h-full rounded-md`}
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

                  {market?.isClosed && <IoMdLock className='text-xs' />}

                  <button
                    className='text-tetriary text-[16px] hover:text-gray-400'
                    onClick={handleOpenChart}
                  >
                    <FaChartBar />
                  </button>
                </div>
                <p className='text-[#ABACBA] text-xs'>{ticker}</p>
              </div>
            </div>

            <div className='flex gap-6 items-center'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <p className='text-xs text-tetriary'>Oracle Price:</p>
                  <p className='text-xs  font-semibold text-white'>
                    {oraclePrice && Number(oraclePrice).toFixed(precision)}
                  </p>
                </div>
                {userMargins.details[marketId] && (
                  <div className='flex items-center gap-2'>
                    <p className='text-xs text-tetriary'>Market Status:</p>
                    <LiquidationStatusTab
                      small
                      status={
                        userMargins.details[marketId]
                          .liquidationStatus as LiquidationStatusType
                      }
                    />
                  </div>
                )}
              </div>
              {/* Sum profit / loss */}
              <div className='flex flex-col text-right min-w-[100px]'>
                <p className='text-xs text-tetriary'>Sum Gain / Loss</p>
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

                  <th className='font-normal'>Entry Price</th>
                  <th className='font-normal'>
                    <BigSBTooltip
                      content={
                        <div className='text-xs'>
                          Price of the most recent settlement for this position
                        </div>
                      }
                    >
                      <p className='decoration-dotted underline cursor-help'>
                        Settlement Price
                      </p>
                    </BigSBTooltip>
                  </th>
                  <th className='font-normal'>Profit / Loss</th>
                  <th className='font-normal'>Opponent & Status</th>

                  <th className='pr-3'></th>
                  {/* <th className="font-normal">Created</th>
                <th className="font-normal">Market</th>
                <th className="font-normal">Price</th>
              
                <th className="pr-3"></th> */}
                </tr>
              </thead>
              <tbody>
                {positionsWithSide.map((position) => (
                  <TradingHubPositionsItem
                    position={position}
                    key={position.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
