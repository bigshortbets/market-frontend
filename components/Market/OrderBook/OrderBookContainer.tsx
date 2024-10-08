import { atom, useAtom } from 'jotai';
import { OrderBookStateTab } from './OrderBookStateTab';
import { OrderBook } from './OrderBook';
import { RecentTrades } from './RecentTrades';
import { selectedMarketIdAtom } from '../Market';
import { useOrderBook } from '@/hooks/useOrderBook';

const tabs = ['trades', 'orderbook'];

export type OrderBookStateTabsType = (typeof tabs)[number];

export const orderBookStateAtom = atom<OrderBookStateTabsType>('orderbook');

export const OrderBookContainer = () => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const [orderBookState] = useAtom(orderBookStateAtom);

  const { shorts, longs, loading } = useOrderBook(selectedMarketId);

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
          <OrderBook shorts={shorts} longs={longs} loading={loading} />
        )}
        {orderBookState === 'trades' && <RecentTrades />}
      </div>
    </div>
  );
};
