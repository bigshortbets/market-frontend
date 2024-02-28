import React from 'react';
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { bigshortbetsChain } from '@/blockchain/chain';
import { wagmiConfig } from '@/pages/_app';
import { useAccount } from 'wagmi';

export const WalletConnect = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  return (
    <div
      className={`bg-[#9BA6F8] font-semibold px-4 py-2  cursor-pointer rounded-xl text-[#01083A] text-sm ${
        !isConnected && 'animate-pulse'
      }`}
      onClick={() => open()}
    >
      {isConnected ? 'Connected' : 'Connect wallet'}
    </div>
  );
};
