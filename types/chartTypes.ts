export interface MarketPriceChartType {
  createPrice: bigint;
  timestamp: string;
}

export interface MarketPriceChartResponse {
  positions: MarketPriceChartType[];
}
