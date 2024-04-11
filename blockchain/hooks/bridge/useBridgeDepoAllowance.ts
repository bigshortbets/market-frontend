import {
  bridgeDepoChainId,
  bridgeDepoContract,
  mainnetUSDC,
} from '@/blockchain/constants';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import toast from 'react-hot-toast';
import { erc20ABI, useContractRead } from 'wagmi';

export const useBridgeDepoAllowance = (address: string) => {
  const { data: allowance, isLoading } = useContractRead({
    address: mainnetUSDC,
    abi: erc20ABI,
    chainId: bridgeDepoChainId,
    functionName: 'allowance',
    args: [address! as `0x${string}`, bridgeDepoContract as `0x${string}`],
    watch: true,
  });

  return { allowance, isLoading };
};
