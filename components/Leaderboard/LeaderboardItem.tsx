import { truncateAddress } from '@/utils/truncateAddress';
import React from 'react';
import { FaTrophy } from 'react-icons/fa';

interface LeaderboardItemProps {
  position: number;
  address: string;
  score: number;
  bigsbPrice: number;
}

export const LeaderboardItem = ({
  position,
  address,
  score,
  bigsbPrice,
}: LeaderboardItemProps) => {
  return (
    <div className='w-full rounded-lg  h-[40px] bg-[#23252E] flex items-center px-4 justify-between even:bg-[#1e2029]'>
      <div className='flex'>
        <div className='w-[100px] items-center  text-[13px] '>{position}</div>
        <div className='  text-[13px] flex items-center gap-2'>
          {position === 1 && <FaTrophy className='text-[#9ca150]' />}
          {position === 2 && <FaTrophy className='text-[#c1c2b4]' />}
          {position === 3 && <FaTrophy className='text-[#8a6644]' />}
          <p>{truncateAddress(address)}</p>
        </div>
        <div className='w-[100px] items-center  text-[12px] flex text-tetriary'>
          {position === 1 &&
            `10,000 BIGSB (${Number(10_000 * bigsbPrice).toFixed(2)}$)`}
        </div>
      </div>
      <div className='text-right items-center  text-[12px]'>
        {Number(score).toFixed(2)} $DOLARS
      </div>
    </div>
  );
};
