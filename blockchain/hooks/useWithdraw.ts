import { useWriteContract } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '@/components/Market/Market';
import { parseEther } from 'viem';
import { bigshortbetsChain } from '../chain';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useWithdraw = (amount: number) => {
  const { writeContract, error, data, isSuccess } = useWriteContract();
  const notifText = `Withdraw has been performed! Wait for transaction confirmation.`;

  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const write = () =>
    writeContract({
      address: marketContract as `0x${string}`,
      abi: abi,
      functionName: 'withdraw',
      args: [BigInt(selectedMarketId), parseEther(amount.toString())],
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
