import { currencySymbol } from '@/blockchain/constants';
import {
  ElectionLeaderboardType,
  LeaderboardType,
} from '@/types/leaderboardTypes';
import { convertToSS58 } from '@/utils/convertToSS58';
import { formatNumberLeaderboard } from '@/utils/formatNumberLeaderboard';
import { truncateAddress } from '@/utils/truncateAddress';
import React from 'react';
import { FaTrophy } from 'react-icons/fa6';
import { useAccount } from 'wagmi';

interface LeaderboardElectionUserItem {
  userData: { data: ElectionLeaderboardType | undefined; index: number };
  address: string;
  bigsbPrice: number | undefined;
}

export const LeaderboardElectionUserItem = ({
  userData,
  address,
  bigsbPrice,
}: LeaderboardElectionUserItem) => {
  const { address: h160address } = useAccount();
  const position = userData.index + 1;
  return (
    <div className='w-full rounded-lg py-4 lg:py-2  lg:h-[48px] mb-6 lg:mb-4 flex items-center px-4 justify-between bg-[#4ECB7D] text-black font-semibold'>
      <div className='lg:flex'>
        <div className='flex  items-center mb-1 lg:mb-0'>
          <p className='lg:hidden text-xs lg:text-[13px] mr-1'>Position:</p>
          <div className='lg:w-[100px] items-center  text-xs lg:text-[13px] mr-2 lg:mr-0 '>
            {userData.data ? `${position} (You)` : '-'}
          </div>
          <div className='  text-[13px] flex items-center gap-2 w-[170px]'>
            {position === 1 && <FaTrophy className='text-[#9ca150]' />}
            {position === 2 && <FaTrophy className='text-[#c1c2b4]' />}
            {position === 3 && <FaTrophy className='text-[#8a6644]' />}
            <p className='hidden lg:block'>{`${truncateAddress(
              h160address as string
            )} (${address && truncateAddress(convertToSS58(address))})`}</p>
          </div>
        </div>
        <div className='lg:hidden mb-1'>
          <div className='flex items-center'>
            <p className='lg:hidden text-xs mr-1'>
              Address:{' '}
              {`${truncateAddress(h160address as string)} (${
                address && truncateAddress(convertToSS58(address))
              })`}
            </p>
          </div>
        </div>
        <div className=' items-center  text-[10px] lg:w-[150px] flex text-black'>
          <span className='lg:hidden mr-1'>Prize:</span>
          {position === 1 &&
            `10,000 BigSB ($${
              bigsbPrice && formatNumberLeaderboard(Number(10_000 * bigsbPrice))
            })`}
          {position === 2 &&
            `8,000 BigSB ($${
              bigsbPrice && formatNumberLeaderboard(Number(8_000 * bigsbPrice))
            })`}
          {position === 3 &&
            `6,000 BigSB ($${
              bigsbPrice && formatNumberLeaderboard(Number(6_000 * bigsbPrice))
            })`}
          {position === 4 &&
            `4,000 BigSB ($${
              bigsbPrice && formatNumberLeaderboard(Number(4_000 * bigsbPrice))
            })`}
          {position === 5 &&
            `2,000 BigSB ($${
              bigsbPrice && formatNumberLeaderboard(Number(2_000 * bigsbPrice))
            })`}
          {position > 5 &&
            position <= 10 &&
            `700 BigSB ($${
              bigsbPrice && formatNumberLeaderboard(Number(700 * bigsbPrice))
            })`}
          {position >= 11 &&
            position <= 15 &&
            `500 BigSB ($${
              bigsbPrice && formatNumberLeaderboard(Number(500 * bigsbPrice))
            })`}
          {position >= 16 &&
            position <= 50 &&
            `400 BigSB ($${
              bigsbPrice && formatNumberLeaderboard(Number(400 * bigsbPrice))
            })`}
          {position > 50 && `-`}
          {position === 0 && `-`}
        </div>
      </div>
      <div className='text-right lg:items-center flex lg:block flex-col  lg:text-[12px] text-[11px]'>
        <div className='lg:hidden text-black'>Score:</div>
        <div>
          {userData.data
            ? `${formatNumberLeaderboard(
                Number(userData.data.balanceChange)
              )} ${currencySymbol}`
            : '-'}
        </div>
      </div>
    </div>
  );
};

/* <div className='w-full rounded-lg h-[40px] bg-[#23252E] flex items-center px-4 justify-between even:bg-[#1e2029] mb-4'>
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
    </div> */
