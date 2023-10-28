import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import { ConnectButton } from '../ConnectButton';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { bigshortbetsTokenAddress } from '@/blockchain/constants';

export const Navbar = () => {
  const { chain, chains } = useNetwork();
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
    token: bigshortbetsTokenAddress,
    watch: true,
    chainId: 2137,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-primary-bg w-full h-[80px] flex justify-between items-center px-6">
      <Image src={logo} alt="BigShortBet$ Logo" width={60} priority />
      {isClient && (
        <div className="flex gap-6 items-center">
          {address && (
            <div className="flex flex-col gap-1">
              <p className="text-sm">Balance</p>
              <p className="text-xs">
                {Number(data?.formatted).toFixed(2).toString()} {data?.symbol}
              </p>
            </div>
          )}
          <ConnectButton />
        </div>
      )}
    </nav>
  );
};
