export interface ChartFeedType {
  createPrice: bigint;
  timestamp: string;
}

export interface ChartFeedResponse {
  positions: ChartFeedType[];
}

export interface CandleFeed {
  lowPrice: string;
  highPrice: string;
  openPrice: string;
  closePrice: string;
  timestamp: string;
}

export interface OracleFeed1HResponse {
  oracleChartFeed1Hs: CandleFeed[];
}

export interface OracleFeed15MinResponse {
  oracleChartFeed15Mins: CandleFeed[];
}
