import { OrderType } from '@/types/orderTypes';
import { SideLabel } from '../SideLabel';
import { scaleNumber } from '@/utils/scaleNumber';
import { useCancelOrder } from '@/blockchain/hooks/useCancelOrder';
import { HistoryOrderType } from '@/types/historyTypes';

interface TradingHubHistoryItem {
  order: HistoryOrderType;
}

export const TradingHubHistoryItem = ({ order }: TradingHubHistoryItem) => {
  return (
    <tr className={`text-sm odd:bg-[#23252E] text-[#7F828F] `}>
      {/* Side */}
      <td className="pl-3 py-2">
        <SideLabel side={order.side} />
      </td>
      {/* Created */}
      <td>{order.timestamp}</td>
      {/* Market */}
      <td>{order.market.ticker}</td>
      {/* Price */}
      <td>{scaleNumber(Number(order.price))}</td>
      {/* Quantity */}
      <td>{Number(order.quantity)}</td>
      {/* Close */}
      <td className="font-semibold">{order.status}</td>
    </tr>
  );
};
