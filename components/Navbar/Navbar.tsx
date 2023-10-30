import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import { ConnectButton } from '../ConnectButton';
import { useNetwork } from 'wagmi';

export const Navbar = () => {
  const { chain, chains } = useNetwork();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-primary-bg w-full h-[60px] flex justify-between items-center px-6">
      <Image src={logo} alt="BigShortBet$ Logo" width={50} priority />
      {isClient && <ConnectButton />}
    </nav>
  );
};
