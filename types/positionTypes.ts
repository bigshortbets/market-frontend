export interface PositionType {
  id: string;
  price: BigInt;
  quantity: BigInt;
  timestamp: string;
  short: string;
  long: string;
  status: 'OPEN' | 'CLOSED';
  quantityLeft: BigInt;
  market: {
    id: string;
    ticker: string;
  };
}

export interface PositionsResponse {
  positions: PositionType[];
}
