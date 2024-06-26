import { format, parseISO } from 'date-fns';
import { SideLabel } from '../SideLabel';
import { HistoryOrderType } from '@/types/historyTypes';
import { getMarkeDetails } from '@/utils/getMarketDetails';

interface TradingHubHistoryItem {
  order: HistoryOrderType;
}

export const TradingHubHistoryItem = ({ order }: TradingHubHistoryItem) => {
  const date = parseISO(order.timestamp);
  const marketDetails = getMarkeDetails(order.market.ticker);
  return (
    <tr className={`text-sm odd:bg-[#23252E] text-[#7F828F] `}>
      {/* Side */}
      <td className="pl-3 py-2">
        <SideLabel side={order.side} />
      </td>
      {/* Created */}
      <td>{format(date, 'd MMMM yyyy HH:mm:ss')}</td>
      {/* Market */}
      <td>{marketDetails?.name}</td>
      {/* Price */}
      <td>{Number(order.price)}</td>
      {/* Quantity */}
      <td>{Number(order.initialQuantity)}</td>
      {/* Close */}
      <td className="font-semibold">{order.status}</td>
    </tr>
  );
};
