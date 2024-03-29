import { MarketType } from '@/types/marketTypes';
import { getMarkeDetails } from './getMarketDetails';

export interface ExtendedMarketType extends MarketType {
  name?: string;
  path?: string;
  symbol?: string;
  category?: string;
}

export function enrichMarketData(markets: MarketType[]): ExtendedMarketType[] {
  return markets.map((market) => {
    const details = getMarkeDetails(market.ticker);

    if (details) {
      return { ...market, ...details };
    } else {
      return market;
    }
  });
}
