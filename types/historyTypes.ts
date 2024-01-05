import { MarketType } from './marketTypes';

export interface HistoryOrderType {
  timestamp: string;
  id: string;
  market: MarketType;
  price: BigInt;
  side: 'LONG' | 'SHORT';
  quantity: BigInt;
  status: 'COMPLETED' | 'CANCELLED';
}

export interface HistoryResponse {
  orders: HistoryOrderType[];
}
