import { useWriteContract } from 'wagmi';
import { marketContract } from '../constants';
import toast from 'react-hot-toast';
import { abi } from '../abi';
import { parseEther } from 'viem';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import { bigshortbetsChain } from '../chain';
import { useEffect } from 'react';

export const useClosePosition = (
  marketId: string,
  positionId: string,
  price: number,
  quantity: number
) => {
  const { writeContract, error, data, isSuccess } = useWriteContract();

  const notifText = `Position has been closed! Wait for transaction confirmation.`;

  const write = () =>
    writeContract({
      address: marketContract as `0x${string}`,
      abi: abi,
      functionName: 'close_position',
      args: [
        BigInt(marketId),
        BigInt(positionId),
        parseEther(price.toString()),
        BigInt(quantity),
      ],
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
