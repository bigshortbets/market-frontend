import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

export const ConnectButton = () => {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  const connector = connectors[0];

  return (
    <button
      className="bg-[#9BA6F8] font-semibold px-4 py-2 text-lg rounded-xl text-[#01083A]"
      onClick={() => connect({ connector })}
    >
      {isConnected ? 'Connected' : 'Connect wallet'}
    </button>
  );
};
