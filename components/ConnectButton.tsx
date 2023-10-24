import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const ConnectButton = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const connector = connectors[0];

  const handleConnection = () => {
    isConnected ? disconnect() : connect({ connector });
  };

  return (
    <button
      className="bg-[#9BA6F8] font-semibold px-4 py-2 text-lg rounded-xl text-[#01083A]"
      onClick={handleConnection}
    >
      {isConnected ? 'Connected' : 'Connect wallet'}
    </button>
  );
};
