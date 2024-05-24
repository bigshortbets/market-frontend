import React from 'react';
import { FaTrophy } from 'react-icons/fa';

interface LeaderboardItemProps {
  position: number;
}

export const LeaderboardItem = ({ position }: LeaderboardItemProps) => {
  return (
    <div className='w-full rounded-lg  h-[40px] bg-[#23252E] flex items-center px-4 justify-between even:bg-[#1e2029]'>
      <div className='flex'>
        <div className='w-[100px] items-center  text-[13px] '>{position}</div>
        <div className='w-[100px]  text-[13px] flex items-center gap-2'>
          {position === 1 && <FaTrophy className='text-[#9ca150]' />}
          {position === 2 && <FaTrophy className='text-[#c1c2b4]' />}
          {position === 3 && <FaTrophy className='text-[#8a6644]' />}
          <p>0sda...dasd</p>
        </div>
      </div>
      <div className='text-right items-center  text-[12px]'>+3.000 $DOLARS</div>
    </div>
  );
};
