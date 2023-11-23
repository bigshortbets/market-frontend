import { PositionType } from '@/types/positionTypes';
import React from 'react';
import { TradingHubAggregatedPosition } from './TradingHubAggregatedPosition';

interface TradingHubPositionsProps {
  positions: PositionType[];
}

export const TradingHubPositions = ({
  positions,
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

  return (
    <div className="w-full h-full px-2 py-2">
      <div className="flex flex-col gap-4">
        {Object.entries(positionsByMarketTicker).map(([ticker, positions]) => (
          <TradingHubAggregatedPosition
            key={ticker}
            ticker={ticker}
            positions={positions}
          />
        ))}
      </div>
    </div>
  );
};
