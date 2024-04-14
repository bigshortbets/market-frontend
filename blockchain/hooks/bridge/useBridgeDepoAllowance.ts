import {
  bridgeDepoChainId,
  bridgeDepoContract,
  mainnetUSDC,
} from '@/blockchain/constants';
import { useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';

export const useBridgeDepoAllowance = (address: string) => {
  const {
    data: allowance,
    isLoading,
    queryKey,
    refetch,
  } = useReadContract({
    address: mainnetUSDC,
    abi: erc20Abi,
    chainId: bridgeDepoChainId,
    functionName: 'allowance',
    args: [address! as `0x${string}`, bridgeDepoContract as `0x${string}`],
  });

  return { allowance, isLoading, queryKey, refetch };
};
