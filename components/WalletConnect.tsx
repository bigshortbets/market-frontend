/* import React from 'react';
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { bigshortbetsChain } from '@/blockchain/chain';
import { wagmiConfig } from '@/pages/_app';
import truncateEthAddress from 'truncate-eth-address';
import { useAccount } from 'wagmi';

export const WalletConnect = () => {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  return (
    <div
      className={`bg-[#4ECB7D] font-semibold px-4 py-2  cursor-pointer rounded-xl text-[#01083A] text-sm ${
        !isConnected && 'animate-pulse'
      }`}
      onClick={() => open()}
    >
      {isConnected ? truncateEthAddress(address!) : 'Connect wallet'}
    </div>
  );
};
 */
