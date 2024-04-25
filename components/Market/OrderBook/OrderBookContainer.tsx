import { atom, useAtom } from 'jotai';
import { OrderBookStateTab } from './OrderBookStateTab';
import { OrderBook, OrderSide } from './OrderBook';
import { RecentTrades } from './RecentTrades';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import { ORDER_BOOK_LONGS_QUERY, ORDER_BOOK_SHORTS_QUERY } from '@/api/queries';
import { selectedMarketIdAtom } from '../Market';
import { OrderBookResponse } from '@/types/orderTypes';

const tabs = ['trades', 'orderbook'];

export type OrderBookStateTabsType = (typeof tabs)[number];

export const orderBookStateAtom = atom<OrderBookStateTabsType>('orderbook');

export const OrderBookContainer = () => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const { address } = useAccount();
  const [orderBookState] = useAtom(orderBookStateAtom);

  const { data: longsRes } = useQuery<OrderBookResponse>(
    ORDER_BOOK_LONGS_QUERY,

    {
      pollInterval: 1000,
      variables: { marketId: selectedMarketId, limit: 5, side: OrderSide.LONG },
    }
  );

  const { data: shortsRes } = useQuery<OrderBookResponse>(
    ORDER_BOOK_SHORTS_QUERY,
    {
      pollInterval: 1000,
      variables: {
        marketId: selectedMarketId,
        limit: 5,
        side: OrderSide.SHORT,
      },
    }
  );
  return (
    <div
      className='h-full lg:w-[320px] flex-1 lg:flex-none overflow-auto no-scrollbar'
      style={{ maxHeight: 'calc(100vh - 228px)' }}
    >
      <div className='flex flex-col h-full'>
        <div className='py-3 px-4 border-b border-[#444650] flex flex-row-reverse items-center gap-2'>
          {tabs.map((tab, key) => (
            <OrderBookStateTab key={key} value={tab} />
          ))}
        </div>
        {orderBookState === 'orderbook' && (
          <OrderBook shortsRes={shortsRes} longsRes={longsRes} />
        )}
        {orderBookState === 'trades' && <RecentTrades />}
      </div>
    </div>

    /* <div
      className={`h-[440px] w-[230px] rounded bg-secondary-bg ${
        !address && 'opacity-50 pointer-events-none'
      }}`}
    >
      <div
        className={`w-full h-[40px] flex p-1 ${
          !address && 'pointer-events-none'
        }`}
      >
        {tabs.map((tab, key) => (
          <OrderBookStateTab key={key} value={tab} />
        ))}
      </div>
      <div className="w-full h-full">
        {orderBookState === 'book' && <OrderBook />}
        {orderBookState === 'trades' && <RecentTrades />}
      </div>
    </div> */
  );
};
