import { currencySymbol } from '@/blockchain/constants';
import { convertToSS58 } from '@/utils/convertToSS58';
import { truncateAddress } from '@/utils/truncateAddress';
import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { formatNumberLeaderboard } from '@/utils/formatNumberLeaderboard';
import { useDisplayName } from '@/hooks/useDisplayName';

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
  const { address: h160address } = useAccount();

  const isUser = h160address
    ? convertToSS58(h160address as string) === address
    : false;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard', {
        duration: 1111,
      });
    } catch (err) {
      toast.error('Something went wrong', {
        duration: 1111,
      });
    }
  };

  const { displayName, refresh } = useDisplayName(address);

  const usernameDisplay = `${displayName} (${truncateAddress(address)})`;

  return (
    <div
      className={`w-full rounded-lg py-4 lg:py-2  lg:h-[48px] bg-[#23252E] flex items-center px-4 justify-between  ${
        isUser
          ? 'bg-[#4ECB7D] text-black font-semibold'
          : 'even:bg-[#1e2029] bg-[#23252E]'
      }`}
    >
      <div className='lg:flex'>
        <div className='flex  items-center mb-1 lg:mb-0'>
          <p className='lg:hidden text-xs lg:text-[13px] mr-1'>Position:</p>
          <div className='lg:w-[100px] items-center  text-xs lg:text-[13px] mr-2 lg:mr-0 '>
            {position}
          </div>
          <div className='  text-[13px] flex items-center gap-2 md:w-[250px] w-auto'>
            {position === 1 && <FaTrophy className='text-[#9ca150]' />}
            {position === 2 && <FaTrophy className='text-[#c1c2b4]' />}
            {position === 3 && <FaTrophy className='text-[#8a6644]' />}
            <div className='hidden lg:flex items-center gap-1.5'>
              <p>{displayName ? usernameDisplay : truncateAddress(address)}</p>
              <button
                className='text-xs text-[#434552]'
                onClick={handleCopy}
                aria-label='Copy address'
              >
                <FaCopy />
              </button>
            </div>
          </div>
        </div>
        <div className='lg:hidden mb-1'>
          <div className='flex items-center'>
            <div className='lg:hidden text-xs mr-1 flex items-center gap-1.5'>
              <p>
                User: {displayName ? usernameDisplay : truncateAddress(address)}
              </p>
              <button
                className='text-xs text-[#434552]'
                onClick={handleCopy}
                aria-label='Copy address'
              >
                <FaCopy />
              </button>
            </div>
          </div>
        </div>
        <div
          className={`items-center  text-[10px] lg:w-[150px] flex  ${
            !isUser ? 'text-tetriary' : 'text-black'
          }`}
        >
          <span className='lg:hidden mr-1'>Prize: {}</span>
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
        </div>
      </div>
      <div className='text-right lg:items-center flex lg:block flex-col  lg:text-[12px] text-[11px]'>
        <div
          className={`lg:hidden  ${isUser ? 'text-black' : 'text-tetriary'}`}
        >
          PnL:
        </div>
        <div>
          {formatNumberLeaderboard(Number(score))} {currencySymbol}
        </div>
      </div>
    </div>
  );
};
