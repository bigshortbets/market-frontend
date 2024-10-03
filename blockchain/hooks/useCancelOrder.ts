import { useWriteContract } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import { useEffect } from 'react';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import toast from 'react-hot-toast';
import { bigshortbetsChain } from '../chain';

export const useCancelOrder = (marketId: string, orderId: string) => {
  const { writeContract, error, data, isSuccess } = useWriteContract();

  const notifText = `Order is being cancelled. A wallet notification will confirm once the process is complete.`;

  const write = () =>
    writeContract({
      address: marketContract as `0x${string}`,
      abi: abi,
      functionName: 'cancel_order',
      args: [BigInt(marketId), BigInt(orderId)],
      chainId: bigshortbetsChain.id,
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

  return { data, isSuccess, write };
};
