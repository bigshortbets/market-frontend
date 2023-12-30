import { useContractWrite } from 'wagmi';
import { marketContract } from '../constants';
import toast from 'react-hot-toast';
import { abi } from '../abi';
import { parseEther } from 'viem';
import { handleBlockchainError } from '@/utils/handleBlockchainError';

export const useClosePosition = (
  marketId: string,
  positionId: string,
  price: number,
  quantity: BigInt
) => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: marketContract as `0x${string}`,
    abi: abi,
    functionName: 'close_position',
    args: [
      BigInt(marketId),
      BigInt(positionId),
      parseEther(price.toString()),
      quantity,
    ],
    onError(error) {
      handleBlockchainError(error.stack!);
    },

    onSuccess() {
      toast.success('Closing position order created!', {
        duration: 4000,
      });
    },
  });

  return { data, isLoading, isSuccess, write };
};
