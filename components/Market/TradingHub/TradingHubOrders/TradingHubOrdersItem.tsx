import { OrderType } from '@/types/orderTypes';
import { SideLabel } from '../SideLabel';
import { useCancelOrder } from '@/blockchain/hooks/useCancelOrder';
import { format, parseISO } from 'date-fns';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { fetchOrderCollateral } from '@/utils/fetchOrderCollateral';
import { selectedMarketIdAtom } from '../../Market';
import { useAtom } from 'jotai';
import { TbWorld } from 'react-icons/tb';
import { useRouter } from 'next/router';

interface TradingHubOrdersItemProps {
  order: OrderType;
}

export const TradingHubOrdersItem = ({ order }: TradingHubOrdersItemProps) => {
  const { write: writeCancelOrder } = useCancelOrder(order.market.id, order.id);
  const date = parseISO(order.timestamp);
  const marketDetails = getMarkeDetails(order.market.ticker);

  const { address } = useAccount();
  const [state, setState] = useState<number>();
  const [_, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const router = useRouter();

  /*   useEffect(() => {
    const fetchCollateral = async () => {
      if (order && address) {
        try {
          const res = await fetchOrderCollateral(address as string, order.id);
          setState(res);
        } catch (error) {
          console.error('Error fetching collateral:', error);
        }
      }
    };

    fetchCollateral();
  }, [order]); */

  const changeMarket = () => {
    setSelectedMarketId(order.market.id);
    router.replace(
      `?market=${order.market.ticker}-${order.market.id}`,
      undefined,
      { shallow: true }
    );
  };
  return (
    <tr
      className={`text-sm odd:bg-[#23252E] text-[#7F828F]  overflow-x-scroll sm:text-xs 
  }`}
    >
      {/* Side */}
      <td className='pl-3 py-2'>
        <SideLabel side={order.side} />
      </td>
      {/* Created */}
      <td>{format(date, 'd MMMM yyyy HH:mm:ss')}</td>
      {/* Market */}
      <td
        role='button'
        aria-label={`Select market ${marketDetails?.name}`}
        className='underline cursor-pointer'
        onClick={changeMarket}
      >
        {marketDetails?.name}
      </td>
      {/* Price */}
      <td>{Number(order.price)}</td>
      {/* Quantity */}
      <td>{Number(order.quantity)}</td>
      {/*  <td>{order.type === 'CLOSING' ? 'Closing order' : 'Opening order'}</td> */}
      {/* Close */}
      <td className=' text-right pr-3'>
        <div className='flex items-center justify-end space-x-4'>
          <a
            href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftest-market.bigsb.network#/explorer/query/${order.blockHeight}`}
            target='_blank'
            className='text-medium text-tetriary'
          >
            <TbWorld />
          </a>
          <button
            className={`font-bold text-xs text-[#D26D6C] transition ease-in-out hover:text-[#C53F3A] duration-300`}
            onClick={() => writeCancelOrder()}
          >
            CANCEL
          </button>
        </div>
      </td>
    </tr>
  );
};
