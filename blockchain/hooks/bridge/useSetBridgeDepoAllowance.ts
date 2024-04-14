import {
  MAX_ALLOWANCE,
  bridgeDepoChainId,
  bridgeDepoContract,
  mainnetUSDC,
} from '@/blockchain/constants';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { erc20Abi } from 'viem';
import { useWriteContract } from 'wagmi';

export const useSetBridgeDepoAllowance = () => {
  const { writeContract, error, data, isSuccess } = useWriteContract();

  const notifText = `Allowance has been set! Wait for transaction confirmation.`;

  const write = () =>
    writeContract({
      address: mainnetUSDC,
      abi: erc20Abi,
      functionName: 'approve',
      args: [bridgeDepoContract, BigInt(MAX_ALLOWANCE)],
      chainId: bridgeDepoChainId,
    });

  useEffect(() => {
    if (error) {
      toast.error(error.message.split('\n')[0], {
        duration: 4000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(notifText, {
        duration: 4000,
      });
    }
  }, [isSuccess]);
  return { write, error, data };
};
