import React from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { bigshortbetsChain } from "@/blockchain/chain";
import { createConfig } from "wagmi";

export const WalletConnect = () => {
  const config = createConfig({
    publicClient,
    webSocketPublicClient,
    autoConnect: true,
  });
  const projectId = "86ff0af7d996a9e572fa31d5d0f8bf52";
  const chains = [bigshortbetsChain];
  createWeb3Modal({ config, projectId, chains });
  return (
    <div
      className={`bg-[#9BA6F8] font-semibold px-4 py-2  rounded-xl text-[#01083A] text-sm ${"animate-pulse"}`}
    >
      Connect Button
    </div>
  );
};
