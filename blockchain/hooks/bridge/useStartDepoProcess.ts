import { bridgeAbi } from '@/blockchain/bridgeAbi';
import { bridgeDepoChainId, bridgeDepoContract } from '@/blockchain/constants';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useWriteContract } from 'wagmi';

export const useStartDepoProcess = (amount: number) => {
  const { writeContract, error, data, isSuccess } = useWriteContract();

  const notifText = `Deposit has been done! Wait for transaction confirmation.`;

  const write = () =>
    writeContract({
      address: bridgeDepoContract,
      chainId: bridgeDepoChainId,
      abi: bridgeAbi,
      functionName: 'startDepositProcess',
      args: [BigInt(amount * 1_000_000)],
    });

  useEffect(() => {
    if (error) {
      handleBlockchainError(error.stack!);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(notifText, {
        duration: 4000,
      });
    }
  }, [isSuccess]);

  return { write };
};
