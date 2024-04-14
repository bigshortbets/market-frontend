import { useTransactionConfirmations, useWriteContract } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '@/components/Market/Market';
import { parseEther } from 'viem';
import { useEffect } from 'react';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import toast from 'react-hot-toast';

export const useDeposit = (amount: number) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { writeContract, error, data } = useWriteContract();

  const notifText = `Deposit has been done! Wait for transaction confirmation.`;

  const write = () =>
    writeContract({
      address: marketContract as `0x${string}`,
      abi: abi,
      functionName: 'deposit',
      args: [BigInt(selectedMarketId), parseEther(amount.toString())],
    });

  useEffect(() => {
    if (error) {
      toast.error(error.message.split('\n')[0], {
        duration: 4000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success(notifText, {
        duration: 4000,
      });
    }
  }, [data]);

  return { write };
};
