export interface ChartFeedType {
  createPrice: bigint;
  timestamp: string;
}

export interface ChartFeedResponse {
  positions: ChartFeedType[];
}

export interface CandleFeed {
  low: string;
  high: string;
  open: string;
  close: string;
  time: string;
}

export interface OracleFeed1HResponse {
  oracleChartFeed1Hs: CandleFeed[];
}

export interface OracleFeed15MinResponse {
  oracleChartFeed15Mins: CandleFeed[];
}
