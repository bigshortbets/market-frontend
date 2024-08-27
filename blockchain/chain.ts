import { type Chain } from 'viem';

export const bigshortbetsChain = {
  id: 2136,
  name: 'BigShortBets Testnet',
  iconUrl: 'https://r2.easyimg.io/6dw6zs8cj/logo.svg',
  nativeCurrency: {
    name: 'Dolarz',
    symbol: 'Dolarz',
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
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  contracts: {
    market: {
      address: '0x0000000000000000000000000000000000000859',
      blockCreated: 1,
    },
  },
} as any;

export const bigshortbetsChainNative = {
  chainId: `0x${(2136).toString(16)}`,
  chainName: 'BigShortBets',
  nativeCurrency: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 18,
  },
  rpcUrls: ['https://test-market.bigsb.network'],
};
