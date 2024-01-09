import { useAtom } from 'jotai';
import React from 'react';
import {
  OrderBookStateTabsType,
  orderBookStateAtom,
} from './OrderBookContainer';

interface OrderBookStateTabProps {
  value: OrderBookStateTabsType;
}

export const OrderBookStateTab = ({ value }: OrderBookStateTabProps) => {
  const [orderBookState, setOrderBookState] = useAtom(orderBookStateAtom);
  const isActive = orderBookState === value;
  return (
    <button
      className={`flex-1  rounded flex items-center justify-center text-sm font-semibold p-1 ${
        isActive ? 'bg-primary-bg' : 'bg-secondary-bg'
      }`}
      onClick={() => setOrderBookState(value)}
    >
      <p className="capitalize">{value}</p>
    </button>
  );
};
