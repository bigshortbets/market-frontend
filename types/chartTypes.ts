export interface ChartFeedType {
  createPrice: BigInt;
  timestamp: string;
}

export interface ChartFeedResponse {
  positions: ChartFeedType[];
}
