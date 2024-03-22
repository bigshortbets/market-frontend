import { PositionType } from '@/types/positionTypes';
import { convertToSS58 } from '@/utils/convertToSS58';
import { extendPositionsWithSide } from '@/utils/extendPositionsWithSide';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { TradingHubPositionsItem } from './TradingHubPositionsItem';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';
import { scaleNumber } from '@/utils/scaleNumber';
import { FaChartBar } from 'react-icons/fa';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom, userMarginsAtom } from '../../Market';
import MiniChartWidget from '../Widget/MiniChartWidget';
import { LiquidationStatusTab } from '../../LiquidationStatusTab';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { ClosePositionModal } from './ClosePositionModal';

interface TradingHubAggregatedPositionProps {
  positions: PositionType[];
  ticker: string;
}

export const TradingHubAggregatedPosition = ({
  positions,
  ticker,
}: TradingHubAggregatedPositionProps) => {
  const [isExtended, setIsExtended] = useState(false);
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const { address } = useAccount();
  const convertedAddress = convertToSS58(address!);
  const marketId = positions[0].market.id;
  const oraclePrice = positions[0].market.oraclePrice;

  const positionsWithSide = extendPositionsWithSide(
    positions,
    convertedAddress
  );

  const toggleExtended = () => {
    setIsExtended((prevState) => !prevState);
  };

  const marketDetails = getMarkeDetails(ticker);

  const sumLossProfit: number =
    oraclePrice &&
    positionsWithSide.reduce((acc, position) => {
      return position.side === 'LONG'
        ? acc +
            Number(position.quantityLeft) *
              Number(position.market.contractUnit) *
              (Number(scaleNumber(oraclePrice.toString())) -
                Number(scaleNumber(position.price.toString())))
        : acc +
            Number(position.quantityLeft) *
              Number(position.market.contractUnit) *
              (Number(scaleNumber(position.price.toString())) -
                Number(scaleNumber(oraclePrice.toString())));
    }, 0);

  const handleClick = () => {
    toggleExtended();
  };

  const [userMargins] = useAtom(userMarginsAtom);

  return (
    <div className="w-full flex flex-col  relative h-full">
      <div
        className="w-full px-3 bg-[#23252E] py-3  cursor-pointer h-full"
        onClick={handleClick}
      >
        <div className="flex justify-between items-center h-full">
          <div className="flex gap-4 h-full items-center">
            {/*  <div
              className={`w-[12px] h-[12px]  rounded-full mt-[3px]  ${
                selectedMarketId === marketId
                  ? "bg-[#73D391] animate-pulse"
                  : "bg-gray-400"
              }`}
            ></div> */}
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[#EBEDFD] text-sm">{marketDetails?.name}</p>
                {marketDetails && (
                  <Image
                    src={marketDetails?.path}
                    width={14}
                    height={14}
                    alt="Market logo"
                    className="rounded-full"
                  />
                )}
              </div>
              <p className="text-[#ABACBA] text-xs">{ticker}</p>
            </div>
            {/*  <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{ticker}</p>
                <a
                  className="text-[#ABACBA] text-lg"
                  href={`https://pl.tradingview.com/chart/?symbol=${ticker}`}
                  target="_blank"
                >
                  <FaChartBar />
                </a>
              </div>
              <div className=" flex items-center gap-2">
                {marketDetails && (
                  <Image
                    src={marketDetails?.path}
                    width={20}
                    height={20}
                    alt="Market logo"
                    className="rounded-full"
                  />
                )}
                <p className="text-xs">{marketDetails?.name}</p>
              </div>
            </div> */}

            <MiniChartWidget symbol={ticker} />
          </div>
          {/* <div className="  h-[36px] w-[30%] flex relative ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-tertiary  text-xs opacity-40">
              vs
            </div>
            <div className="flex-1 bg-green-400 opacity-10"></div>
            <div className="flex-1 bg-red-400 opacity-10"></div>
            <div className="absolute text-[10px] text-tertiary bottom-1 left-1 opacity-30">
              You
            </div>

            <div className="absolute text-[10px] text-tertiary top-1 right-1 opacity-30">
              Opponents
            </div>
          </div> */}
          {/* Stats */}
          <div className="flex gap-6">
            {userMargins.details[marketId] && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="text-xs text-tetriary">Status</p>
                  <LiquidationStatusTab
                    status={
                      userMargins.details[marketId]
                        .liquidationStatus as LiquidationStatusType
                    }
                  />
                </div>
              </div>
            )}
            {/* Sum profit / loss */}
            <div className="flex flex-col text-right">
              <p className="text-xs text-tetriary">Sum gain / loss</p>
              <p
                className={`text-xs font-semibold ${
                  sumLossProfit < 0 ? 'text-red-500' : 'text-[#87DAA4]'
                }`}
              >
                {sumLossProfit && sumLossProfit.toFixed(2)}{' '}
                <span className="text-xs">USDC</span>
              </p>
            </div>

            {/* <div className="text-sm font-semibold  w-[100px]">
              {isExtended
                ? `Hide all (${positions.length})`
                : `Show all (${positions.length})`}
            </div> */}
          </div>
        </div>
      </div>
      {isExtended && (
        <div className="w-full border-t-[1px] border-[#2d2d2f]">
          <table className="table-auto w-full ">
            <thead className=" text-sm text-left text-[#ABACBA] border-b-[1px] border-[#23252E] bg-[#191B24]">
              <tr>
                <th className="font-normal pb-2 py-2 pl-3">Side</th>
                <th className="font-normal">Quantity</th>

                <th className="font-normal">Entry price</th>
                <th className="font-normal">Profit / loss</th>
                <th className="font-normal">Opponent & status</th>

                <th className="pr-3"></th>
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
                  oraclePrice={oraclePrice}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ClosePositionModal />
    </div>
  );
};
