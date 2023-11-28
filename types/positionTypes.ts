export interface PositionType {
  id: string;
  price: BigInt;
  quantity: BigInt;
  timestamp: string;
  short: string;
  long: string;
  quantityLeft: BigInt;
  market: {
    id: string;
    ticker: string;
    contractUnit: BigInt;
  };
}

export interface PositionWithSide extends PositionType {
  side: 'SHORT' | 'LONG';
}

export interface PositionsResponse {
  positions: PositionType[];
}
