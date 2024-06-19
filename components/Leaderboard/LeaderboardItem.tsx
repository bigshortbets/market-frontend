import { currencySymbol } from '@/blockchain/constants';
import { truncateAddress } from '@/utils/truncateAddress';
import React from 'react';
import { FaTrophy } from 'react-icons/fa';

interface LeaderboardItemProps {
  position: number;
  address: string;
  score: number;
  bigsbPrice: number | undefined;
}

export const LeaderboardItem = ({
  position,
  address,
  score,
  bigsbPrice,
}: LeaderboardItemProps) => {
  return (
    <div className='w-full rounded-lg py-4 lg:py-2  lg:h-[48px] bg-[#23252E] flex items-center px-4 justify-between even:bg-[#1e2029]'>
      <div className='lg:flex'>
        <div className='flex  items-center mb-1 lg:mb-0'>
          <p className='lg:hidden text-xs lg:text-[13px] mr-1'>Position:</p>
          <div className='lg:w-[100px] items-center  text-xs lg:text-[13px] mr-2 lg:mr-0 '>
            {position}
          </div>
          <div className='  text-[13px] flex items-center gap-2 w-[130px]'>
            {position === 1 && <FaTrophy className='text-[#9ca150]' />}
            {position === 2 && <FaTrophy className='text-[#c1c2b4]' />}
            {position === 3 && <FaTrophy className='text-[#8a6644]' />}
            <p className='hidden lg:block'>{truncateAddress(address)}</p>
          </div>
        </div>
        <div className='lg:hidden mb-1'>
          <div className='flex items-center'>
            <p className='lg:hidden text-xs mr-1'>
              Address: {truncateAddress(address)}
            </p>
          </div>
        </div>
        <div className=' items-center  text-[10px] lg:w-[150px] flex text-tetriary'>
          <span className='lg:hidden mr-1'>Prize: {}</span>
          {position === 1 &&
            `10,000 BIGSB (${
              bigsbPrice && Number(10_000 * bigsbPrice).toFixed(2)
            }$)`}
          {position === 2 &&
            `8,000 BIGSB (${
              bigsbPrice && Number(8_000 * bigsbPrice).toFixed(2)
            }$)`}
          {position === 3 &&
            `6,000 BIGSB (${
              bigsbPrice && Number(6_000 * bigsbPrice).toFixed(2)
            }$)`}
          {position === 4 &&
            `4,000 BIGSB (${
              bigsbPrice && Number(4_000 * bigsbPrice).toFixed(2)
            }$)`}
          {position === 5 &&
            `2,000 BIGSB (${
              bigsbPrice && Number(2_000 * bigsbPrice).toFixed(2)
            }$)`}
          {position > 5 &&
            position <= 50 &&
            `1,000 BIGSB (${
              bigsbPrice && Number(1_000 * bigsbPrice).toFixed(2)
            }$)`}
          {position >= 51 &&
            position <= 100 &&
            `500 BIGSB (${bigsbPrice && Number(500 * bigsbPrice).toFixed(2)}$)`}
          {position > 100 && `-`}
        </div>
      </div>
      <div className='text-right lg:items-center flex lg:block flex-col  lg:text-[12px] text-[11px]'>
        <div className='lg:hidden text-tetriary'>Score:</div>
        <div>
          {Number(score).toFixed(2)} ${currencySymbol}
        </div>
      </div>
    </div>
  );
};
