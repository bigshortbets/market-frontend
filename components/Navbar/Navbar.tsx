import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import { useAccount, useSwitchChain, useWalletClient } from 'wagmi';
import banner from '../../public/banner.svg';
import { bigshortbetsChain } from '@/blockchain/chain';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaChartLine, FaTrophy } from 'react-icons/fa6';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { convertToSS58 } from '@/utils/convertToSS58';

export const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const { isConnected, chain, address } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (chain?.id != bigshortbetsChain.id) {
      switchChain({ chainId: bigshortbetsChain.id });
    }
  }, [isConnected]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  return (
    <nav className='bg-[#111217] w-full h-[64px]'>
      <div className='flex justify-between h-full px-7 items-center'>
        <div className='flex gap-6 items-center'>
          <Link className='flex gap-2 cursor-pointer' href='/'>
            <Image src={logo} alt='BigShortBet$ Logo' width={50} priority />
            <div className='md:flex flex-col hidden'>
              <p className='text-md hidden md:block'>bigshortbet$</p>
              <p className='md:text-xs text-[10px] font-semibold'>
                MARKET <span className='text-[#4ECB7D]'>PEER2PEER</span>{' '}
                <span className='text-[8px] md:text-[10px]'>TESTNET</span>
              </p>
            </div>
          </Link>
          <div className='flex items-center gap-2'>
            <Link className='p-2 rounded bg-[#191B24]' href='/'>
              <FaChartLine
                className={`text-sm hover:text-[#4ECB7D] cursor-pointer  transition ${
                  router.pathname === '/' && 'text-[#4ECB7D]'
                }`}
              />
            </Link>
            <Link
              className='p-2 rounded bg-[#191B24]'
              href='/leaderboard?mode=general'
            >
              <FaTrophy
                className={`text-sm hover:text-[#4ECB7D] cursor-pointer  transition ${
                  router.pathname === '/leaderboard' && 'text-[#4ECB7D]'
                }`}
              />
            </Link>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='hidden md:block'>
            <Image src={banner} alt='banner' width={400} height={60} />
          </div>
          {isConnected && address && (
            <Link
              className='p-2 rounded bg-[#191B24]'
              href={`/profile/${convertToSS58(address)}`}
            >
              <FaUser
                className={`text-sm hover:text-[#4ECB7D] cursor-pointer  transition ${
                  router.asPath === `/profile/${convertToSS58(address)}` &&
                  'text-[#4ECB7D]'
                }`}
              />
            </Link>
          )}
          {isClient && (
            <ConnectButton
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'address',
              }}
              chainStatus={{
                smallScreen: 'icon',
                largeScreen: 'full',
              }}
              showBalance={false}
            />
          )}
        </div>
      </div>
    </nav>
  );
};
