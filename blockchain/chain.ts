import { Chain } from 'wagmi';

export const bigshortbetsChain = {
  id: 2137,
  name: 'BigShortBets',
  network: 'BIGSB',
  nativeCurrency: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ['https://test-market.bigsb.network'],
      webSocket: ['wss://test-market.bigsb.network'],
    },
    default: {
      http: ['https://test-market.bigsb.network'],
      webSocket: ['wss://test-market.bigsb.network'],
    },
  },
  /* blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  }, */
  contracts: {
    market: {
      address: '0x0000000000000000000000000000000000000859',
      blockCreated: 1,
    },
  },
} as const satisfies Chain;
