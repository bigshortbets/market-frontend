import { MarketsDataProps, marketsData } from '@/data/marketsData';

export const getMarkeDetails = (
  marketInput: string
): MarketsDataProps | undefined => {
  return marketsData.find((market) => marketInput.startsWith(market.symbol));
};
