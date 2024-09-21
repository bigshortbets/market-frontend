import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '../Navbar/Navbar';
import { LeaderboardItem } from './LeaderboardItem';
import { useAccount } from 'wagmi';
import { FaSearch } from 'react-icons/fa';
import { PrizesModal } from './PrizesModal';
import { useQuery as gqlQuery } from '@apollo/client';

import {
  ElectionLeaderboardResponse,
  ElectionLeaderboardType,
  LeaderboardResponse,
  LeaderboardType,
} from '@/types/leaderboardTypes';
import {
  LEADERBOARD_ELECTION_QUERY,
  LEADERBOARD_QUERY,
} from '@/requests/queries';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { truncateAddress } from '@/utils/truncateAddress';
import { LeaderboardUserItem } from './LeaderboardUserItem';
import { LeaderboardElectionUserItem } from './LeaderboardElectionUserItem';
import { convertToSS58 } from '@/utils/convertToSS58';
import { formatNumberLeaderboard } from '@/utils/formatNumberLeaderboard';
import ReactLoading from 'react-loading';

export const Leaderboard = () => {
  const { address } = useAccount();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const router = useRouter();
  const { query } = router;

  const [loading, setLoading] = useState(true); // State for loading

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  const { data: leaderboardRes } = gqlQuery<LeaderboardResponse>(
    LEADERBOARD_QUERY,
    {
      pollInterval: 15000,
    }
  );

  const { data: electionLeaderboardRes } =
    gqlQuery<ElectionLeaderboardResponse>(LEADERBOARD_ELECTION_QUERY, {
      pollInterval: 15000,
    });

  const [currentRanking, setCurrentRanking] = useState<string>('general');

  const {
    isPending,
    error,
    data: bigsbPriceData,
  } = useQuery({
    queryKey: ['bigsbPrice'],
    queryFn: () =>
      axios
        .get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bigshortbets&vs_currencies=usd'
        )
        .then((res) => res.data),
  });

  const findUserData = (
    leaderboard: LeaderboardType[],
    id: string
  ): { data: LeaderboardType | undefined; index: number } => {
    const ss58Id = convertToSS58(id);
    const index = leaderboard.findIndex((record) => record.id === ss58Id);
    const data = index !== -1 ? leaderboard[index] : undefined;
    return { data, index };
  };

  const userData =
    address &&
    leaderboardRes &&
    findUserData(leaderboardRes.generalLeaderboards, address);

  const findUserElectionData = (
    leaderboard: ElectionLeaderboardType[],
    id: string
  ): { data: ElectionLeaderboardType | undefined; index: number } => {
    const ss58Id = convertToSS58(id);
    const index = leaderboard.findIndex((record) => record.user === ss58Id);
    const data = index !== -1 ? leaderboard[index] : undefined;
    return { data, index };
  };

  useEffect(() => {
    if (query.mode && query.mode !== currentRanking) {
      setCurrentRanking(query.mode as string);
    }
  }, [query.mode]);

  const handleRankingChange = (ranking: string) => {
    setLoading(true); // Start loading when changing ranking
    setCurrentRanking(ranking);
    const params = new URLSearchParams(window.location.search);
    params.set('mode', ranking);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, undefined, { shallow: true });
  };

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    params.set('mode', currentRanking);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, undefined, { shallow: true });

    const timer = setTimeout(() => {
      setLoading(false); // End loading after 3 seconds
    }, 1500);

    return () => clearTimeout(timer); // Cleanup timer
  }, [currentRanking]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Initial loading end after 3 seconds
    }, 1500);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const aggregatedBalances = (
    electionLeaderboardRes?.userBalances ?? []
  ).reduce((acc, { balanceChange, user }) => {
    const change = Number(balanceChange); // Explicitly convert to number
    if (acc[user]) {
      acc[user] += change;
    } else {
      acc[user] = change;
    }
    return acc;
  }, {} as Record<string, number>);

  const result = Object.entries(aggregatedBalances)
    .map(([user, balanceChange]) => ({ user, balanceChange }))
    .sort((a, b) => b.balanceChange - a.balanceChange);

  const userDataElection =
    address && electionLeaderboardRes && findUserElectionData(result, address);

  return (
    <div className='bg-[#111217] relative min-h-screen'>
      <img
        src='/chartbg.svg'
        alt=''
        className='w-full h-full absolute inset-0 pointer-events-none z-0'
      />
      <div className='h-[100dvh] max-w-[2000px]  lg:mx-auto mx-4 flex flex-col pb-4 items-center relative z-10'>
        <Navbar />
        <div className='lg:max-w-[1420px] max-h-[calc(100dvh-100px)] flex-grow border-[#444650] border-2 rounded-[10px] w-full mt-4 bg-[#191B24] overflow-auto no-scrollbar'>
          <div className='pt-6 lg:px-6 px-4'>
            <div className='mb-8 lg:flex lg:items-center lg:justify-between'>
              <div className='lg:flex lg:items-center lg:gap-5'>
                <h2 className='text-white text-lg font-semibold mb-4 lg:mb-0'>
                  Leaderboard 🏆
                </h2>
                <div className='flex  gap-3'>
                  <button
                    className='mb-4 lg:mb-0 h-[35px] w-[100px] bg-[#1e2029] text-white text-[13px] rounded-lg font-bold border-[#444650] border-2'
                    onClick={() => setIsModalOpened(true)}
                  >
                    Prizes 🎁
                  </button>
                  <div className='md:hidden '>
                    <p className='text-xs text-tetriary font-semibold mb-[2px]'>
                      Prize Pool Value:
                    </p>
                    <p className='text-xs font-semibold'>
                      100,000 $BigSB ={' '}
                      {formatNumberLeaderboard(
                        Number(100_000 * bigsbPriceData?.bigshortbets.usd)
                      )}
                      $
                    </p>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <p className='text-xs text-tetriary font-semibold'>
                    Prize Pool Value:
                  </p>
                  <p className='text-xs font-semibold'>
                    100,000 $BigSB = $
                    {formatNumberLeaderboard(
                      Number(100_000 * bigsbPriceData?.bigshortbets.usd)
                    )}
                  </p>
                </div>
              </div>
              <div>
                <div className='lg:flex lg:items-center lg:gap-4'>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => handleRankingChange('general')}
                      className={`h-[35px] flex-1 lg:w-[160px]  text-xs rounded-lg ${
                        currentRanking === 'general'
                          ? 'text-black bg-[#4ECB7D]  font-bold'
                          : 'bg-[#23252E] text-white'
                      }`}
                    >
                      General Ranking
                    </button>
                    <button
                      onClick={() => handleRankingChange('usa')}
                      className={`h-[35px] w-[160px]  text-xs rounded-lg ${
                        currentRanking === 'usa'
                          ? 'text-black bg-[#4ECB7D]  font-bold'
                          : 'bg-[#23252E] text-white'
                      }`}
                    >
                      Election Markets Ranking
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
              <div className='w-full  rounded-lg mb-1 h-[40px] bg-[#23252E] lg:flex hidden items-center px-4 justify-between even:bg-[#191B24]'>
                <div className='flex'>
                  <div className='w-[100px] items-center text-[13px] font-semibold'>
                    Position
                  </div>
                  <div className='w-[150px] items-center text-[13px] font-semibold'>
                    Address
                  </div>
                  <div className='w-[150px] items-center text-[13px] font-semibold'>
                    Username
                  </div>
                  <div className='w-[150px] items-center text-[13px] font-semibold'>
                    Prize
                  </div>
                </div>
                <div className='w-[100px] text-right items-center text-[13px] font-semibold'>
                  PnL
                </div>
              </div>

              <div
                className={`justify-center items-center  mt-6 w-full h-full ${
                  loading ? 'flex' : 'hidden'
                }`}
              >
                <ReactLoading
                  type='spin'
                  width={36}
                  height={36}
                  color='#444650'
                  className='mt-0.5'
                />
              </div>

              <div
                className={`${loading ? 'hidden' : 'flex flex-col gap-1.5'} `}
              >
                {currentRanking === 'general' && (
                  <>
                    {address && userData && (
                      <LeaderboardUserItem
                        address={address}
                        userData={userData}
                        bigsbPrice={bigsbPriceData?.bigshortbets.usd}
                      />
                    )}

                    {leaderboardRes &&
                      leaderboardRes.generalLeaderboards.map((item, key) => (
                        <LeaderboardItem
                          position={key + 1}
                          key={key}
                          address={item.id}
                          score={item.balanceChange}
                          bigsbPrice={bigsbPriceData?.bigshortbets.usd}
                        />
                      ))}
                  </>
                )}
                {currentRanking === 'usa' && (
                  <>
                    {address && userDataElection && (
                      <LeaderboardElectionUserItem
                        address={address}
                        userData={userDataElection}
                        bigsbPrice={bigsbPriceData?.bigshortbets.usd}
                      />
                    )}
                    {result &&
                      result.map((item, key) => (
                        <LeaderboardItem
                          position={key + 1}
                          key={key}
                          address={item.user}
                          score={item.balanceChange}
                          bigsbPrice={bigsbPriceData?.bigshortbets.usd}
                        />
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrizesModal
        handleCloseModal={handleCloseModal}
        isModalOpened={isModalOpened}
        bigsbPrice={bigsbPriceData?.bigshortbets.usd}
      />
    </div>
  );
};
