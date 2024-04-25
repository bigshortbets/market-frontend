import { EnrichedMarketType } from '@/types/marketTypes';

export const findMarketById = (
  marketArray: EnrichedMarketType[],
  marketId: string
): EnrichedMarketType | undefined => {
  for (const market of marketArray) {
    if (market.id === marketId) {
      return market;
    }
  }
  return undefined;
};
