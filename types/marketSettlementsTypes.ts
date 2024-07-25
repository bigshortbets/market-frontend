export interface MarketSettlementsType {
  timestamp: string;
  amount: string;
  market: {
    id: string;
    ticker: string;
  };
  type: 'INGOING' | 'OUTGOING';
}

export interface MarketSettlementsResponse {
  marketSettlements: MarketSettlementsType[];
}
