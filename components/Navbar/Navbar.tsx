import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { CurrentNetworkTab } from './CurrentNetworkTab';
import { WalletConnect } from '../WalletConnect';
import { selectedMarketIdAtom } from '../Market/Market';
import { useAtom } from 'jotai';
import banner from '../../public/banner.svg';

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
    <nav className="bg-[#111217] w-full h-[64px] ">
      <div className=" flex justify-between h-full px-7 items-center">
        <div className="flex gap-2">
          <Image src={logo} alt="BigShortBet$ Logo" width={50} priority />
          <div className="flex flex-col">
            <p className="text-md">bigshortbet$</p>
            <p className="text-xs font-semibold">
              MARKET <span className="text-[#4ECB7D]">PEER2PEER</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Image src={banner} alt="banner" width={400} height={60} />
          </div>
          {/*           {isConnected && <CurrentNetworkTab />} */}
          {/* <UIConfiguration /> */}
          {isClient && <WalletConnect />}
        </div>
      </div>
    </nav>
  );
};
