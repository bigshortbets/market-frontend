import { apolloClient } from '@/requests/graphql';
import { bigshortbetsChain } from '@/blockchain/chain';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';
import 'react-tooltip/dist/react-tooltip.css';

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
/* 
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bigshortbetsChain, sepo],
  [publicProvider()]
); */

const config = getDefaultConfig({
  appName: 'bigshortbet$ market peer2peer',
  projectId: '86ff0af7d996a9e572fa31d5d0f8bf52',
  chains: [bigshortbetsChain /* sepolia */],
  ssr: true,
});

const queryClient = new QueryClient();

/* export const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: true,
  connectors: [new MetaMaskConnector(), new InjectedConnector({ chains })],
}); */

/* const projectId = '86ff0af7d996a9e572fa31d5d0f8bf52'; */
/* const chains = [bigshortbetsChain]; */
/* createWeb3Modal({ wagmiConfig, projectId, chains }); */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#4ECB7D',
              accentColorForeground: 'black',
            })}
          >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
