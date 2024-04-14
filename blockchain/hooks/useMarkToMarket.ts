import { useWriteContract } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import toast from 'react-hot-toast';
import { bigshortbetsChain } from '../chain';
import { useEffect } from 'react';

export const useMarkToMarket = (marketId: string, positionId: string) => {
  const { writeContract, error, data, isSuccess } = useWriteContract();

  const notifText = `Mark to market action performed! Wait for transaction confirmation.`;

  const write = () =>
    writeContract({
      address: marketContract as `0x${string}`,
      abi: abi,
      functionName: 'mark_to_market',
      args: [BigInt(marketId), BigInt(positionId)],
      chainId: bigshortbetsChain.id,
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

  return { data, isSuccess, write };
};
