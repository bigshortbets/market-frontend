import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import { ConnectButton } from '../ConnectButton';
import { useNetwork } from 'wagmi';
import { UIConfiguration } from '../Market/UIConfiguration';

export const Navbar = () => {
  const { chain, chains } = useNetwork();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-primary-bg w-full h-[60px] flex justify-between items-center px-6">
      <Image src={logo} alt="BigShortBet$ Logo" width={50} priority />
      <div className="flex items-center gap-4">
        <UIConfiguration />
        {isClient && <ConnectButton />}
      </div>
    </nav>
  );
};
