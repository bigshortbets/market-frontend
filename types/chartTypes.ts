export interface MarketPriceChartType {
  createPrice: bigint;
  timestamp: string;
}

export interface MarketPriceChartResponse {
  positions: MarketPriceChartType[];
}

export interface OraclePriceChartType {
  price: bigint;
  timestamp: string;
}

export interface OraclePriceChartResponse {
  historicalMarketPrices: OraclePriceChartType[];
}
