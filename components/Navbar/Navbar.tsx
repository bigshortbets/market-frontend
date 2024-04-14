import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import { useAccount, useSwitchChain } from 'wagmi';
import banner from '../../public/banner.svg';
import { bigshortbetsChain } from '@/blockchain/chain';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const { isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (chain?.id != bigshortbetsChain.id) {
      switchChain({ chainId: bigshortbetsChain.id });
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
          {/* {isClient && <WalletConnect />} */}
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
