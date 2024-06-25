export interface MarketSettlementsType {
  timestamp: string;
  amount: number;
  market: {
    id: string;
    ticker: string;
  };
  type: 'INGOING' | 'ONGOING';
}

export interface MarketSettlementsResponse {
  marketSettlements: MarketSettlementsType[];
}
