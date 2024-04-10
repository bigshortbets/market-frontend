import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const ConnectButton = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const isInstalled = typeof (window as any).ethereum !== 'undefined';

  const connector = connectors[0];

  const handleConnection = () => {
    isConnected ? disconnect() : connect({ connector });
  };

  const handleClick = () => {
    isInstalled
      ? handleConnection()
      : window.open('https://metamask.io/download.html', '_blank');
  };

  return (
    <button
      className={`bg-[#4ECB7D] font-semibold px-4 py-2  rounded-xl text-[#01083A] text-sm ${
        !isConnected && 'animate-pulse'
      }`}
      onClick={handleClick}
    >
      {!isInstalled
        ? 'Install metamask'
        : isConnected
        ? 'Connected'
        : 'Connect wallet'}
    </button>
  );
};
