export interface ChartFeedType {
  createPrice: bigint;
  timestamp: string;
}

export interface ChartFeedResponse {
  positions: ChartFeedType[];
}
