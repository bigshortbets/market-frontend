import { apolloClient } from '@/api/graphql';
import { bigshortbetsChain } from '@/blockchain/chain';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import 'react-tooltip/dist/react-tooltip.css';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bigshortbetsChain],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: true,
  connectors: [new MetaMaskConnector(), new InjectedConnector({ chains })],
});

const projectId = '86ff0af7d996a9e572fa31d5d0f8bf52';
/* const chains = [bigshortbetsChain]; */
createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={wagmiConfig}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ApolloProvider>
  );
}
