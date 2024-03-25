import { OrderType } from '@/types/orderTypes';
import { SideLabel } from '../SideLabel';
import { useCancelOrder } from '@/blockchain/hooks/useCancelOrder';

interface TradingHubOrdersItemProps {
  order: OrderType;
}

export const TradingHubOrdersItem = ({ order }: TradingHubOrdersItemProps) => {
  const { write: writeCancelOrder, isLoading } = useCancelOrder(
    order.market.id,
    order.id
  );
  return (
    <tr
      className={`text-sm odd:bg-[#23252E] text-[#7F828F] ${
        isLoading && 'animate-pulse'
      }`}
    >
      {/* Side */}
      <td className="pl-3 py-2">
        <SideLabel side={order.side} />
      </td>
      {/* Created */}
      <td>{order.timestamp}</td>
      {/* Market */}
      <td>{order.market.ticker}</td>
      {/* Price */}
      <td>{Number(order.price)}</td>
      {/* Quantity */}
      <td>{Number(order.quantity)}</td>
      {/* Close */}
      <td className=" text-right pr-3 ">
        <button
          className={`font-bold text-xs text-[#D26D6C] transition ease-in-out hover:text-[#C53F3A] duration-300 ${
            isLoading && 'pointer-events-none'
          }`}
          onClick={() => writeCancelOrder?.()}
        >
          CLOSE
        </button>
      </td>
    </tr>
  );
};
