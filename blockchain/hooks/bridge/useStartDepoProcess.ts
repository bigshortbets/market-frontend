import { bridgeAbi } from '@/blockchain/bridgeAbi';
import {
  MAX_ALLOWANCE,
  bridgeDepoChainId,
  bridgeDepoContract,
  mainnetUSDC,
} from '@/blockchain/constants';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import toast from 'react-hot-toast';
import { parseEther } from 'viem';
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi';

export const useStartDepoProcess = (amount: number) => {
  const { write } = useContractWrite({
    address: bridgeDepoContract,
    chainId: bridgeDepoChainId,
    abi: bridgeAbi,
    functionName: 'startDepositProcess',
    args: [BigInt(amount * 1_000_000)],
    onError(error) {
      handleBlockchainError(error.stack!);
    },
    onSuccess() {
      toast.success('Start deposit proccess successful!', {
        duration: 4000,
      });
    },
  });

  return { write };
};
