export interface ChartFeedType {
  price: BigInt;
  timestamp: string;
}

export interface ChartFeedResponse {
  positions: ChartFeedType[];
}
