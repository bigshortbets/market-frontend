import { useAtom } from 'jotai';
import React from 'react';
import { currentBlockAtom, selectedMarketIdAtom } from '../Market';
import { MarketType } from '@/types/marketTypes';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';
import { calculateMarketClosing } from '@/utils/calculateMarketClosing';
import { CiCalendar } from 'react-icons/ci';
import { IoMdLock } from 'react-icons/io';

interface MarketSelectItemProps {
  market: MarketType;
  handleCloseSelect: () => void;
}

export const MarketSelectItem = ({
  market,
  handleCloseSelect,
}: MarketSelectItemProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const [currentBlock] = useAtom(currentBlockAtom);
  const details = getMarkeDetails(market.ticker);

  const { daysLeft, isClosed } = calculateMarketClosing(
    Number(currentBlock),
    Number(market.lifetime)
  );

  const handleAction = () => {
    setSelectedMarketId(market.id);
    handleCloseSelect();
  };
  return (
    <div
      className={`w-full h-[55px] px-4 border-b border-[#191B24] flex justify-between items-center cursor-pointer ${
        isClosed && 'bg-[#23252E]'
      }`}
      onClick={handleAction}
    >
      <div className={`flex  gap-4 items-center ${isClosed && 'opacity-30'}`}>
        {details && (
          <Image
            src={details.path}
            width={18}
            height={18}
            alt='Market logo'
            className='rounded-full'
          />
        )}
        <div>
          <div className='flex items-center gap-1.5'>
            <p className='text-[13px] font-bold'>
              {details ? details.name : market.ticker}
            </p>
          </div>
          {details && (
            <p className='text-[10px] font-normal'>({market?.ticker})</p>
          )}
        </div>
      </div>
      {!isClosed ? (
        <div className='flex items-center gap-1'>
          <p className='text-[10px] text-tetriary font-normal'>
            {daysLeft} days left
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
