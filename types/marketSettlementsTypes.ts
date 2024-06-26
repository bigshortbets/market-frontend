export interface MarketSettlementsType {
  timestamp: string;
  amount: number;
  market: {
    id: string;
    ticker: string;
  };
  type: 'INGOING' | 'OUTGOING';
}

export interface MarketSettlementsResponse {
  marketSettlements: MarketSettlementsType[];
}
