import { format, parseISO } from 'date-fns';
import { SideLabel } from '../SideLabel';
import { HistoryOrderType } from '@/types/historyTypes';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import { MarketSettlementsType } from '@/types/marketSettlementsTypes';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { currencySymbol } from '@/blockchain/constants';
import Image from 'next/image';
import { selectedMarketIdAtom } from '../../Market';
import { useAtom } from 'jotai';

interface TradingHubHistoryItem {
  settlement: MarketSettlementsType;
}

export const TradingHubHistoryItem = ({
  settlement,
}: TradingHubHistoryItem) => {
  const marketDetails = getMarkeDetails(settlement.market.ticker);
  const [_, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  return (
    <div className='w-full rounded-lg py-4 lg:py-2  lg:h-[56px] md:flex-row bg-[#23252E] flex flex-col  px-4 md:justify-between '>
      <div className='flex h-full gap-3.5'>
        <div className='flex flex-col justify-between w-[120px] md:w-[140px]'>
          <div className='text-xs bg-[#444650] p-0.5 pl-1 text-center rounded block'>
            <div className='flex items-center  gap-1 justify-center'>
              <p className='text-center'>
                {settlement.type === 'OUTGOING' ? 'Outgoing' : 'Ingoing'}{' '}
                Settlement{' '}
              </p>

              <div>
                {/*  {settlement.type === 'OUTGOING' ? (
                  <div className='text-[#d84646]'>
                    <TiArrowSortedDown />
                  </div>
                ) : (
                  <div className='text-[#47dc5b]'>
                    <TiArrowSortedUp />
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <p className='text-xs text-tetriary mt-1.5 md:mt-0'>
            {format(parseISO(settlement.timestamp), 'd MMMM yyyy HH:mm:ss')}
          </p>
        </div>
        <div className='text-xs text-tetriary'>
          <p
            className='mb-1.5 underline cursor-pointer hidden md:block'
            role='button'
            aria-label={`Select market ${marketDetails?.name}`}
            onClick={() => setSelectedMarketId(settlement.market.id)}
          >
            {marketDetails?.name}
          </p>
          <p className='mb-1.5  md:hidden'>{marketDetails?.name}</p>
          <div className='flex items-center gap-1'>
            {/* {marketDetails && (
              <Image
                src={marketDetails?.path}
                width={16}
                height={16}
                alt='Market logo'
                className='rounded-full'
              />
            )} */}
            <p className='text-white text-[11px]'>{settlement.market.ticker}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between text-xs text-right'>
        <p>Amount</p>
        <p
          className={`text-[12px] font-semibold ${
            settlement.type === 'OUTGOING' ? 'text-[#DA8787]' : 'text-[#87DAA4]'
          }`}
        >
          {settlement.type === 'OUTGOING' && '-'}
          {Number(settlement.amount).toFixed(2)} {currencySymbol}
        </p>
      </div>
    </div>
  );
};
