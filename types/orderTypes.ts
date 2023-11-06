import { MarketType } from './marketTypes';

export interface OrderType {
  timestamp: string;
  id: string;
  market: MarketType;
  price: BigInt;
  side: 'LONG' | 'SHORT';
}

export interface OrdersResponse {
  orders: OrderType[];
}
