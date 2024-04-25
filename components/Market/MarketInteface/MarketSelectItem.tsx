import { useAtom } from 'jotai';
import { currentBlockAtom, selectedMarketIdAtom } from '../Market';
import { EnrichedMarketType } from '@/types/marketTypes';
import Image from 'next/image';
import { calculateMarketClosing } from '@/utils/calculateMarketClosing';
import { CiCalendar } from 'react-icons/ci';
import { IoMdLock } from 'react-icons/io';
import { useRouter } from 'next/router';

interface MarketSelectItemProps {
  market: EnrichedMarketType;
  handleCloseSelect: () => void;
}

export const MarketSelectItem = ({
  market,
  handleCloseSelect,
}: MarketSelectItemProps) => {
  const [_, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const [currentBlock] = useAtom(currentBlockAtom);

  const { timeLeftMessage, isClosed } = calculateMarketClosing(
    Number(currentBlock),
    Number(market.lifetime)
  );
  const router = useRouter();

  const handleAction = () => {
    setSelectedMarketId(market.id);
    handleCloseSelect();
    router.push(`?market=${market.ticker}`);
  };
  return (
    <div
      className={`w-full h-[55px] px-4 border-b border-[#444650] flex justify-between items-center cursor-pointer ${
        isClosed && 'bg-[#23252E]'
      }`}
      onClick={handleAction}
    >
      <div className={`flex  gap-4 items-center ${isClosed && 'opacity-30'}`}>
        {market.path && (
          <Image
            src={market.path}
            width={20}
            height={20}
            alt='Market logo'
            className='rounded-full'
          />
        )}
        <div>
          <div className='flex items-center gap-1.5'>
            <p className='text-[13px] font-bold'>
              {market.name ? market.name : market.ticker}
            </p>
          </div>
          {market.name && (
            <p className='text-[10px] font-normal'>({market?.ticker})</p>
          )}
        </div>
      </div>
      {!isClosed ? (
        <div className='flex items-center gap-1'>
          <p className='text-[10px] text-tetriary font-normal'>
            {timeLeftMessage}
          </p>
          <div className='text-[12px] text-tetriary'>
            <CiCalendar />
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          <p className='text-[10px] text-tetriary font-normal'>Market closed</p>
          <div className='text-[12px] text-tetriary'>
            <IoMdLock />
          </div>
        </div>
      )}
    </div>
  );
};
