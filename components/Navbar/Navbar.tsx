import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { CurrentNetworkTab } from './CurrentNetworkTab';
import { WalletConnect } from '../WalletConnect';
import { selectedMarketIdAtom } from '../Market/Market';
import { useAtom } from 'jotai';

export const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const { isConnected } = useAccount();
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();

  useEffect(() => {
    if (chain?.id != 2137) {
      switchNetwork?.(2137);
    }
  }, [isConnected]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className='bg-[#111217] w-full h-[64px] '>
      <div className=' flex justify-between h-full px-7 items-center'>
        <Image src={logo} alt='BigShortBet$ Logo' width={50} priority />
        <div className='flex items-center gap-4'>
          {isConnected && <CurrentNetworkTab />}
          {/* <UIConfiguration /> */}
          {isClient && <WalletConnect />}
        </div>
      </div>
    </nav>
  );
};
