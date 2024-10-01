import { useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { useRouter } from 'next/router';
import { truncateAddress } from '@/utils/truncateAddress';
import { useQuery as useTanstackQuery } from '@tanstack/react-query';
import { isAddress } from '@polkadot/util-crypto';
import { ProfileTab } from './ProfileTab';
import { ProfileAggregatedPosition } from './ProfileAggregatedPosition';
import { addressMatcherApi } from '@/requests/bidgeApi/addressMatcherApi';
import { useDisplayName } from '@/hooks/useDisplayName';
import Link from 'next/link';
import { useUserPositions } from '@/hooks/useUserPositions';
import { currencySymbol } from '@/blockchain/constants';
import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { useAccount } from 'wagmi';
import { convertToSS58 } from '@/utils/convertToSS58';
import { decodeWord } from '@/utils/decodeLeaderboardWord';
import { IoMdSettings } from 'react-icons/io';
import { ProfileSettingsModal } from './ProfileSettingsModal';

export type ProfileStateType = 'positions' | 'orders' | 'settlements';

export const ProfileContainer = () => {
  const router = useRouter();
  const { address: loggedAddress } = useAccount();
  const ss58Address = router.query.address as string;
  const isValidAddress = isAddress(ss58Address);
  const isLoggedUser =
    loggedAddress && convertToSS58(loggedAddress) === ss58Address;

  const [profileState, setProfileState] =
    useState<ProfileStateType>('positions');
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleSetProfileState = (val: ProfileStateType) => {
    setProfileState(val);
  };

  const { aggregatedPositions, sumPnL } = useUserPositions(ss58Address);

  const { data: h160address } = useTanstackQuery({
    queryKey: ['h160', ss58Address],
    queryFn: addressMatcherApi.geth160Address,
  });

  const { data: balanceData, refetch } = useNativeCurrencyBalance(
    h160address?.data?.ethAddress
  );

  const userBalance = Number(Number(balanceData?.formatted).toFixed(2));

  const { displayName: nickname } = useDisplayName(ss58Address);

  const displayName = isLoggedUser
    ? nickname
      ? `${decodeWord(nickname)} (You)`
      : truncateAddress(ss58Address)
    : nickname
    ? `${decodeWord(nickname)}`
    : ss58Address && truncateAddress(ss58Address);

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  return (
    <div className='bg-[#111217] relative min-h-screen'>
      <img
        src='/chartbg.svg'
        alt=''
        className='w-full h-full absolute inset-0 pointer-events-none z-0'
      />
      <div className='h-[100dvh] max-w-[2000px]  lg:mx-auto mx-4 flex flex-col pb-4 items-center relative z-10'>
        <Navbar />
        <div className='lg:max-w-[800px] max-h-[calc(100dvh-100px)] pt-6 lg:px-6 px-4 flex-grow border-[#444650] border-2 rounded-[10px] w-full mt-4 bg-[#191B24] overflow-auto no-scrollbar'>
          {isValidAddress ? (
            <>
              <div className='mb-2 lg:flex lg:items-center lg:justify-between'>
                <div>
                  <h2 className='text-white text-lg font-semibold mb-4 lg:mb-0'>
                    {displayName
                      ? decodeWord(displayName)
                      : router.query.address &&
                        truncateAddress(router.query.address as string)}{' '}
                    Profile
                  </h2>
                </div>
                {!isLoggedUser ? (
                  <Link
                    href={`/?chat=${h160address?.data.ethAddress}`}
                    className='bg-bigsbgreen w-[160px] h-[32px] flex items-center justify-center text-black rounded-md text-sm font-semibold mb-4 lg:mb-0'
                  >
                    Open Chat
                  </Link>
                ) : (
                  <button
                    className='bg-bigsbgreen w-[160px] h-[32px] flex items-center justify-center text-black rounded-md text-sm font-semibold mb-4 lg:mb-0'
                    onClick={() => setIsModalOpened(true)}
                  >
                    Settings
                  </button>
                )}
              </div>
              <div className='mb-4 flex gap-4'>
                <div>
                  <p className='text-xs text-tetriary mb-1'>
                    SS58 Address:{' '}
                    <span className='text-white'>
                      {router.query.address &&
                        truncateAddress(router.query.address as string)}
                    </span>
                  </p>
                  <p className='text-xs text-tetriary '>
                    H160 Address:{' '}
                    <span className='text-white'>
                      {' '}
                      {h160address &&
                        truncateAddress(h160address.data.ethAddress)}
                    </span>
                  </p>
                </div>

                <div>
                  <p className='text-xs text-tetriary mb-1'>
                    Unrealised PnL:{' '}
                    <span
                      className={`text-xs font-semibold ${
                        sumPnL < 0 ? 'text-[#DA8787]' : 'text-[#87DAA4]'
                      }`}
                    >
                      {sumPnL.toFixed(2)} {currencySymbol}
                    </span>
                  </p>
                  <p className='text-xs text-tetriary '>
                    Wallet Balance:{' '}
                    <span className='text-white'>
                      {' '}
                      {`${userBalance ?? '-'} ${currencySymbol}`}
                    </span>
                  </p>
                </div>
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
                  {Object.entries(aggregatedPositions).map(
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
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full gap-4'>
              <h1 className='text-tetriary font-semibold text-3xl'>
                Address you've provided is not valid
              </h1>
              <Link
                href='/'
                className='bg-bigsbgreen rounded text-black px-6 py-2 font-semibold'
              >
                Back to app
              </Link>
            </div>
          )}
        </div>
      </div>

      <ProfileSettingsModal
        isModalOpened={isModalOpened}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};
