import React, { useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { useRouter } from 'next/router';
import {
  USER_HISTORY_QUERY,
  USER_MARKET_SETTLEMENTS_QUERY,
  USER_OPEN_POSITIONS_QUERY,
  USER_ORDERS_QUERY,
} from '@/requests/queries';
import { apolloClient } from '@/requests/graphql';
import { GetServerSidePropsContext } from 'next';
import { truncateAddress } from '@/utils/truncateAddress';
import { useQuery as useApolloQuery } from '@apollo/client';
import { useQuery as useTanstackQuery } from '@tanstack/react-query';
import { OrdersResponse } from '@/types/orderTypes';
import { PositionType, PositionsResponse } from '@/types/positionTypes';
import { HistoryResponse } from '@/types/historyTypes';
import { MarketSettlementsResponse } from '@/types/marketSettlementsTypes';
import { isAddress } from '@polkadot/util-crypto';
import { ProfileTab } from './ProfileTab';
import { ProfileAggregatedPosition } from './ProfileAggregatedPosition';
import { addressMatcherApi } from '@/requests/bidgeApi/addressMatcherApi';
import { useDisplayName } from '@/hooks/useDisplayName';
import { decodeWord } from '@/utils/decodeLeaderboardWord';
import Link from 'next/link';

export type ProfileStateType = 'positions' | 'orders' | 'settlements';

export const ProfileContainer = () => {
  const router = useRouter();
  const ss58Address = router.query.address as string;
  const isValidAddress = isAddress(ss58Address);

  const [profileState, setProfileState] =
    useState<ProfileStateType>('positions');

  const handleSetProfileState = (val: ProfileStateType) => {
    setProfileState(val);
  };

  /*   const { data: ordersRes } = useApolloQuery<OrdersResponse>(
    USER_ORDERS_QUERY,
    {
      pollInterval: 10000,
      variables: { userId: ss58Address },
      skip: !isValidAddress,
    }
  );
 */
  const { data: positionsRes } = useApolloQuery<PositionsResponse>(
    USER_OPEN_POSITIONS_QUERY,

    {
      pollInterval: 10000,
      variables: { userId: ss58Address },
      skip: !isValidAddress,
    }
  );

  /* const { data: historyOrdersRes } = useApolloQuery<HistoryResponse>(
    USER_HISTORY_QUERY,
    {
      pollInterval: 10000,
      variables: { userId: ss58Address },
      skip: !isValidAddress,
    }
  ); */

  /* const { data: marketSettlementsRes } =
    useApolloQuery<MarketSettlementsResponse>(USER_MARKET_SETTLEMENTS_QUERY, {
      pollInterval: 10000,
      variables: { userId: router.query.address as string },
      skip: !isValidAddress,
    }); */

  const aggregatePositionsByMarketTicker = () => {
    const aggregatedPositions: Record<string, PositionType[]> = {};
    positionsRes?.positions.forEach((position) => {
      if (aggregatedPositions[position.market.ticker]) {
        aggregatedPositions[position.market.ticker].push(position);
      } else {
        aggregatedPositions[position.market.ticker] = [position];
      }
    });
    return aggregatedPositions;
  };

  const positionsByMarketTicker = aggregatePositionsByMarketTicker();

  const { data: h160address } = useTanstackQuery({
    queryKey: ['h160', ss58Address],
    queryFn: addressMatcherApi.geth160Address,
  });

  const { displayName } = useDisplayName(ss58Address);

  return (
    <div
      className='bg-[#111217] relative min-h-screen'
      onClick={() => console.log(isValidAddress)}
    >
      <img
        src='/chartbg.svg'
        alt=''
        className='w-full h-full absolute inset-0 pointer-events-none z-0'
      />
      <div className='h-[100dvh] max-w-[2000px]  lg:mx-auto mx-4 flex flex-col pb-4 items-center relative z-10'>
        <Navbar />
        <div className='lg:max-w-[800px] max-h-[calc(100dvh-100px)] pt-6 lg:px-6 px-4 flex-grow border-[#444650] border-2 rounded-[10px] w-full mt-4 bg-[#191B24] overflow-auto no-scrollbar'>
          <div className='mb-2 lg:flex lg:items-center lg:justify-between'>
            <div className='lg:flex lg:items-center lg:gap-5'>
              <h2 className='text-white text-lg font-semibold mb-4 lg:mb-0'>
                {displayName
                  ? displayName
                  : router.query.address &&
                    truncateAddress(router.query.address as string)}{' '}
                Profile
              </h2>
            </div>
            <Link
              href={`/?chat=${h160address?.data.ethAddress}`}
              className='bg-bigsbgreen w-[160px] h-[32px] flex items-center justify-center text-black rounded-md text-sm font-semibold'
            >
              Open Chat
            </Link>
          </div>
          <div className='mb-4'>
            <p className='text-xs text-tetriary mb-1'>
              SS58 Address:{' '}
              {router.query.address &&
                truncateAddress(router.query.address as string)}
            </p>
            <p className='text-xs text-tetriary '>
              H160 Address:{' '}
              {h160address && truncateAddress(h160address.data.ethAddress)}
            </p>
          </div>
          <div className='flex gap-1.5'>
            <ProfileTab
              value='positions'
              profileState={profileState}
              setProfileState={handleSetProfileState}
            />
            {/*   <ProfileTab
              value='orders'
              profileState={profileState}
              setProfileState={handleSetProfileState}
            />
            <ProfileTab
              value='settlements'
              profileState={profileState}
              setProfileState={handleSetProfileState}
            /> */}
          </div>
          <div className='w-full   overflow-y-auto no-scrollbar mt-4'>
            <div className='flex flex-col gap-4'>
              {Object.entries(positionsByMarketTicker).map(
                ([ticker, positions]) => (
                  <ProfileAggregatedPosition
                    address={router.query.address as string}
                    key={ticker}
                    ticker={ticker}
                    positions={positions}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
