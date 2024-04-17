export interface PositionType {
  id: string;
  price: BigInt;
  quantity: BigInt;
  timestamp: string;
  short: string;
  long: string;
  quantityLeft: BigInt;
  createPrice: BigInt;
  market: {
    id: string;
    ticker: string;
    contractUnit: BigInt;
    oraclePrice: BigInt;
  };
}

export interface PositionWithSide extends PositionType {
  side: 'SHORT' | 'LONG';
}

export interface PositionsResponse {
  positions: PositionType[];
}

export interface RecentPositionType {
  id: string;
  price: BigInt;
  timestamp: string;
  quantity: BigInt;
  createPrice: BigInt;
}

export interface RecentPositionTypeResponse {
  positions: RecentPositionType[];
}
