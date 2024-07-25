import { HistoryOrderType } from '@/types/historyTypes';
import { TradingHubHistoryItem } from './TradingHubHistoryItem';
import { MarketSettlementsType } from '@/types/marketSettlementsTypes';
import { format, parseISO } from 'date-fns';
import { currencySymbol } from '@/blockchain/constants';

interface TradingHubHistoryProps {
  history: HistoryOrderType[];
  settlements: MarketSettlementsType[];
}

export const TradingHubHistory = ({ history }: TradingHubHistoryProps) => {
  const mock: MarketSettlementsType[] = [
    {
      amount: 360,
      type: 'OUTGOING',
      timestamp: '2024-06-20T20:35:29.000000Z',
      market: {
        id: '9223372036854775820',
        ticker: 'BIGSB_EL:BIDENX2024',
      },
    },
    {
      amount: 360,
      type: 'INGOING',
      timestamp: '2024-06-20T20:35:29.000000Z',
      market: {
        id: '9223372036854775820',
        ticker: 'BIGSB_EL:BIDENX2024',
      },
    },
    {
      amount: 89,
      type: 'OUTGOING',
      timestamp: '2024-06-20T20:39:41.000000Z',
      market: {
        id: '9223372036854775811',
        ticker: 'NYMEX:MCLQ2024',
      },
    },
    {
      amount: 32,
      type: 'INGOING',
      timestamp: '2024-06-20T20:39:41.000000Z',
      market: {
        id: '9223372036854775811',
        ticker: 'NYMEX:MCLQ2024',
      },
    },
  ];
  return (
    <div
      className='w-full h-full overflow-y-auto no-scrollbar'
      style={{ maxHeight: 'calc(100vh - 230px)' }}
    >
      {history.length === 0 ? (
        <div className='px-2.5 flex flex-col gap-3.5 mt-2'>
          {mock.map((obj) => (
            <div className='w-full rounded-lg py-4 lg:py-2  lg:h-[56px] bg-[#23252E] flex  px-4 justify-between'>
              <div className='flex flex-col justify-between'>
                <div className='text-xs bg-[#444650] py-0.5 text-center rounded '>
                  {obj.type === 'OUTGOING' ? 'Outgoing' : 'Ingoing'} Settlement
                </div>
                <p className='text-xs text-tetriary'>
                  {format(parseISO(obj.timestamp), 'd MMMM yyyy HH:mm:ss')}
                </p>
              </div>
              <div className='flex flex-col justify-between text-xs text-right'>
                <p>Amount</p>
                <p
                  className={`text-[13px] font-semibold ${
                    obj.type === 'OUTGOING'
                      ? 'text-[#DA8787]'
                      : 'text-[#87DAA4]'
                  }`}
                >
                  {obj.type === 'OUTGOING' && '-'}
                  {obj.amount.toFixed(2)} {currencySymbol}
                </p>
              </div>
            </div>
          ))}
        </div> /* (
        <table className='table-auto w-full '>
          <thead className='bg-secondary-bg text-sm text-left text-[#ABACBA]'>
            <tr>
              <th className='font-normal py-3 pl-3'>Side</th>
              <th className='font-normal'>Created</th>
              <th className='font-normal'>Market</th>
              <th className='font-normal'>Price</th>
              <th className='font-normal'>Quantity</th>
              <th className='font-normal'>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((order: HistoryOrderType, key: number) => (
              <TradingHubHistoryItem order={order} key={key} />
            ))}
          </tbody>
        </table>
      ) */
      ) : (
        <div className='flex items-center justify-center h-full'>
          <p className='opacity-20 text-2xl mt-5'>
            Currently no orders in the history
          </p>
        </div>
      )}
    </div>
  );
};
