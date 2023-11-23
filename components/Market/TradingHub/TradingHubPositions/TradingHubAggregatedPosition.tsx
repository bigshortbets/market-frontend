import { useOraclePrice } from '@/api/useOraclePrice';
import { PositionType } from '@/types/positionTypes';
import { convertToSS58 } from '@/utils/convertToSS58';
import { extendPositionsWithSide } from '@/utils/extendPositionsWithSide';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { TradingHubDetailedPosition } from './TradingHubDetailedPosition';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';

interface TradingHubAggregatedPositionProps {
  positions: PositionType[];
  ticker: string;
}

export const TradingHubAggregatedPosition = ({
  positions,
  ticker,
}: TradingHubAggregatedPositionProps) => {
  const [isExtended, setIsExtended] = useState(false);
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

  /* const [animationParent] = useAutoAnimate(); */
  /* const oraclePrice: string = useOraclePrice(marketId); */

  return (
    <div
      className="w-full flex flex-col border-4 border-[#23252E]" /* ref={animationParent} */
    >
      <div className="w-full px-3 bg-[#23252E] py-3 rounded-t ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">{ticker}</p>
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
          <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-1 text-right">
              <p className="text-sm">Positions count</p>
              <p className="text-xs font-semibold">{positions.length}</p>
            </div>
            <button className="text-sm font-semibold" onClick={toggleExtended}>
              {isExtended ? 'Hide all' : 'Show all'}
            </button>
          </div>
        </div>
      </div>
      {isExtended && (
        <div className="w-full">
          <table className="table-auto w-full  ">
            <thead className="bg-[#23252E] text-sm text-left text-[#ABACBA] ">
              <tr>
                <th className="font-normal pb-2 py-1 pl-3">Side</th>
                <th className="font-normal">Quantity</th>
                <th className="font-normal">Opponent</th>
                {/* <th className="font-normal">Created</th>
                <th className="font-normal">Market</th>
                <th className="font-normal">Price</th>
              
                <th className="pr-3"></th> */}
              </tr>
            </thead>
            <tbody>
              {positionsWithSide.map((position) => (
                <TradingHubDetailedPosition
                  position={position}
                  key={position.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
