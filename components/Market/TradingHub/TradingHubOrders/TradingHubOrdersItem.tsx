import { OrderType } from '@/types/orderTypes';
import { SideLabel } from '../SideLabel';
import { useCancelOrder } from '@/blockchain/hooks/useCancelOrder';
import { format, parseISO } from 'date-fns';
import { getMarkeDetails } from '@/utils/getMarketDetails';

interface TradingHubOrdersItemProps {
  order: OrderType;
}

export const TradingHubOrdersItem = ({ order }: TradingHubOrdersItemProps) => {
  const { write: writeCancelOrder } = useCancelOrder(order.market.id, order.id);
  const date = parseISO(order.timestamp);
  const marketDetails = getMarkeDetails(order.market.ticker);
  return (
    <tr className={`text-sm odd:bg-[#23252E] text-[#7F828F] `}>
      {/* Side */}
      <td className='pl-3 py-2'>
        <SideLabel side={order.side} />
      </td>
      {/* Created */}
      <td>{format(date, 'd MMMM yyyy HH:mm:ss')}</td>
      {/* Market */}
      <td>{marketDetails?.name}</td>
      {/* Price */}
      <td>{Number(order.price)}</td>
      {/* Quantity */}
      <td>{Number(order.quantity)}</td>
      {/* Close */}
      <td className=' text-right pr-3 '>
        <button
          className={`font-bold text-xs text-[#D26D6C] transition ease-in-out hover:text-[#C53F3A] duration-300`}
          onClick={() => writeCancelOrder()}
        >
          CANCEL
        </button>
      </td>
    </tr>
  );
};
