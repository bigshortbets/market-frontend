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
import { decodeWord } from '@/utils/decodeLeaderboardWord';
import { useQuery } from '@tanstack/react-query';
import { addressMatcherApi } from '@/requests/bidgeApi/addressMatcherApi';
import { IoChatbubble } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { FaMessage } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';

interface LeaderboardItemProps {
  position: number;
  address: string;
  score: number;
  bigsbPrice: number | undefined;
}

export const LeaderboardItem = ({
  position,
  address: ss58address,
  score,
  bigsbPrice,
}: LeaderboardItemProps) => {
  const { address: myh160Address } = useAccount();

  const isUser = myh160Address
    ? convertToSS58(myh160Address as string) === ss58address
    : false;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ss58address);
      toast.success('Address copied to clipboard', {
        duration: 1111,
      });
    } catch (err) {
      toast.error('Something went wrong', {
        duration: 1111,
      });
    }
  };

  const router = useRouter();

  const { displayName, refresh } = useDisplayName(ss58address);

  const usernameDisplay = displayName ? decodeWord(displayName) : '-';

  /*  const { data: h160address } = useQuery({
    queryKey: ['h160', ss58address],
    queryFn: addressMatcherApi.geth160Address,
  });
 */
  /*  const openChat = () => {
    router.push(`/?chat=${h160address!.data.ethAddress}`);
  }; */

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
          <div className='  text-[13px] flex items-center gap-2 md:w-[150px] w-auto'>
            {position === 1 && <FaTrophy className='text-[#9ca150]' />}
            {position === 2 && <FaTrophy className='text-[#c1c2b4]' />}
            {position === 3 && <FaTrophy className='text-[#8a6644]' />}
            <div className='hidden lg:flex items-center gap-1.5'>
              <Link
                href={`/profile/${ss58address}`}
                className='hover:underline'
              >
                {truncateAddress(ss58address)}
              </Link>

              <button
                className='text-xs text-[#434552]'
                onClick={handleCopy}
                aria-label='Copy address'
              >
                <FaCopy />
              </button>
              {/* {h160address &&
                h160address.data.ethAddress &&
                !isUser &&
                myh160Address && (
                  <button
                    className='text-tetriary text-[13px] hover:text-[#9b9da8]'
                    onClick={openChat}
                  >
                    <FaMessage />
                  </button>
                )} */}
              {/*  <Link href={`/profile/${ss58address}`}>
                <FaUser />
              </Link> */}
            </div>
          </div>
          <div className='lg:w-[150px] items-center  text-xs lg:text-[13px] mr-2 lg:mr-0 hidden lg:block'>
            <Link href={`/profile/${ss58address}`} className='hover:underline'>
              {usernameDisplay}
            </Link>
          </div>
        </div>
        <div className='lg:hidden mb-1'>
          <div className='flex items-center'>
            <div className='lg:hidden text-xs mr-1 flex items-center gap-1.5'>
              <p>Address: {truncateAddress(ss58address)}</p>{' '}
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
          <div className='lg:hidden text-xs mr-1 flex items-center gap-1.5'>
            <p>Username: {usernameDisplay}</p>
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
