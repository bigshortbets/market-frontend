import { apolloClient } from '@/api/graphql';
import { bigshortbetsChain } from '@/blockchain/chain';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { publicClient, webSocketPublicClient } = configureChains(
  [bigshortbetsChain],
  [publicProvider()]
);

const config = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ApolloProvider>
  );
}
