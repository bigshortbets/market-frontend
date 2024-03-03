import { bigshortbetsChainNative } from '@/blockchain/chain';

export const switchToBigShortBetsChain = async () => {
  try {
    await (window as any).ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [bigshortbetsChainNative],
    });
  } catch (error) {
    console.error(error);
  }
};
