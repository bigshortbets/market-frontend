import { EnrichedMarketType } from './marketTypes';

export interface HistoryOrderType {
  blockHeight: string;
  timestamp: string;
  id: string;
  market: {
    id: string;
    ticker: string;
  };
  price: BigInt;
  side: 'LONG' | 'SHORT';
  quantity: BigInt;
  initialQuantity: BigInt;
  status: 'COMPLETED' | 'CANCELLED';
}

export interface HistoryResponse {
  orders: HistoryOrderType[];
}
