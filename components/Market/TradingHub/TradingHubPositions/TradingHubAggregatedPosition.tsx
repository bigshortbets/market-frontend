import { useOraclePrice } from '@/api/useOraclePrice';
import { PositionType } from '@/types/positionTypes';
import React from 'react';

interface TradingHubAggregatedPositionProps {
  positions: PositionType[];
  ticker: string;
}

export const TradingHubAggregatedPosition = ({
  positions,
  ticker,
}: TradingHubAggregatedPositionProps) => {
  const marketId = positions[0].market.id;
  /* const oraclePrice: string = useOraclePrice(marketId); */

  return (
    <div className="w-full px-3 bg-primary-bg py-3 rounded">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p>Market</p>
          <p className="text-xs font-semibold">{ticker}</p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <p>Positions count</p>
          <p className="text-sm font-semibold">{positions.length}</p>
        </div>
      </div>
    </div>
  );
};
