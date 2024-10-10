import { OrderSide } from './OrderBook';
import { OrderBookOrder, OrderType } from '@/types/orderTypes';
import { useAccount } from 'wagmi';
import { useAtom } from 'jotai';
import { chosenMarketAtom } from '@/store/store';
import { getPrecision } from '@/utils/getPrecision';
import { useUserOrders } from '@/hooks/useUserOrders';
import { convertToSS58 } from '@/utils/convertToSS58';
import { FaUser } from 'react-icons/fa';

interface OrderBookItem {
  empty: boolean;
  side: OrderSide;
  data?: OrderBookOrder;
}

export const OrderBookItem = ({ empty, side, data }: OrderBookItem) => {
  const [chosenMarket] = useAtom(chosenMarketAtom);
  const { address } = useAccount();

  const precision = getPrecision(Number(chosenMarket?.tickSize));

  const compareOrderPrices = (
    openOrders: OrderType[],
    orderBookPrice: number,
    precision: number,
    chosenMarketId: string
  ): boolean => {
    return openOrders.some((order) => {
      const orderPrice = Number(order.price);
      const orderMarketId = order.market.id;
      return (
        orderMarketId === chosenMarketId &&
        orderPrice.toFixed(precision) === orderBookPrice.toFixed(precision)
      );
    });
  };

  const { openOrders } = useUserOrders(
    address && convertToSS58(address as string)
  );

  const isPriceInOpenOrders = compareOrderPrices(
    openOrders,
    Number(data?.price),
    precision,
    chosenMarket!.id
  );

  return (
    <div
      className={`w-full bg-opacity-[15%]  text-opacity-50 py-2   ${
        side === OrderSide.LONG
          ? ' bg-green-900 text-tetriary'
          : ' bg-[#C53F3A] text-tetriary'
      }`}
    >
      {!empty && data && (
        <div className='w-full justify-between h-full flex px-4 text-xs items-center'>
          <div className='text-right min-w-[60px] flex items-center gap-2'>
            {Number(data.price).toFixed(precision)}
            {isPriceInOpenOrders && <FaUser />}
          </div>
          <div>{data.quantity}</div>
        </div>
      )}
    </div>
  );
};
