import { LeaderboardType } from '@/types/leaderboardTypes';
import { truncateAddress } from '@/utils/truncateAddress';
import React from 'react';

interface LeaderboardUserItem {
  userData: { data: LeaderboardType | undefined; index: number };
  address: string;
}

export const LeaderboardUserItem = ({
  userData,
  address,
}: LeaderboardUserItem) => {
  return (
    <div className='w-full rounded-lg h-[40px] bg-[#23252E] flex items-center px-4 justify-between even:bg-[#1e2029] mb-4'>
      <div className='flex'>
        <div className='w-[100px] items-center text-[13px]'>
          {userData.data ? userData.index + 1 : '-'}
        </div>
        <div className='text-[13px] flex items-center gap-2 w-[130px]'>
          <p>{`${truncateAddress(address)} (You)`}</p>
        </div>
        <div className=' items-center  text-[10px] w-[150px] flex text-tetriary'>
          -
        </div>
      </div>
      <div className='text-right items-center text-[12px]'>
        {userData.data ? userData.data.balanceChange : '-'}
      </div>
    </div>
  );
};
