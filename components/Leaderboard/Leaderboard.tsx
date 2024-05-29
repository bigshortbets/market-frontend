import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { LeaderboardItem } from './LeaderboardItem';
import { useAccount } from 'wagmi';
import { FaSearch } from 'react-icons/fa';

export const Leaderboard = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
  const { address } = useAccount();
  return (
    <div className='bg-[#111217] relative min-h-screen'>
      <img
        src='/chartbg.svg'
        alt=''
        className='w-full h-full absolute inset-0 pointer-events-none z-0'
      />
      <div className='h-[100dvh] max-w-[2000px] mx-auto flex flex-col pb-4 items-center relative z-10'>
        <Navbar />
        <div className='max-w-[1420px] flex-grow border-[#444650] border-2 rounded-[10px] w-full mt-4 bg-[#191B24] overflow-auto no-scrollbar'>
          <div className='pt-6 px-6'>
            <div className='mb-8 flex items-center justify-between'>
              <h2 className='text-white text-lg font-semibold'>
                Leaderboard 🏆
              </h2>
              <div>
                <div className='h-[35px] w-[200px] flex bg-[#23252E] rounded-lg'>
                  <input
                    type='text'
                    className=' text-white  px-3 text-xs  rounded-lg h-full w-[85%] bg-[#23252E]  outline-none'
                    placeholder='Search address'
                  />
                  <div className='flex-grow text-[#444650] flex items-center'>
                    <FaSearch />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
              <div className='w-full rounded-lg mb-1 h-[40px] bg-[#23252E] flex items-center px-4 justify-between even:bg-[#191B24]'>
                <div className='flex'>
                  <div className='w-[100px] items-center text-[13px] font-semibold'>
                    Position
                  </div>
                  <div className='w-[100px] items-center text-[13px] font-semibold'>
                    Address
                  </div>
                </div>
                <div className='w-[100px] text-right items-center text-[13px] font-semibold'>
                  Score
                </div>
              </div>
              {address && (
                <div className='w-full rounded-lg h-[40px] bg-[#23252E] flex items-center px-4 justify-between even:bg-[#1e2029] mb-4'>
                  <div className='flex'>
                    <div className='w-[100px] items-center text-[13px]'>
                      312
                    </div>
                    <div className='text-[13px] flex items-center gap-2'>
                      <p>{`0sda...dasd (You)`}</p>
                    </div>
                  </div>
                  <div className='text-right items-center text-[12px]'>
                    +3.000 $DOLARS
                  </div>
                </div>
              )}
              {arr.map((item, key) => (
                <LeaderboardItem position={key + 1} key={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
