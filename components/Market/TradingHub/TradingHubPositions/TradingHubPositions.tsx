import { PositionType } from '@/types/positionTypes';
import { TradingHubAggregatedPosition } from './TradingHubAggregatedPosition';
import { TradingHubNonAggregatedPositions } from './TradingHubNonAggregatedPositions';
import { getMarkeDetails } from '@/utils/getMarketDetails';

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

  /* Sorting alphabetically  */

  const sortPositionsByMarketName = (
    positionsByMarketTicker: Record<string, PositionType[]>
  ) => {
    const sortedTickers = Object.keys(positionsByMarketTicker).sort((a, b) => {
      const nameA = getMarkeDetails(a)?.name || a;
      const nameB = getMarkeDetails(b)?.name || b;
      return nameA.localeCompare(nameB);
    });

    const sortedPositionsByMarketTicker: Record<string, PositionType[]> = {};
    sortedTickers.forEach((ticker) => {
      sortedPositionsByMarketTicker[ticker] = positionsByMarketTicker[ticker];
    });

    return sortedPositionsByMarketTicker;
  };

  const sortedPositions = sortPositionsByMarketName(positionsByMarketTicker);

  /*  */

  return (
    <div className='w-full h-full  px-2.5  overflow-y-auto no-scrollbar max-h-[calc(100vh-290px)] md:max-h-[calc(100vh-230px)]'>
      {positions.length > 0 ? (
        <>
          {isAggregated ? (
            <div className='flex flex-col gap-4'>
              {Object.entries(sortedPositions).map(([ticker, positions]) => (
                <TradingHubAggregatedPosition
                  key={ticker}
                  ticker={ticker}
                  positions={positions}
                />
              ))}
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
