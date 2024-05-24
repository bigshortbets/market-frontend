import { PositionType } from '@/types/positionTypes';
import React, { useEffect } from 'react';
import { TradingHubAggregatedPosition } from './TradingHubAggregatedPosition';
import { useAtom } from 'jotai';
import { unsettledLossesAtom } from '../../Market';
import { useAccount } from 'wagmi';
import { TradingHubNonAggregatedPositions } from './TradingHubNonAggregatedPositions';

interface TradingHubPositionsProps {
  positions: PositionType[];
  isAggregated: boolean;
}

export const TradingHubPositions = ({
  positions,
  isAggregated,
}: TradingHubPositionsProps) => {
  const aggregatePositionsByMarketTicker = () => {
    const aggregatedPositions: Record<string, PositionType[]> = {};
    positions.forEach((position) => {
      if (aggregatedPositions[position.market.ticker]) {
        aggregatedPositions[position.market.ticker].push(position);
      } else {
        aggregatedPositions[position.market.ticker] = [position];
      }
    });
    return aggregatedPositions;
  };

  const positionsByMarketTicker = aggregatePositionsByMarketTicker();
  const { address } = useAccount();

  return (
    <div
      className='w-full h-full  px-2.5  overflow-y-auto no-scrollbar'
      style={{ maxHeight: 'calc(100vh - 230px)' }}
    >
      {positions.length > 0 ? (
        <>
          {isAggregated ? (
            <div className='flex flex-col gap-4'>
              {Object.entries(positionsByMarketTicker).map(
                ([ticker, positions]) => (
                  <TradingHubAggregatedPosition
                    key={ticker}
                    ticker={ticker}
                    positions={positions}
                  />
                )
              )}
            </div>
          ) : (
            <TradingHubNonAggregatedPositions positions={positions} />
          )}
        </>
      ) : (
        <div className='flex items-center justify-center '>
          <p className='opacity-20 text-2xl mt-5'>
            Currently no open positions
          </p>
        </div>
      )}
    </div>
  );
};
