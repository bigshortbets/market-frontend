import { MarketType } from '@/types/marketTypes';
import { calculateMarketClosing } from './calculateMarketClosing';

export interface MarketWithDateType extends MarketType {
  newDate: Date;
  isClosed: boolean;
  timeDiff: number;
  timeLeftMessage: string;
  formattedDate: string;
}

export const categorizeMarkets = (
  markets: MarketType[],
  blockHeight: number
): {
  closedMarkets: MarketWithDateType[];
  activeMarkets: MarketWithDateType[];
} => {
  const closedMarkets: MarketWithDateType[] = [];
  const activeMarkets: MarketWithDateType[] = [];

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
