import { useState, useEffect, useCallback } from 'react';
import { useWriteContract } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '@/components/Market/Market';
import { parseEther } from 'viem';
import { bigshortbetsChain } from '../chain';
import toast from 'react-hot-toast';
import { handleBlockchainError } from '@/utils/handleBlockchainError';

export const useWithdraw = (amount: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { writeContract, error, data, status } = useWriteContract();

  const notifText = `Withdraw has been performed! Wait for transaction confirmation.`;

  const write = useCallback(() => {
    setIsLoading(true);
    writeContract({
      address: marketContract as `0x${string}`,
      abi: abi,
      functionName: 'withdraw',
      args: [BigInt(selectedMarketId), parseEther(amount.toString())],
      chainId: bigshortbetsChain.id,
    });
  }, [selectedMarketId, amount, writeContract]);

  useEffect(() => {
    if (error) {
      handleBlockchainError(error.stack!);
      setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success(notifText, {
        duration: 4000,
      });
      setIsLoading(false);
    }
  }, [data]);

  return { write, isLoading, status };
};
