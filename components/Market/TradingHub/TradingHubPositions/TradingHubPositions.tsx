import { PositionType } from '@/types/positionTypes';
import React, { useEffect } from 'react';
import { TradingHubAggregatedPosition } from './TradingHubAggregatedPosition';
import { useAtom } from 'jotai';
import { unsettledLossesAtom } from '../../Market';
import { tradingHubPositionsCountAtom } from '../TradingHub';
import { useAccount } from 'wagmi';

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
  const [, setPositionsCount] = useAtom(tradingHubPositionsCountAtom);
  const { address } = useAccount();

  useEffect(() => {
    setPositionsCount(positions.length);
  }, [positions]);

  return (
    <div
      className="w-full h-full  px-2.5  overflow-y-auto no-scrollbar"
      style={{ maxHeight: 'calc(100vh - 230px)' }}
    >
      {positions.length > 0 ? (
        <div className="flex flex-col gap-4">
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
        <div className="flex items-center justify-center h-full">
          <p className="opacity-20 text-3xl">Currently no open positions</p>
        </div>
      )}
    </div>
  );
};
