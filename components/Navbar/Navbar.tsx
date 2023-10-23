import Image from 'next/image';
import React from 'react';
import logo from '../../public/logo.svg';

export const Navbar = () => {
  return (
    <nav className="bg-primary-bg w-full h-[80px] flex justify-between items-center px-6">
      <Image src={logo} alt="BigShortBet$ Logo" width={60} />
      <button className="bg-[#9BA6F8] font-semibold px-4 py-2 text-lg rounded-xl text-[#01083A]">
        Connect wallet
      </button>
    </nav>
  );
};
