import { MarketType } from '@/types/marketTypes';

export const findMarketById = (
  marketArray: MarketType[],
  marketId: string
): MarketType | null => {
  for (const market of marketArray) {
    if (market.id === marketId) {
      return market;
    }
  }
  return null;
};
