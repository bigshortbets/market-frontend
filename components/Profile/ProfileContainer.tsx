import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { useRouter } from 'next/router';
import { USER_OPEN_POSITIONS_QUERY } from '@/requests/queries';
import { apolloClient } from '@/requests/graphql';
import { GetServerSidePropsContext } from 'next';

export const ProfileContainer = () => {
  const router = useRouter();
  return (
    <div className='bg-[#111217] relative min-h-screen'>
      <img
        src='/chartbg.svg'
        alt=''
        className='w-full h-full absolute inset-0 pointer-events-none z-0'
      />
      <div className='h-[100dvh] max-w-[2000px]  lg:mx-auto mx-4 flex flex-col pb-4 items-center relative z-10'>
        <Navbar />
        <div className='lg:max-w-[800px] flex-grow border-[#444650] border-2 rounded-[10px] w-full mt-4 bg-[#191B24] overflow-auto no-scrollbar'>
          <div className='pt-6 lg:px-6 px-4'>
            <div className='mb-8 lg:flex lg:items-center lg:justify-between'>
              <div className='lg:flex lg:items-center lg:gap-5'>
                <h2 className='text-white text-lg font-semibold mb-4 lg:mb-0'>
                  {router.query.address} profile
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
