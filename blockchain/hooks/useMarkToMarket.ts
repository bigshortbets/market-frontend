import { useContractWrite } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import toast from 'react-hot-toast';
import { handleBlockchainError } from '@/utils/handleBlockchainError';

export const useMarkToMarket = (marketId: string, positionId: string) => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: marketContract as `0x${string}`,
    abi: abi,
    functionName: 'mark_to_market',
    args: [BigInt(marketId), BigInt(positionId)],
    onError(error) {
      handleBlockchainError(error.stack!);
    },

    onSuccess() {
      toast.success('Mark to market was successfully made!', {
        duration: 4000,
      });
    },
  });

  return { data, isLoading, isSuccess, write };
};
