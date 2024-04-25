import { EnrichedMarketType } from '@/types/marketTypes';
import { calculateMarketClosing } from './calculateMarketClosing';

export const categorizeMarkets = (
  markets: EnrichedMarketType[],
  blockHeight: number
): {
  closedMarkets: EnrichedMarketType[];
  activeMarkets: EnrichedMarketType[];
} => {
  const closedMarkets: EnrichedMarketType[] = [];
  const activeMarkets: EnrichedMarketType[] = [];

  markets.forEach((market) => {
    const result = calculateMarketClosing(blockHeight, Number(market.lifetime));
    if (result.isClosed) {
      closedMarkets.push({ ...market, ...result });
    } else {
      activeMarkets.push({ ...market, ...result });
    }
  });

  return { closedMarkets, activeMarkets };
};
