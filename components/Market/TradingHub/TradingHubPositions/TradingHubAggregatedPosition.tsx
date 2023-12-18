import { useOraclePrice } from '@/api/useOraclePrice';
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
import { selectedMarketIdAtom } from '../../Market';

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
  const positionsWithSide = extendPositionsWithSide(
    positions,
    convertedAddress
  );

  const toggleExtended = () => {
    setIsExtended((prevState) => !prevState);
  };

  const marketDetails = getMarkeDetails(ticker);

  const oraclePrice = useOraclePrice(marketId);

  const sumLossProfit: number =
    oraclePrice &&
    positionsWithSide.reduce((acc, position) => {
      return position.side === 'LONG'
        ? acc +
            Number(position.quantity) *
              Number(position.market.contractUnit) *
              (Number(scaleNumber(oraclePrice.toString())) -
                Number(scaleNumber(position.price.toString())))
        : acc +
            Number(position.quantity) *
              Number(position.market.contractUnit) *
              (Number(scaleNumber(position.price.toString())) -
                Number(scaleNumber(oraclePrice.toString())));
    }, 0);

  const handleClick = () => {
    setSelectedMarketId(marketId);
    toggleExtended();
  };

  return (
    <div
      className="w-full flex flex-col border-4 border-[#23252E] cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full px-3 bg-[#23252E] py-3 rounded-t ">
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5">
            <div
              className={`w-[12px] h-[12px]  rounded-full mt-[3px]  ${
                selectedMarketId === marketId
                  ? 'bg-[#73D391] animate-pulse'
                  : 'bg-gray-400'
              }`}
            ></div>

            <div className="flex flex-col gap-2">
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
            </div>
          </div>
          {/* Stats */}
          <div className="flex gap-12 items-center">
            {/* Sum profit / loss */}
            <div className="flex flex-col gap-1 text-right">
              <p className="text-xs">Sum Profit / loss</p>
              <p
                className={`text-sm font-semibold ${
                  sumLossProfit < 0 ? 'text-red-500' : 'text-[#73D391]'
                }`}
              >
                {sumLossProfit && sumLossProfit.toFixed(2)}{' '}
                <span className="text-xs">USDC</span>
              </p>
            </div>

            <div className="text-sm font-semibold  w-[100px]">
              {isExtended
                ? `Hide all (${positions.length})`
                : `Show all (${positions.length})`}
            </div>
          </div>
        </div>
      </div>
      {isExtended && (
        <div className="w-full border-t-[1px] border-[#2d2d2f]">
          <table className="table-auto w-full ">
            <thead className=" text-sm text-left text-[#ABACBA] bg-[#23252E]">
              <tr>
                <th className="font-normal pb-2 py-2 pl-3">Side</th>
                <th className="font-normal">Quantity</th>
                <th className="font-normal">Opponent</th>
                <th className="font-normal">Entry price</th>
                <th className="font-normal">Profit / loss</th>
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
    </div>
  );
};
