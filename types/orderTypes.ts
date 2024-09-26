export interface OrderType {
  timestamp: string;
  id: string;
  market: {
    id: string;
    ticker: string;
  };

  price: BigInt;
  side: 'LONG' | 'SHORT';
  quantity: BigInt;
  type: OrderTypeUnion;
  blockHeight: string;
}

enum OrderTypeEnum {
  OpeningOrder = 'OpeningOrder',
  ClosingOrder = 'ClosingOrder',
}

type OpeningOrder = {
  type: OrderTypeEnum.OpeningOrder;
};

type ClosingOrder = {
  type: OrderTypeEnum.ClosingOrder;
  value: BigInt;
};

type OrderTypeUnion = OpeningOrder | ClosingOrder;
export interface OrdersResponse {
  orders: OrderType[];
}

export interface OrderBookOrder {
  price: string;
  quantity: number;
}

export interface OrderBookResponse {
  aggregatedOrdersByPrices: OrderBookOrder[];
}
