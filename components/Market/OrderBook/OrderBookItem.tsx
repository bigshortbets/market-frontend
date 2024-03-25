import { OrderSide } from './OrderBook';
import { OrderBookOrder } from '@/types/orderTypes';

interface OrderBookItem {
  empty: boolean;
  side: OrderSide;
  data?: OrderBookOrder;
}

export const OrderBookItem = ({ empty, side, data }: OrderBookItem) => {
  return (
    <div
      className={`w-full bg-opacity-[15%]  text-opacity-50 py-2   ${
        side === OrderSide.LONG
          ? ' bg-green-900 text-tetriary'
          : ' bg-[#C53F3A] text-tetriary'
      }`}
    >
      {!empty && data && (
        <div className="w-full justify-between h-full flex px-4 text-xs">
          <div>{data.price}</div>
          <div>{data.quantity}</div>
        </div>
      )}
    </div>
  );
};
