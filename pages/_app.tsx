import { bigshortbetsChain } from '@/blockchain/chain';
import '@/styles/globals.css';
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
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
