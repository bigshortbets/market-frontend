import { defineChain } from 'viem';

export const bigshortbetsTokenAddress =
  '0x0000000000000000000000000000000000000888';

export const marketContract = '0x0000000000000000000000000000000000000859';

export const CHAIN_PREFIX = {
  snow: 2207,
  ss58: 42,
  arctic: 2208,
};

/* CHAIN INFO */

export const chainInfoChainId = 2136;
export const chainInfoChainName = 'BigShortBets';
export const chainInfoCurrencyName = 'USD Coin';
export const chainInfoCurrencySymbol = 'USDC';

/*  */

export const currencySymbol = 'DOLARZ';

/* BRIDGE */

export const MAX_ALLOWANCE =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const bridgeDepoChainId = 11155111;

export const bridgeDepoContract = '0xAcAC2a546722a0d470f17b4b5eA2F77DA90770a9';

export const mainnetUSDC = '0xB7A00fF77B59eb5DA1de62741e84a4b8a88598CE';

export const sepo = /*#__PURE__*/ defineChain({
  id: 11_155_111,
  network: 'sepolia',
  name: 'Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'SEP', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://ethereum-sepolia-rpc.publicnode.com'],
    },
    public: {
      http: ['https://ethereum-sepolia-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 751532,
    },
    ensRegistry: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
    ensUniversalResolver: {
      address: '0x21B000Fd62a880b2125A61e36a284BB757b76025',
      blockCreated: 3914906,
    },
  },
  testnet: true,
});

export const mintMessage =
  'I hereby claim my $DOLARS from the specified address. By signing this message, I confirm that I am the rightful owner of this address.';
