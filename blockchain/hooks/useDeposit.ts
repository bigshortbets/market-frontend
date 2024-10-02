import { useState, useEffect, useCallback } from 'react';
import { useWriteContract } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '@/components/Market/Market';
import { parseEther } from 'viem';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import toast from 'react-hot-toast';

export const useDeposit = (amount: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { writeContract, error, data, status } = useWriteContract();

  const notifText = `Deposit has been done! Wait for transaction confirmation.`;

  const write = useCallback(() => {
    setIsLoading(true);
    writeContract({
      address: marketContract,
      abi: abi,
      functionName: 'deposit',
      args: [BigInt(selectedMarketId), parseEther(amount.toString())],
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
